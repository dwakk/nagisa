export interface BlacklistPlugin {
    data: BlackListData[];
}

export interface BlackListData {
    operation: "push" | "pull";
    id: string;
}

export interface PartnershipEmbed {
    author: {
        name: string | null | "undefined";
        icon: string | null | "undefined";
    };
    title: string | null | "undefined";
    description: string | null | "undefined";
    image: string | null | "undefined";
    footer: {
        icon: string | null | "undefined";
        text: string | null | "undefined";
    };
    timestamp: boolean | string;
}

export interface PartnershipManager {
    id: string;
    count: number;
}

export interface PartnershipPlugin {
    enabled: boolean | "undefined";
    managers: PartnershipManager[];
    embed: PartnershipEmbed;
    deleteIfLeave: boolean;
    partnershipIDs: string[];
    partnerships: SinglePartnershipData[];
    channel: string;
}


export interface ManagersAction {
    operation: "push" | "pull";
    id: string;
}

export interface SinglePartnershipData {
    id: string;
    content: string;
    manager: string;
}



export interface WordFilterPlugin {
    enabled: boolean | "undefined";
    exempt: string[];
    words: string[];
}

export interface WordFilterAction {
    operation: "push" | "pull";
    id: string;
}