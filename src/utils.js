
export function toLocaleString(ts){
    return new Date(ts).toLocaleString();
}

export function toDateString(ts){
    return new Date(ts).toDateString();
}

export function toLocaleDateString(ts){
    return new Date(ts).toLocaleDateString();
}

export function toDateAndTimeString(ts){
    const d = new Date(ts);
    return d.toLocaleDateString() + " at " + d.toLocaleTimeString()
}

export function toPostStatusText(n){
    if(n >= 0 && n <=2 ){
        return ["Pending...", "Approved", "Declined"][n]
    }
    return "ERROR"
}