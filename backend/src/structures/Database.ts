import { BaseGuild } from "discord.js";
import { Guild } from "../exports";

export class Database {
    async fetchGuild(guild: BaseGuild) {
        const {id} = guild
        let guildDB = await Guild.findOne({guildId: id})
        if (!guildDB) {
            guildDB = new Guild({guildId: id})
            await guildDB.save()
        }
        return guildDB
    }

    async deleteGuild(guild: BaseGuild) {
        await Guild.findOneAndDelete({guildId: guild.id})
    }
}