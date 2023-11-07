import Plot from "react-plotly.js"
import { arrayRange } from "../../scripts/arrayManipulation"
import { useEffect, useRef, useState } from "react"
import { randomNumberArray } from "../../scripts/numerosAleatorios"

type ValuesObject = {
    standart:number[]
}

export function Page(){
    const [values, setValues] = useState<ValuesObject>({
        standart: []
    });
    const amostras = useRef(arrayRange(0, 1, .01));
    const angles = useRef(arrayRange(0, 90, 1));

    useEffect(() => {
        setValues(generateValues());
    }, [])

    return <>
        <h1>Números Aleatórios Não Uniformes 1</h1>

        <section>
            <p>
                Um gerador de números aleatórios que obedece a uma distribuição uniforme produz números entre dois extremos (entre 0 e 1, por exemplo) com igual probabilidade. É uma distribuição tal que a probabilidade \(p(x)\) de se gerar um número entre \(x\) e \(x + dx\) é 1 para {`\\(0 < x < 1 \\)`} e \(0\) para qualquer outro intervalo: \[p(x)dx=dx\]
            </p><p>
                A distribuição de probabilidades é normalizada (a probabilidade de gerar qualquer número é 1):\[\int^1_0 p(x)dx = 1\]
            </p><p>
                A figura a seguir apresenta o gráfico de frequências obtido para 100 mil números aleatórios sorteados entre \(0\) e \(1\) a partir da distribuição uniforme, distribuídos em 100 canas de largura 0,01 ao longo do eixo x. O gráfico deiza evidente que, apesar da pequena flutuação estatística, todos os canais contém aproximadamente o mesmo valor (~1000 contagens).
            </p>
            <Plot data={[{x:amostras.current,y:values.standart, type:"bar"}]} layout={{xaxis:{title:"x"}, yaxis:{title:"dN/dx"}}}/>
            <p>
                A lei fundamental da transformação das probabilidades permite relacionar números que obedecem uma distribuição de probabilidade \(p(y)\) arbitrária a números que obedecem outra distribuição uniforme \(p(x)\): \[ |p(y)dy| = |p(x)dx| \]
            </p><p>
                de modo que: \[ p(y) = p(x)\left| {`\\frac{dx}{dy}`} \right| \]
            </p><p>
                Fazendo \(p(x) = 1\) (distribuição uniforme) e integrando a equação obtém-se: \[x = \int^y_0 p(y') dy'\]
            </p><p>
                Invertendo essa equação, obtém-se a função \(y(x)\) que, dado um número x sorteado de uma distribuição uniforme p(x), retorna um número y que obedece a distribuição \(p(y)\).
            </p><p>
                Um exemplo concreto pode deixar o rocedimento mais claro. A distribuição de probabilidades: {`\\[ \\begin{matrix} p(y)dy = 2ydy, && \\text{para } 0 < y < 1 \\end{matrix}\\]`}
            </p><p>
                fornece números aleatórios que obedecem uma "rampa" linear entre 0 e 1. O fator dois é a constante de normalização, de modo que a integral da função no intervalo considerado seja 1: \[ \int^1_0 p(y)dy = \int^1_0 2ydy = 1 \]
            </p><p>
                Utilizando a lei de transformação de probabilidades, faendo \(p(x) = 1\), integrando a equação e invertendo o resultado obtém-se: \[p(y) = p(x)\left| {"\\frac{dx}{dy}"} \right| = 2y\] \[x = y^2\] \[y = {"\\sqrt{x}"}\]
            </p><p>
                Em palavras, isso significa que a raiz quadrada de números sorteados de uma distribuição uniforme obedecce à rampa linear. A figura a segur mostra o gráfico da frequência de 100 mil números aleatórios sorteados utilizando a distribuição p(y)dy = 2ydy, distribuidos em 100 canais de largura 0,01. Apesar da flutuação estatística, o gráfico deixa evidente que os números são sorteados com uma probabilidade que cresce linearmente entre \(y = 0\) e \(y = 1\).
            </p>
            <Plot data={[{x:amostras.current,y:arrayRange(0, 1, .01), type:"bar"}]} layout={{xaxis:{title:"y"}, yaxis:{title:"dN/dy"}}}/>
            <p>
                Mais um exemplo.
            </p><p>
                Suponha um tipo de espalhamento em que a probabilidade de se encontrar a partícula espalhada diminua com o cosseno do ângulo de espalhamento. Podemos construir um gerador de números aleatórios que simule esta distribuição fazendo: \[ |p(\theta)d\theta| = |A{"\\cos{\\theta}"}d\theta| = |p(x)dx|\]
            </p><p>
                \(A\) é a constante de normalização, que pode ser obtida integrando-se a distribuição para os valores possíveis de \(\theta\). \[{`\\int^{\\pi/2}_0 A\\cos{(\\theta)}d\\theta = 1 \\rightarrow A = 1`}\]
            </p><p>
                Fazendo a integração e a inversão de variáveis, obtemos: \[x={"\\sin{\\theta}"}\] \[\theta = {"\\arcsin{(x)}"}\]
            </p><p>
                Ou seja: se sortearmos um número aleatório \(x\) entre 0 e 1 que obedece uma distribuição uniforme, o arco cujo seno é \(x\) é um ângulo que obedece a uma distribuição que depende do seu cosseno. A figura a seguir mostra o gráfico da frequência de 100 mil ângulos sorteados utilizando a distribuição \( p(\theta) d\theta = {"\\cos{(\\theta)}"}d\theta \), distribuídos em 90 canais de largura 1 grau. Apesar da flutuação estatística, o gráfico deixa evidente que os npumeros são sorteados com uma probabilidade que diminui com o cosseno do ângulo.
            </p>
            <Plot data={[{x:angles.current,y:arrayRange(0, 90, 1), type:"bar"}]} layout={{xaxis:{title:"θ (graus)"}, yaxis:{title:"dN/dθ"}}}/>
            <p>
                Se quisermos que sejam gerados entre \(-\pi/2\) e \(\pi/2\), precisamos usar um gerador que gere números uniformemente entre \(-1/2\) e \(1/2\) (cuja integral continua sendo 1), mas a constante de normalização para a distribuição cossenoidal fica um pouco diferente: \[{"\\int^{\\pi/2}_{-\\pi/2}A\\cos{(\\theta)}d\\theta = 2A \\rightarrow A = \\frac{1}{2}"}\]
            </p><p>
                Fazendo a integração e inversão de variáveis, obtemos: \[x = {"\\frac{1}{2}\\sin{\\theta}"}\] \[{"\\theta = \\arcsin{(2x)}"}\]
            </p><p>
                Ou seja: se sortearmos um número aleatório \(x\) entre -1/2 e 1/2 que obedece uma distribuição uniforme, o arco cujo seno é \(2x\) é um ângulo que obedece a uma distribuição que depende do seu cosseno, agora para \(-\pi/2\) a \(\pi/2\). A figura a seguir mostra o gráfico da frequência de 100 mil ângulos sorteados utilizando a distribuição \(p(\theta)d\theta = (1/2)\cos(\theta)d\theta\), distribuídos em 180 canais de largura 1 grau. Apesar da flutuação estatística, o gráfico deixa evidente que os números são sorteados com uma probabilidade que diminui com o cosseno do ângulo.
            </p>
            <Plot data={[{x:angles.current,y:arrayRange(0, 90, 1), type:"bar"}]} layout={{xaxis:{title:"θ (graus)"}, yaxis:{title:"dN/dθ"}}}/>
            <p>
                Por fim, a figura abaixo resultado similar para uma distribuição associada a um espalhamento em que a probabilidade de se encontrar a partícula espalhada aumenta com o seno do ângulo de espalhamento.
            </p>
            <Plot data={[{x:angles.current,y:arrayRange(0, 90, 1), type:"bar"}]} layout={{xaxis:{title:"θ (graus)"}, yaxis:{title:"dN/dθ"}}}/>
            <p>
                A sua missão é fazer programas implementem estas distribuições e que reproduzam os 5 gráficos deste documento.
            </p>
        </section>
    </>
}

function generateValues(){
    const values:ValuesObject = {
        standart: []
    }
    const arr = randomNumberArray(0, 1, 100000);

    arr.map((value) => {
        const standarIndex = Math.floor(value%0.01 * 1000);
        if(values.standart[standarIndex] === undefined){
            values.standart[standarIndex] = 1
        } else {
            values.standart[standarIndex]++;
        }
    })

    console.log(arr);
    console.log(values);

    return values;
}