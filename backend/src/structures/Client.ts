import { ApplicationCommandDataResolvable, Client, ClientEvents, Collection, Partials, GatewayIntentBits, EmbedBuilder, Embed, EmbedData} from "discord.js";
import glob from "glob";
import { promisify } from "util";
import {AsciiTable3, AlignmentEnum} from "ascii-table3"

import {Event, RegisterCommandsOptions, CommandType, Database} from "../exports"

const globPromise = promisify(glob);
const cmdtable = new AsciiTable3().setHeading("Commandes", "Statut").setAlign(2, AlignmentEnum.AUTO)
const eventstable = new AsciiTable3().setHeading("Event", "Statut").setAlign(2, AlignmentEnum.AUTO)

export class ExtendedClient extends Client {
    commands: Collection<string, CommandType> = new Collection();
    database: Database = new Database();

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds, 
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildPresences, 
                GatewayIntentBits.GuildMessageReactions, 
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.MessageContent,
            ],
            partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction] 
        });
    }

    embed() {
        return new EmbedBuilder()
        .setTimestamp()
        .setColor("Aqua")
        .setFooter({iconURL: this?.user.avatarURL(), text: this?.user.tag})
    }

    start() {
        this.registerModules();
        this.login(process.env.token);
    }
    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    async registerCommands({ commands }: RegisterCommandsOptions) {
        this.application?.commands.set(commands);
    }

    async registerModules() {
        const slashCommands: ApplicationCommandDataResolvable[] = [];
        const commandFiles = await globPromise(
            `${__dirname}/../commands/*/*{.ts,.js}`
        );
        
        for (const filePath of commandFiles) {
            const command: CommandType = await this.importFile(filePath);
            if (!command.name) continue;
            cmdtable.addRow(command.name, '✅')
            this.commands.set(command.name, command);
            slashCommands.push(command);
        }

        this.on("ready", () => {
            this.registerCommands({
                commands: slashCommands,
            });
        });

        const eventFiles = await globPromise(
            `${__dirname}/../events/*{.ts,.js}`
        );

        for (const filePath of eventFiles) {
            const event: Event<keyof ClientEvents> = await this.importFile(
                filePath
            );
            eventstable.addRow(event.event, '✅')
            this.on(event.event, event.run);
        }

        console.log(eventstable.toString());
        console.log(cmdtable.toString());

        console.log("[CLIENT]: Chargement des modules terminé")

    }
}