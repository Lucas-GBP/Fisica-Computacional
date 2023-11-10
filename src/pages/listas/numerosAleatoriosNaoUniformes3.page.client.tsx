import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { arrayRange } from "../../scripts/arrayManipulation";
import { randomNumber, randomNumberArray, returnStatics } from "../../scripts/numerosAleatorios";
import { genFuncTable, linearInterpolation } from "../../scripts/statistics";
//
// Essa pagina ficou uma porcaria...
//

const fixedAmostras = 150;
const fixedStep = 90/fixedAmostras;
const fixedAngles = arrayRange(0, 90, fixedStep); //900 amostras
const fixedStatistics = returnStatics(0, 90, fixedStep, randomNumberArray(0, 1, 75000).map(
    (value) => {
        const angles = getAngles(value, 6);
        const angle = linearInterpolation(angles[0], angles[1], fda(angles[0]), fda(angles[1]), value);

        return angle*360/(2*Math.PI);
    }
));

export function Page(){
    const [randX, setRandX] = useState(randomNumber(0, 1));
    const [amostras, setAmostras] = useState(10);
    const [interactions, setInteractions] = useState(6);

    const degreeArr = arrayRange(0, 90, 90/amostras);
    const fdaTable = genFuncTable(0, Math.PI/2, amostras, fda);
    const angles = getAngles(randX, amostras);
    const [dada, setDada] = useState<number[]>([]);

    useEffect(() => {
        setDada(returnStatics(0, 90, fixedStep, randomNumberArray(0, 1, 75000).map(
            (value) => {
                const angles = getAngles(value, interactions);
                const angle = linearInterpolation(angles[0], angles[1], fda(angles[0]), fda(angles[1]), value);

                return angle*360/(2*Math.PI);
            }
        )))
    }, [interactions]);

    console.log(getAngles(randX, amostras));

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
            <input type="range" min={1} max={30} value={amostras} onChange={(e) => setAmostras(parseInt(e.target.value))} />
            <span>amostras: {amostras}</span>
            <br/>
            <Plot 
                data={[{
                    x:degreeArr,
                    y:arrayRange(0, Math.PI/2, Math.PI/(2*amostras)).map(i => (4/Math.PI)*Math.pow(Math.cos(i), 2))
                }]} 
                layout={{
                    xaxis:{title:"θ (graus)"},
                    yaxis:{title:"p(θ)"}
                }}
            />
            <Plot 
                data={[{
                    x:degreeArr,
                    y: arrayRange(0, Math.PI/2, Math.PI/(2*amostras)).map(i => (4/Math.PI)*(Math.sin(2*i)/4 + i/2))
                }]} 
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
            <input type="range" min={1} max={30} value={amostras} onChange={(e) => setAmostras(parseInt(e.target.value))} />
            <span>amostras: {amostras}</span>
            {renderFdaTable(fdaTable)}
        </section><section>
            <p>
                Sorteie um número aleatório \(x\) a partir de uma distribuição uniforme, por exemplo \(x = 0,45\).<br/> x = {randX}
            </p>
            <button onClick={() => setRandX(randomNumber(0, 1))} >Gerar novo x</button>
        </section><section>
            <p>
                Busque na tabela quais os valores de \(fda(\theta_a)\) e \(fda(\theta_b)\) entre os quais \(x\) está situado. No caso, \(x = 0,45\) corresponde a algum ângulo entre 15° e 30° \((\pi/12)\) e \((\pi/6)\).
            </p>
            <output>
                {angles[0]} Rad<br/>{angles[1]} Rad
            </output>
        </section><section>
            <p>
                Obtenha o valor de \(\theta\) fazendo uma interpolação linear (ou de ordem superior) a partir do valor de \(x\) e dos valores da \(fda(\theta)\) entre os quais \(x\) está situado: {`\\begin{split}
                    \\theta &= \\theta_a + \\frac{\\theta_b-\\theta_a}{fda(\\theta_b)-fda(\\theta_a)}\\times (x - fda(\\theta_a))
                \\end{split}`}
            </p>
            <output>
                {linearInterpolation(angles[0], angles[1], fda(angles[0]), fda(angles[1]), randX)} Rad
            </output>
        </section><section>
            <p>
                A figura a seguir mostra histogramas de números aleatórios que obedecem a esta distribuição de probabilidades, calculados a partir da tabela acima (\(\delta\theta = 15^\circ \)) e de uma tabela com a \(fda(\theta)\) de grau em grau {(180/( 2*interactions)).toFixed(2)} .
            </p>
            <Plot 
                data={[{
                    x:fixedAngles,
                    y: fixedStatistics,
                    type: "bar"
                }]} 
                layout={{
                    xaxis:{title:"θ (graus)"},
                    yaxis:{title:"dN/dθ"}
                }}
            /><br/>
            <input type="range" min={1} max={30} value={interactions} onChange={(e) => setInteractions(parseInt(e.target.value))} />
            <span>interações: {interactions}</span><br/>
            <Plot 
                data={[{
                    x: fixedAngles,
                    y: dada,
                    type:"bar"
                }]} 
                layout={{
                    xaxis:{title:"θ (graus)"},
                    yaxis:{title:"dN/dθ"}
                }}
            />
        </section>
    </>;
}

function renderFdaTable(table:number[][]){
    const content:JSX.Element[] = [];

    for(let i = 0; i <= table[0].length; i++){
        content[i] = <tr key={i+1}>
            <td>{table[0][i]}</td>
            <td>{table[1][i]}</td>
        </tr>
    }

    return <table>
        <tbody>
            <tr>
                <th>\(\theta\)</th>
                <th>\(fda(\theta)\)</th>
            </tr>
            {content}
        </tbody>
    </table>
}

function fda(theta:number){
    return (4/Math.PI)*(Math.sin(2*theta)/4 + theta/2);
}

function getAngles(x:number, size:number):number[]{
    const step = Math.PI/(2*size);

    let theta_a = 0;
    let theta_b = step;
    while(fda(theta_b) < x){
        theta_a = theta_b;
        theta_b += step;
    }

    return [theta_a, theta_b];
}