import { useEffect } from "react"
import { Link } from "../../components/Link";

export const Page = () => {
    useEffect(script, []);

    return <>
        <h1>Aquecimento II:<br/> Números aleatórios</h1>
        <section>
            <p>
                Faça um programa que contenha uma função que simule uma moeda honesta, retornando, em média, "0" 50% das vezes e "1" 50% das vezes (um bit). Utilize esta função para construir uma outra função que retorne bytes aleatórios (ou seja, sequências de 8 bits aleatoriamente escolhidos).
            </p>
            <button id="1_button_bit">
                gera bit
            </button><br/>
            <output id="1_output_bit"></output><br/>
            <button id="1_button_byte">
                gera byte
            </button><br/>
            <output id="1_output_byte"></output><br/>
        </section>
        <section>
            <p>
                As letras "A", "C", "G", "T" utilizadas para representar os nucleotídeos do código genético, são representadas por "01000001", "01000011", "01000111" e "01010100" no chamado "código binário ASCII". Faça um programa que utilize as funções desenvolvidas para o item anterior para gerar 1 milhão de bytes e mostre quantos "A"s, "C"s, "G"s e "T"s foram gerados.
            </p>
            <output id="2_output_A"></output><br/>
            <output id="2_output_C"></output><br/>
            <output id="2_output_G"></output><br/>
            <output id="2_output_T"></output><br/>
        </section>
        <section>
            <p>
                Faça um programa que gere pares de números aleatórios que estejam dentro de um círculo de raio unitário.
            </p>
            <button id="3_button">gera (x,y) no círculo</button><br/>
            <output id="3_output"></output><br/>
        </section>
        <section>
            <p>
                Faça um programa que gere pares de números aleatórios que estejam dentro de um triângulo equilátero de lado unitário cujo baricentro está na origem e cuja base é paralela ao eixo.
            </p>
            <button id="4_button">gera (x,y) no triângulo</button><br/>
            <output id="4_output"></output><br/>
        </section>
        <section>
            <p>
                Faça um programa que gere números aleatórios "1", "2", "3" ou "4", tais que a quantidade de números aleatórios gerados esteja na proporção 1:2:3:4 (isto é, em média, para cada "1" gerado, são gerados 2 "2"s, 3 "3"s e 4 "4"s).
            </p>
            <button id="5_button">gera 1:2:3:4</button><br/>
            <output id="5_output"></output><br/>
        </section>
        <section>
            <p>
                Faça um programa que contenha funções que gerem dois ângulos aleatórios e tais que e .
            </p>
            <button id="6_button">gera (omega, phi)</button><br/>
            <output id="6_output"></output><br/>
        </section>
        <section>
            <p>
                Considere uma fonte de partículas em sistema de coordenadas esféricas em que a fonte está na origem e a posição de uma partícula emitida por ela é dada pela sua distância até a origem, pelo ângulo que o vetor posição faz com o eixo (tal que ) e pelo ângulo no plano (tal que e ). Considere um "detetor" plano, de raio , paralelo ao plano em . Utilize as funções do problema anterior para gerar pares de ângulos aleatórios que correspondam a emissões que sejam "detetadas" pelo "detetor".
            </p>
            Distância detector-fonte:
            <input id="7_input_distancia"></input><br/>
            Raio do detetor:
            <input id="7_input_raio"></input><br/>
            <button id="7_button">gera ângulos</button><br/>
            Ângulos gerados:<br/>
            <output id="7_output_angulos"></output><br/>
            Detetado?<br/>
            <output id="7_output_detectado"></output>
        </section>
        <section>
            <p>
                Faça um programa com uma função que gere dois números aleatórios e entre -2 e 2 para compor um número complezo e outra função que verifique se esse número está dentro ou fora do conjunto de Mandelbrot. O número será considerado dentro do conjunto de Mandelbrot se depois de interações o módulo do número , para , for menor do que 2 ( )
            </p>
            <input id="8_input"></input><br/>
            <button id="8_button">gera complexo</button><br/>
            <output id="8_output_complexo"></output><br/>
            <output id="8_output_boolean"></output><br/>
        </section>
        
        <button>
            <Link href="/">home</Link>
        </button>
    </>
}

const script =() => {
    //
    // HTML Elements and Constants
    //
    const e2_1 = {
        output: {
            bit: document.getElementById("1_output_bit") as HTMLOutputElement,
            byte: document.getElementById("1_output_byte") as HTMLOutputElement
        },
        button: {
            bit: document.getElementById("1_button_bit") as HTMLButtonElement, 
            byte: document.getElementById("1_button_byte") as HTMLButtonElement
        }
    };
    const e2_2 = {
        output: {
            A: document.getElementById("2_output_A") as HTMLOutputElement,
            C: document.getElementById("2_output_C") as HTMLOutputElement,
            G: document.getElementById("2_output_G") as HTMLOutputElement,
            T: document.getElementById("2_output_T") as HTMLOutputElement,
        }
    };
    const e2_3 = {
        output: document.getElementById("3_output") as HTMLOutputElement,
        button: document.getElementById("3_button") as HTMLButtonElement
    };
    const e2_4 = {
        output: document.getElementById("4_output") as HTMLOutputElement,
        button: document.getElementById("4_button") as HTMLButtonElement
    };
    const e2_5 = {
        output: document.getElementById("5_output") as HTMLOutputElement,
        button: document.getElementById("5_button") as HTMLButtonElement
    };
    const e2_6 = {
        output: document.getElementById("6_output") as HTMLOutputElement,
        button: document.getElementById("6_button") as HTMLButtonElement
    };
    const e2_7 = {
        input:{
            distancia: document.getElementById("7_input_distancia") as HTMLInputElement,
            raio: document.getElementById("7_input_raio") as HTMLInputElement
        },
        output:{
            angulos: document.getElementById("7_output_angulos") as HTMLOutputElement,
            detectado: document.getElementById("7_output_detectado") as HTMLOutputElement
        },
        button: document.getElementById("7_button") as HTMLButtonElement
    };
    const e2_8 = {
        input: document.getElementById("8_input") as HTMLInputElement,
        output: {
            complexo: document.getElementById("8_output_complexo") as HTMLOutputElement,
            boolean: document.getElementById("8_output_boolean") as HTMLOutputElement
        },
        button: document.getElementById("8_button") as HTMLButtonElement
    };


    //
    //Numeros Aleatórios
    //
    function randomNumber(v?:{min:number,max:number}){
        if(v !== undefined){
            return Math.random() * (v.max - v.min) + v.min;
        }
        return Math.random();
    }

    function randomIntegerNumber(min:number, max:number){
        min = Math.ceil(min);
        max = Math.floor(max+1);

        return Math.floor(Math.random() * (max - min) + min);
    }

    //
    // Questão 1
    //
    function genBit(){
        return Math.floor(Math.random() * 2)
    }

    function genByte(){
        return Math.floor(Math.random() * 256)
    }

    function genStringByte(){
        const number:number|string = genByte();
        let byte = number.toString(2);
        while(byte.length < 8){
            byte = "0"+byte;
        }

        return byte;
    }

    e2_1.button.bit.onclick = () => {
        e2_1.output.bit.value = genBit().toString();
    }
    e2_1.button.byte.onclick = () => {
        e2_1.output.byte.value = genStringByte();
    }

    //
    // Questão 2
    //
    function quantATCG(){
        const letters:any = {
            "A": 0,
            "T": 0,
            "C": 0,
            "G": 0
        };

        for(let i = 0; i < 1000000; i++){
            const byte = genByte();

            for(const a  in letters){
                if(a.charCodeAt(0) == byte){
                    letters[a]++;
                    break;
                }
            }
        }

        e2_2.output.A.value = letters.A.toString();
        e2_2.output.T.value = letters.T.toString();
        e2_2.output.C.value = letters.C.toString();
        e2_2.output.G.value = letters.G.toString();
    }
    quantATCG();

    //
    // Questão 3
    //
    function randomCirclePoint(){
        const angle = randomNumber({min:-2*Math.PI, max:2*Math.PI})
        const point = [
            Math.cos(angle),
            Math.sin(angle)
        ];

        return point;
    }

    e2_3.button.onclick = () => {
        const point = randomCirclePoint();
        e2_3.output.value = `(${point[0]}, ${point[1]})`;
    }

    //
    // Questão 4
    //
    function randomPointTriangle(){
        let x = randomNumber({min: -1/2, max: 1/2});
        let y:number;

        const sqrt3 = Math.sqrt(3);
        const a = -sqrt3/6;
        if(x >= 0){
            y = randomNumber({
                min: a,
                max: (sqrt3/3) - (sqrt3*x)
            });
        } else {
            y = randomNumber({
                min: a,
                max: (sqrt3/3) + (sqrt3*x)
            })
        }

        return [x, y]
    }
    e2_4.button.onclick = () => {
        const point = randomPointTriangle();
        e2_4.output.value = `(${point[0]}, ${point[1]})`;
    }

    //
    // Questão 5
    //
    function randomWeightNumber(maxNumber:number){
        let maxTest = 0;
        for(let i = 1; i <= maxNumber; i++){
            maxTest+=i;
        }
        const test = randomIntegerNumber(1, maxTest);

        const range = [1, 1];
        let number = 1;

        while(test < range[0] || test > range[1]){
            range[0] = range[1] + 1;
            range[1] = range[0] + number
            number++
        }

        return number;
    }
    e2_5.button.onclick = () => {
        const values = [0, 0, 0, 0];
        for(let i = 0; i < 1000; i++){
            values[randomWeightNumber(4)-1]++;
        }
        e2_5.output.value = `${values[0]} : ${values[1]} : ${values[2]} : ${values[3]}`;
    }

    //
    // Questão 6
    //
    function randomAngles(){
        const a = Math.PI/2;
        
        return [
            randomNumber({
                min: -a,
                max: a
            }),
            randomNumber({
                min: 0,
                max: 2*Math.PI
            })
        ]
    }
    e2_6.button.onclick = () => {
        const angles = randomAngles();
        e2_6.output.value = `(${angles[0]}, ${angles[1]})`;
    }

    //
    // Questão 7
    //
    function particleDetector(d:number, r:number){
        const angles = randomAngles();
        let data = {
            angles: angles,
            detected: false
        }

        if(d*Math.tan(angles[0]) <= r){
            data.detected = true;
        }
        return data
    }

    e2_7.button.onclick = () => {
        const data = particleDetector(
            parseFloat(e2_7.input.distancia.value),
            parseFloat(e2_7.input.raio.value)
        )

        e2_7.output.angulos.value = `(${data.angles[0]}, ${data.angles[1]})`;
        e2_7.output.detectado.value = data.detected?"true":"false";   
    }

    //
    // Questão 8
    //
    type complexNumber = {
        real:number,
        complex:number
    }
    function randomComplexNumber():complexNumber{
        return {
            real: randomNumber({min:-2, max:2}), 
            complex: randomNumber({min:-2, max:2})
        };
    }

    function conjuntoMandelBrot(c: complexNumber, interactions:number){
        const z:complexNumber = {
            real: 0,
            complex: 0
        }
        
        for(let i = 0; i < interactions; i++){
            const newZ:complexNumber = {
                real: z.real*z.real-z.complex*z.complex+c.real,
                complex: 2*z.real*z.complex+c.complex
            };
            z.real = newZ.real;
            z.complex = newZ.complex;

            if(Math.sqrt(z.real*z.real + z.complex*z.complex) < 2){
                return false;
            }
        }

        return true;
    }

    e2_8.button.onclick = () => {
        const c = randomComplexNumber();
        const result = conjuntoMandelBrot(
            c,
            parseInt(e2_8.input.value)
        );

        e2_8.output.complexo.value = `(${c.real}, ${c.complex} i)`;
        e2_8.output.boolean.value = result?"true":"false";
    }
}