import { Link } from "../../components/Link";
import Plot from 'react-plotly.js';
import { useState, useEffect } from "react";

import dadosFlorianopolis from "../../assets/data/dadosMeteorologicos_florianopolis.json";
import dadosBrasilia from "../../assets/data/dadosMeteorologicos_brasilia.json";
import dadosMacapa from "../../assets/data/dadosMeteorologicos_macapa.json";

import { getLast, getMonth } from "../../scripts/arrayManipulation";

import { PageType } from "../../types";
type JsonData = typeof dadosFlorianopolis;
type NewDataType = {
    "dias x horas do ano": string[],
    "dias": string[],
    "mês": string[],
    "radiação medida (W/m^2)": (number|null)[],
    "radiação densidade diária (kWh/m^2)": (number)[],
    "radiação densidade semanal (kWh/m^2)": (number)[],
    "radiação densidade mensal (kWh/m^2)": (number)[],
    "temperatura minima diária (ºC)": (number)[],
    "temperatura máxima diária (ºC)": (number)[],
    "variação temperatura diária (ºC)": (number)[]
};
const dados = {
    florianopolis: dadosFlorianopolis,
    brasilia: dadosBrasilia,
    macapa: dadosMacapa
};

export const Page:PageType = () => {
    const newData = {
        florianopolis: calculateNewData(dados.florianopolis),
        brasilia: calculateNewData(dados.brasilia),
        macapa: calculateNewData(dados.macapa)
    }
    console.log(dados);
    console.log(newData);

    const [isLoading, setLoading] = useState(true);
    const [city, setCity] = useState(newData.florianopolis);

    function setNewCity(city:NewDataType){
        setLoading(true);
        setCity(city);
    }

    useEffect(() => {
        setLoading(false);
    },[city]);

    return <>
        <h1>Análise de dados meteorológicos II</h1>
        <section>
            <p>
                Este documento reproduz os procedimentos de leitura e processamento do arquivo
                de dados meteorológicos da atividade anterior, incluindo alguns gráficos a mais: as
                densidades diárias, semanais e mensais de energia incidente sobre a superfície, em
                kWh/m2
                e um gráfico das temperaturas mínimas e máximas diárias.
            </p><p>
                Os gráficos a seguir referem-se aos dados sobre Florianópolis. A sua missão é reproduzi-los.
            </p><p>
                A sua missão será calcular a densidade superficial de energia, em kWh/m2 recebida diariamente em cada localidade, e a densidade anual, em MWh/m2
            </p>

            <button onClick={() => {setNewCity(newData.florianopolis)}}>Florianopolis</button>
            <button onClick={() => {setNewCity(newData.brasilia)}}>Brasilia</button>
            <button onClick={() => {setNewCity(newData.macapa)}}>Macapa</button>
            <br/>
            <output>
                {isLoading?<span>Loading...</span>: <Grafics city={city}/>}
            </output>
        </section>
        <button>
            <Link href="/">Home</Link>
        </button>
    </>
}

function Grafics(props:{city:NewDataType}){
    const {city} = props;

    return <>
        <Plot
            data={[{
                x:city["dias x horas do ano"],
                y:city["radiação medida (W/m^2)"],
                type: "bar"
            }]}
            layout={{
                title: 'Incidência de radiação na superfície',
                "xaxis.title": "dias x horas do ano",
                "yaxis.title": "radiação medida (W/m2)"
            }}
        />
        <Plot
            data={[{
                x:city["dias"],
                y:city["radiação densidade diária (kWh/m^2)"],
                type: "bar"
            }]}
            layout={{
                title: 'Densidade diária de energia na superfície em kWh/m2'
            }}
        />
        <Plot
            data={[{
                x:city["radiação densidade semanal (kWh/m^2)"].map((_value, i) => i),
                y:city["radiação densidade semanal (kWh/m^2)"],
                type: "bar"
            }]}
            layout={{
                title: 'Densidade semanal de energia na superfície em kWh/m2'
            }}
        />
        <Plot
            data={[{
                x:city["mês"],
                y:city["radiação densidade mensal (kWh/m^2)"],
                type: "bar"
            }]}
            layout={{
                title: 'Densidade mensal de energia na superfície em kWh/m2'
            }}
        />
        <Plot
            data={[
                {
                    x:city["dias"],
                    y:city["temperatura minima diária (ºC)"],
                    type: "scatter"
                },
                {
                    x:city["dias"],
                    y:city["temperatura máxima diária (ºC)"],
                    type: "scatter"
                },
                {
                    x:city["dias"],
                    y:city["variação temperatura diária (ºC)"],
                    type: "scatter"
                }
            ]}
            layout={{
                title: 'Incidência de radiação na superfície'
            }}
        />
    </>
}

function calculateNewData(city:JsonData){
    const result:NewDataType = {
        "dias x horas do ano": city.data.Data.map((item, index) => {
            return item + " " + city.data["Hora UTC"][index];
        }),
        dias: [city.data.Data[0]],
        "mês": [getMonth(city.data.Data[0])],
        "radiação medida (W/m^2)": city.data["RADIACAO GLOBAL (Kj/m²)"],
        "radiação densidade diária (kWh/m^2)": [0],
        "radiação densidade mensal (kWh/m^2)": [0],
        "radiação densidade semanal (kWh/m^2)": [0],
        "temperatura minima diária (ºC)": [],
        "temperatura máxima diária (ºC)": [],
        "variação temperatura diária (ºC)": [0]
    };

    // Conversion Constants
    const c1 = 1000/24
    const c2 = 1000/(24*7);

    let amostrasRadiacaoDia = 0;
    let amostrasRadiacaoSemana = 0;
    let amostrasRadiacaoMes = 0;
    for(let i = 0; i < city.data.Data.length; i++){
        const dia = result.dias.length-1;
        const semana = Math.floor((dia+1)/7);
        // TODO array com os meses e radiação por mes

        // Radiação
        if(city.data["RADIACAO GLOBAL (Kj/m²)"][i] !== null){
            const radiacao = city.data["RADIACAO GLOBAL (Kj/m²)"][i]!

            result["radiação densidade diária (kWh/m^2)"][dia] += radiacao;
            result["radiação densidade semanal (kWh/m^2)"][semana] += radiacao;
            result["radiação densidade mensal (kWh/m^2)"][result["mês"].length-1] += radiacao;

            amostrasRadiacaoDia++;
            amostrasRadiacaoSemana++;
            amostrasRadiacaoMes++;
        }

        // Temperaturas
        if(city.data["TEMPERATURA MÁXIMA NA HORA ANT. (AUT) (°C)"][i] !== null){
            let tempMaxHour = city.data["TEMPERATURA MÁXIMA NA HORA ANT. (AUT) (°C)"][i]!
            if(result["temperatura minima diária (ºC)"][dia] === undefined){
                result["temperatura minima diária (ºC)"][dia] = tempMaxHour
            }
            if(result["temperatura máxima diária (ºC)"][dia] === undefined){
                result["temperatura máxima diária (ºC)"][dia] = tempMaxHour
            }

            if(tempMaxHour < result["temperatura minima diária (ºC)"][dia]){
                result["temperatura minima diária (ºC)"][dia] = tempMaxHour;
            }
            if(tempMaxHour > result["temperatura máxima diária (ºC)"][dia]){
                result["temperatura máxima diária (ºC)"][dia] = tempMaxHour;
            }
        }
        if(city.data["TEMPERATURA MÍNIMA NA HORA ANT. (AUT) (°C)"][i] !== null){
            let tempMinHour = city.data["TEMPERATURA MÍNIMA NA HORA ANT. (AUT) (°C)"][i]!
            if(result["temperatura minima diária (ºC)"][dia] === undefined){
                result["temperatura minima diária (ºC)"][dia] = tempMinHour
            }
            if(result["temperatura máxima diária (ºC)"][dia] === undefined){
                result["temperatura máxima diária (ºC)"][dia] = tempMinHour
            }

            if(tempMinHour < result["temperatura minima diária (ºC)"][dia]){
                result["temperatura minima diária (ºC)"][dia] = tempMinHour;
            }
            if(tempMinHour > result["temperatura máxima diária (ºC)"][dia]){
                result["temperatura máxima diária (ºC)"][dia] = tempMinHour;
            }
        }

        // Quando o dia muda
        if(city.data.Data[i] !== result.dias[dia]){
            const nextDay = result.dias.length;
            const nextWeek = Math.floor((nextDay+1)/7);
            const nextMonth = getMonth(city.data.Data[i])
            result["radiação densidade diária (kWh/m^2)"][dia] /= amostrasRadiacaoDia*c1;
            result["radiação densidade diária (kWh/m^2)"][nextDay] = 0;
            amostrasRadiacaoDia = 0;
            

            //Quando a semana muda
            if(semana < nextWeek){
                result["radiação densidade semanal (kWh/m^2)"][semana] /= amostrasRadiacaoSemana*c2;
                result["radiação densidade semanal (kWh/m^2)"][nextWeek] = 0
                amostrasRadiacaoSemana = 0;
            }

            //Quando o mês muda
            if(getLast(result["mês"]) !== nextMonth){
                result["radiação densidade mensal (kWh/m^2)"][result["mês"].length-1] /= amostrasRadiacaoMes;
                amostrasRadiacaoMes = 0;
                result["radiação densidade mensal (kWh/m^2)"].push(0);
                result["mês"].push(nextMonth);
            }

            result.dias[nextDay] = city.data.Data[i];
        }
    }
    // Ultimo dia
    const lastDay = result.dias.length-1;
    const lastWeek = Math.floor((lastDay+1)/7);
    const lastMonth = result["mês"].length-1;
    if(amostrasRadiacaoDia != 0){
        result["radiação densidade diária (kWh/m^2)"][lastDay] /= amostrasRadiacaoDia*c1;
    }
    if(amostrasRadiacaoSemana != 0){
        result["radiação densidade semanal (kWh/m^2)"][lastWeek] /= amostrasRadiacaoSemana*c2;
    }
    if(amostrasRadiacaoMes != 0){
        result["radiação densidade mensal (kWh/m^2)"][lastMonth] /= amostrasRadiacaoMes;
    }
    result["variação temperatura diária (ºC)"] = result["temperatura máxima diária (ºC)"].map((maxTemp, index) => {return maxTemp - result["temperatura minima diária (ºC)"][index]});



    return result;
}