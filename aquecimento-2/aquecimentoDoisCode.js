"use strict";
//
// HTML Elements and Constants
//
const e2_1 = {
    output: {
        bit: document.getElementById("1_output_bit"),
        byte: document.getElementById("1_output_byte")
    },
    button: {
        bit: document.getElementById("1_button_bit"),
        byte: document.getElementById("1_button_byte")
    }
};
const e2_2 = {
    output: {
        A: document.getElementById("2_output_A"),
        C: document.getElementById("2_output_C"),
        G: document.getElementById("2_output_G"),
        T: document.getElementById("2_output_T"),
    }
};
const e2_3 = {
    output: document.getElementById("3_output"),
    button: document.getElementById("3_button")
};
const e2_4 = {
    output: document.getElementById("4_output"),
    button: document.getElementById("4_button")
};
const e2_5 = {
    output: document.getElementById("5_output"),
    button: document.getElementById("5_button")
};
const e2_6 = {
    output: document.getElementById("6_output"),
    button: document.getElementById("6_button")
};
const e2_7 = {
    input: {
        distancia: document.getElementById("7_input_distancia"),
        raio: document.getElementById("7_input_raio")
    },
    output: {
        angulos: document.getElementById("7_output_angulos"),
        detectado: document.getElementById("7_output_detectado")
    },
    button: document.getElementById("7_button")
};
const e2_8 = {
    input: document.getElementById("8_input"),
    output: {
        complexo: document.getElementById("8_output_complexo"),
        boolean: document.getElementById("8_output_boolean")
    },
    button: document.getElementById("8_button")
};
//
//Numeros Aleatórios
//
function randomNumber(v) {
    if (v !== undefined) {
        return Math.random() * (v.max - v.min) + v.min;
    }
    return Math.random();
}
function randomIntegerNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max + 1);
    return Math.floor(Math.random() * (max - min) + min);
}
//
// Questão 1
//
function genBit() {
    return Math.floor(Math.random() * 2);
}
function genByte() {
    return Math.floor(Math.random() * 256);
}
function genStringByte() {
    const number = genByte();
    let byte = number.toString(2);
    while (byte.length < 8) {
        byte = "0" + byte;
    }
    return byte;
}
e2_1.button.bit.onclick = () => {
    e2_1.output.bit.value = genBit().toString();
};
e2_1.button.byte.onclick = () => {
    e2_1.output.byte.value = genStringByte();
};
//
// Questão 2
//
function quantATCG() {
    const letters = {
        "A": 0,
        "T": 0,
        "C": 0,
        "G": 0
    };
    for (let i = 0; i < 1000000; i++) {
        const byte = genByte();
        for (const a in letters) {
            if (a.charCodeAt(0) == byte) {
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
function randomCirclePoint() {
    const angle = randomNumber({ min: -2 * Math.PI, max: 2 * Math.PI });
    const point = [
        Math.cos(angle),
        Math.sin(angle)
    ];
    return point;
}
e2_3.button.onclick = () => {
    const point = randomCirclePoint();
    e2_3.output.value = `(${point[0]}, ${point[1]})`;
};
//
// Questão 4
//
function randomPointTriangle() {
    let x = randomNumber({ min: -1 / 2, max: 1 / 2 });
    let y;
    const sqrt3 = Math.sqrt(3);
    const a = -sqrt3 / 6;
    if (x >= 0) {
        y = randomNumber({
            min: a,
            max: (sqrt3 / 3) - (sqrt3 * x)
        });
    }
    else {
        y = randomNumber({
            min: a,
            max: (sqrt3 / 3) + (sqrt3 * x)
        });
    }
    return [x, y];
}
e2_4.button.onclick = () => {
    const point = randomPointTriangle();
    e2_4.output.value = `(${point[0]}, ${point[1]})`;
};
//
// Questão 5
//
function randomWeightNumber(maxNumber) {
    let maxTest = 0;
    for (let i = 1; i <= maxNumber; i++) {
        maxTest += i;
    }
    const test = randomIntegerNumber(1, maxTest);
    const range = [1, 1];
    let number = 1;
    while (test < range[0] || test > range[1]) {
        range[0] = range[1] + 1;
        range[1] = range[0] + number;
        number++;
    }
    return number;
}
e2_5.button.onclick = () => {
    const values = [0, 0, 0, 0];
    for (let i = 0; i < 1000; i++) {
        values[randomWeightNumber(4) - 1]++;
    }
    e2_5.output.value = `${values[0]} : ${values[1]} : ${values[2]} : ${values[3]}`;
};
//
// Questão 6
//
function randomAngles() {
    const a = Math.PI / 2;
    return [
        randomNumber({
            min: -a,
            max: a
        }),
        randomNumber({
            min: 0,
            max: 2 * Math.PI
        })
    ];
}
e2_6.button.onclick = () => {
    const angles = randomAngles();
    e2_6.output.value = `(${angles[0]}, ${angles[1]})`;
};
//
// Questão 7
//
function particleDetector(d, r) {
    const angles = randomAngles();
    let data = {
        angles: angles,
        detected: false
    };
    if (d * Math.tan(angles[0]) <= r) {
        data.detected = true;
    }
    return data;
}
e2_7.button.onclick = () => {
    const data = particleDetector(parseFloat(e2_7.input.distancia.value), parseFloat(e2_7.input.raio.value));
    e2_7.output.angulos.value = `(${data.angles[0]}, ${data.angles[1]})`;
    e2_7.output.detectado.value = data.detected ? "true" : "false";
};
function randomComplexNumber() {
    return {
        real: randomNumber({ min: -2, max: 2 }),
        complex: randomNumber({ min: -2, max: 2 })
    };
}
function conjuntoMandelBrot(c, interactions) {
    const z = {
        real: 0,
        complex: 0
    };
    for (let i = 0; i < interactions; i++) {
        const newZ = {
            real: z.real * z.real - z.complex * z.complex + c.real,
            complex: 2 * z.real * z.complex + c.complex
        };
        z.real = newZ.real;
        z.complex = newZ.complex;
        if (Math.sqrt(z.real * z.real + z.complex * z.complex) < 2) {
            return false;
        }
    }
    return true;
}
e2_8.button.onclick = () => {
    const c = randomComplexNumber();
    const result = conjuntoMandelBrot(c, parseInt(e2_8.input.value));
    e2_8.output.complexo.value = `(${c.real}, ${c.complex} i)`;
    e2_8.output.boolean.value = result ? "true" : "false";
};
