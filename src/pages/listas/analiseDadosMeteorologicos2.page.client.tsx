import { Link } from "../../components/Link";
import Plot from 'react-plotly.js';
import { useState, useEffect } from "react";

import dadosFlorianopolis from "../../assets/data/dadosMeteorologicos_florianopolis.json";
import dadosBrasilia from "../../assets/data/dadosMeteorologicos_brasilia.json";
import dadosMacapa from "../../assets/data/dadosMeteorologicos_macapa.json";

import { PageType } from "../..";
type JsonData = typeof dadosFlorianopolis;
type NewDataType = {
    "dias x horas do ano": string[],
//    "dias": string[],
//    "semana": number[],
//    "mês": string[],
    "radiação medida (W/m^2)": (number|null)[],
//    "radiação densidade diária (kWh/m^2)": (number|null)[],
//    "radiação densidade semanal (kWh/m^2)": (number|null)[],
//    "radiação densidade mensal (kWh/m^2)": (number|null)[],
//    "temperatura minima diária (ºC)": (number|null)[],
//    "temperatura máxima diária (ºC)": (number|null)[],
//    "variação temperatura diária (ºC)": (number|null)[]
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
                title: 'Incidência de radiação na superfície'
            }}
        />
    </>
}

function calculateNewData(city:JsonData):NewDataType{
    let dias: string[] = [
        city.data.Data[0]
    ];
    for(let i = 0; i < city.data.Data.length; i++){
        if(city.data.Data[i] !== dias[dias.length-1]){
            dias[dias.length] = city.data.Data[i];
        }
    }
    console.log(dias);

    return {
        "dias x horas do ano": city.data.Data.map((item, index) => {
            return item + " " + city.data["Hora UTC"][index];
        }),
        "radiação medida (W/m^2)": city.data["RADIACAO GLOBAL (Kj/m²)"]
    };
}