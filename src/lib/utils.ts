import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

//any time we done conditional classes to alter application this is the function cn we use

export function chatHrefConstructor(id1: string, id2: string) {
    const sortedId = [id1, id2].sort()
    return `${sortedId[0]}--${sortedId[1]}`
}

export function toPusherKey(key: string){
    return key.replace(/:/g,'__')
}