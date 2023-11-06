import { useEffect } from "react"
import trainGraphics from "../../scripts/aquecimento4/trainGraphics"
import inclinedPlane from "../../scripts/aquecimento4/inclinedPlane";
import waveSumsGraph from "../../scripts/aquecimento4/wavesums";

export function Page() {
    useEffect(script, []);

    return <>
        <h1>Aquecimento IV<br/>Gráficos</h1>

        <section>
            <p>
                A ilustração a seguir mostra 3 "fotos" de um trem em movimento com velocidade \(v_t\) constante. Em \(t=0s\), uma esfera é lançada de sua chaminé por um dispositivo que lhe imprime uma velocidade \(v_{"e0"}\) vertical. As fotos foram tiradas em \(t=0,40s\), \(t=1,30s\) e \(t=2,60s\). Sabendo que a largura do campo de visão corresponde a 50 m e que a sua altura a 30 m, extraia das imagens as posições da esfera nos três instantes e determine a velocidades \(v_t\) do trem e velocidade inicial \(v_{"e0"}\) da esfera. Com estes resultados faça gráficos (1) da trajetória \(y(x)\) da esfera; (2) da posição da \(x_e(t)\) esfera e (3) da posição \(y(t)\) da esfera, adicionando aos gráficos os pontos "medidos".
            </p>
            <p>
                Pode ser útil saber que os coeficientes de uma parábola \(y(x) = ax^2 + bx + c\) podem ser encontrados dados 3 pontos \(p_1 = (x_1,y_1)\), \(p_2=(x_2,y_z)\) e \(p_3=(x_3,y_3)\):
                {`
                \\[\\begin{split}
                    a &= \\frac{1}{\\Delta}\\left[ x_3(y_2-y_1)+x_2(y_1-y_3)+x_1(y_3-y_2)\\right]\\\\
                    b &= \\frac{1}{\\Delta}\\left[ x^2_1(y_2-y_3)+x^2_3(y_1-y_2)+x^2_2(y_3-y_1) \\right] \\\\
                    c &= \\frac{1}{\\Delta}\\left[ x^2_2(x_3y_1-x_1y_3)+x_2(x^2_1y_3-x^2_3y_1)+x_1x_3(x_3-x_1)y_2 \\right] \\\\
                    \\Delta &= (x_1-x_2)(x_1-x_3)(x_2-x_3)
                \\end{split}\\]`}
            </p>
            <output id="1_output_y(x)"></output>
            <output id="1_output_y(t)x(t)"></output>
        </section>

        <section>
            <p>
                A figura abaixo representa um experimento sobre o movimento retilíneo
                uniformemente variado frequente em laboratórios introdutórios de física. Trata-se
                de um móvel descendo uma rampa. Ao longo de posições conhecidas da rampa
                encontram-se sensores que detectam o tempo de passagem do móvel. A partir do
                tempo de passagem pelos sensores, é possível determinar a velocidade média do
                móvel em cada trecho e, a partir disso, sua aceleração.
            </p>

            <output id="2_output"></output>
        </section>

        <section>
            <p>
                Um pacote de ondas é a soma de várias ondas com diferentes números de onda e amplitudes, escolhidos de maneira bastante peculiar. Há uma onda predominante, com número de onda e amplitude quaisquer, à qual são somadas muitas outras ondas com números de onda progressivamente maiores e menores e com amplitudes progressivamente menores.
            </p>
            <p>
                A tabela a seguir apresenta os parâmetros de 11 ondas; na primeira linha estão os valores dos números de onda de cada onda \(k_i\) e na segunda linha estão as respectivas amplitudes \(a_i\).
                {`
                $$\\begin{array}{cccccccccccccccc}
                    \\hline
                    k_i & 5 & 6 & 7 & 8 & 9 & 10 & 11 & 12 & 13 & 14 & 15\\\\
                    a_i & 0,5 & 0,6 & 0,7 & 0,8 & 0,9 & 1,0 & 0,9 & 0,8 & 0,7 & 0,6 & 0,5\\\\
                    \\hline
                \\end{array}$$`}
            </p>
            <p>
                Neste caso, a onda resultante é dada por: \[y(x) = \sum^{"{10}"}_{"{i=0}"}a_i\cos{"{k_ix}"}\]
            </p>
            <p>Faça um programa que mostre os gráficos das ondas componentes e da onda
                resultante.</p>

            <output id="3_output"></output>
        </section>
    </>
}

const script = () => {
//
// HTML Elements and Constants
//
const e4_1 = {
    output: [
        document.getElementById("1_output_y(x)") as HTMLOutputElement,
        document.getElementById("1_output_y(t)x(t)") as HTMLOutputElement,
    ]
}
const e4_2 = {
    output: document.getElementById("2_output") as HTMLOutputElement
}
const e4_3 = {
    output: document.getElementById("3_output") as HTMLOutputElement
}


// Questão 1
trainGraphics(e4_1.output);

//Questão 2
inclinedPlane(e4_2.output);

//Questão 3
waveSumsGraph(e4_3.output);
}