import {
    AutocompleteInteraction,
    CacheType,
    ChatInputApplicationCommandData,
    CommandInteraction,
    CommandInteractionOptionResolver,
    GuildMember,
    PermissionResolvable
} from "discord.js";
import { ExtendedClient, IGuild } from "../exports";

/**
 * {
 *  name: "commandname",
 * description: "any description",
 * run: async({ interaction }) => {
 *
 * }
 * }
 */
export interface ExtendedInteraction extends CommandInteraction {
    member: GuildMember;
}

export interface CommandData {
    guild: IGuild
    cmd: CommandType;
}

interface RunOptions {
    client: ExtendedClient;
    interaction: ExtendedInteraction;
    data: CommandData;
}

type RunFunction = (options: RunOptions) => any;


export type CommandType = {
    userPermissions?: PermissionResolvable;
    botPermissions?: PermissionResolvable;
    cooldown?: number;
    autocomplete?: (interaction: AutocompleteInteraction) => void;
    run: RunFunction;
} & ChatInputApplicationCommandData