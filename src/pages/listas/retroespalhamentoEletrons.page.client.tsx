import { Data } from "plotly.js";
import { useEffect, useRef, useState } from "react";
import Plot from "react-plotly.js";
import { arrayRange } from "../../scripts/arrayManipulation";
import { randomNumber, randomThetaAlpha } from "../../scripts/numerosAleatorios";
import { returnStatics } from "../../scripts/statistics";

const range = [-90, 360];

export function Page(){
    const [retroeGraph, setRetroGraph] = useState<Data[]>([]);
    const [anotherGraph, setAnotherGraph] = useState<Data[]>([]);
    const Z = useRef({Si:14, Ge:32})

    useEffect(() => {
        const theta = arrayRange(0, Math.PI/2, Math.PI/180);
        const thetaGraus = theta.map((i) => 180*(i/Math.PI));

        const E = [0.2, 1.0];
        const retro:Data[] = [
            {
                name: "Si, 0,2 MeV",
                x:thetaGraus,
                y:theta.map((t) => eta(Z.current.Si, E[0], t))
            },{
                name: "Si, 1,0 MeV",
                x:thetaGraus,
                y:theta.map((t) => eta(Z.current.Si, E[1], t))
            },{
                name: "Ge, 0,2 MeV",
                x:thetaGraus,
                y:theta.map((t) => eta(Z.current.Ge, E[0], t))
            },{
                name: "Ge, 1,0 MeV",
                x:thetaGraus,
                y:theta.map((t) => eta(Z.current.Ge, E[1], t))
            }
        ]

        
        regenerate();
        setRetroGraph(retro);

    }, []);

    const regenerate = () => {
        const eSource = 0.660; //MeV
        const r = 1; //cm
        const d = 1; //cm
        const raios = randomThetaAlpha(7500);
        const sigma = Math.atan(r/d);

        let detectedCount = 0;
        const detected:number[] = []
        raios.map((value) => {
            if(isDetectedAngle(sigma, value.theta, value.alpha)){
                detectedCount++;
                //const angle = Math.abs(value.theta-Math.PI/2) + Math.abs(value.alpha-Math.PI/2);
                //const angle = Math.abs((value.theta+value.alpha)-Math.PI)/2;
                let angle = value.alpha+value.theta;
                if(angle > Math.PI){
                    angle = Math.PI - (angle - Math.PI);
                }
                /*while(angle > Math.PI/4){
                    angle-= Math.PI/4;
                }*/
                detected.push(angle);
            }
        });

        let errorCount = 0
        const a = detected.map((i) => {
            if(i < 0 || i > Math.PI/4){
                errorCount++;
                return 180*(i/Math.PI);
            }
        });
        console.log(a);
        console.log(errorCount);

        let registerCount = 0;
        const register:number[] = [];
        detected.map((angle) => {
            const e = eta(Z.current.Ge, eSource, angle);
            if(randomNumber(0,1) > e){
                registerCount++;
                register.push(angle);
            }
        })
        console.log(detected, register);

        const div = 24;
        const space = (range[1]-range[0])/(2*div);
        const x = arrayRange(range[0]+space, range[1]+space, (range[1]-range[0])/div);
        const another:Data[] = [
            {
                name: `no detector (${(detectedCount/raios.length*100).toFixed(1)} %)`,
                type:"bar",
                x:x,
                y:returnStatics(range[0]/180*Math.PI, range[1]/180*Math.PI, (range[1]-range[0])/(div*180)*Math.PI, detected)
            },{
                name: `registrado (${(registerCount/raios.length*100).toFixed(1)} %)`,
                type:"bar",
                x:x,
                y:returnStatics(range[0]/180*Math.PI, range[1]/180*Math.PI, (range[1]-range[0])/(div*180)*Math.PI, register)
            }
        ];

        setAnotherGraph(another);
    };

    return <>
        <h1>Retroespalhamento de elétrons</h1>
        <section>
            <p>
                O retroespalhamento (backscattering) de elétrons de energia \(E\), expressa em \(MeV\), incidente num material de número atômico \(z\), a um ângulo \(\theta\) com a normal à superfície, pode ser descrito pela relação empírica (Kuzminikh & Vorobiev, Nucl. Inst. and Meth. 129 (1975) 561): \[\begin{"{split}"}
                    \eta(Z, E, \theta) &= C \theta^D +\eta(Z, E, 0) \\
                    {`\\eta(Z, E, 0) &= b_1 e^{-b_2 Z^{-b_3}}\\left[ 1+(b_4+b_5 Z^{-b_6})E^{(b_7-b_8/Z)} \\right]^{-1}
                    \\end{split}`}\]
            </p><p>
                As constantes da equação são mostradas na tabela a seguir. O gráfico que segue a tabela mostra os retroespalhamento para elétrons de 0,2 MeV e 1,0 MeV incidindo sobre um detetor de silício \((Z = 14)\) e sobre um detetor de germânio \((Z = 32)\).
            </p>
            {`\\begin{array}{c c c c c c c c c c}
                \\hline
                C & D & b_1 & b_2 & b_3 & b_4 & b_5 & b_6 & b_7 & b_8 \\\\ 
                0,2 & 2,2 & 0,94 & 9,31 & 0,60 & 0,01 & 14,0 & 1,54 & 1,64 & 5,31 \\\\
                \\hline
            \\end{array}`}
            <Plot
                className="PlotlyGraphics"
                layout={{
                    xaxis:{
                        title:"$\\theta (\\text{graus})$",
                        range:[0, 90]
                    },
                    yaxis:{
                        title:"$\\eta(Z, E, \\theta)$",
                        range:[0.0, 0.8]
                    }
                }}
                data={retroeGraph}
            />
            <p>
                Como se vê, há uma forte dependência com o número atômico e com o ângulo de incidência, e a dependência com a energia é relativamente pequena (o "relativamente" depende, obviamente, da aplicação).
            </p><p>
                Considere uma fonte pontual que emite elétrons de 660 keV em todas as direções
                com igual probabilidade e um detetor de raio \(r = 1 cm\) posicionado a uma distância \(d = 1\) cm da fonte. Na figura abaixo, à esquerda, estão representadas as trajetórias de algumas partículas. À direita, a distribuição de frequência das partículas que atingem o detetor e das que efetivamente são registradas em função do ângulo de incidência, bem como o percentual de cada categoria com relação ao número total de partículas emitidas pela fonte.
            </p><p>
                Uma fonte isotrópica emite partículas em direções uniformemente distribuídas em uma esfera unitária. A direção de movimento é definida como um vetor unitário \({`\\hat{q} = (u,v,w)`}\) tal que: \[{`
                    \\hat{q} = (u,v,w) = \\left( \\sin\\theta\\cos\\phi, \\sin\\theta\\sin\\phi,\\cos\\theta \\right)
                `}\]
            </p><p>
                para \({`0 < \\theta < \\pi `}\) e \({`0 < \\phi < 2\\pi`}\). Uma distribuição uniforme em coordenadas esféricas não é uniforme em sistema de coordenadas ortogonal. Para uma distribuição isotrópica em \(\theta\) e \(\phi\) temos que considerar que: \[{`
                    p(\\theta, \\phi)d\\theta d\\phi = \\left[\\frac{\\sin\\theta}{2}d\\theta\\right] \\left[\\frac{1}{2\\pi}d\\phi\\right]
                `}\]
            </p><p>
                de modo que, se \(x_1\) e \(x_2\) são dois números aleatórios que obedecem uma distribuição uniforme entre 0 e 1, valores aleatórios para \(\theta\) e \(\phi\) podem ser obtidos fazendo: \[{`\\begin{split}
                    \\theta &= \\arccos(1-2x_1)\\\\
                    \\phi &= 2\\pi x_2
                \\end{split}`}\]
            </p>
            <Plot
                className="PlotlyGraphics"
                layout={{
                    xaxis:{
                        title:"$\\theta (\\text{graus})$",
                        range:range,
                        dtick:15
                    },
                    yaxis:{
                        title:"$N$",
                        range:[0, 300]
                    },
                    barmode:"group"
                }}
                data={anotherGraph}
            /><br/>
            <button onClick={regenerate}> Gerar novos eletrons </button>
            <p>
                Tenha em mente que a figura acima, à esquerda, é uma
                projeção no plano de uma coleção de eventos no espaço,
                por isso você vê partículas que parecem atravessar o
                detetor. Essas partículas passaram no entorno dele (ou seja,
                quando tinham a coordenada do detetor, a sua distância do
                eixo de simetria era maior do que o raio do detetor).
            </p><p>
                A figura ao lado tenta representar a situação e deixa
                claro que a quantidade de partículas que atingem o detetor é
                igual à quantidade de partículas que atingem a calota
                esférica e é, portanto, proporcional à razão entre a área da
                calota, \(A_C = 2\pi R^2(1-\cos\theta)\), e a área da esfera, \(A_E = 2\pi R^2\). Para \(d = r = 1 cm\), \(\theta = \pi/4\) e \(A_C/A_E \approx 0,15\).
            </p>
        </section>
    </>;
}

function eta(Z:number, E:number, theta:number){
    const C = 0.2;
    const D = 2.2;
    const b = [0.94, 9.31, 0.60, 0.01, 14.0, 1.54, 1.64, 5.31];
    const eta_0 = b[0]*Math.exp(-b[1]*Math.pow(Z, -b[2]))*Math.pow((1 + (b[3]+b[4]*Math.pow(Z, -b[5]))*Math.pow(E, b[6]-b[7]/Z)), -1);
    return C*Math.pow(theta, D) + eta_0;
}

function isDetected(r:number, d:number, theta:number, alpha:number){
    const sigma = Math.atan(r/d); // [0, Pi/2]
    const theta_ = Math.abs(Math.PI/2 - theta);
    if(sigma < theta_){
        return false;
    }

    const sinTheta = Math.sin(theta_);
    const _sigma = sigma*sinTheta*sinTheta;
    if((Math.PI/2-_sigma) > alpha || alpha > (Math.PI/2+_sigma)){
        return false;
    }

    return true;
}

function isDetectedAngle(sigma:number, theta:number, alpha:number){
    if(sigma < Math.abs(Math.PI/2 - theta)){
        return false;
    }

    const sinTheta = Math.sin(theta);
    const _sigma = sigma*sinTheta*sinTheta;
    if((Math.PI/2-_sigma) > alpha || alpha > (Math.PI/2+_sigma)){
        return false;
    }

    return true;
}