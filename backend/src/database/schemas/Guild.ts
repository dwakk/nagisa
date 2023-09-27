import mongoose, {Schema, SchemaTypes} from "mongoose";
import { IGuild, GuildOptions } from "../../typings/IGuild";

const {String, Boolean, } = SchemaTypes



const GuildSchema = new Schema<IGuild>({
    guildId: String,
    blacklist: {type: [String], default: []},
    options: {type: [{name: String,data: {},}], default: [
        {
            name: "partnership",
            data: {
                enabled: false,
                managers: [],
                embed: {
                    author: {
                        name: null,
                        icon: null,
                    },
                    title: null,
                    description: "Nouveau partnenariat",
                    image: null,
                    footer: {
                        icon: null,
                        text: null,
                    },
                    timestamp: false
                },
                channel: "null",
                partnershipIDs: [],
                partnerships: [],
            }
        },
        {
            name: "wordfilter",
            data: {
                enabled: false,
                exempt: [],
                words: []
            }
        }
    ]}
})

export const Guild = mongoose.model("guilds", GuildSchema)