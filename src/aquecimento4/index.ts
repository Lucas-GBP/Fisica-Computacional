import Plotly from 'plotly.js-dist-min'
//
// HTML Elements and Constants
//
const e4_1 = {
    output: [
        document.getElementById("1_output_y(x)") as HTMLOutputElement,
        document.getElementById("1_output_y(t)x(t)") as HTMLOutputElement,
    ]
}

//
// Questão 1
//
const ballP:{t:number[], x:number[], y:number[]} = {
    t: [0.4, 1.3, 2.6],
    x: [15.36585, 20.792682, 28,64078],
    y: [13.58607, 20.59426, 16.47541]
}
const inverseDelta = 1/((ballP.x[0]-ballP.x[1])*(ballP.x[0]-ballP.x[2])*(ballP.x[1]-ballP.x[2]));
const coef = {
    a: inverseDelta*(
        ballP.x[2]*(ballP.y[1]-ballP.y[0]) +
        ballP.x[1]*(ballP.y[0]-ballP.y[2]) +
        ballP.x[0]*(ballP.y[2]-ballP.y[1])
    ),
    b: inverseDelta*(
        ballP.x[0]*ballP.x[0]*(ballP.y[1]-ballP.y[2]) +
        ballP.x[2]*ballP.x[2]*(ballP.y[0]-ballP.y[1]) +
        ballP.x[1]*ballP.x[1]*(ballP.y[2]-ballP.y[0])
    ),
    c: inverseDelta*(
        ballP.x[1]*ballP.x[1]*(ballP.x[2]*ballP.y[0]-ballP.x[0]*ballP.y[2]) +
        ballP.x[1]*(ballP.x[0]*ballP.x[0]*ballP.y[2]-ballP.x[2]*ballP.x[2]*ballP.y[0]) +
        ballP.x[0]*ballP.x[2]*(ballP.x[2]-ballP.x[0])*ballP.y[1]
    )
}
function thirdDegreeFuntion(coef:{a:number, b:number, c:number}, x:number[]){
    const result:number [] = [];

    for(let i = 0; i < x.length; i++){
        result[i] = coef.a*x[i]*x[i] + coef.b*x[i] + coef.c;
    }

    return result
}
const step:number[] = [];
let i = 0;
for(let x = 15; x < 30; x += 0.01){
    step[i] = x;
    i++;
}


Plotly.newPlot(
    e4_1.output[0],
    [
    {
        x: ballP.x,
        y: ballP.y,
        type: 'scatter'
    },
    {
        x:step,
        y:thirdDegreeFuntion(coef, step),
        type: "scatter"
    },]
);
Plotly.newPlot(
    e4_1.output[1],
    [{
        x: ballP.t,
        y: ballP.x,
        type: 'scatter'
    },
    {
        x: ballP.t,
        y: ballP.y,
        type: 'scatter'
    }]
);