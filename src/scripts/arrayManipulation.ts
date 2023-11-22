
//Retorna um array contendo os numeros [start, stop] com intervalos igual à step
export const arrayRange = (start:number, stop:number, step:number) =>
    Array.from(
    { length: (stop - start) / step + 1 },
    (_value, index) => start + index * step
);

// Retorna o valor do último elemento de arr
export function getLast<t>(arr:t[]){
    return arr[arr.length-1];
}

export function getMonth(date:string){ // aaaa/mm/dd -> aaaa/mm
    return date.slice(0, 7);
}

// Deep copy of a bidimension matrix
export function copyMatrix<t>(matrix:t[][]){
    const copy:t[][] = [];
    for(let i = 0; i < matrix.length; i++){
        copy[i] = [...matrix[i]];
    }

    return copy;
}

// Considerando que "arr" esta ordenado em ordem crescente, retorna o intervalo em que "value" esta 
// junto com os indexes do array "arr"
export function findRange(arr:number[], value:number){
    let i = 0
    for(; i < arr.length; i++){
        if(arr[i] >= value){
            break;
        }
    }

    if(i > 0){
        return {
            interval: [arr[i-1], arr[i]],
            indexes: i-1
        }
    }
    return {
        interval: [arr[0], arr[0]],
        indexes: 0
    }
}