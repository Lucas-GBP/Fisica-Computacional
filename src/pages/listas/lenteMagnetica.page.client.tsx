import { Data } from "plotly.js";
import {useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { crossProduct, modulo, n, normalizeV, scalarVecMult, vector, vectorAdd } from "../../scripts/linearAlgebra";
import { J_keV, c, eletron } from "../../scripts/physicsConstants";
import { randomNumber } from "../../scripts/numerosAleatorios";
import { average, stdDeviation } from "../../scripts/statistics";

type Eletron = {
    E:number,
    p:vector,
    v:vector
};
type Foton = {
    p:vector,
    v:vector
}
type particle = {
    type: "foton"|"eletron",
    isDetected:boolean
    p:vector[],
    v:vector[],
    E:number[]
}
//Todas as distâncias estão em [m]
const range = 0.2; //Região
const R = 0.05;     //raio das regiões do campo
const dS = -3*R;    //distância entre fonte e centro do sistema
const dD = 3*R;     //distância entre detector e centro
const r = 0.05;     //raio do detector
const Bo = 0.05;    //Intensidade maxima do campo [T]
const sigma:vector = [0, 0.025, 0.025]; //Largura caracteristica do campo
const Rmax = 4*R;
const razaoFE = 1/4;//A cada três eletrons é emitido um foton
const E = 660;
const t0 = 1;
const tf = 100000;
const B = (p:vector) => BCorte(
    p, 
    [0, Rmax/2, 0],
    Bo,
    sigma
)

export function Page(){
    const [graphic, setGraphic] = useState<Data[]>([]);
    const [test, setTets] = useState<Data[]>([]);

    useEffect(() => {

    }, []);

    const emmitEletron = () => {
        const result = emitirParticulas(250, E);

        setTets(result.particles.map((a, i) => {
            if(a.type === "eletron"){
                return{
                    x:a.p.map(i => i[n.z]),
                    y:a.p.map(i => i[n.y]),
                    name:`eletron ${i+1} :)`,
                    type:"scatter",
                    line:{
                        color:a.isDetected?"blue":"gray",
                    }
                }
            }
            return {
                x:a.p.map(i => i[n.z]),
                y:a.p.map(i => i[n.y]),
                name:`foton ${i+1} :)`,
                line:{
                    color:a.isDetected?"red":"yellow",
                }
            };
        }))
    }

    const calcularEstatisticas = async () => {
        const Energias = [20, 50, 100, 200, 500, 1000, 1500, 2000];

        const data = Energias.map(e => {
            console.log(e);
            const size = 10
            const arr:number[] = []
            for(let i = 0; i < size; i++){
                const amostra = emitirParticulas(500, e)
                arr.push((amostra.eletronDetected/500)*100);
            }
            return {
                sucesso: average(arr),
                incerteza: stdDeviation(arr)
            }
        });

        setGraphic([{
            x:Energias,
            y:data.map(i=>i.sucesso),
            type:"scatter",
            mode:"markers",
            error_y:{
                type:"data",
                array:data.map(i=>i.incerteza),
                visible: true
            }
        }])
    }

    return <>
        <h1>Lente Magnética</h1>
        <section>
            <p>
                A figura a seguir mostra a transmissão do sistema para elétrons com energias entre 10 keV e 2000 keV. Na simulação, os elétrons foram emitidos no plano \(yz\). As barras de erro foram computadas considerando que a incerteza no número de partículas detetadas é dada pela raiz quadrada do número de partículas detetadas.
            </p>
            <button onClick={calcularEstatisticas}>Calcular Estatisticas (Isso pode demorar um pouco)</button><br/>
            <Plot
                data={graphic}
                layout={{
                    xaxis:{
                        title:"$E(keV)$",
                        range:[0, 2100],
                        dtick:250
                    },
                    yaxis:{
                        title:"$T(\\%)$",
                        range:[0, 6],
                        dtick:1.0
                    }
                }}
                className="PlotlyGraphics"
            /><br/>
            <Plot
                data={test}
                layout={{
                    title: `$E = ${E}$`,
                    width:750,
                    height:750,
                    xaxis:{
                        range:[-4*R, 4*R]
                    },
                    yaxis:{
                        range:[-4*R, 4*R]
                    }
                }}
                className="PlotlyGraphics"
            /><br/>
            <button onClick={emmitEletron}>Lançar Eletrons</button>
        </section>
    </>;
}

function emitirParticulas(quant:number, eletE:number){
    const vModuloE = v_relativeE(eletE, eletron.m);
    const deltaT = 0.001/vModuloE;

    const particles:particle[] = [];
    let quantFoton = 0;
    let quantEletron = 0;
    let eletronDetected = 0;
    let fotonDetected = 0;

    for(let i = 0; i < quant; i++){
        let isDetected = false;
        particles[i] = {
            type: "eletron",
            p: [],
            E: [],
            v: [],
            isDetected: isDetected
        }

        const calcularPhoton = () => {
            particles[i].type = "foton";
            quantFoton++;
            const f:Foton[] = [{
                p:[0, 0, dS],
                v:genVelocity(c)
            }]

            for(let t = t0; t < tf; t++){
                const lastF = f[t-1];
                //checar se o eletron saiu do grafico
                if(
                    lastF.p[n.z] < -range || 
                    lastF.p[n.z] > range ||
                    lastF.p[n.y] < -range || 
                    lastF.p[n.y] > range
                ){
                    break;
                }

                f[t] = {
                    v: lastF.v,
                    p: position(lastF.p, lastF.v, [0,0,0], deltaT)
                }

                //checar se o foton foi barrado
                if(lastF.p[n.z] <= 0 && f[t].p[n.z] >= 0){
                    const inter = (f[t].p[n.y]-lastF.p[n.y])/(f[t].p[n.z]-lastF.p[n.z])*(-lastF.p[n.z])+lastF.p[n.y];

                    if(inter <= R && inter >= -R){
                        f[t].p[n.y] = inter;
                        f[t].p[n.z] = 0;
                        break;
                    }
                }

                //checar se o foton foi detectado
                if(lastF.p[n.z] <= dD && f[t].p[n.z] >= dD){
                    const inter = (f[t].p[n.y]-lastF.p[n.y])/(f[t].p[n.z]-lastF.p[n.z])*(dD - lastF.p[n.z])+lastF.p[n.y];

                    if(inter <= r && inter >= -r){
                        isDetected = true;
                        fotonDetected++;
                    }
                }
            }
            f.map((value, index) => {
                particles[i].p[index] = value.p;
                particles[i].E[index] = Infinity;
                particles[i].v[index] = value.v;
            })
        }
        const calcularEletron = () => {
            particles[i].type = "eletron";
            quantEletron++;
            const e:Eletron[] = [{
                E: eletE,
                p: [0, 0, dS],
                v: genVelocity(vModuloE)
            }];

            for(let t = t0; t < tf; t++){
                const lastE = e[t-1];

                //checar se o eletron saiu do grafico
                if(
                    lastE.p[n.z] < -range || 
                    lastE.p[n.z] > range ||
                    lastE.p[n.y] < -range || 
                    lastE.p[n.y] > range
                ){
                    break;
                }

                e[t] = updateEletron(lastE, B, deltaT);

                //checar se o eletron foi barrado
                if(lastE.p[n.z] <= 0 && e[t].p[n.z] >= 0){
                    const inter = (e[t].p[n.y]-lastE.p[n.y])/(e[t].p[n.z]-lastE.p[n.z])*(-lastE.p[n.z])+lastE.p[n.y];

                    if(inter <= R && inter >= -R){
                        e[t].p[n.y] = inter;
                        e[t].p[n.z] = 0;
                        break;
                    }
                }

                //checar se o eletron foi detectado
                if(lastE.p[n.z] <= dD && e[t].p[n.z] >= dD){
                    const inter = (e[t].p[n.y]-lastE.p[n.y])/(e[t].p[n.z]-lastE.p[n.z])*(dD - lastE.p[n.z])+lastE.p[n.y];

                    if(inter <= r && inter >= -r){
                        isDetected = true;
                        eletronDetected++;
                        break;
                    }
                }
            }

            e.map((value, index) => {
                particles[i].p[index] = value.p;
                particles[i].E[index] = value.E;
                particles[i].v[index] = value.v;
            })
        }

        if(randomNumber(0, 1) < razaoFE){
            calcularPhoton();
        } else {
            calcularEletron();
        }
        particles[i].isDetected = isDetected;
    }

    return {
        particles,
        quantFoton,
        quantEletron,
        fotonDetected,
        eletronDetected
    }
}

function BCorte(p:vector, po:vector, Bo:number, sigma:vector):vector{ // [T]
    const sB = Math.sign(-p[n.y]);
    const sYo = Math.sign(p[n.y]);
    const sigma_y2 = sigma[n.y]*sigma[n.y];
    const sigma_z2 = sigma[n.z]*sigma[n.z];

    const expo = Math.pow(p[n.y]-sYo*po[n.y] ,2)/(2*sigma_y2) + Math.pow(p[n.z]-po[n.z] ,2)/(2*sigma_z2);

    return [
        sB*Bo*Math.exp(-expo),
        0,
        0
    ]
}

function v_relativeE(E:number, m:number){
    const Eo = m*c*c*(6.242*Math.pow(10, 15)); //[J -> keV]
    const lambda = 1+E/Eo;
    const v = c*Math.sqrt(1-1/(lambda*lambda));

    return v;
}

function E_relative(v:number, m:number){
    return (6.242*Math.pow(10, 15))*m*c*c*(Math.sqrt(1/(1-Math.pow(v/c, 2)))-1)
}
function position(po:vector, v:vector, a:vector, t:number){
    const b = scalarVecMult(v, t);
    const c = scalarVecMult(a, (t*t)/2);

    return vectorAdd(po,vectorAdd(b,c));
}

function updateEletron(e:Eletron, B:(p:vector)=>vector, deltaT:number):Eletron{
    //const gamma = 1/Math.sqrt(1-Math.pow(vModulo/c,2));

    const a = scalarVecMult( 
        crossProduct(e.v, B(e.p)), 
        (eletron.q/(eletron.m))
    );
    const p = position(e.p, e.v, a, deltaT);

    const v = vectorAdd(e.v, scalarVecMult(a, deltaT));
    const vModulo = modulo(v);

    const E = E_relative(vModulo, eletron.m);
    if(vModulo >= c){
        console.error(`Einstein Puto: ${100*(vModulo/c)}%, E: ${E} keV`);
    }

    return {
        E,
        p,
        v
    }
}

function genVelocity(vModulo:number):vector{
    const theta = randomNumber(0, 2*Math.PI);

    return [
        0,
        vModulo*Math.sin(theta),
        vModulo*Math.cos(theta)
    ]
}