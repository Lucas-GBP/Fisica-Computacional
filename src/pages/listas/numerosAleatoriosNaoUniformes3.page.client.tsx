import { useRef } from "react";
import Plot from "react-plotly.js";
import { arrayRange } from "../../scripts/arrayManipulation";

export function Page(){
    const degreeArr = useRef(arrayRange(0, 90, 1));

    return <>
        <h1>Números Aleatórios Não Uniformes III</h1>
        <section>
            <p>
                Nem sempre é possível encontrar uma expressão analítica para uma distribuição de probabilidades. Mesmo quando a integral é bem definida, às vezes não é possível invertê-la. Nestes casos, temos que utilizar métodos numéricos aproximados, seja para integrar a distribuição ou para inverter a integral.
            </p><p>
                Por exemplo, a probabilidade de detecção de certos raios cósmicos depende do quadrado do cosseno do ângulo que o detetor (um "telescópio" para raios cósmicos) faz com a normal à superfície da Terra. Isso porque a camada de atmosfera que os raios cósmicos incidindo perpendicularmente à superfície têm que atravessar é muito menor do que a camada de atmosfera que têm que atravessar quando vêm do horizonte, o que faz com que sejam fortemente absorvidos.
            </p><p>
                Neste caso, a distribuição de probabilidades é perfeitamente integrável e normalizável, mas não é possível inverter a integral. Se \(p(\theta)d\theta = A\cos^2 (\theta)d\theta\) para \(0 \le \theta \le \pi/2\), então a normalização e a sua função distribuição acumulada (outro nome para a integral) são dadas por: {`\\begin{split}
                    \\int^{\\pi/2}_0 A\\cos^2 (\\theta) d\\theta &= 1\\\\
                    A &= \\frac{4}{\\pi} \\\\
                    fda(\\theta) = y &= \\frac{4}{\\pi}\\left( \\frac{1}{4}\\sin{(2\\theta)}+\\frac{\\theta}{2} \\right)
                \\end{split}`}
            </p><p>
                Os gráficos a seguir mostram a distribuição de probabilidade \(p(\theta)\) e a sua função distribuição acumulada \(y = fda(\theta)\).
            </p>
            <Plot 
                data={[{x:degreeArr.current}]} 
                layout={{
                    xaxis:{title:"θ (graus)"},
                    yaxis:{title:"p(θ)"}
                }}
            />
            <Plot 
                data={[{x:degreeArr.current}]} 
                layout={{
                    xaxis:{title:"θ (graus)"},
                    yaxis:{title:"fda(θ)"}
                }}
            />
            <p>
                A função distribuição acumulada, apesar de ser muito "bem comportada", não é inversível, e não é possível tirar dela um valor para \(\theta\) dado um valor de \(y = fda(\theta)\) entre 0 e 1 obtido de um gerador de números aleatórios que obedece uma distribuição uniforme.
            </p><p>
                Como vamos resolver isso? Existem várias maneiras. A que propomos é meio preguiçosa (pouco eficiente e, dependendo das características da distribuição de probabilidades, algo imprecisa), mas funciona para muitos efeitos práticos e é (supostamente) fácil de entender.
            </p>
        </section><section>
            <p>
                Construa uma tabela com a \(fda(\theta)\) função de \(\theta\) para \(0\le\theta\le\pi/2\), com a precisão desejada.
            </p>
        </section><section>
            <p>
                Sorteie um número aleatório \(x\) a partir de uma distribuição uniforme, por exemplo \(x = 0,45\).
            </p>
        </section><section>
            <p>
                Busque na tabela quais os valores de \(fda(\theta_a)\) e \(fda(\theta_b)\) entre os quais \(x\) está situado. No caso, \(x = 0,45\) corresponde a algum ângulo entre 15° e 30° \((\pi/12)\) e \((\pi/6)\).
            </p>
        </section><section>
            <p>
                Obtenha o valor de \(\theta\) fazendo uma interpolação linear (ou de ordem superior) a partir do valor de \(x\) e dos valores da \(fda(\theta)\) entre os quais \(x\) está situado: {`\\begin{split}
                    \\theta &= \\theta_a + \\frac{\\theta_b-\\theta_a}{fda(\\theta_b)-fda(\\theta_a)}\\times (x - fda(\\theta_a))
                \\end{split}`}
            </p>
        </section><section>
            A figura a seguir mostra histogramas de números aleatórios que obedecem a esta distribuição de probabilidades, calculados a partir da tabela acima (\(\delta\theta = 15^\circ \)) e de uma tabela com a \(fda(\theta)\) de grau em grau (\(\delta\theta = 1^\circ\)).
        </section>
    </>;
}