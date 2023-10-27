import { useEffect } from "react"
import Plotly from 'plotly.js-dist-min'
import {wavesArray, waveSum} from "../../scripts/aquecimento3/waveFunctions"


export function Page() {
    useEffect(script, []);

    return <>
        <h1>Aquecimento III<br/>Matrizes</h1>

        <section>
            <p>
                Um pacote de ondas é a soma de várias ondas com diferentes números de onda e amplitudes, escolhidos de maneira bastante peculiar. Há uma onda predominante, com número de onda e amplitude quaisquer, à qual são somadas muitas outras ondas com números de onda progressivamente maiores e menores e com amplitudes progressivamente menores.
            </p>
            <p>
                A tabela a seguir apresenta os parâmetros de 11 ondas; na primeira linha estão os valores dos números de onda de cada onda \(k_i\) e na segunda linha estão as respectivas amplitudes \(a_i\).
                {`$$\\begin{array}{cccccccccccccccc}
                    \\hline
                    k_i & 5 & 6 & 7 & 8 & 9 & 10 & 11 & 12 & 13 & 14 & 15\\\\
                    a_i & 0,5 & 0,6 & 0,7 & 0,8 & 0,9 & 1,0 & 0,9 & 0,8 & 0,7 & 0,6 & 0,5\\\\
                    \\hline
                \\end{array}$$`}
            </p>
            <p>
                Neste caso, a onda resultante é dada por: {`\\[y(x) = \\sum^{10}_{i=0}a_i\\cos{k_ix}\\]`}
            </p>
            <p>
                Faça um programa que armazene em duas matrizes os números de onda \(k_i\) e as amplitudes \(a_i\) da tabela e utilize-os para calcular a onda resultante, que deve ser armazenada em uma outra matriz, com, digamos, 100 elementos. Você não precisa fazer um gráfico, mas poderia tentar.
            </p>

            <output id="1_output"></output>
        </section>

        <section>
            <p>
                Em um triângulo de Pascal o valor do elemento na -ésima linha e -ésima coluna é denotado por , para e . Por exemplo, o elemento no topo do triângulo é dado por . Os demais elementos do triângulo podem ser construídos com a regra:
                {`\\[\\begin{bmatrix} n\\\\k \\end{bmatrix} = \\begin{bmatrix} n-1\\\\k-1 \\end{bmatrix} + \\begin{bmatrix} n-1\\\\k \\end{bmatrix}
                \\]`}
            </p>
            <p>
                Faça um programa que construa um triângulo de Pascal em uma matriz de tal modo que os seus elementos sejam recuperados a partir dos índices o número da linha e da coluna em que se encontram. Por exemplo, se tPascal é a matriz que armazena o triângulo, então tPascal[0][0] = 1, tPascal[1][0] = 1, tPascal[1][1] = 1, tPascal[2][0] = 1, tPascal[2][1] = 2; tPascal[2][2] = 1 e assim por diante.
            </p>
            <output id="2_output"></output>
        </section>

        <section>
            <p>
                Considere um dado de plástico cujos pontos nas faces são esferas de metal
                incrustadas de modo que seus centros de massa fiquem exatamente na superfície
                do dado (Se isto te faz pensar sobre átomos em uma molécula, não é à toa!).
            </p><p>
                Quais as coordenadas do centro de massa do dado?
            </p><p>
                Para resolver o problema você vai ter que tomar várias decisões. Qual a densidade
                do plástico de que é feito o corpo do dado? Qual a densidade do metal de que são
                feitos os pontos nas faces do dado? Qual o diâmetro desses pontos? Como estão
                distribuídos sobre as faces? Qual o sistema de coordenadas?
            </p><p>
                Resolva o problema utilizando uma matriz bidimensional em que o primeiro
                índice indexa os pontos (um dado tem 1+2+3+4+5+6 = 21 pontos, de
                correspondendo a índices de 0 a 20) e o segundo índice indexa coordenadas \(x\), \(y\) e
                \(z\) de cada ponto (correspondendo índices de 0 a 2).
            </p><p>
                As figuras a seguir representam um dado de aresta \(L\) em um sistema de coordenadas tal que o \(x\) eixo transpassa (em sentido crescente) as faces 6 e 1, o eixo \(y\) transpassa as faces 5 e 2 e o eixo \(z\) as faces 4 e 3. Nas faces em que há um ponto central (1, 3 e 5), este ponto está sobre o eixo (o 1, por exemplo, está em (\(L/2\),0,0)), e os demais nos vértices de um quadrado de lado \(L/2\) centrado no centro da face (o 3, por exemplo, tem pontos em (\(-L/4\),\(-L/4\),\(L/2\)), (0,0,\(L/2\)) e (\(L/4\),\(L/4\),\(L/2\))).
            </p><p>
                O caso mais simples ocorre quando se assume que o plástico de que é feito o dado é "etéreo" (isto é, tem densidade igual a zero) e que os pontos são "materiais" (isto é, têm densidade diferente de zero, qualquer que seja).
            </p><p>
                Para um caso mais realista, em que tanto o suporte quanto as esferas têm densidades não nulas e diferentes, é preciso incluir a distribuição de massa do suporte, com os "vazios" onde são incrustados as esferas. Isso pode ser feito calculando-se o centro de massa de 21 hemisférios abaixo da superfície das faces e com densidade negativa (o centro de massa de um hemisfério de raio encontra-se a da sua face plana). A equação final para o centro de massa fica:
                {`\\[
                m_\\text{dados}\\vec{r}_\\text{dados} = M_\\text{esfs}\\vec{r}_\\text{esfs} + M_\\text{cubo}\vec{r}_\\text{cubo}-M_\\text{hems}\\vec{r}_\\text{hems}
                \\]`}
            </p><p>
                A tabela a seguir resume os resultados para um dado com \(L=1\) , esferas de raio \(r=0,1\) posicionadas como no sistema de coordenadas descrito acima, para 3 configurações de densidades ("ar/plástico", "plástico/plástico", "plástico/aço").
            </p>
            <output id="3_output"></output>
        </section>

        <a href="/">home</a>

    </>
}

const script = () => {
//
// HTML Elements and Constants
//
const e3_1 = {
    output: document.getElementById("1_output") as HTMLOutputElement
};
const e3_2 = {
    output: document.getElementById("2_output") as HTMLOutputElement
};
const e3_3 = {
    output: document.getElementById("3_output") as HTMLOutputElement
};

e3_1.output.style.margin = "auto"
const waveValues = waveSum(wavesArray, -2*Math.PI, 2*Math.PI, 0.001);
if(waveValues != undefined){
    Plotly.newPlot(
        e3_1.output,
        [{
            x: waveValues.x,
            y: waveValues.y,
            type: 'scatter'
        }],
    );
}

//
// Questão 2
//
function pascalTriangle(size:number){
    if(size < 1){
        return undefined;
    }
    let tPascal:number[][] = [];
    tPascal[0] = [];
    tPascal[0][0] = 1;

    for(let n = 1; n < size; n++){
        tPascal[n] = [];
        tPascal[n][0] = 1;
        tPascal[n][n] = 1;
        for(let k = 1; k < n; k++){
            tPascal[n][k] = tPascal[n-1][k-1]+tPascal[n-1][k];
        }
    }

    return tPascal;
}

const pascal = pascalTriangle(12);
if(pascal != undefined){
    let pascalString = "";
    for(let i = 0; i < pascal.length; i++){
        pascalString += `<span style="display: table; margin: 0 auto">${pascal[i]}</span></br>`;
    }
    e3_2.output.innerHTML = pascalString
}

//
// Questão 3
//
type vector3d = {
    x: number,
    y:number, 
    z: number
}

type massPoint = {
    mass:number,
    coord:vector3d
}

function calCenterMass(points:massPoint[]):massPoint{
    let x = 0;
    let y = 0;
    let z = 0;
    let mass = 0;

    for(let i = 0; i < points.length; i++){
        mass += points[i].mass;
        x += points[i].coord.x * points[i].mass;
        y += points[i].coord.y * points[i].mass;
        z += points[i].coord.z * points[i].mass;
    }

    return {
        mass: mass,
        coord: {
            x: x/mass,
            y: y/mass,
            z: z/mass
        }
    }
}

function diceCenter(length:number, diceDensity:number, dotDensity:number, dotRadius:number){
    const b = (4/3)*Math.PI;
    const off = dotRadius*(3/8);

    const cube: massPoint = {
        mass: length*length*length*diceDensity,
        coord: {
            x: 0,
            y: 0,
            z: 0
        }
    };
    const dotPositions:vector3d[] = [
        // 1
        {
            x: (1/2)*length,
            y: 0,
            z: 0
        },
        // 2
        {
            x: (1/4)*length,
            y: (1/2)*length,
            z: (1/4)*length
        },{
            x: -(1/4)*length,
            y: (1/2)*length,
            z: -(1/4)*length
        },

        // 3
        {
            x:-(1/4)*length,
            y: -(1/4)*length,
            z: (1/2)*length
        },{
            x: 0,
            y: 0,
            z: (1/2)*length
        },{
            x: (1/4)*length,
            y: (1/4)*length,
            z: (1/2)*length
        },
        // 4
        {
            x: (1/4)*length,
            y: (1/4)*length,
            z: -(1/2)*length
        },{
            x: -(1/4)*length,
            y: (1/4)*length,
            z: -(1/2)*length
        },{
            x: (1/4)*length,
            y: -(1/4)*length,
            z: -(1/2)*length
        },{
            x: -(1/4)*length,
            y: -(1/4)*length,
            z: -(1/2)*length
        },
        // 5
        {
            x: 0,
            y: -(1/2)*length,
            z: 0
        },{
            x: (1/4)*length,
            y: -(1/2)*length,
            z: (1/4)*length
        },{
            x: -(1/4)*length,
            y: -(1/2)*length,
            z: (1/4)*length
        },{
            x: (1/4)*length,
            y: -(1/2)*length,
            z: -(1/4)*length
        },{
            x: -(1/4)*length,
            y: -(1/2)*length,
            z: -(1/4)*length
        },
        // 6
        {
            x: -(1/2)*length,
            y: 0,
            z: (1/4)*length
        },{
            x: -(1/2)*length,
            y: (1/4)*length,
            z: (1/4)*length
        },{
            x: -(1/2)*length,
            y: -(1/4)*length,
            z: (1/4)*length
        },{
            x: -(1/2)*length,
            y: 0,
            z: -(1/4)*length
        },{
            x: -(1/2)*length,
            y: (1/4)*length,
            z: -(1/4)*length
        },{
            x: -(1/2)*length,
            y: -(1/4)*length,
            z: -(1/4)*length
        },
    ];
    const dotHolesPosition:vector3d[] = [
         // 1
         {
            x: (1/2)*length-off,
            y: 0,
            z: 0
        },
        // 2
        {
            x: (1/4)*length,
            y: (1/2)*length-off,
            z: (1/4)*length
        },{
            x: -(1/4)*length,
            y: (1/2)*length-off,
            z: -(1/4)*length
        },

        // 3
        {
            x:-(1/4)*length,
            y: -(1/4)*length,
            z: (1/2)*length-off
        },{
            x: 0,
            y: 0,
            z: (1/2)*length-off
        },{
            x: (1/4)*length,
            y: (1/4)*length,
            z: (1/2)*length-off
        },
        // 4
        {
            x: (1/4)*length,
            y: (1/4)*length,
            z: -(1/2)*length+off
        },{
            x: -(1/4)*length,
            y: (1/4)*length,
            z: -(1/2)*length+off
        },{
            x: (1/4)*length,
            y: -(1/4)*length,
            z: -(1/2)*length+off
        },{
            x: -(1/4)*length,
            y: -(1/4)*length,
            z: -(1/2)*length+off
        },
        // 5
        {
            x: 0,
            y: -(1/2)*length+off,
            z: 0
        },{
            x: (1/4)*length,
            y: -(1/2)*length+off,
            z: (1/4)*length
        },{
            x: -(1/4)*length,
            y: -(1/2)*length+off,
            z: (1/4)*length
        },{
            x: (1/4)*length,
            y: -(1/2)*length+off,
            z: -(1/4)*length
        },{
            x: -(1/4)*length,
            y: -(1/2)*length+off,
            z: -(1/4)*length
        },
        // 6
        {
            x: -(1/2)*length+off,
            y: 0,
            z: (1/4)*length
        },{
            x: -(1/2)*length+off,
            y: (1/4)*length,
            z: (1/4)*length
        },{
            x: -(1/2)*length+off,
            y: -(1/4)*length,
            z: (1/4)*length
        },{
            x: -(1/2)*length+off,
            y: 0,
            z: -(1/4)*length
        },{
            x: -(1/2)*length+off,
            y: (1/4)*length,
            z: -(1/4)*length
        },{
            x: -(1/2)*length+off,
            y: -(1/4)*length,
            z: -(1/4)*length
        },
    ]

    const dots: massPoint[] = [];
    const dotsHoles: massPoint[] = [];

    for(let i = 0; i < dotPositions.length; i++){
        const volume = b*Math.pow(dotRadius, 3)
        dots[i] = {
            mass: (volume*dotDensity),
            coord: dotPositions[i]
        };
        
        dotsHoles[i] = {
            mass: -(volume/2)*diceDensity,
            coord: dotHolesPosition[i]
        }

    }

    const allMassPoints = dots.concat(dotsHoles, [cube]);
    return calCenterMass(allMassPoints);
}

const dice = [
    diceCenter(1, 0, 1, 0.1),
    diceCenter(1, 1, 1, 0.1),
    diceCenter(1, 1, 8, 0.1)
]
e3_3.output.innerHTML = `
    <table>
        <tr>
            <td>Razão</td>
            <td>x</td>
            <td>y</td>
            <td>z</td>
        </tr>
        <tr>
            <td>0/1</td>
            <td>${dice[0].coord.x}</td>
            <td>${dice[0].coord.y}</td>
            <td>${dice[0].coord.z}</td>
        </tr>
        <tr>
            <td>1/1</td>
            <td>${dice[1].coord.x}</td>
            <td>${dice[1].coord.y}</td>
            <td>${dice[1].coord.z}</td>
        </tr>
        <tr>
            <td>1/8</td>
            <td>${dice[2].coord.x}</td>
            <td>${dice[2].coord.y}</td>
            <td>${dice[2].coord.z}</td>
        </tr>
    </table>
`
}