import { PartialGuild } from "./PartialGuild";

export interface IGuild {
    guildId: string;
    blacklist: string[];
    options: GuildOptions[];
}

export interface GuildOptions {
    name: string;
    data: any
}

export interface ExtendedGuild extends IGuild {
    name: string;
    icon: string;
}