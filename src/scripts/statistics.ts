import { randomNumberArray } from "./numerosAleatorios";
import { getLast } from "./arrayManipulation";

// retorna a média dos elementos de "arr"
export function average(arr:number[]){
    let avr = 0;
    arr.map(a => avr+= a);
    avr /= arr.length;

    return avr;
}

// retorna o desvio padrão do conjunto "arr"
export function stdDeviation(arr:number[], avr_?:number){
    const avr = avr_ != undefined?avr_:average(arr);
    let std = 0;
    for(let i = 0; i < arr.length; i++){
        let a = arr[i]-avr;
        std += a*a;
    }
    return Math.sqrt(std/(arr.length-1))
}

// Retorna uma array com f(x) tendo x = [a, b] com "size" quantidade de elementos.
export function genFuncTable(a:number, b:number, size:number, f:(x:number)=>number){
    const x:number[] = [];
    const y:number[] = [];

    if(a > b){
        const c = b;
        b = a;
        a = c;
    }

    let i = 0;
    for(let t = a; t <= b; t+=b/(size)){
        x[i] = t;
        y[i] = f(t);
        i++;
    }

    return [x, y];
}

// Retona um array com a quantidade de vezes que determinado intervalo numerico esta em "arr"
export function returnStatics(a:number, b:number, step:number, arr:number[]){
    const count:number[] = [];
    if(step <= 0){
        return count;
    }
    const stepInver = 1/step;

    // Preenche count com zeros
    for(let i =0; i < (b-a)*stepInver; i++){
        count[i] = 0;
    }

    arr.map((value) => {
        const index = Math.floor((value-a)*stepInver);
        count[index]++;
    })

    return count;
}

export function linearInterpolation(fa:number, fb:number, xa:number, xb:number, x:number){
    if(xb === xa){
        return null;
    }

    return fa + ((fb-fa)/(xb-xa))*(x-xa);
}
export function returnInterpolation(x:number[], f:number[]){
    if(f.length < x.length){
        return undefined;
    }
    const data1dInterpolated:{x:number[], f:(number|null)[]} = {x:[], f:[]};

    for(let i = 0; i < x.length-1; i++){
        const j = 2*i;
        const xa = x[i];
        const xb = x[i+1];
        const ya = f[i];
        const yb = f[i+1];

        data1dInterpolated.x[j] = x[i];
        data1dInterpolated.f[j] = f[i];
        data1dInterpolated.x[j+1] = (xa+xb)/2;
        data1dInterpolated.f[j+1] = linearInterpolation(ya, yb, xa, xb, data1dInterpolated.x[j+1]);
    }
    const i = x.length-1;
    data1dInterpolated.x[i*2] = x[i];
    data1dInterpolated.f[i*2] = f[i];

    return data1dInterpolated;
}

export function linearInterpolation2D(x:number[], y:number[], f:number[][], p:{x:number, y:number}){
    if(
        y.length < 2 || 
        x.length < 2 || 
        f.length < 2 || 
        f[0].length < 2 || 
        f[1].length < 2
    ){
        return null;
    }

    const d = (p.x - x[0])/(x[1]-x[0]);
    const q = (p.y - y[0])/(y[1]-y[0]);

    return (
        (1-d)*(1-q)*f[0][0] + 
        d*(1-q)*f[1][0] + 
        (1-d)*q*f[0][1] + 
        d*q*f[1][1]
    );
}
export function returnInterpolation2D(x:number[], y:number[], f:number[][]){
    const data:{
        x:number[],
        y:number[],
        f:(number|null)[][]
    } = {x:[], y:[], f:[]};
    for(let i = 0; i < x.length-1; i++){
        data.x[2*i] = x[i];
        data.x[2*i+1] = (x[i+1]+x[i])/2;
    }
    data.x[data.x.length] = getLast(x);
    for(let i = 0; i < y.length-1; i++){
        data.y[2*i] = y[i]
        data.y[2*i+1] = (y[i+1]+y[i])/2;
    }
    data.y[data.y.length] = getLast(y);


    for(let i = 0; i < data.x.length; i++){
        const oldI = Math.floor(i/2);
        data.f[i] = [];

        for(let j = 0; j < data.y.length; j++){
            const oldJ = Math.floor(j/2);

            if((i%2 === 0 && j%2 === 0)||oldI >= x.length-1||oldJ >= y.length-1){
                data.f[i][j] = f[oldI][oldJ];
            } else {
                const xp = [x[oldI], x[oldI+1]]
                const yp = [y[oldJ], y[oldJ+1]]
                const fp = [
                    [f[oldI][oldJ], f[oldI][oldJ+1]],
                    [f[oldI+1][oldJ], f[oldI+1][oldJ+1]]
                ]
                const p = {
                    x: data.x[i],
                    y: data.y[j]
                }

                data.f[i][j] = linearInterpolation2D(xp, yp, fp, p);
            }
        }
    }

    return data;
}

export function linearInterpolation3D(x:number[], y:number[], z:number[], f:number[][][], p:{x:number, y:number, z:number}){
    if(
        x.length<2 || 
        y.length<2 || 
        z.length<2 || 
        f.length<2 ||
        f[0].length<2 ||
        f[1].length<2 ||
        f[0][0].length<2 ||
        f[1][0].length<2 ||
        f[0][1].length<2 ||
        f[1][1].length<2
    ){
        return null;
    }

    const d = {
        x:(p.x-x[0])/(x[1]-x[0]),
        y:(p.y-y[0])/(y[1]-y[0]),
        z:(p.z-z[0])/(z[1]-z[0])
    };

    const g:number[][] = [];
    g[0] = [];
    g[1] = [];
    g[2] = [];

    g[1][1] = f[0][0][0]*(1-d.x) + f[1][0][0]*d.x;
    g[1][2] = f[0][0][1]*(1-d.x) + f[1][0][1]*d.x;
    g[2][1] = f[0][1][0]*(1-d.x) + f[1][1][0]*d.x;
    g[2][2] = f[0][1][1]*(1-d.x) + f[1][1][1]*d.x;

    g[0][1] = g[1][1]*(1-d.y) + g[2][1]*d.y;
    g[0][2] = g[1][2]*(1-d.y) + g[2][2]*d.y;

    g[0][0] = g[0][1]*(1-d.z) + g[0][2]*d.z;

    return g[0][0];
}
export function returnInterpolation3D(x:number[], y:number[], z:number[], f:number[][][]){
    const data:{
        x:number[],
        y:number[],
        z:number[]
        f:(number|null)[][][]
    } = {x:[], y:[], z:[], f:[]};

    for(let i = 0; i < x.length-1; i++){
        data.x[2*i] = x[i];
        data.x[2*i+1] = (x[i+1]+x[i])/2;
    }
    for(let i = 0; i < y.length-1; i++){
        data.y[2*i] = y[i];
        data.y[2*i+1] = (y[i+1]+y[i])/2;
    }
    for(let i = 0; i < z.length-1; i++){
        data.z[2*i] = z[i];
        data.z[2*i+1] = (z[i+1]+z[i])/2;
    }


    for(let i = 0; i < data.x.length; i++){
        const oldI = Math.floor(i/2);
        data.f[i] = [];

        for(let j = 0; j < data.y.length; j++){
            const oldJ = Math.floor(j/2);
            data.f[i][j] = [];

            for(let k = 0; k < data.z.length; k++){
                const oldK = Math.floor(j/2);
                
                if(
                    (i%2 === 0 && j%2 === 0 && k%2 === 0)||
                    oldI >= x.length-1||
                    oldJ >= y.length-1||
                    oldK >= z.length-1
                ){
                    data.f[i][j][k] = f[oldI][oldJ][oldK];
                } else {
                    const xp = [x[oldI], x[oldI+1]];
                    const yp = [y[oldJ], y[oldJ+1]];
                    const zp = [z[oldK], z[oldK+1]];
                    const fp = [
                        [
                            [f[oldI][oldJ][oldK], f[oldI][oldJ][oldK+1]],
                            [f[oldI][oldJ+1][oldK], f[oldI][oldJ+1][oldK+1]]
                        ],
                        [
                            [f[oldI+1][oldJ][oldK], f[oldI+1][oldJ][oldK+1]],
                            [f[oldI+1][oldJ+1][oldK], f[oldI+1][oldJ+1][oldK+1]]
                        ]
                    ];
                    const p = {
                        x: data.x[i],
                        y: data.y[j],
                        z: data.z[k]
                    }
                    
                    data.f[i][j][k] = linearInterpolation3D(xp, yp, zp,fp, p);
                }
                
            }
        }
    }

    return data;
}

export function getNormalizationConst(table:{x:number[], y:number[]}){
    let a = 0;
    const last = table.x.length-1;

    for(let i = 0; i < last; i++){
        const deltaX = (table.x[i+1]-table.x[i]);
        a += table.y[i]*deltaX;
    }
    a += table.y[last]*(table.x[last]-table.x[last-1])

    return a
}

export function calculateProbabilityDistribution(table:{x:number[], y:number[]}, normalizeConst?:number){   //p(x)dy
    const dist:number[] = []
    const a = normalizeConst!==undefined?normalizeConst:getNormalizationConst(table);
    const last = table.x.length-1;

    for(let i = 0; i < last; i++){
        const deltaX = (table.x[i+1]-table.x[i]);
        dist[i] = table.y[i]*deltaX/a;
    }
    dist[last] = table.y[last]*(table.x[last]-table.x[last-1])/a;

    return dist;
}

export function calculateFda(y:number[]){   //fda(x)
    const fda:number[] = [y[0]];
    for(let i = 1; i < y.length; i++){
        fda[i] = fda[i-1]+y[i];
    }

    return fda;
}

//TODO: melhorar isso, esta O(n)
function getIntervalFda(fda:number[], x:number){
    let i:number;
    for(i = 0; fda[i] <= x && i < fda.length; i++){}

    return [i-1, i];
}

export function probabilityTransformation(p:{x:number[], y:number[]}, size:number, funcDA?:number[], interpolation:boolean = true){
    const randNumbers = randomNumberArray(0, 1, size);
    const fda = funcDA === undefined?calculateFda(calculateProbabilityDistribution(p)):funcDA;

    for(let i = 0;i < randNumbers.length; i++){
        const n = randNumbers[i];
        const inter = getIntervalFda(fda, n);

        if(!interpolation){
            randNumbers[i] = p.x[inter[0]];
        } else {
            randNumbers[i] = linearInterpolation(p.x[inter[0]], p.x[inter[1]], fda[inter[0]], fda[inter[1]], n)!;
        }
    }

    return randNumbers;
}

// Linearização por quadrados minimos
export function leastSquares(x:number[], y:number[], sigma?:number[]){
    if(x.length !== y.length){
        return null
    }
    const N = x.length;

    let S = 0;
    let S_x = 0;
    let S_y = 0;
    let S_x2 = 0;
    let S_y2 = 0;
    let S_xy = 0;
    if(sigma === undefined){
        S = N;
        for(let i = 0; i < N; i++){
            S_x += x[i];
            S_y += y[i];
            S_x2 += x[i]*x[i];
            S_y2 += y[i]*y[i];
            S_xy += x[i]*y[i];
        }
    } else {
        if(sigma.length !== N){
            return null;
        }
        for(let i = 0; i < N; i++){
            const s_sqr_inv = sigma[i]!=0?1/sigma[i]*sigma[i]:1;
            S += s_sqr_inv;
            S_x += x[i]*s_sqr_inv;
            S_y += y[i]*s_sqr_inv;
            S_x2 += x[i]*x[i]*s_sqr_inv;
            S_y2 += y[i]*y[i]*s_sqr_inv;
            S_xy += x[i]*y[i]*s_sqr_inv;
        }
    }

    const c = 1/(S*S_x2-(S_x*S_x));
    return {
        A: (S_y*S_x2-S_x*S_xy)*c,
        B: (S*S_xy - S_x*S_y)*c,
        R: (N*S_xy-S_x*S_y)/Math.sqrt((N*S_x2-(S_x*S_x))*(N*S_y2-(S_y*S_y)))
    };
}