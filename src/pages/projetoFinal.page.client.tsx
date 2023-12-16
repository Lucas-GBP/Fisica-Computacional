import { Data } from "plotly.js";
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { modulo, n, scalarVecMult, vector } from "../scripts/linearAlgebra";
import { isColidedCircularPlane } from "../scripts/cinetica";
import { Eletron, random137C, createEletron, moveEletron } from "../scripts/eletromagnetismo";
import { vecBc } from "./listas/transformacaoCoordenadas.page.client";

const a = 0.0254/2;     // menor dimensão do imã
const l = 0.03818/2;    // maior dimensão do imã
const r = 0.005;        // raio do bloqueio central
const Lb = 2*a;         // comprimento do bloqueio central
const rDet = 0.005;     // raio do detector
const pSource:vector = [0, 0, -2*a];    // posição da fonte
const pDet:vector = [0, 0, 2*a];        // posição do detector
const campoImas = 0.005 // Constante do campo dos imãs: M0/c [T]
const deltaDMax = 0.001 // Distância maxima da particula
const screenSize = 3*a;

export function Page(){
    const [graph, setGraph] = useState<Data[]>([]);
    const [trans, setTrans] = useState(0);

    useEffect(() => {
        console.log("Página Renderizada");

        gerarGrafico();
    }, []);

    const gerarGrafico = () => {
        const eletronsQuant = 1000;

        const eletrons = createEletrons(eletronsQuant);
        const eletronsStatus:("passed"|"blocked"|"detected")[] = [];
        const eletronsArr = eletrons.map((e, index) => {
            const timeLine:Eletron[] = [e];
            eletronsStatus[index] = "passed"

            // Se o eletron não estiver indo na direção do bloqueio/detector 
            // Remove-lo logo para poupar processamento 
            if(e.v[n.z] < 0){
                return timeLine;
            }

            let lastEletron = e;

            // Calcular a trajetoria de um eletron com 500 passos
            for(let i = 1; i < 500; i++){
                const newEletron = updateEletron(lastEletron);
                timeLine.push(newEletron);

                // Verificar se o eletron for barrado
                if(isBlocked(newEletron.p, lastEletron.p)){
                    eletronsStatus[index]="blocked";
                    break;
                }
                // Verificar se o eletron foi detectado
                if(isDetected(newEletron.p, lastEletron.p)){
                    eletronsStatus[index]="detected"
                    console.log("Detected");
                    break;
                }
                // Verificar se o eletron saiu da tela
                if(
                    newEletron.p[n.x] > screenSize ||
                    newEletron.p[n.y] > screenSize ||
                    newEletron.p[n.z] > screenSize ||
                    newEletron.p[n.y] < -screenSize ||
                    newEletron.p[n.z] < -screenSize
                ){
                    break;
                }

                lastEletron = newEletron;
            }

            return timeLine;
        });


        //
        // Plotar o gráfico
        //
        const data:{
            x:number[], 
            y:number[], 
            z:number[],
            status:("passed"|"blocked"|"detected")
        }[] = []
        eletronsArr.map((list, index) => {
            data[index] = {
                x:[],
                y:[],
                z:[],
                status:eletronsStatus[index]
            };
            list.map((e) => {
                data[index].x.push(e.p[n.x]);
                data[index].y.push(e.p[n.y]);
                data[index].z.push(e.p[n.z]);
            })
        });

        setGraph(data.map((e) => {
            let color:string = "black";
            let opacty:number = 0.15;

            if(e.status == "detected"){
                opacty = 1.0;
                color = "green";
            }
            if(e.status == "blocked"){
                opacty = 0.3;
                color = "red";
            }

            return {
                opacity: opacty,
                type:"scatter3d",
                mode: "lines",
                line:{
                    color:color,
                    width: 5
                },
                x: e.y,
                y: e.z,
                z: e.x,
            }
        }))

        //
        // Calcular trasmissão do sistema
        let detected = 0;
        eletronsStatus.map((i) =>{
            if(i == "detected"){
                detected++;
            }
        })
        setTrans(detected / eletronsQuant);
    }

    return <>
        <h1>Projeto Final</h1>
        <section>
            <p>
                A sua missão é simular um sistema que consiste em (a) uma fonte de elétrons, (b)
                uma lente magnética e (c) um detetor de elétrons e (d) obter a transmissão do sistema
                em função da energia para uma dada configuração.
            </p>
            <Plot
                className="PlotlyGraphics"
                layout={{
                    title: `T: ${trans*100}%`,
                    width:750,
                    height:750,
                    showlegend: false,
                    scene:{
                        aspectmode: "manual",
                        aspectratio: {
                            x: 1, y: 1, z: 1,
                        },
                        xaxis: {
                            nticks: 10,
                            range: [-screenSize, screenSize],
                        },
                        yaxis: {
                            nticks: 10,
                            range: [-screenSize, screenSize],
                        },
                        zaxis: {
                            nticks: 10,
                            range: [-screenSize, screenSize],
                        }
                    },
                }}
                data={graph}
            /><br/>
            <button onClick={gerarGrafico}>Gerar novo Gráfico</button>
        </section>
    </>;
}

const B = (p:vector):vector => {
    return scalarVecMult(vecBc(p, l, 0, a), campoImas);
};

const isDetected = (po:vector, pf:vector) => {
    return isColidedCircularPlane(po, pf, pDet, rDet, n.z);
}

const isBlocked = (po:vector, pf:vector) => {
    return isColidedCircularPlane(po, pf, [0, 0, -Lb/2], r, n.z) || isColidedCircularPlane(po, pf, [0, 0, Lb/2], r, n.z)
};

function createEletrons(quant:number){
    const eletrons:Eletron[] = [];

    const energies = random137C(quant);
    energies.map((energy) => {
        eletrons.push(createEletron(pSource, energy));
    });

    return eletrons;
}

function updateEletron(elet:Eletron):Eletron{
    const moduloV = modulo(elet.v);
    const deltaT = deltaDMax/moduloV;

    const nextEletron = moveEletron(elet, B, deltaT);

    return nextEletron;
}