export type wave = {
    k:number,   //frequência
    a:number    //amplitude
}
export const wavesArray:wave[] = [
    {k:5, a:0.5},
    {k:6, a:0.6},
    {k:7, a:0.7},
    {k:8, a:0.8},
    {k:9, a:0.9},
    {k:10, a:1.0},
    {k:11, a:0.9},
    {k:12, a:0.8},
    {k:13, a:0.7},
    {k:14, a:0.6},
    {k:15, a:0.5},
]

export function waveSum(waves: wave[], time_0:number, time_f:number, step:number){
    const values:{x:number[], y:number[]}= {x: [], y: []};

    if(step <= 0){
        return values;
    }

    let i = 0
    for(let t = time_0; t < time_f; t += step){
        values.x[i] = t;

        values.y[i] = 0;
        for(let j = 0; j < waves.length; j++){
            values.y[i] += waves[j].a*Math.cos(waves[j].k*t);
        }

        i++;
    }

    return values;
}