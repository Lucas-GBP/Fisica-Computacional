"use strict";
console.log("Hello World!");
//
// HTML Elements and Constants
//
const e1 = {
    input: document.getElementById("1_input"),
    output: document.getElementById("1_output"),
    button: {
        binDec: document.getElementById("1_button_binDec"),
        decBin: document.getElementById("1_button_decBin"),
        binHex: document.getElementById("1_button_binHex"),
        decHex: document.getElementById("1_button_decHex")
    }
};
const e2 = {
    input: document.getElementById("2_input"),
    output: document.getElementById("2_output"),
    button: document.getElementById("2_button")
};
const e3 = {
    output: {
        n0: document.getElementById("3_output_n0"),
        n5: document.getElementById("3_output_n5"),
        n9: document.getElementById("3_output_n9"),
    }
};
const e4 = {
    input: {
        argumento: document.getElementById("4_input_argumento"),
        tolerancia: document.getElementById("4_input_tolerancia")
    },
    output: {
        exato: document.getElementById("4_output_exato"),
        aproximado: document.getElementById("4_output_aproximado"),
        termos: document.getElementById("4_output_termos")
    },
    button: document.getElementById("4_button")
};
const e5 = {
    input: {
        a_o: document.getElementById("5_input_a0"),
        omega: document.getElementById("5_input_omega"),
        b: document.getElementById("5_input_b"),
        error: document.getElementById("5_input_error")
    },
    output: document.getElementById("5_output"),
    button: document.getElementById("5_button")
};
var numberTypes;
(function (numberTypes) {
    numberTypes[numberTypes["binary"] = 0] = "binary";
    numberTypes[numberTypes["decimal"] = 1] = "decimal";
    numberTypes[numberTypes["hexadecimal"] = 2] = "hexadecimal";
})(numberTypes || (numberTypes = {}));
;
const numbers = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
];
const letters = [
    "a", "b", "c", "d", "e", "f"
];
//
// Exercício 1
//
function verifyBinary(num) {
    for (let i = 0; i < num.length; i++) {
        if (num[i] != "0" && num[i] != "1") {
            return false;
        }
    }
    return true;
}
function verifyDecimal(num) {
    for (let i = 0; i < num.length; i++) {
        let j;
        for (j = 0; j < numbers.length; j++) {
            if (num[i] == numbers[j]) {
                break;
            }
        }
        if (j >= numbers.length) {
            return false;
        }
    }
    return true;
}
function verifyHexadecimal(num) {
    for (let i = 0; i < num.length; i++) {
        let j;
        for (j = 0; j < numbers.length; j++) {
            if (num[i] == numbers[j]) {
                break;
            }
        }
        if (j >= numbers.length) {
            let k;
            for (k = 0; k < letters.length; k++) {
                if (num[i] == letters[k]) {
                    break;
                }
            }
            if (k >= letters.length) {
                return false;
            }
        }
    }
    return true;
}
function verifyNumberType(number, type) {
    switch (type) {
        case numberTypes.binary:
            return verifyBinary(number);
        case numberTypes.decimal:
            return verifyDecimal(number);
        case numberTypes.hexadecimal:
            return verifyHexadecimal(number);
    }
}
function stringToNumber(s, type) {
    let number = 0;
    switch (type) {
        case numberTypes.binary:
            for (let i = s.length - 1; i >= 0; i--) {
                if (s[i] == "1") {
                    number += 2 ** (s.length - 1 - i);
                }
            }
            return number;
        case numberTypes.decimal:
            return parseInt(s);
        case numberTypes.hexadecimal:
            return number;
    }
}
function numberToString(n, type) {
    switch (type) {
        case numberTypes.binary:
            return n.toString(2);
        case numberTypes.decimal:
            return n.toString();
        case numberTypes.hexadecimal:
            return n.toString(16);
    }
}
function calculateConversion(s, input, output) {
    if (s.length <= 0) {
        return "";
    }
    if (!verifyNumberType(s, input)) {
        return "Incomparable input.";
    }
    let number = stringToNumber(s, input);
    return numberToString(number, output);
}
e1.button.binDec.onclick = () => {
    e1.output.value = calculateConversion(e1.input.value, numberTypes.binary, numberTypes.decimal);
};
e1.button.binHex.onclick = () => {
    e1.output.value = calculateConversion(e1.input.value, numberTypes.binary, numberTypes.hexadecimal);
};
e1.button.decBin.onclick = () => {
    e1.output.value = calculateConversion(e1.input.value, numberTypes.decimal, numberTypes.binary);
};
e1.button.decHex.onclick = () => {
    e1.output.value = calculateConversion(e1.input.value, numberTypes.decimal, numberTypes.hexadecimal);
};
//
// Exercício 2
//
function digitoVerificador(input) {
    let number = 0;
    for (let i = 0; i < input.length; i++) {
        number += parseInt(input[i]) * (i + 2);
    }
    return number % 10;
}
e2.button.onclick = () => {
    const input = e2.input.value;
    if (!verifyDecimal(input)) {
        e2.output.value = "Invalid Input.";
    }
    e2.output.value = digitoVerificador(input).toString();
};
//
// Exercício 3
//
function quantNumerosVerificadores() {
    const quant = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 20130401; i < 20130500; i++) {
        const verificador = digitoVerificador(i.toString());
        quant[verificador]++;
    }
    e3.output.n0.value = quant[0].toString();
    e3.output.n5.value = quant[5].toString();
    e3.output.n9.value = quant[9].toString();
}
quantNumerosVerificadores();
//
// Exercício 4
//
function factorialize(num) {
    if (num < 0) {
        return -1;
    }
    else if (num == 0) {
        return 1;
    }
    else {
        return (num * factorialize(num - 1));
    }
}
e4.button.onclick = () => {
    const value = parseFloat(e4.input.argumento.value);
    const precision = parseFloat(e4.input.tolerancia.value);
    const preciseSin = Math.sin(value);
    let sin = 0;
    let i;
    for (i = 0; sin > preciseSin + precision || sin < (preciseSin - precision) && i < 1000000; i++) {
        const c = 2 * i + 1;
        const a = (value ** c) / factorialize(c);
        if (i % 2) {
            sin -= a;
        }
        else {
            sin += a;
        }
    }
    e4.output.exato.value = preciseSin.toString();
    e4.output.termos.value = i.toString();
    if (i >= 1000000) {
        e4.output.aproximado.value = "Error.";
    }
    else {
        e4.output.aproximado.value = sin.toString();
    }
};
//
// Exercício 5
//
class OHA {
    constructor(a_o, omega, b) {
        this.a_o = a_o;
        this.omega = omega;
        this.b = b;
    }
    amplitude(t) {
        return this.a_o * Math.cos(this.omega * t) * Math.exp(-1 * this.b * t);
    }
}
e5.button.onclick = () => {
    const mola = new OHA(parseFloat(e5.input.a_o.value), parseFloat(e5.input.omega.value), parseFloat(e5.input.b.value));
    const tolerance = parseFloat(e5.input.error.value);
    const a2 = mola.a_o / 2; // Metade da amplitude inicial
    if (Math.abs(tolerance) >= a2) {
        e5.output.value = "Tolerance too big!";
        return false;
    }
    const intervalo = [0, Math.abs(Math.PI / (2 * mola.omega))]; // A primeira vez que a mola atingir 1/2 da sua amplitude, ela estara dentro desse intervalo.   
    let timeTest = (intervalo[1] - intervalo[0]) / 2;
    let value = mola.amplitude(timeTest);
    let i;
    console.log(`t = ${timeTest}\na = ${value}\n ${intervalo[0]} | ${intervalo[1]}\n\n`);
    for (i = 0; (value > a2 + tolerance || value < a2 - tolerance) && i < 1000; i++) {
        if (value > a2) {
            intervalo[0] = timeTest;
        }
        else if (value < a2) {
            intervalo[1] = timeTest;
        }
        timeTest = (intervalo[1] - intervalo[0]) / 2 + intervalo[0];
        value = mola.amplitude(timeTest);
    }
    if (i >= 1000) {
        e5.output.value = "Infinite Loop";
        return false;
    }
    e5.output.innerHTML = `<br>t = ${timeTest} ± ${(intervalo[1] - intervalo[0]) / 2}<br>a = ${value} ± ${tolerance}`;
    return true;
};
