export function randomNumber(a:number, b:number){ // Return a number between [a, b)
    return Math.random() * (b - a) + a;
}

// Retorna um array com "size" elementos numericos entre [a,b)
export function randomNumberArray(a:number, b:number, size:number){
    const arr:number[] = [];
    for(let i = 0; i < size; i++){
        arr[i] = Math.random() * (b - a) + a;
    }

    return arr;
}

//
// TODO: Melhorar essa função, tá horrivel mas funciona. Ela percorre arr todo para cada possibilidade
//
// Retona um array com a quantidade de vezes que determinado intervalo numerico esta em "arr"
export function returnStatics(a:number, b:number, step:number, arr:number[]){
    const count:number[] = [];

    if(step <= 0){
        return count;
    }
    let index = 0
    for(let i = a; i <= b; i+=step){
        count[index] = 0;
        arr.map((value) => {
            if(value >= i && value < i+step){
                count[index]++;
            }
        });
        index++;
    }

    return count;
}
export enum gaussType {
    BoxMuller,
    CentralLimite
}

// Gera dois numeros aleatórios gaussianos com o algoritmo de Box-Müller
export function randBM(){
    const a = randomNumber(0, 1);
    const b = randomNumber(0, 1);

    const sqrt = Math.sqrt(-2*Math.log(a));
    const theta = 2*Math.PI*b;
    return [
        sqrt*Math.cos(theta),
        sqrt*Math.sin(theta)
    ];
}

// Retorna um numero aleatório gaussiano com o algoritmo baseado no teorema central do limite
export function randTCL(){
    const x = randomNumberArray(0, 1, 12);
    let z = -6;
    for(let i = 0; i < 12; i++){z += x[i]}

    return z
}

export function randGaussArray(size:number, algoritmo:gaussType){
    const arr:number[] = [];

    switch (algoritmo){
        case gaussType.BoxMuller:
            for(let i = 0; i < size; i++){
                const numbers = randBM();
                arr[i] = numbers[0];
                i++;
                arr[i] = numbers[1];
            }
            break;
        case gaussType.CentralLimite:
            for(let i = 0; i < size; i++){
                arr[i] = randTCL();
            }
            break;

    }

    return arr;
}

export function normalArray(size:number, xo:number, sigma:number){
    const arr:number[] = [];

    for(let i = 0; i < size; i++){
        const numbers = randBM();
        arr[i] = numbers[0]*sigma + xo;
        i++;
        arr[i] = numbers[1]*sigma + xo;
    }

    return arr;
}