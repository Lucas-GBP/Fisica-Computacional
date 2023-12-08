import Plot from "react-plotly.js";
import { Data } from "plotly.js";
import { useEffect, useState } from "react";
import { arrayRange } from "../../scripts/arrayManipulation";
import { genFuncTable } from "../../scripts/statistics";

export function Page(){
    const [circuitoRL, setCircuitoRL] = useState<Data[]>([]);
    const [penduloSimples, setPenduloSimples] = useState<Data[]>([]);
    const [penduloPreciso, setPenduloPreciso] = useState<Data[]>([]);

    useEffect(() => {
        const data = {
            circuitoRL: calculateCircuitoRL(),
            penduloSimples: calculatePenduloSimples(),
            pensuloPreciso: calculatePenduloPreciso(),
        };
        console.log(data);

        setCircuitoRL(data.circuitoRL);
        setPenduloSimples(data.penduloSimples);
        setPenduloPreciso(data.pensuloPreciso);
    }, []);

    return <>
        <h1>Integração de EDOs Método de Euler</h1>
        <section>
            <p>
                Considere a equação diferencial: \[{`\\frac{dx}{dt} = f(t,x)`}\]
            </p><p>
                Em sua versão "finita" pode ser escrita como: \[{`\\begin{split}
                    \\frac{\\Delta x}{\\Delta t} &= f(t,x)\\\\
                    \\Delta x &= \\Delta t \\cdot f(t,x)
                \\end{split}`}\]
            </p><p>
                De modo que podemos calcular o valor seguinte \({`x_{i+1}`}\) a partir do valor anterior \(x_i\), de sua derivada \(f(t_i, x_i)\), e do intervalo \(\Delta t\): \[{`x_{i+1} = x_i + \\Delta t\\cdot f(t_i, x_i)`}\]
            </p><p>
                Este é o chamado <i>método de Euler</i> para a integração de equações diferenciais ordinárias.
            </p>
        </section><section>
            <p>
                O diagrama a seguir representa um circuito conhecido como "\(RL\)". À esquerda uma bateria fornece uma tensão \(V\). Quando a chave no ramo superior é fechada, no instante \(t=0\), uma corrente passa a percorrer o circito, passando por um resistor \(R\) seguido de um indutor \(L\) e fechando o ciclo na bateria \(V\).
            </p><p>
                Através do resistor \(R\) e do indutor \(L\) há voltagens (diferenças de potencial) \(V_R\) e \(V_L\), respectivamente, que variam com o tempo e são dadas por: \[{`\\begin{split} V_R &= iR \\\\ V_L &= L\\frac{di}{dt} \\end{split}`}\]
            </p><p>
                A lei de Kirchhoff para as voltagens diz que a soma de todas as voltagens em um circuito fechado deve ser igual a zero (levando-se em conta o que "sobe" e o que "desce"), o que leva a: \[{`iR + L\\frac{di}{dt} = V`}\]
            </p><p>
                (A "queda" de voltagem através do resistor e do indutor é compensada pelo "levantamento" de voltagem proporcionado pela bateria)
            </p><p>
                Essa equação pode ser resolvida analiticamente para o caso de \(V(t) = V_0\) constante. Para \(i=0\) quando \(t=0\) a solução é dada por:\[{`i = \\frac{V_0}{R}\\left( 1-e^{-t\\frac{R}{L}} \\right)`}\]
            </p><p>
                Entretanto, para \(V(t)\) variável em geral a equação não é solúvel analiticamente e soluções numéricas devem ser encontradas. Tomemos por exemplo o caso em que uma fonte de tensão que varia cossenoidalmente é empregada:\[{`iR + L\\frac{di}{dt} = V_0\\cos(\\omega t)`}\]
            </p><p>
                A figura a seguir mostra os gráficos de três diferentes potenciais aplicados ao circuito (cossenoidal, senoidal e quadrado) e a correspondente corrente no circuito em cada um dos casos.
            </p><p>
                A sua missão é implementar o método de Euler para reproduzir a figura. Para tanto, você vai ter que analisar a figura e explorar diferentes valores para os parâmetros (frequências, \(R\), \(L\)).
            </p>
            <Plot
                data={circuitoRL}
                layout={{}}
            />
            <p>
                Equações diferenciais ordinárias de qualquer ordem \(N\) podem ser representadas com um sistema de equações de primeira ordem. Se:\[{`
                    x^{(N)}(t) = f\\left (t, x(t), x^{'}(t), ..., x^{(N-1)}(t) \\right )
                `}\]
            </p><p>
                podemos implementar a seguinte fórmula até que seja atingida a aproximação da solução da ODE no instante desejado:\[{`
                    \\vec{x}_{i+1} = \\begin{bmatrix}
                        x_{i+1} \\\\ ... \\\\ x_{i+1}^{(N-1)} \\\\ x_{i+1}^{(N)}
                    \\end{bmatrix} = \\begin{bmatrix}
                        x_i+\\Delta t\\cdot x^{'} \\\\
                        ... \\\\
                        x_i^{(N-1)}+\\Delta t\\cdot x_i^{(N)} \\\\
                        x_i^{(N)}+\\Delta t\\cdot f(t_i, x_i, x_i^{'}, ..., x_i^{(N)})
                    \\end{bmatrix}
                `}\]
            </p>  
        </section><section>
            <p>
                Considere o caso de um pêndulo simples (\(\sin\theta\simeq\theta\)) de comprimento sob \(l\)uma aceleração da gravidade \(g\). Neste caso \(x(t) = \theta(t)\). A equação de 2a. ordem pode ser escrita como duas equações de 1a. ordem com a introdução de uma nova variável, a velocidade angular \(\omega(t)\):\[{`\\begin{split}
                    \\frac{d^2\\theta(t)}{d^2t} &= -\\frac{g}{l}\\theta(t)\\\\
                    \\frac{d\\theta(t)}{dt} &= \\omega(t)\\\\
                    \\frac{d\\omega(t)}{dt} &= -\\frac{g}{l}\\theta(t)
                \\end{split}`}\]
            </p><p>
                Dados os valores do ângulo \(\theta_n\) e da velocidade \(\omega_n\) em um instante \(t\), os valores \({`\\omega_{n+1}`}\) e \({`\\theta_{n+1}`}\) no instante seguinte \({`t+\\Delta t`}\) são dados por:\[{`\\begin{split}
                    \\theta_{i+1} &= \\theta_i+\\Delta t\\cdot \\omega_i\\\\
                    \\omega_{i+1} &= \\omega_i+\\Delta t\\cdot \\left(-\\frac{g}{l} \\right)\\theta_i
                \\end{split}`}\]
            </p><p>
                O gráfico a seguir mostra o resultado dessa integração para um pêndulo de comprimento \(l = 1,0 m\) sob uma aceleração da gravidade \(g= 10,0 m/s^2\) , utilizando diferentes valores para \(\Delta t\).
            </p><p>
                Implemente o algoritmo, reproduza o gráfico e determine o número \(N\) de períodos necessários para que a discrepância entre a amplitude inicial e a amplitude no início do período seja da ordem de 0,1% nos três casos.
            </p>
            <Plot 
                data={penduloSimples} 
                layout={{yaxis:{
                        range: [-0.5, 0.5],
                        dtick: 0.25
                }}}
            />
        </section><section>
            <p>
                Modifique o seu programa para que ele integre numericamente a equação diferencial para o pêndulo real (<strong>sem</strong> a aproximação \(\sin\theta\simeq\theta\)) e compare com a melhor aproximação feita no problema anterior. Você consegue estimar o período desse pêndulo?
            </p>
            <Plot 
                data={penduloPreciso} 
                layout={{yaxis:{
                    range: [-0.5, 0.5],
                    dtick: 0.25
            }}}
            />
        </section>
    </>;
}

function calculateCircuitoRL():Data[]{
    const timeStep = 0.01;
    const time_o = 0;
    const time_f = 5
    const time = arrayRange(time_o, time_f, timeStep);
    const vCos = genFuncTable(time_o, time_f, time_f/timeStep, (t)=>Math.cos(t*2*Math.PI))[1];
    const vSin = genFuncTable(time_o, time_f, time_f/timeStep, (t)=>Math.sin(t*2*Math.PI))[1];
    const i_o = 0;
    const L = 1;
    const R = 1/4;
    
    const sqrtFunc = (t:number) => {
        const rest = t - Math.floor(t);
        if(rest > 0.5){
            return -1;
        }
            return 1;
    }
    const vSqrt = genFuncTable(time_o, time_f, time_f/timeStep, sqrtFunc)[1];

    function current(v:number[], t:number[], L:number, R:number, i_o:number){
        const i:number[] = [i_o];
        for(let j = 0; j < t.length-1; j++){
            const deltaT = t[j+1]-t[j];
            const a = L/deltaT;
            i[j+1] = (v[j] + a*i[j])/(R + a);
        }

        return i;
    }

    const ICos = current(vCos, time, L, R, i_o);
    const ISin = current(vSin, time, L, R, i_o);
    const ISqrt = current(vSqrt, time, L, R, i_o);

    return [
        {
            x:time,
            y:vCos,
            name: "V_Cos",
            line: {
                dash: "dot",
                color:"blue"
            }
        },{
            x:time,
            y:vSin,
            name: "V_Sin",
            line: {
                dash: "dot",
                color:"orange"
            }
        },{
            x:time,
            y:vSqrt,
            name: "V_Sqrt",
            line: {
                dash: "dot",
                color:"green"
            }
        },{
            x:time,
            y:ICos,
            name: "I_Cos",
            line:{
                color:"blue"
            }
        },{
            x:time,
            y:ISin,
            name: "I_Cos",
            line:{
                color:"orange"
            }
        },{
            x:time,
            y:ISqrt,
            name: "I_Cos",
            line:{
                color:"green"
            }
        }
    ];
}
function calculatePenduloSimples():Data[]{
    const l = 1.0;
    const g = 10.0;
    const theta_o = 1/3;
    const omega_o = 0
    const time_o = 0;
    const time_f = 40;
    const steps = [0.01, 0.001, 0.0001];
    const time:number[][] = [];
    const theta:number[][] = [];
    const omega:number[][] = [];

    for(let step = 0; steps.length > step; step++){
        time[step] = arrayRange(time_o, time_f, steps[step]);
        theta[step] = [theta_o];
        omega[step] = [omega_o];

        for(let i = 0; i < time[step].length-1; i++){
            theta[step][i+1] = theta[step][i]+steps[step]*omega[step][i];
            omega[step][i+1] = omega[step][i]-steps[step]*(g/l)*theta[step][i];
        }
    }

    return [
        {
            x:time[0],
            y:theta[0],
            name: `${steps[0]}`
        },{
            x:time[1],
            y:theta[1],
            name: `${steps[1]}`
        },{
            x:time[2],
            y:theta[2],
            name: `${steps[2]}`
        }
    ];
}
function calculatePenduloPreciso():Data[]{
    const l = 1.0;
    const g = 10.0;
    const theta_o = 1/3;
    const omega_o = 0
    const time_o = 0;
    const time_f = 40;
    const step = 0.001;
    const time:number[][] = [];
    const theta:number[][] = [];
    const omega:number[][] = [];

    for(let i = 0; 2 > i; i++){
        time[i] = arrayRange(time_o, time_f, step);
        theta[i] = [theta_o];
        omega[i] = [omega_o];
    }

    for(let i = 0; i < time[0].length-1; i++){
        theta[0][i+1] = theta[0][i]+step*omega[0][i];
        omega[0][i+1] = omega[0][i]-step*(g/l)*theta[0][i];
    }
    for(let i = 0; i < time[1].length-1; i++){
        theta[1][i+1] = theta[1][i]+step*omega[1][i];
        omega[1][i+1] = omega[1][i]-step*(g/l)*Math.sin(theta[1][i]);
    }

    return [
        {
            x:time[0],
            y:theta[0],
            name: "aprox"
        },{
            x:time[1],
            y:theta[1],
            name: "sin(theta)"
        }
    ];
}