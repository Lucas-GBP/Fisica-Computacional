import Plotly from 'plotly.js-dist-min'

export function callCoef(x:number[], y:number[]){
    const inverseDelta = 1/((x[0]-x[1])*(x[0]-x[2])*(x[1]-x[2]));

    return {
        a: inverseDelta*(
            x[2]*(y[1]-y[0]) +
            x[1]*(y[0]-y[2]) +
            x[0]*(y[2]-y[1])
        ),
        b: inverseDelta*(
            x[0]*x[0]*(y[1]-y[2]) +
            x[2]*x[2]*(y[0]-y[1]) +
            x[1]*x[1]*(y[2]-y[0])
        ),
        c: inverseDelta*(
            x[1]*x[1]*(x[2]*y[0]-x[0]*y[2]) +
            x[1]*(x[0]*x[0]*y[2]-x[2]*x[2]*y[0]) +
            x[0]*x[2]*(x[2]-x[0])*y[1]
        )
           
    }
}

export function thirdDegreeFuntion(coef:{a:number, b:number, c:number}, x:number[]){
    const result:number [] = [];

    for(let i = 0; i < x.length; i++){
        result[i] = coef.a*x[i]*x[i] + coef.b*x[i] + coef.c;
    }

    return result
}

export default function trainGraphics(output:HTMLOutputElement[]){
    const ballP:{t:number[], x:number[], y:number[]} = {
        t: [0.4, 1.3, 2.6],
        x: [15.36585, 20.792682, 28,64078],
        y: [13.58607, 20.59426, 16.47541]
    }
    
    const step_x:number[] = [];
    const step_t:number[] = [];
    let i = 0;
    for(let x = 15; x < 30.01; x += 0.01){
        step_x[i] = x;
        i++;
    }
    i = 0;
    for(let t = 0; t < 3.70; t += 0.01){
        step_t[i] = t;
        i++;
    }
    
    
    Plotly.newPlot(
        output[0],
        [{
                x:step_x,
                y:thirdDegreeFuntion(
                    callCoef(ballP.x, ballP.y), 
                    step_x
                ),
                type: "scatter",
            },{
                x: ballP.x,
                y: ballP.y,
                type: 'scatter',
                mode: "markers"
        },]
    );
    Plotly.newPlot(
        output[1],
        [{
            x: ballP.t,
            y: ballP.x,
            type: 'scatter'
        },
        {
            x: step_t,
            y: thirdDegreeFuntion(
                callCoef(ballP.t, ballP.y),
                step_t
            ),
            //y: ballP.y,
            type: 'scatter'
        },
        {
            x:ballP.t,
            y:ballP.y,
            type: "scatter",
            mode: "markers"
        }]
    );
}

