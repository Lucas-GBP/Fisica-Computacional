import Plot from "react-plotly.js";
import { Data } from "plotly.js";
import { useEffect, useState } from "react";

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
            <Plot data={penduloSimples} layout={{}}/>
        </section><section>
            <p>
                Modifique o seu programa para que ele integre numericamente a equação diferencial para o pêndulo real (<strong>sem</strong> a aproximação \(\sin\theta\simeq\theta\)) e compare com a melhor aproximação feita no problema anterior. Você consegue estimar o período desse pêndulo?
            </p>
            <Plot data={penduloPreciso} layout={{}}/>
        </section>
    </>;
}

function calculateCircuitoRL():Data[]{
    return [];
}
function calculatePenduloSimples():Data[]{
    return [];
}
function calculatePenduloPreciso():Data[]{
    return [];
}