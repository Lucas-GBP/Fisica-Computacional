import Plotly from 'plotly.js-dist-min'
//
// HTML Elements and Constants
//
const TESTER = document.getElementById('tester')!;
Plotly.newPlot( TESTER, [{
x: [1, 2, 3, 4, 5],
y: [1, 2, 4, 8, 16] }], {
margin: { t: 0 } } );

//
// Questão 1
//
type wave = {
    k:number,   //frequência
    a:number    //amplitude
}
const wavesArray:wave[] = [
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

function waveSum(waves: wave[], time_0:number, time_f:number, step:number){
    const values:{x:number, y:number}[] = [];

    if(step <= 0){
        return undefined;
    }

    let i = 0
    for(let t = time_0; t < time_f; t += step){
        values[i].x = t;

        values[i].y = 0;
        for(let j = 0; j < waves.length; j++){
            values[i].y += waves[j].a*Math.cos(waves[j].k*t);
        }

        i++;
    }

    return values;
}
//
// Questão 2
//
function pascalTriangle(size:number){
    if(size < 1){
        return undefined;
    }
    let tPascal:number[][] = [];
    tPascal[0] = [];
    tPascal[0][0] = 1;

    for(let n = 1; n < size; n++){
        tPascal[n] = [];
        tPascal[n][0] = 1;
        tPascal[n][n] = 1;
        for(let k = 1; k < n; k++){
            tPascal[n][k] = tPascal[n-1][k-1]+tPascal[n-1][k];
        }
    }

    return tPascal;
}

const pascal = pascalTriangle(12);
console.log(pascal);

//
// Questão 3
//
type vector3d = {
    x: number,
    y:number, 
    z: number
}

type massPoint = {
    mass:number,
    coord:vector3d
}

function calCenterMass(points:massPoint[]):massPoint{
    let x = 0;
    let y = 0;
    let z = 0;
    let mass = 0;

    for(let i = 0; i < points.length; i++){
        mass += points[i].mass;
        x += points[i].coord.x * points[i].mass;
        y += points[i].coord.y * points[i].mass;
        z += points[i].coord.z * points[i].mass;
    }

    return {
        mass: mass,
        coord: {
            x: x/mass,
            y: y/mass,
            z: z/mass
        }
    }
}

function diceCenter(length:number, diceDensity:number, dotDensity:number, dotRadius:number){
    const b = (4/3)*Math.PI;
    const off = dotRadius*(3/8);

    const cube: massPoint = {
        mass: length*length*length*diceDensity,
        coord: {
            x: 0,
            y: 0,
            z: 0
        }
    };
    const dotPositions:vector3d[] = [
        // 1
        {
            x: (1/2)*length,
            y: 0,
            z: 0
        },
        // 2
        {
            x: (1/4)*length,
            y: (1/2)*length,
            z: (1/4)*length
        },{
            x: -(1/4)*length,
            y: (1/2)*length,
            z: -(1/4)*length
        },

        // 3
        {
            x:-(1/4)*length,
            y: -(1/4)*length,
            z: (1/2)*length
        },{
            x: 0,
            y: 0,
            z: (1/2)*length
        },{
            x: (1/4)*length,
            y: (1/4)*length,
            z: (1/2)*length
        },
        // 4
        {
            x: (1/4)*length,
            y: (1/4)*length,
            z: -(1/2)*length
        },{
            x: -(1/4)*length,
            y: (1/4)*length,
            z: -(1/2)*length
        },{
            x: (1/4)*length,
            y: -(1/4)*length,
            z: -(1/2)*length
        },{
            x: -(1/4)*length,
            y: -(1/4)*length,
            z: -(1/2)*length
        },
        // 5
        {
            x: 0,
            y: -(1/2)*length,
            z: 0
        },{
            x: (1/4)*length,
            y: -(1/2)*length,
            z: (1/4)*length
        },{
            x: -(1/4)*length,
            y: -(1/2)*length,
            z: (1/4)*length
        },{
            x: (1/4)*length,
            y: -(1/2)*length,
            z: -(1/4)*length
        },{
            x: -(1/4)*length,
            y: -(1/2)*length,
            z: -(1/4)*length
        },
        // 6
        {
            x: -(1/2)*length,
            y: 0,
            z: (1/4)*length
        },{
            x: -(1/2)*length,
            y: (1/4)*length,
            z: (1/4)*length
        },{
            x: -(1/2)*length,
            y: -(1/4)*length,
            z: (1/4)*length
        },{
            x: -(1/2)*length,
            y: 0,
            z: -(1/4)*length
        },{
            x: -(1/2)*length,
            y: (1/4)*length,
            z: -(1/4)*length
        },{
            x: -(1/2)*length,
            y: -(1/4)*length,
            z: -(1/4)*length
        },
    ];
    const dotHolesPosition:vector3d[] = [
         // 1
         {
            x: (1/2)*length-off,
            y: 0,
            z: 0
        },
        // 2
        {
            x: (1/4)*length,
            y: (1/2)*length-off,
            z: (1/4)*length
        },{
            x: -(1/4)*length,
            y: (1/2)*length-off,
            z: -(1/4)*length
        },

        // 3
        {
            x:-(1/4)*length,
            y: -(1/4)*length,
            z: (1/2)*length-off
        },{
            x: 0,
            y: 0,
            z: (1/2)*length-off
        },{
            x: (1/4)*length,
            y: (1/4)*length,
            z: (1/2)*length-off
        },
        // 4
        {
            x: (1/4)*length,
            y: (1/4)*length,
            z: -(1/2)*length+off
        },{
            x: -(1/4)*length,
            y: (1/4)*length,
            z: -(1/2)*length+off
        },{
            x: (1/4)*length,
            y: -(1/4)*length,
            z: -(1/2)*length+off
        },{
            x: -(1/4)*length,
            y: -(1/4)*length,
            z: -(1/2)*length+off
        },
        // 5
        {
            x: 0,
            y: -(1/2)*length+off,
            z: 0
        },{
            x: (1/4)*length,
            y: -(1/2)*length+off,
            z: (1/4)*length
        },{
            x: -(1/4)*length,
            y: -(1/2)*length+off,
            z: (1/4)*length
        },{
            x: (1/4)*length,
            y: -(1/2)*length+off,
            z: -(1/4)*length
        },{
            x: -(1/4)*length,
            y: -(1/2)*length+off,
            z: -(1/4)*length
        },
        // 6
        {
            x: -(1/2)*length+off,
            y: 0,
            z: (1/4)*length
        },{
            x: -(1/2)*length+off,
            y: (1/4)*length,
            z: (1/4)*length
        },{
            x: -(1/2)*length+off,
            y: -(1/4)*length,
            z: (1/4)*length
        },{
            x: -(1/2)*length+off,
            y: 0,
            z: -(1/4)*length
        },{
            x: -(1/2)*length+off,
            y: (1/4)*length,
            z: -(1/4)*length
        },{
            x: -(1/2)*length+off,
            y: -(1/4)*length,
            z: -(1/4)*length
        },
    ]

    const dots: massPoint[] = [];
    const dotsHoles: massPoint[] = [];

    for(let i = 0; i < dotPositions.length; i++){
        const volume = b*Math.pow(dotRadius, 3)
        dots[i] = {
            mass: (volume*dotDensity),
            coord: dotPositions[i]
        };
        
        dotsHoles[i] = {
            mass: -(volume/2)*diceDensity,
            coord: dotHolesPosition[i]
        }

    }

    const allMassPoints = dots.concat(dotsHoles, [cube]);
    return calCenterMass(allMassPoints);
}

console.log(diceCenter(1, 0, 1, 0.1));
console.log(diceCenter(1, 1, 1, 0.1));
console.log(diceCenter(1, 1, 8, 0.1));