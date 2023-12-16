export type matrix = number[][];
export type vector = number[];
export enum n{x=0, y=1, z=2}

export function scalarVecMult(v:vector, a:number):vector{
    return v.map(i => i*a);
}

export function vectorAdd(v1:vector, v2:vector):vector{
    if (v1.length !== v2.length) {
        throw new Error('Vetores incompativeis');
    }

    return v1.map((value, index) => value+v2[index]);
}

export function vectorSub(v1:vector, v2:vector):vector{
    if (v1.length !== v2.length) {
        throw new Error('Vetores incompativeis');
    }

    return v1.map((value, index) => value-v2[index]);
}


export function matrixMult(m1:matrix, m2:matrix) {
    const rowsM1 = m1.length;
    const colsM1 = m1[0].length;
    const rowsM2 = m2.length;
    const colsM2 = m2[0].length;

    if (colsM1 !== rowsM2) {
        throw new Error('Matrizes incompativeis');
    }

    const result:matrix = new Array(rowsM1);
    for (let i = 0; i < rowsM1; i++) {
        result[i] = new Array(colsM2).fill(0);
    }

    for (let i = 0; i < rowsM1; i++) {
        for (let j = 0; j < colsM2; j++) {
            for (let k = 0; k < colsM1; k++) {
                result[i][j] += m1[i][k] * m2[k][j];
            }
        }
    }

    return result;
}

export function matrixAddition(m1:matrix, m2:matrix) {
    const rows = m1.length;
    const cols = m1[0].length;

    if (rows !== m2.length || cols !== m2[0].length) {
        throw new Error('Matrizes incompativeis');
    }

    const result:matrix = new Array(rows);
    for (let i = 0; i < rows; i++) {
        result[i] = new Array(cols);
        for (let j = 0; j < cols; j++) {
            result[i][j] = m1[i][j] + m2[i][j];
        }
    }

    return result;
}
  
export function matrixSubtraction(m1:matrix, m2:matrix) {
    const rows = m1.length;
    const cols = m1[0].length;

    if (rows !== m2.length || cols !== m2[0].length) {
        throw new Error('Matrizes incompativeis');
    }

    const result:matrix = new Array(rows);
    for (let i = 0; i < rows; i++) {
        result[i] = new Array(cols);
        for (let j = 0; j < cols; j++) {
            result[i][j] = m1[i][j] - m2[i][j];
        }
    }

    return result;
}

export function transVectorMatrix(v:vector):matrix {
    const m:matrix = [];

    v.map((value, index)=> {
        m[index] = [];
        m[index][0] = value;
    });

    return m;
}

export function transMatrixVector(m:matrix):vector {
    const v:vector = [];
    m.map((row, index)=> {
        v[index] = row[0];
    })
    return v
}

export function crossProduct(v1: vector, v2: vector): vector{
    if (v1.length !== 3 || v2.length !== 3) {
        throw new Error('Vetores incompativeis');
    }
  
    const result = [
        v1[1] * v2[2] - v1[2] * v2[1],
        v1[2] * v2[0] - v1[0] * v2[2],
        v1[0] * v2[1] - v1[1] * v2[0],
    ];
  
    return result;
}

export function modulo(v:vector):number{
    let sum = 0;
    v.map((i) => {
        sum += i*i;
    })

    return Math.sqrt(sum);
}

export function normalizeV(v:vector):vector{
    const mod = modulo(v);

    return scalarVecMult(v, 1/mod);
}