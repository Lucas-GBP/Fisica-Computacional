import { randomNumberArray } from "./numerosAleatorios";

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

export function linearInterpolation(xa:number, xb:number, ya:number, yb:number, x:number){
    return xa + ((xb-xa)/(yb-ya))*(x-ya);
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
            randNumbers[i] = linearInterpolation(p.x[inter[0]], p.x[inter[1]], fda[inter[0]], fda[inter[1]], n);
        }
    }
    console.log(randNumbers);

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