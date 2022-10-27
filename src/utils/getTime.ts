
export function getTimeInAdvance( timeInSeconds : number ) : string { 
    let second = Math.floor(timeInSeconds%60);
    return `${Math.floor(timeInSeconds/60)}:${second < 10 ? '0'+ second : second }`;
}