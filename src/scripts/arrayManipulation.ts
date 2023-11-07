
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