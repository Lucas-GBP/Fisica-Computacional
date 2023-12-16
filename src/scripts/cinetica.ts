import { J_keV, c } from "./physicsConstants";
import { vector, scalarVecMult, vectorAdd, n, parameterizedLine, distance } from "./linearAlgebra";
import { randomNumberArray } from "./numerosAleatorios";

// Gera um vetor velocidade de tres dimensões aleatorio
export function particleVelocity3(modulo:number):vector{
    const rand = randomNumberArray(0, 1, 2);
    const theta = Math.acos(1-2*rand[0]);
    const alpha = 2*Math.PI*rand[1]
    const sinTheta = Math.sin(theta);

    return [
        modulo*sinTheta*Math.cos(alpha),
        modulo*sinTheta*Math.sin(alpha),
        modulo*Math.cos(theta)
    ];
}

// Calcula a velocidade de uma particula considerando a relatividade
export function v_relativeE(E:number, m:number){
    const Eo = m*c*c*J_keV; //[J -> keV]
    const lambda = 1+E/Eo;
    const v = c*Math.sqrt(1-1/(lambda*lambda));

    return v;
}

export function E_relative(v:number, m:number){
    return J_keV*m*c*c*(Math.sqrt(1/(1-Math.pow(v/c, 2)))-1)
}

export function torricelliPosition(po:vector, v:vector, a:vector, deltaT:number){
    const b = scalarVecMult(v, deltaT);
    const c = scalarVecMult(a, (deltaT*deltaT)/2);

    return vectorAdd(po,vectorAdd(b,c));
}

// TODO fazer o caso em que a interceptação seja uma reta
export function isColidedCircularPlane(
    po:vector,  // Posição inicial da particula
    pf:vector,  // Posição final da particula
    pd:vector,  // posição do centro do detector
    r:number,   // Raio do detector
    eixo:n      // Eixo em que o detector esta perpendicular
){
    if(pf[eixo] == po[eixo]){
        console.error("Interceptação com o detector pode ser um reta.");
        return false;
    }

    if(
        (po[eixo] <= pd[eixo] && pf[eixo] >= pd[eixo])||
        (po[eixo] >= pd[eixo] && pf[eixo] <= pd[eixo])
    ){
        const t = (pd[eixo]-po[eixo])/(pf[eixo]-po[eixo]);
        const interception = parameterizedLine(po, pf, t);

        if(distance(interception, pd) <= r){
            return true;
        }
    }
    return false;
}