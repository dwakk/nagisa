export type PartialGuild = {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: string;
    features: string[];
}

export type Guild = {
    guildId: string;
    name: string;
    icon: string;
    blacklist: string[];
    options: [];
}


export type User = {
    id: string;
    avatar: string;
    global_name: string;
    icon: string;
}

export type ErrorMessage = {
    name: string
}