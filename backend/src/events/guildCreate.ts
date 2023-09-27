import { Event, client } from "../exports";

export default new Event("guildCreate", async guild => {
    await client.database.fetchGuild(guild)
})