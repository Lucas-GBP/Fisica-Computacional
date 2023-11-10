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