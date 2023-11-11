import Plot from "react-plotly.js";
import { calculateFda, calculateProbabilityDistribution, getNormalizationConst, probabilityTransformation, returnStatics } from "../../scripts/statistics";
import { useEffect, useState } from "react";
import { arrayRange } from "../../scripts/arrayManipulation";

const data = {
    angles: [3, 9, 15, 21, 27, 33, 39, 45, 51, 57, 63, 69, 75, 81, 87, 93, 99, 105, 111, 117, 123, 129, 135, 141, 147, 153, 159, 165, 171, 177],
    events: [1439, 1403, 1324, 1175, 971, 760, 595, 513, 510, 548, 569, 531, 425, 282, 155, 95, 120, 212, 319, 390, 392, 335, 263, 230, 277, 406, 582, 751, 864, 909]
}
const a = getNormalizationConst({x:data.angles, y:data.events});
const dist = calculateProbabilityDistribution({x:data.angles, y:data.events}, a);
const fda = calculateFda(dist);

const angleList = arrayRange(0, 180, 1);

export function Page(){
    const [randNumbers, setRandNumbers] = useState<number[]>([]);
    const [randWithInterpolation, setRandInter] = useState<number[]>([]);

    const randomize = () => {
        setRandNumbers(probabilityTransformation(
            {x:data.angles, y:data.events},
            100000, 
            fda,
            false
        ));
        setRandInter(probabilityTransformation(
            {x:data.angles, y:data.events},
            100000, 
            fda,
            true
        ))
    };
    useEffect(randomize, []);

    return <>
        <h1>Números Aleatórios Não Uniformes IV</h1>
        <section>
            <p>
                Um feixe de partículas incide sobre um alvo e detetores no arranjo experimental medem a quantidade de partículas espalhadas entre 0° e 180° em intervalos regulares de 6°. A tabela e a figura a seguir mostram os dados obtidos.
            </p>
            <Plot 
                data={[{
                    x: data.angles,
                    y: data.events,
                    type: "pointcloud"
                }]} 
                layout={{
                    xaxis:{title:"ângulo"},
                    yaxis:{title:"eventos"}
                }}
            />
            <p>
                Para construir um gerador de números aleatórios capaz de reproduzir estes dados, precisamos primeiro transformá-los em uma distribuição de probabilidades e depois calcular a sua função distribuição acumulada \(fda(\theta)\) para, enfim, poder buscar o ângulo correspondente a uma probabilidade \(x\) sorteada de uma distribuição uniforme.
            </p><p>
                A distribuição de probabilidades é a própria distribuição dos dados experimentais normalizada de tal modo que sua área seja 1. Em primeiríssima aproximação, a área sob o gráfico dos dados é dada por (veremos métodos mais precisos de integração numérica mais adiante):
            </p><p>
                onde \(N_i\) são as contagens em cada intervalo angular (que no caso desses dados é sempre o mesmo, \(\Delta\theta = 6^\circ\), mas não precisava ser).
            </p><p>
                Com a constante de normalização podemos explicitar a distribuição de probabilidades e seu gráfico:
            </p>
            <Plot 
                data={[{
                    x: data.angles,
                    y: dist,
                    type: "pointcloud"
                }]} 
                layout={{
                    xaxis:{title:"ângulo"},
                    yaxis:{title:"p(θ)dθ"}
                }}
            />
            <p>
                E finalmente a tabela e o gráfico para a função distribuição acumulada \(fda(\theta)\):
            </p>
            <Plot 
                data={[{
                    x: data.angles,
                    y: fda,
                    type: "pointcloud"
                }]} 
                layout={{
                    xaxis:{title:"ângulo"},
                    yaxis:{title:"fda(θ)"}
                }}
            />
            <p>
                Faça um programa que, a partir da tabela de dados experimentais, calcule a distribuição de probabilidades, a função distribuição acumulada e implemente um gerador de números aleatórios que gere números que simule os resultados do experimento (o seu gerador deve sortear um número entre 0 e 1 de uma distribuição uniforme e usar este valor para encontrar o ângulo na tabela da função distribuição acumulada).
            </p><p>
                A figura a seguir mostra os histogramas para 100 mil eventos simulados. À esquerda, os eventos foram gerados utilizando a resolução de 6° dos dados experimentais; à direita, foi feita uma interpolação linear nos valores da \(fda(\theta)\) para a obtenção de uma distribuição com resolução de 1°.
            </p>
            <button onClick={randomize}>Gerar novos numeros</button><br/>
            <Plot 
                data={[{
                    x:data.angles,
                    y:returnStatics(
                        data.angles[0],
                        data.angles[data.angles.length-1],
                        data.angles[data.angles.length-1]/data.angles.length,
                        randNumbers
                    ),
                    type:"bar"
                }]} 
                layout={{
                    xaxis:{title:"ângulo"},
                    yaxis:{title:"N"}
                }}
            />
            <Plot 
                data={[{
                    x:angleList,
                    y: returnStatics(
                        0,
                        180,
                        1,
                        randWithInterpolation
                    ),
                    type:"bar"
                }]} 
                layout={{
                    xaxis:{title:"ângulo"},
                    yaxis:{title:"N"}
                }}
            />
        </section>
    </>;
}