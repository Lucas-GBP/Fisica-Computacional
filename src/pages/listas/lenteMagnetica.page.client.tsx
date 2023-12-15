import { Data } from "plotly.js";
import {useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { crossProduct, modulo, n, scalarVecMult, vector, vectorAdd } from "../../scripts/linearAlgebra";
import { c, eletron } from "../../scripts/physicsConstants";
import { randomNumber } from "../../scripts/numerosAleatorios";

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
const razaoFE = 1/4;//A cada três eletrons é emitido um foton
const E = 660;
const t0 = 1;
const tf = 500;
const B = (p:vector) => BCorte(
    p, 
    [0, R, 0],
    Bo,
    sigma
)

export function Page(){
    const [graphic, setGraphic] = useState<Data[]>([]);
    const [test, setTets] = useState<Data[]>([]);

    useEffect(() => {

    }, []);

    const emmitEletron = () => {
        const Energias = [10, 50, 100, 200, 500, 100, 1500, 2000];
        const result = emitirParticulas(500, E);

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

        const data = Energias.map(e => {
            const size = 1000
            let sucesso = 0
            for(let i = 0; i < size; i++){
                const amostra = emitirParticulas(1000, e)
                sucesso+= amostra.eletronDetected/amostra.quantEletron;
                console.log(i);
            }
            sucesso /= size;
            sucesso *= 100;
            return {
                sucesso
            }
        });
        console.log(data);
    }

    return <>
        <h1>Lente Magnética</h1>
        <section>
            <p>
                A figura a seguir mostra a transmissão do sistema para elétrons com energias entre 10 keV e 2000 keV. Na simulação, os elétrons foram emitidos no plano \(yz\). As barras de erro foram computadas considerando que a incerteza no número de partículas detetadas é dada pela raiz quadrada do número de partículas detetadas.
            </p>
            <Plot
                data={graphic}
                layout={{
                    xaxis:{
                        title:"$E(keV)$",
                        range:[0, 2000],
                        dtick:250
                    },
                    yaxis:{
                        title:"$T(\\%)$",
                        range:[0, 6],
                        dtick:1.0
                    }
                }}
                className="PlotlyGraphics"
            />
            <Plot
                data={test}
                layout={{
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
            <button onClick={emmitEletron}>Lançar um Eletron</button>
        </section>
    </>;
}

function emitirParticulas(quant:number, eletE:number){
    const vModuloE = v_relative(eletE, eletron.m);
    const deltaT = 3.7*Math.pow(10, -12);

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

function BCorte(p:vector, po:vector, Bo:number, sigma:vector):vector{
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

function v_relative(E:number, m:number){
    return c*Math.sqrt(1 - 1/Math.pow((1+E/(m*c*c)) ,2));
}
function E_relative(v:number, m:number){
    return m*c*c*(Math.sqrt(1/(1-Math.pow(v/c, 2)))-1)
}
function position(po:vector, v:vector, a:vector, t:number){
    const b = scalarVecMult(v, t);
    const c = scalarVecMult(a, (t*t)/2);

    return vectorAdd(po,vectorAdd(b,c));
}

function updateEletron(e:Eletron, B:(p:vector)=>vector, deltaT:number):Eletron{
    const a = scalarVecMult( crossProduct(e.v, B(e.p)),eletron.q/eletron.m);
    const p = position(e.p, e.v, a, deltaT);
    const v = vectorAdd(e.v, scalarVecMult(a, deltaT));
    
    const vModulo = modulo(v);
    const E = E_relative(vModulo, eletron.m);

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