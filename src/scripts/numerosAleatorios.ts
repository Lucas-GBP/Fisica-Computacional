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