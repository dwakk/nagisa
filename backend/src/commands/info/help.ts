import { Command } from "../../exports";

export default new Command({
    name: "help",
    description: "Envoie toutes les commandes",
    cooldown: 3000,
    run: async ({interaction, client}) => {
        await interaction.deferReply()
        const cmds= []
        for (const command of client.commands) {
            cmds.push(`**${command[1].name}:**\n${command[1].description}\n\n`)
        }
        const embed = client.embed()
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription(cmds.join(""))
        return await interaction.followUp({embeds: [embed]})
    }
})