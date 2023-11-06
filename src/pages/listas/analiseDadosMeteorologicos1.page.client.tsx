import dadosFlorianopolis from "../../assets/data/dadosMeteorologicos_florianopolis.json";
import dadosBrasilia from "../../assets/data/dadosMeteorologicos_brasilia.json";
import dadosMacapa from "../../assets/data/dadosMeteorologicos_macapa.json";
import type {PageType} from "../../types/index";
import Plot from 'react-plotly.js';
import { useEffect, useState } from "react";


type JsonData = typeof dadosFlorianopolis;
type newDataType = {
    "dias x horas do ano": string[];
    "radia\u00E7\u00E3o  medida (W/m^2)": (number | null)[];
    "temperatura do ar (\u00BAC)": (number | null)[];
    "precipita\u00E7\u00E3o total, hor\u00E1ria (mm)": (number | null)[];
    "press\u00E3o atmosferica, hor\u00E1ria (mbar)": (number | null)[];
    "dire\u00E7\u00E3o do vento (graus)": (number | null)[];
    "velocidade do vento (m/s)": (number | null)[];
};
const dados = {
    florianopolis: dadosFlorianopolis,
    brasilia: dadosBrasilia,
    macapa: dadosMacapa
};

export const Page:PageType = () => {
    const newData = {
        florianopolis: calculateDada(dados.florianopolis),
        brasilia: calculateDada(dados.brasilia),
        macapa: calculateDada(dados.macapa)
    }
    const [isLoading, setLoading] = useState(true);
    const [city, setCity] = useState(newData.florianopolis);

    function setNewCity(newCity:newDataType){
        setLoading(true);
        setCity(newCity);
    }

    useEffect(() => {
        setLoading(false);
    },[city]);

    return <>
        <h1>Análise de dados meteorológicos I</h1>

        <section>
            <div>
                <p>
                    Este documento tenta ilustrar uma breve e tosca análise de dados de uma minúscula porção dos dados disponíveis no site do Instituto Nacional de Meteorologia (https://portal.inmet.gov.br/). 
                </p><p>
                    São dados sobre pressão, temperatura, umidade, radiação solar, ventos etc. adquiridos em um regime horário por uma estação meteorológica automatizada em Florianópolis ao longo de 2022. São 8760 linhas de dados, cada uma com 16 campos, para uma das 567 estações meteorológicas automáticas que registraram dados naquele ano (no site estão disponíveis dados históricos adquiridos entre 2000 e 2023).
                </p><p>
                    Como entender estes dados? Como analisar estes dados? Como consolidar os dados e os resultados das análises?
                </p><p>
                    Estes provavelmente serão alguns dos muitos desafios de sua futura vida profissional.
                </p><p>
                    Ah, e se você não tem nenhum interesse por meteorologia, mas gosta de física de partículas, física médica ou cristalografia, os desafios não são diferentes. Dê uma olhadinha no que tem no site de dados do CERN (https://opendata.cern.ch/), da biblioteca DICOM (https://www.dicomlibrary.com/) ou no Crystalography Open Database (http://www.crystallography.net/cod/). O que quer que você faça na vida, não vai escapar do big data.
                </p><p>
                    Então, para quem quiser prosseguir, mãos à obra! (Já pensou em mudar de carreira?)
                </p><p>
                    Os dados utilizados para a produção dos gráficos a seguir foram obtidos do INMET seguindo a cadeia https://portal.inmet.gov.br/ &gt; "Dados meteorológicos" &gt; "Banco de dados meteorológicos" &gt; "clique aqui" (https://portal.inmet.gov.br/dadoshistoricos) &gt; "Ano 2022 (automática)" &gt; 2022.zip &gt; INMET_S_SC_A806_FLORIANOPOLIS_01-01-2022_A_31-12-2022.CSV. 
                </p><p>
                    Faz parte da brincadeira buscar, destrinchar e reformatar esses dados "brutos" para que tornem-se úteis aos seus objetivos. 
                </p><p>
                    Ao ser carregado, este documento utiliza um arquivo ".js" que contém os dados sobre Florianópolis em 2022 convenientemente formatados, para contornar a necessidade de escolher e carregar um arquivo. 
                </p><p>
                    Caso você queira experimentar carregar outros arquivos sem explorar o site do INMET, existem mais dois arquivos neste site, além do sobre Florianópolis. Baixe os arquivos para alguma pasta em seu computador, depois clique no botão "Escolher arquivo" e informe onde está o arquivo no seu computador:
                </p><p>
                    O documento mostra como "destrinchar" os dados para obter as distribuições da radiação incidente e da temperatura do ar ao longo do ano, e a correlação entre elas. Veja o código fonte para detalhes.
                </p><p>
                    A sua missão será fazer o mesmo para a precipitação total, a pressão atmosférica ao nível da estação, e a correlação entre elas, e para a direção do vento, a velocidade do vento, e a correlação entre elas. Os resultados esperados para Florianópolis em 2022 estão mostrados nas figuras a seguir.
                </p>
            </div>

            <button onClick={() => {setNewCity(newData.florianopolis)}}>Florianopolis</button>
            <button onClick={() => {setNewCity(newData.brasilia)}}>Brasilia</button>
            <button onClick={() => {setNewCity(newData.macapa)}}>Macapa</button>
            <br/>
            <output>
                {isLoading?<span>Loading...</span>: <Grafics city={city}/>}
            </output>
        </section>
    </>
}

function Grafics(props:{ city: newDataType }) {
    const {city} = props;

    return <>
        <Plot
            data={[
                {
                    x: city["dias x horas do ano"],
                    y: city["radiação  medida (W/m^2)"],
                    type: 'bar',
                    mode: 'lines+markers',
                    marker: {color: 'blue'},
                }
            ]}
            layout={ {title: 'Incidência de radiação na superfície'} }
        />
        <Plot
            data={[
                {
                    x: city["dias x horas do ano"],
                    y: city["temperatura do ar (ºC)"],
                    type: 'bar',
                    mode: 'lines+markers',
                    marker: {color: 'blue'},
                }
            ]}
            layout={ {title: 'Temperatura do ar (bulbo seco)'} }
        />
        <Plot
            data={[
                {
                    x: city["radiação  medida (W/m^2)"],
                    y: city["temperatura do ar (ºC)"],
                    type: 'bar',
                    mode: 'lines+markers',
                    marker: {color: 'blue'},
                }
            ]}
            layout={ {title: 'Temperatura do ar x Radiação'} }
        />
        <Plot
            data={[
                {
                    x: city["dias x horas do ano"],
                    y: city["precipitação total, horária (mm)"],
                    type: 'bar',
                    mode: 'lines+markers',
                    marker: {color: 'blue'},
                }
            ]}
            layout={ {title: 'Precipitação total'} }
        />
        <Plot
            data={[
                {
                    x: city["dias x horas do ano"],
                    y: city["pressão atmosferica, horária (mbar)"],
                    type: 'bar',
                    mode: 'lines+markers',
                    marker: {color: 'blue'},
                }
            ]}
            layout={ {title: 'Pressão atmosférica'} }
        />
        <Plot
            data={[
                {
                    x: city["precipitação total, horária (mm)"],
                    y: city["pressão atmosferica, horária (mbar)"],
                    type: 'bar',
                    mode: 'markers',
                    marker: {color: 'blue'},
                }
            ]}
            layout={ {title: 'Pressão atmosférica x precipitação total'} }
        />
        <Plot
            data={[
                {
                    x: city["dias x horas do ano"],
                    y: city["direção do vento (graus)"],
                    type: 'bar',
                    mode: 'lines+markers',
                    marker: {color: 'blue'},
                }
            ]}
            layout={ {title: 'Direção do vento'} }
        />
        <Plot
            data={[
                {
                    x: city["dias x horas do ano"],
                    y: city["velocidade do vento (m/s)"],
                    type: 'bar',
                    mode: 'lines+markers',
                    marker: {color: 'blue'},
                }
            ]}
            layout={ {title: 'Velocidade do vento'} }
        />
        <Plot
            data={[
                {
                    x: city["direção do vento (graus)"],
                    y: city["velocidade do vento (m/s)"],
                    type: 'bar',
                    mode: 'lines+markers',
                    marker: {color: 'blue'},
                }
            ]}
            layout={ {title: 'Velocidade x direção do vento'} }
        />
    </>
}

function calculateDada(city:JsonData){
    return {
        "dias x horas do ano": city.data.Data.map((item, index) => {
            return item + " " + city.data["Hora UTC"][index];
        }),
        "radiação  medida (W/m^2)": city.data["RADIACAO GLOBAL (Kj/m²)"],
        "temperatura do ar (ºC)": city.data["TEMPERATURA DO PONTO DE ORVALHO (°C)"],
        "precipitação total, horária (mm)": city.data["PRECIPITAÇÃO TOTAL, HORÁRIO (mm)"],
        "pressão atmosferica, horária (mbar)": city.data["PRESSAO ATMOSFERICA AO NIVEL DA ESTACAO, HORARIA (mB)"],
        "direção do vento (graus)": city.data["VENTO, DIREÇÃO HORARIA (gr) (° (gr))"],
        "velocidade do vento (m/s)": city.data["VENTO, VELOCIDADE HORARIA (m/s)"]
    }
}