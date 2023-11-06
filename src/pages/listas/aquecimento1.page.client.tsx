import { useEffect } from "react";

export const Page = () => {
    return <>
        <h1>Aquecimento I:<br/> Operações básicas, condicionais, laços, funções</h1>
        {exercicios.map((Item, index) => {
            return <Item key={index}/>
        })}
    </>
}

const exercicios = [
    () => {
        useEffect(() => {
            const e1 = {
                input: document.getElementById("1_input") as HTMLInputElement,
                output: document.getElementById("1_output") as HTMLOutputElement,
                button: {
                    binDec: document.getElementById("1_button_binDec") as HTMLButtonElement,
                    decBin: document.getElementById("1_button_decBin") as HTMLButtonElement,
                    binHex: document.getElementById("1_button_binHex") as HTMLButtonElement,
                    decHex: document.getElementById("1_button_decHex") as HTMLButtonElement
                }
            };
    
            e1.button.binDec.onclick = () => {
                e1.output.value = calculateConversion(
                    e1.input.value,
                    numberTypes.binary,
                    numberTypes.decimal
                );
            };
            e1.button.binHex.onclick = () => {
                e1.output.value = calculateConversion(
                    e1.input.value,
                    numberTypes.binary,
                    numberTypes.hexadecimal
                );
            };
            e1.button.decBin.onclick = () => {
                e1.output.value = calculateConversion(
                    e1.input.value,
                    numberTypes.decimal,
                    numberTypes.binary
                );
            };
            e1.button.decHex.onclick = () => {
                e1.output.value = calculateConversion(
                    e1.input.value,
                    numberTypes.decimal,
                    numberTypes.hexadecimal
                );
            }
        }, [])
    
        return <section>
            <p>
                Faça um programa que contenha funções para converter números inteiros e positivos nas representações (a) binária para decimal; (b) decimal para binária; (c) binária para hexadecimal; (d) decimal para hexadecimal.
            </p>
            Input:
            <input id="1_input"></input>
            <div>
                <button id="1_button_binDec">bin &gt; dec</button>
                <button id="1_button_decBin">dec &gt; bin</button>
                <button id="1_button_binHex">bin &gt; hex</button>
                <button id="1_button_decHex">dec &gt; hex</button>
            </div>
            Output:
            <output id="1_output"></output>
        </section>
    },
    () => {
        useEffect(() => {
            const e2 = {
                input: document.getElementById("2_input") as HTMLInputElement,
                output: document.getElementById("2_output") as HTMLOutputElement,
                button: document.getElementById("2_button") as HTMLButtonElement
            }

            e2.button.onclick = () => {
                const input = e2.input.value;
                if(!verifyDecimal(input)){
                    e2.output.value = "Invalid Input.";
                }
        
                e2.output.value = digitoVerificador(input).toString();
            }
        }, []);

        return <section>
            <p>
                Faça um programa que compute o "dígito verificador" de um número de matrícula com dígitos ( ), multiplicando o dígito por um peso , somando tudo e tomando o resto da divisão por 10. Por exemplo, o dígito verificador do número de matrículas 20130456 seria dado por (2 x 2 + 0 x 3 + 1 x 4 + 3 x 5 + 0 x 6 + 4 x 7 + 5 x 8 + 6 x 9) mod 10 = 145 mod 10 = 5.
            </p>
            Número de matricula:
            <input id="2_input"/><br/>
            <button id="2_button">checa número</button><br/>
            Dígito verificador:
            <output id="2_output"/>
        </section>
    },
    () => {
        useEffect(() => {
            const e3 = {
                output: {
                    n0: document.getElementById("3_output_n0") as HTMLOutputElement,
                    n5: document.getElementById("3_output_n5") as HTMLOutputElement,
                    n9: document.getElementById("3_output_n9") as HTMLOutputElement,
                }
            }

            quantNumerosVerificadores(e3);
        }, []);

        return <section>
            <p>
                Considere números de matrícula com um prefixo fixo "201304" e um sufixo que varia de "01" a "99" (isto é, números que vão de "20130401" a "20130499"). Considerando o algoritmo desenvolvido para o problema anterior, quantas vezes aparecem os dígitos verificadores 0, 5 e 9 para este conjunto de números?
            </p>
            n(0) = <output id="3_output_n0"></output>
            <br/>
            n(5) = <output id="3_output_n5"></output>
            <br/>
            n(9) = <output id="3_output_n9"></output>
        </section>
    },
    () => {
        useEffect(() => {
            const e4 = {
                input: {
                    argumento: document.getElementById("4_input_argumento") as HTMLInputElement,
                    tolerancia: document.getElementById("4_input_tolerancia") as HTMLInputElement
                },
                output: {
                    exato: document.getElementById("4_output_exato") as HTMLOutputElement,
                    aproximado: document.getElementById("4_output_aproximado") as HTMLOutputElement,
                    termos: document.getElementById("4_output_termos") as HTMLOutputElement
                },
                button: document.getElementById("4_button") as HTMLButtonElement
            };

            e4.button.onclick = () => {
                const value = parseFloat(e4.input.argumento.value);
                const precision = parseFloat(e4.input.tolerancia.value);

                const preciseSin = Math.sin(value);
                let sin = 0;
                let i:number;
                for(
                    i = 0;
                    sin > preciseSin + precision || sin < (preciseSin - precision) && i < 1000000; 
                    i++
                ){
                    const c = 2*i + 1;
                    const a = (value**c)/factorialize(c);
                    if(i % 2){
                        sin -= a;
                    } else {
                        sin += a;
                    }
                }

                e4.output.exato.value = preciseSin.toString();
                e4.output.termos.value = i.toString();
                if(i >= 1000000){
                    e4.output.aproximado.value = "Error.";    
                } else {
                    e4.output.aproximado.value = sin.toString();
                }
            }
        }, []);

        return <section>
            <p>
                O seno de um ângulo (em radianos) pode ser estimado através da série: 
                <br/>
                Faça um programa que contenha uma função que retorne o número de termos necessários para que o seno de seja calculado corretamente com uma tolerância menor do que .
            </p>
            Argumento:<br/>
            <input id="4_input_argumento"/><br/>
            Tolerância:<br/>
            <input id="4_input_tolerancia"/><br/>
            <button id="4_button">calcula</button><br/>
            Valor exato:<br/>
            <output id="4_output_exato"></output><br/>
            Valor aproximado:<br/>
            <output id="4_output_aproximado"></output><br/>
            Número de termos:<br/>
            <output id="4_output_termos"></output>
        </section>
    },
    () => {
        useEffect(() => {
            if(typeof window?.MathJax !== "undefined"){
                window.MathJax.typeset()
            }

            const e5 = {
                input: {
                    a_o: document.getElementById("5_input_a0") as HTMLInputElement,
                    omega: document.getElementById("5_input_omega") as HTMLInputElement,
                    b: document.getElementById("5_input_b") as HTMLInputElement,
                    error: document.getElementById("5_input_error") as HTMLInputElement
                },
                output: document.getElementById("5_output") as HTMLOutputElement,
                button: document.getElementById("5_button") as HTMLButtonElement
            }

            e5.button.onclick = () => {
                const mola = new OHA(
                    parseFloat(e5.input.a_o.value),
                    parseFloat(e5.input.omega.value),
                    parseFloat(e5.input.b.value),
                );
                const tolerance = parseFloat(e5.input.error.value);
                const a2 =  mola.a_o / 2; // Metade da amplitude inicial
                if(Math.abs(tolerance) >= a2){
                    e5.output.value = "Tolerance too big!";
                    return false;
                }

                const intervalo = [0, Math.abs(Math.PI/(2*mola.omega))]; // A primeira vez que a mola atingir 1/2 da sua amplitude, ela estara dentro desse intervalo.   
                let timeTest = (intervalo[1]-intervalo[0])/2;
                let value = mola.amplitude(timeTest);
                let i:number;

                console.log(`t = ${timeTest}\na = ${value}\n ${intervalo[0]} | ${intervalo[1]}\n\n`);
                for(i = 0;(value > a2+tolerance || value < a2-tolerance) && i<1000; i++){
                    if(value > a2){
                        intervalo[0] = timeTest;
                    } else if (value < a2){
                        intervalo[1] = timeTest;
                    }
                    timeTest = (intervalo[1]-intervalo[0])/2+intervalo[0];
                    value = mola.amplitude(timeTest);
                }
                if(i >= 1000){
                    e5.output.value = "Infinite Loop";
                    return false;
                }

                e5.output.innerHTML = `<br>t = ${timeTest} ± ${(intervalo[1]-intervalo[0])/2}<br>a = ${value} ± ${tolerance}`
                return true;
            }
        }, []);

        return <section>
            <p>
                Considere um oscilador harmônico amortecido cuja amplitude em função do tempo é dada por:
                {`\\[
                a(t) = a_0 cos(\\omega t)e^{-bt}
                \\]`}
                Faça um programa que contenha uma função que receba como parâmetros a amplitude inicial , a frequência angular , o coeficiente de amortecimento e o tempo e retorne o valor da amplitude nesse instante para esses parâmetros, ou crie uma classe OHA cujo construtor recebe estes parâmetros e que tenha um método que recebe o tempo e retorna a amplitude para objetos instanciados a partir da classe.
                <br/>
                Utilize a sua função/classe com , e para determinar o instante em que a amplitude da oscilação atinge, pela primeira vez, a metade da amplitude inicial. Note que esta pergunta tem, em princípio, uma resposta bem definida (há um instante em que isto acontece) mas requer mais detalhes para ser respondida computacionalmente: com que precisão? Precisão na amplitude? Precisão no tempo? Faça e justifique as suas escolhas.
                <br/>
                t1/2 = (0,54 ± 0,01) s
            </p>
            Amplitude Inicia:<input id="5_input_a0"/>
            Frequência Angular:<input id="5_input_omega"/>
            coeficiente de Amortecimento:<input id="5_input_b"/>
            Tolerancia: <input id="5_input_error"/><br/>
            <button id="5_button">Calcular</button><br/>
            tempo de meia aplitude:
            <output id="5_output"></output>
        </section>
    }
]
enum numberTypes {"binary", "decimal", "hexadecimal"};
const numbers = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
];
const letters = [
    "a", "b", "c", "d", "e", "f"
];

//
// Exercício 1
//
function verifyBinary(num:string) {
    for(let i = 0; i < num.length; i++){
        if(num[i] != "0" && num[i] != "1"){
            return false;
        }
    }

    return true;
}
function verifyDecimal(num:string) {
    for(let i = 0; i < num.length; i++){
        let j
        for(j = 0; j < numbers.length; j++){
            if(num[i] == numbers[j]){
                break;
            }
        }
        if(j >= numbers.length){
            return false;
        }
    }

    return true;
}
function verifyHexadecimal(num:string){
    for(let i = 0; i < num.length; i++){
        let j;
        for(j = 0; j < numbers.length; j++){
            if(num[i] == numbers[j]){
                break;
            }
        }
        if(j >= numbers.length){
            let k;
            for(k = 0; k < letters.length; k++){
                if(num[i] == letters[k]){
                    break;
                }
            }
            if(k >= letters.length){
                return false;
            }
        }
    }

    return true;
}
function verifyNumberType(number:string, type:numberTypes){
    switch (type) {
        case numberTypes.binary:
            return verifyBinary(number);
        case numberTypes.decimal:
            return verifyDecimal(number);
        case numberTypes.hexadecimal:
            return verifyHexadecimal(number);
    }
}
function stringToNumber(s:string, type:numberTypes){
    let number = 0;

    switch (type){
        case numberTypes.binary:
            for(let i = s.length-1; i >= 0 ; i--){
                if(s[i] == "1"){
                    number += 2**(s.length-1-i);
                }
            }
            return number;
        case numberTypes.decimal:
            return parseInt(s);
        case numberTypes.hexadecimal:
            return number;
    }
}
function numberToString(n:number, type: numberTypes){
    switch (type){
        case numberTypes.binary:
            return n.toString(2);
        case numberTypes.decimal:
            return n.toString();
        case numberTypes.hexadecimal:
            return n.toString(16);
    }
}
function calculateConversion(s:string, input:numberTypes, output:numberTypes){
    if(s.length <= 0){
        return "";
    }
    if(!verifyNumberType(s, input)){
        return "Incomparable input.";
    }
    let number = stringToNumber(s, input);
    return numberToString(number,output);
}

//
// Exercício 2
//
function digitoVerificador(input:string){
    let number = 0;
    for(let i = 0; i < input.length; i++){
        number += parseInt(input[i])*(i+2);
    }
    return number % 10;
}

//
// Exercício 3
//
function quantNumerosVerificadores(e3: {
    output: {
        n0: HTMLOutputElement;
        n5: HTMLOutputElement;
        n9: HTMLOutputElement;
    };
}){
    const quant:number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for(let i = 20130401; i < 20130500; i++){
        const verificador = digitoVerificador(i.toString());
        quant[verificador]++;
    }

    e3.output.n0.value = quant[0].toString();
    e3.output.n5.value = quant[5].toString();
    e3.output.n9.value = quant[9].toString();
}

//
// Exercício 4
//
function factorialize(num:number):number {
    if (num < 0) {
        return -1;
    } else if (num == 0) { 
        return 1;      
    } else {
        return (num * factorialize(num - 1));
    }
}

//
// Exercício 5
//
class OHA {
    a_o:number;
    omega:number;
    b:number;
    constructor(a_o:number, omega:number, b:number){
        this.a_o = a_o;
        this.omega = omega;
        this.b = b;
    }
    amplitude(t:number){
        return this.a_o*Math.cos(this.omega*t)*Math.exp(-1*this.b*t);
    }
}