export function randomNumber(a:number, b:number){ // Return a number between [a, b)
    return Math.random() * (b - a) + a;
}

export function randomNumberArray(a:number, b:number, size:number){
    const arr:number[] = [];
    for(let i = 0; i < size; i++){
        arr[i] = Math.random() * (b - a) + a;
    }

    return arr;
}