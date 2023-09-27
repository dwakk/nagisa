import axios from 'axios';

export const fetchStatus = async (headers: any):Promise<string> => {
    let url: string;
    try {
        await axios.get('http://localhost:3000/api/status', {headers, withCredentials: true})
        url = "http://localhost:5173/dashboard"
    } catch {
        url = "http://localhost:3000/api/auth/discord"
    }
    return url
}

export const fetchUserData = async (headers: any) => {
    const data = await axios.get('http://localhost:3000/api/me', {headers, withCredentials: true})
    return data
}

export const fetchMutualGuilds = async (headers: any) => {
    const data = await axios.get('http://localhost:3000/api/guilds', { headers, withCredentials: true });
    return data
}

export const fetchGuild = async (headers: any, guildID: string) => {
    const data = await axios.get(`http://localhost:3000/api/guilds/${guildID}`, { headers, withCredentials: true })
    return data
}