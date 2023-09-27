import { Event, client, generatePartnershipID } from "../exports";
import { Guild } from "../exports";
import { PartnershipPlugin, SinglePartnershipData } from "../typings/Plugins";

export default new Event("messageCreate", async message => {
    if (message.author.bot) return
    if (message.member.permissions.has("Administrator")) return
    const guild = await Guild.findOne({guildId: message.guildId})
    const partnershipPlugin = guild.options[0].data as PartnershipPlugin

    if (partnershipPlugin.enabled && partnershipPlugin.channel !== "null" && message.channelId === partnershipPlugin.channel && partnershipPlugin.managers.some(m => m.id === message.author.id)) {
        for (const manager of partnershipPlugin.managers) {
            if (manager.id === message.author.id) {
                manager.count++;
            }
        }
        let ptnshipid = generatePartnershipID()
        while (partnershipPlugin.partnershipIDs.includes(ptnshipid)) {
            ptnshipid = generatePartnershipID()
        }
        partnershipPlugin.partnershipIDs.push(ptnshipid)
        const partnership:SinglePartnershipData = {
            id: ptnshipid,
            content: message.content,
            manager: message.author.id,
        }
        partnershipPlugin.partnerships.push(partnership)
        guild.markModified("options")
        await guild.save();
    }
})