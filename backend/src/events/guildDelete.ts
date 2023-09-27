import { Event, client } from "../exports";

export default new Event("guildDelete", async guild => {
    await client.database.deleteGuild(guild)
})