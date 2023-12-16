import { vector } from "./linearAlgebra";
import { probabilityTransformation, calculateFda, calculateProbabilityDistribution } from "./statistics";
import { arrayRange } from "./arrayManipulation";
import { scalarVecMult, crossProduct, vectorAdd, modulo } from "./linearAlgebra";
import { eletron, c } from "./physicsConstants";
import { torricelliPosition, E_relative, particleVelocity3, v_relativeE } from "./cinetica";

export type Eletron = {
    E:number,
    p:vector,
    v:vector
};
export type Foton = {
    p:vector,
    v:vector
}
export type Particle = {
    type: "foton"|"eletron",
    isDetected:boolean
    p:vector[], //Position
    v:vector[], //Velocity
    E:number[], //Energy
    q?:number   //Charge
}

export function eta(Z:number, E:number, theta:number){
    const C = 0.2;
    const D = 2.2;
    const b = [0.94, 9.31, 0.60, 0.01, 14.0, 1.54, 1.64, 5.31];
    const eta_0 = b[0]*Math.exp(-b[1]*Math.pow(Z, -b[2]))*Math.pow((1 + (b[3]+b[4]*Math.pow(Z, -b[5]))*Math.pow(E, b[6]-b[7]/Z)), -1);
    return C*Math.pow(theta, D) + eta_0;
}

export function N(B_rho:number){
    const S_1 = 0.7;
    const k = 2*Math.PI/6300;
    const G_1 = 5.3;
    const G_2 = 1.0;
    const G_3 = 0.3;
    const x_1 = 3370;
    const x_2 = 3480;
    const x_3 = 3520;
    const sigma_1 = 14;
    const sigma_2 = 10;
    const sigma_3 = 7;

    const a = k*B_rho>Math.PI||k*B_rho<0?0:S_1*Math.pow(Math.sin(k*B_rho),2);
    const b = G_1*Math.exp((-1*Math.pow(B_rho-x_1, 2))/(2*sigma_1*sigma_1));
    const c = G_2*Math.exp((-1*Math.pow(B_rho-x_2, 2))/(2*sigma_2*sigma_2));
    const d = G_3*Math.exp((-1*Math.pow(B_rho-x_3, 2))/(2*sigma_3*sigma_3));

    return a+b+c+d;
}

//Retorna um array com energias aleatorias de eletrons erradiados por 137C
export function random137C(quant:number):number[]{ // Energy [keV]
    const E = arrayRange(0, 800, 1);
    const energyEspectrum = E.map((e) => {
        const a_0 = -1630;
        const a_1 = 200;

        const B_rho = a_0 +a_1*Math.sqrt(e);
        return N(B_rho);
    });
    const fda = calculateFda(calculateProbabilityDistribution({x:E,y:energyEspectrum}));

    const randomE = probabilityTransformation(
        {x:E, y:energyEspectrum},
        quant,
        fda, true
    );
    return randomE;
}

//Retorna a força exercida pela campo magnetico na particula
export function chargedParticleForce(
    q:number, // Carga
    v:vector, // Velocidade
    p:vector, // Posição
    B:(p:vector)=>vector):vector //Campo em função da posição
{
    return scalarVecMult( crossProduct(v, B(p)), q);
}

export function LorentzFactor(v:number){
    return 1/Math.sqrt(1-Math.pow(v/c, 2));
}

export function moveEletron(e:Eletron, B:(p:vector)=>vector, deltaT:number):Eletron{
    const f = chargedParticleForce(eletron.q, e.v, e.p, B);
    const a = scalarVecMult(f, 1/eletron.m);
    const p = torricelliPosition(e.p, e.v, a, deltaT);

    const v = vectorAdd(e.v, scalarVecMult(a, deltaT));
    const vModulo = modulo(v);
    //const gamma = LorentzFactor(modulo(e.v));

    const E = E_relative(vModulo, eletron.m);
    if(vModulo >= c){
        console.error(`Einstein Puto: ${100*(vModulo/c)}%`, `E: ${E} keV`);
    }

    return { E, p, v }
}

export function createEletron(po:vector, E:number):Eletron{
    return {
        E: E,
        p: po,
        v:particleVelocity3(v_relativeE(E, eletron.m))
    };
}