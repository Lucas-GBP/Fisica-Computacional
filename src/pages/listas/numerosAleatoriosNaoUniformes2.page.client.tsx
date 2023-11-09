import Plot from "react-plotly.js";
import { useState, useEffect, useRef } from "react";
import { randGaussArray, gaussType, returnStatics, normalArray } from "../../scripts/numerosAleatorios";
import { average, stdDeviation } from "../../scripts/statistics";
import { arrayRange } from "../../scripts/arrayManipulation";

type ValuesObject = {
    media:number[],
    variacao:number[],
    algoritimos: {
        box: number[],
        limit: number[],
        boxTime: number,
        limitTime: number
    }
    energia: number[],
};

export function Page(){
    const [values, setValues] = useState<ValuesObject>({
        media: [],
        variacao: [],
        algoritimos: {
            box: [],
            limit: [],
            boxTime: 0,
            limitTime: 0
        },
        energia: []
    });
    const x = useRef(arrayRange(-.05, .05, .0025));

    useEffect(() => {
        setValues(generateValues());
    }, [])

    return <>
        <h1>Números aleatórios não uniformes II</h1>
        <section>
            <p>
                A geração de números aleatórios que obedeçam uma distribuição de probabilidades gaussiana (também chamada de <i>normal</i>) é frequentemente utilizada em simulaçoes de sistemas físicos.
            </p><p>
                A função gaussiana é dada por: {`\\[ g(x) = Ae^{-\\frac{(x-x_0)^2}{2\\sigma^2}} \\]`}
            </p><p>
                Onde A é sua amplitude máxima, \(x_0\) o valos médio e \(\sigma\) o desvio padrão.
            </p><p>
                A sua integral definida para todos os valores de \(x\) é dada por: {`\\[\\int^\\infty_{-\\infty} g(x)dx = A\\sigma\\sqrt{2\\pi}\\]`}
            </p><p>
                Quando representa uma distribuição de probabilidades, essa integral deve ser 1, o que faz com que: {`\\[A = \\frac{1}{\\sigma\\sqrt{2\\pi}}\\]`}
            </p><p>
                Existem muitos métodos para gerar números aleatórios que obedecem a uma distribuição gaussiana de probabilidades, com diferentes eficiências e precisão. Uma apanhado de mais de uma dezena deles pode ser encontrado no artigo Gaussian Random Number Generators (Thomas et al., ACM Computing Surveys, Vol. 39, No. 4, Article 11, 2007).
            </p><p>
                Neste documento vamos nos ater a dois desses métodos: (a) o algoritmo de BoxMüller que, dado um computador perfeito com precisão infinita, geraria números aleatórios gaussianos perfeitos e (b) o algoritmo baseado no teorema central do limite, que mesmo em um computador perfeito e infinitamente preciso, somente geraria números aleatórios perfeitamente gaussianos se um número infinito de números aleatórios uniformes fossem combinados. Em ambos os casos, fica aos curiosos a tarefa de buscar suas demonstrações matemáticas.
            </p><p>
                O algoritmo de Box-Müller pede a geração de dois números aleatórios \(x_1\) e \(x_2\) uniformes (isto é, que obedecem a uma distribuição uniforme) no intervalo \([0,1)\), e a partir deles calcula dois números aleatórios \(z_1\) e \(z_2\) gaussianos (isto é, que obedecem a uma distribuição gaussiana), com média 0 e desvio padrão 1: {`\\[ z_1 = \\sqrt{-2\\ln{x_1}}\\cos{(2\\pi x_2)} \\]`} {`\\[ z_2 = \\sqrt{-2\\ln{x_1}}\\sin{(2\\pi x_2)} \\]`}
            </p><p>
                O algoritmo baseado no teorema central do limite fundamenta-se no fato de que a distribuição da soma de números gerados a partir de uma distribuição uniforme entre \([0,1)\) aproxima-se cada vez mais de uma distribuição gaussiana à medida que o número de termos cresce. Como a distribuição uniforme tem média \(1/2\) e desvio padrão \({`\\sqrt{1/12}`}\), é conveniente usar 12 termos \(x_1\), \(x_2\), ..., \({`x_{12}`}\) para gerar um número (quase) gaussiano \(z\) em uma distribuição com média 0 e desvio padrão 1: \[{`z = \\sum^{12}_{i=1}x_i - 6`}\]
            </p><p>
                Em ambos os casos, é conveniente que a distribuição dos números gaussianos gerados tenha média 0 e desvio padrão 1 pois para obter-se um número gaussiano \(z(x_0, \sigma)\) em uma distribuição com média \(x_0\) e desvio padrão \(\sigma\), basta multiplicar o número gaussiano \(z(0, 1)\) por e somar \(x_0\): \[{`z(x_0, \\sigma) = z(0, 1)\\sigma + x_0`}\]
            </p>
        </section>
        <section>
            <p>
                Faça um programa que gere 5000 números aleatórios a partir de uma distribuição uniforme de números entre 0 e 1 e calcule a sua média e o seu desvio padrão: \[{`\\bar{x} = \\frac{1}{N}\\sum^N_{i=1}x_i`}\] \[{`\\sigma_U = \\sqrt{\\frac{ \\sum^N_{i=1}(x_i-\\bar{x})^2 }{ N-1 }}`}\]
            </p><p>
                Execute o seu programa 1000 vezes e produza os histogramas a seguir, que mostram as distribuições das médias e dos desvios padrão (ao quadrado e multiplicados por 12).
            </p>
            <button onClick={() => setValues(generateValues())}>Gerar Novos Numeros</button><br/>
            <Plot
                data={[
                    {x: x.current, y: returnStatics(-.05, .05, .0025, values.media), type: "bar"}
                ]}
                layout={{}}
            />
            <Plot
                data={[{x: x.current, y: returnStatics(.95, 1.05, .0025, values.variacao), type: "bar"}]}
                layout={{}}
            />
        </section>
        <section>
            <p>
                Implemente funções randBM() e randTCL() que retornem números aleatórios gaussianos utilizando os algoritmos de Box-Müller e o baseado no teorema central do limite, respectivamente. Use suas funções para obter distribuições com 10000 números cada, medindo o tempo que cada uma delas leva para realizar a tarefa. Produza histogramas como os mostrados a seguir (obviamente, os tempos medidos serão diferentes a cada run em cada máquina). Qual dos algoritmos é mais rápido?
            </p>
            <button onClick={() => setValues(generateValues())}>Gerar Novos Numeros</button><br/>
            <Plot
                data={[
                    {x: arrayRange(-4, 4, 0.2), y: returnStatics(-4, 4, 0.2, values.algoritimos.limit), type: "bar", name: `Limit: ${values.algoritimos.limitTime.toFixed(2)}ms`},
                    {x: arrayRange(-4, 4, 0.2), y: returnStatics(-4, 4, 0.2, values.algoritimos.box), type: "bar", name: `Box: ${values.algoritimos.boxTime.toFixed(2)}ms`}
                ]}
                layout={{}}
            />
        </section>
        <section>
            <p>
                A figura a seguir mostra um hipotético espectro da energia da radiação emitida por uma hipotética fonte. O espectro foi simulado utilizando 3 gaussianas com médias, desvios padrão e número de eventos diferentes. Analise a figura e extraia dela os parâmetros (média, desvio padrão e número de eventos) necessários para refazê-la utilizando as funções implementadas nos itens anteriores.
            </p><p>
                Pode ajudar saber que, para uma gaussiana, a largura à meia altura é aproximadamente \(2,4\sigma\), e que o número de eventos corresponde à área embaixo do gráfico. No gráfico a seguir, cada canal do eixo corresponde a 1 keV.
            </p>
            <button onClick={() => setValues(generateValues())}>Gerar Novos Numeros</button><br/>
            <Plot
                data={[{x:arrayRange(0, 1000, 5), y:returnStatics(0, 1000, 5, values.energia), type: "bar"}]}
                layout={{
                    xaxis:{
                        title: "energia (keV)"
                    },
                    yaxis:{
                        title: "dN/dE"
                    }
                }}
            />
        </section>
    </>
}

function generateValues(){
    const values:ValuesObject = {
        media: [],
        variacao: [],
        algoritimos: {
            box: [],
            limit: [],
            boxTime: 0,
            limitTime: 0
        },
        energia: []
    };

    for(let i = 0; i < 1000; i++){
        const gaussArr = randGaussArray(5000, gaussType.BoxMuller);
        values.media[i] = average(gaussArr);
        values.variacao[i] = stdDeviation(gaussArr);
    }

    const a = 10000
    const boxTime_o = performance.now();
    values.algoritimos.box = randGaussArray(a, gaussType.BoxMuller);
    values.algoritimos.boxTime = performance.now() - boxTime_o;

    const limitTime_o = performance.now();
    values.algoritimos.limit = randGaussArray(a, gaussType.CentralLimite);
    values.algoritimos.limitTime = performance.now() - limitTime_o;

    const energy = [
        normalArray(2250, 200, 50/2.4),
        normalArray(1250, 400, 100/2.4),
        normalArray(6000, 700, 200/2.4)
    ]
    values.energia = energy[0].concat(energy[1], energy[2]);

    console.log(values);
    return values;
}