import { EmbedBuilder, GuildMember } from "discord.js";
import { Command } from "../../exports";

export default new Command({
    name: "banniere",
    description: "Envoie la bannière d'un membre",
    cooldown: 3000,
    options: [
        {
            name: "membre",
            description: "Le membre dont vous voulez obtenir la bannière",
            type: 6,
        }
    ],
    run: async ({interaction, client}) => {
        let user = interaction.options.getUser("membre") ? interaction.options.getUser("membre") : interaction.user
        user = await user.fetch()
        if (!user.bannerURL()) {
            const embed = client.embed()
            .setColor("Red")
            .setTitle("Erreur")
            .setDescription("Ce membre n'a pas de bannière customisée")
            return await interaction.reply({embeds: [embed], ephemeral: true})
        } else {
            await interaction.deferReply()
            const embed = client.embed()
            .setDescription(`${user}`)
            .setImage(user.bannerURL({size: 512}))
            return await interaction.followUp({embeds: [embed]})
        }
    }
})