import { ErrorMessage, Guild } from "@/types";

export function verifyData(data: Guild | undefined | ErrorMessage):boolean {
    if (!data) return false;
    return true
}

export function generateHeaders(document:Document): {"Cookie": string} {
    const decodedCookie = decodeURIComponent(document.cookie.split(';')[0]);
    const headers = {
        'Cookie': decodedCookie
    };
    return headers;
}