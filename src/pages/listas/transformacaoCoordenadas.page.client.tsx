import { Data } from "plotly.js";
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { arrayRange } from "../../scripts/arrayManipulation";
import { matrix, matrixAddition, matrixMult, matrixSubtraction, modulo, transMatrixVector, transVectorMatrix, vector } from "../../scripts/linearAlgebra";

export function Page(){
    const [testGraphic, setTestGraphic] = useState<Data[]>([]);
    const [moduloGraphic, setModuloGraphic] = useState<Data[]>([]);
    const [BxGraphic, setBxGraphic] = useState<Data[]>([]);
    const [ByGraphic, setByGraphic] = useState<Data[]>([]);
    //const [vecGraphic, setVecGraphic] = useState<Data[]>([]);

    useEffect(() => {
        const a = 1.270;
        const l = 1.905;
        const d = 0.5;
        const size = 100;
        const vectors:vector[][] = [];
        const B:vector[][] = [];
        const Bx:number[][] = [];
        const By:number[][] = [];
        const modulos:number[][] = [];
        for(let i = 0; i < size; i++){
            vectors[i] = [];
            B[i] = [];
            Bx[i] = [];
            By[i] = [];
            modulos[i] = [];

            for(let j = 0; j < size; j++){
                vectors[i][j] = [
                    -2.5*l +(i/size)*5*l, 
                    -2.5*l +(j/size)*5*l+0.0000000000001,
                    0
                ];
                B[i][j] = vecBc(vectors[i][j], l, d, a);
                modulos[i][j] = modulo(B[i][j]);
                Bx[i][j] = B[i][j][0];
                By[i][j] = B[i][j][1];
            }
        }
        setModuloGraphic([{
            z:modulos,
            type: "heatmap",
            colorscale: 'Viridis'
        }]);
        setBxGraphic([{
            z:Bx,
            type: "heatmap",
            colorscale: 'Viridis'
        }]);
        setByGraphic([{
            z:By,
            type: "heatmap",
            colorscale: 'Viridis'
        }]);

        // TODO fazer o campo vetorial
        setTestGraphic(generateTestGraphic());
        //testTransformations();
    }, []);

    return <>
        <h1>Transformações de Coordenadas</h1>
        <section>
            <p>
                Imagine que você quer construir uma lente magnética para partículas carregadas, feita com alguns ímãs permanentes em torno de uma base cilíndrica, como na figura abaixo, à esquerda. Você dispõe de ímãs permanentes como os da figura abaixo, à direita, com magnetização perpendicular ao plano \(xy\), cujas equações para o campo são conhecidas, como veremos a seguir:
            </p>
            <Plot
                className="PlotlyGraphics"
                data={testGraphic}
                layout={{}}
            />
            <Plot
                className="PlotlyGraphics"
                data={moduloGraphic}
                layout={{
                    width: 500, // Largura do gráfico
                    height: 500, // Altura do gráfico
                }}
            />
            <Plot
                className="PlotlyGraphics"
                data={BxGraphic}
                layout={{
                    width: 500, // Largura do gráfico
                    height: 500, // Altura do gráfico
                }}
            />
            <Plot
                className="PlotlyGraphics"
                data={ByGraphic}
                layout={{
                    width: 500, // Largura do gráfico
                    height: 500, // Altura do gráfico
                }}
            />
            
        </section>
    </>
}

function generateTestGraphic(){
    const l = 1.905; //cm
    const a = 1.270; //cm
    const x = arrayRange(-4.0, 4.0, 0.1); //cm
    const z = [0.9, -1.1]; //cm
    const y = 0;

    const Bvec = [
        x.map((i) => vecB([i, y, z[0]], l, a)),
        x.map((i) => vecB([i, y, z[1]], l, a))
    ];
    
    const B:{x:number[], y:number[], z:number[]}[] = [{x:[], y:[], z:[]}];
    Bvec.map((arr, index) => {
        B[index] = {x:[], y:[], z:[]};
        arr.map((vec, vecIndex) => {
            B[index].x[vecIndex] = (vec[0]);
            B[index].y[vecIndex] = (vec[1]);
            B[index].z[vecIndex] = (vec[2]);
        })
    })
    const result:Data[] = [
        {
            x: x,
            y: B[0].x,
            name:"$B_x$",
            line:{
                color:"blue",
                dash: "dash"
            }
        },{
            x: x,
            y: B[0].y,
            name:"$B_y$",
            line:{
                color:"blue",
                dash: "longdash"
            }
        },{
            x: x,
            y: B[0].z,
            name:"$B_z$",
            line:{
                color:"blue",
                dash:"solid"
            }
        },{
            x: x,
            y: B[1].x,
            name:"$B_x$",
            line:{
                color:"orange",
                dash: "dash"
            }
        },{
            x: x,
            y: B[1].y,
            name:"$B_y$",
            line:{
                color:"orange",
                dash: "longdash"
            }
        },{
            x: x,
            y: B[1].z,
            name:"$B_z$",
            line:{
                color:"orange",
                dash: "solid"
            }
        }

    ];

    return result;
}

function testTransformations(){
    const a = 1.270;
    const l = 1.905;
    const d = 0.5;
    const theta_i = Math.PI/3;

    const A:vector = [0, -a, 0];
    const B:vector = [l, 0, 0];
    const C:vector = [l*Math.sin(theta_i)-(l+d), 0, l*Math.cos(theta_i)];
    const D:vector = [a*Math.cos(theta_i)-(l+d), 0, -a*Math.sin(theta_i)];

    const Ac = rc(A, l, d, theta_i);
    const Bc = rc(B, l, d, theta_i);
    const Cc = rc(C, l, d, theta_i);
    const Dc = rc(D, l, d, theta_i);

    const Ai = ri(Ac, l, d, theta_i);
    const Bi = ri(Bc, l, d, theta_i);
    const Ci = ri(Cc, l, d, theta_i);
    const Di = ri(Dc, l, d, theta_i);

    const result = {A, B, C, D, Ac, Bc, Cc, Dc, Ai, Bi, Ci, Di};
    console.table(result);
    return result;
}

function vecB(r:vector, l:number, a:number):vector{ // Resposta em M0/c
    const x = r[0];
    const y = r[1];
    const z = r[2]

    const Bx:number[] = [
        ((y-a) + Math.sqrt(Math.pow(x+l, 2) + Math.pow(y-a, 2) + z*z))/
        ((y+a) + Math.sqrt(Math.pow(x+l, 2) + Math.pow(y+a, 2) + z*z)),

        ((y+a) + Math.sqrt(Math.pow(x-l, 2) + Math.pow(y+a, 2) + z*z))/
        ((y-a) + Math.sqrt(Math.pow(x-l, 2) + Math.pow(y-a, 2) + z*z))
    ];

    const By:number[] = [
        ((x-l) + Math.sqrt(Math.pow(x-l, 2) + Math.pow(y+a, 2) + z*z))/
        ((x+l) + Math.sqrt(Math.pow(x+l, 2) + Math.pow(y+a, 2) + z*z)),

        ((x+l) + Math.sqrt(Math.pow(x+l, 2) + Math.pow(y-a, 2) + z*z))/
        ((x-l) + Math.sqrt(Math.pow(x-l, 2) + Math.pow(y-a, 2) + z*z))
    ];

    const Bz:number[] = [
        Math.atan(
            ( (x+l)*(y+a) )/
            ( z*Math.sqrt(Math.pow((x+l), 2)+Math.pow((y+a), 2)+z*z) )
        ),

        Math.atan(
            ( (x-l)*(y+a) )/
            ( z*Math.sqrt(Math.pow((x-l), 2)+Math.pow((y+a), 2)+z*z) )
        ),

        Math.atan(
            ( (x+l)*(y-a) )/
            ( z*Math.sqrt(Math.pow((x+l), 2)+Math.pow((y-a), 2)+z*z) )
        ),

        Math.atan(
            ( (x-l)*(y-a) )/
            ( z*Math.sqrt(Math.pow((x-l), 2)+Math.pow((y-a), 2)+z*z) )
        )
    ];

    const s = Math.sign(z);

    return [
        s*Math.log(Bx[0]*Bx[1]),
        s*Math.log(By[0]*By[1]),
        s*(Bz[0]-Bz[1]-Bz[2]+Bz[3])
    ]
}

// TODO melhorar isso... ele esta calculando as matrizes de transformação a cada ponto
function vecBc(rc:vector, l:number, d:number, a:number){
    const angulos = arrayRange(0, 5*Math.PI/3, Math.PI/3);
    let B:matrix = [[0],[0],[0]];
    const R0 = R(Re.x, -Math.PI/2);

    angulos.map((theta) => {
        const r = ri(rc, l, d, theta);
        const Ri = R(Re.z, theta);
        const Bi = transVectorMatrix(vecB(r, l, a));
        B = matrixAddition(B, matrixMult(Ri, matrixMult(R0, Bi)));
    })

    return transMatrixVector(B);
}

enum Re {x, y, z};
function R(eixo:Re, theta:number):matrix{
    const sin = Math.sin(theta);
    const cos = Math.cos(theta);

    switch(eixo){
        case Re.x:
            return [
                [1, 0, 0],
                [0, cos, -sin],
                [0, sin, cos]
            ];
        case Re.y:
            return [
                [cos, 0, sin],
                [0, 1, 0],
                [-sin, 0, cos]
            ];
        case Re.z:
            return [
                [cos, -sin, 0],
                [sin, cos, 0],
                [0, 0, 1]
            ];
    }
}
function R_(eixo:Re, theta:number):matrix{
    const sin = Math.sin(theta);
    const cos = Math.cos(theta);

    switch(eixo){
        case Re.x:
            return [
                [1, 0, 0],
                [0, cos, sin],
                [0, -sin, cos]
            ];
        case Re.y:
            return [
                [cos, 0, -sin],
                [0, 1, 0],
                [sin, 0, cos]
            ];
        case Re.z:
            return [
                [cos, sin, 0],
                [-sin, cos, 0],
                [0, 0, 1]
            ];
    }
}

function rc(ri:vector, l:number, d:number, theta_i:number){
    const R0 = R(Re.x, -Math.PI/2);
    const Ri = R(Re.z, theta_i)
    const T:matrix = [[l+d],[0],[0]];

    const rim = transVectorMatrix(ri);
    const rcm = matrixMult(Ri, matrixAddition(matrixMult(R0, rim),T));

    return transMatrixVector(rcm);
}
function ri(rc:vector, l:number, d:number, theta_i:number){
    const R0_ = R_(Re.x, -Math.PI/2);
    const Ri_ = R_(Re.z, theta_i);
    const T:matrix = [[l+d],[0],[0]];

    const rcm = transVectorMatrix(rc);
    const rci = matrixMult(R0_, matrixSubtraction(matrixMult(Ri_, rcm),T));

    return transMatrixVector(rci);
}