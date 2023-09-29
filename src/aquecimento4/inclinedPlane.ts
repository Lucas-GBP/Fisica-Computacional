import Plotly from 'plotly.js-dist-min'

export function average(a:number[]){
    let sum = 0;
    for(let i = 0; i < a.length; i++){
        sum += a[i];
    }
    return sum/a.length;
}

export function interval(o:number, f:number, step:number){
    const c:number[] = [];
    let j:number = 0;

    if(o <= f){
        if(step > 0){
            for(let i = o; i <= f; i+=step){
                c[j] = i;
                j++;
            }
        }
    } else {
        if(step < 0){
            for(let i = o; i >= f; i+=step){
                c[j] = i;
                j++;
            }
        }
    }

    return c;
}

export default function inclinedPlane(output: HTMLOutputElement){
    const data = {
        x: [.65, .95, 1.25, 1.55], 
        t: [
            [.894, .934, .884, .891, .912, .930, .915, .928, .952, .925, .881, .864, .875, .895, .909, .913, .968, .896, .911, .911],
            [.758, .798, .796, .739, .779, .782, .748, .786, .756, .782, .758, .722, .778, .739, .775, .750, .758, .738, .751, .780],
            [.675, .731, .723, .631, .648, .723, .708, .670, .671, .656, .665, .659, .667, .669, .678, .669, .667, .656, .687, .675],
            [.634, .684, .665, .606, .609, .673, .660, .632, .649, .602, .591, .611, .628, .626, .628, .602, .624, .643, .615, .609]
        ]
    };
    const m = [
        average(data.t[0]),
        average(data.t[1]),
        average(data.t[2]),
        average(data.t[3])
    ]
    const n = interval(0, 20, 1);
    
    const lines:Plotly.Data[] = [
        {
            x:n,
            y:data.t[0],
            mode: "markers",
            name: "x = 0,65m"
        },{
            x:n,
            y:data.t[1],
            mode: "markers",
            name: "x = 0,95m"
        },{
            x:n,
            y:data.t[2],
            mode: "markers",
            name: "x = 1,25m"
        },{
            x:n,
            y:data.t[3],
            mode: "markers",
            name: "x = 1,55m"
        }
    ];
    const shapes:Partial<Plotly.Shape>[] = [
        {
            type: "line",
            x0: 0,
            x1: 20,
            y0: m[0],
            y1: m[0],
            line: {
                color: 'blue', // Cor da linha
                width: 2,     // Largura da linha
                dash: 'dash'  // Estilo da linha (pontilhada)
            }
        },{
            type: "line",
            x0: 0,
            x1: 20,
            y0: m[1],
            y1: m[1],
            line: {
                color: 'orange',
                width: 2,
                dash: 'dash'
            }
        },{
            type: "line",
            x0: 0,
            x1: 20,
            y0: m[2],
            y1: m[2],
            line: {
                color: 'green',
                width: 2,
                dash: 'dash'
            }
        },{
            type: "line",
            x0: 0,
            x1: 20,
            y0: m[3],
            y1: m[3],
            line: {
                color: 'red',
                width: 2,
                dash: 'dash'
            }
        },
    ];
    const layout:Partial<Plotly.Layout> = {
        xaxis: {
            title: "Número da medida"
        },
        yaxis: {
            title: "tempo (s)"
        },
        shapes: shapes
    }


    Plotly.newPlot(
        output,
        lines,
        layout
    )

}