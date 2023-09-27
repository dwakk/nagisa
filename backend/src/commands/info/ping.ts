import { TextChannel, ThreadChannel, VoiceChannel } from "discord.js"
import { Command } from "../../exports"

export default new Command({
    name: "ping",
    description: "Pong!",
    cooldown: 3000,
    run: async({interaction}) => {
        await interaction.deferReply()
        return await interaction.followUp("Pong")
    }
})