import { Command } from "../../exports";

export default new Command({
    name: "avatar",
    description: "Envoie la photo de profil d'un membre",
    cooldown: 3000,
    options: [
        {
            name: "membre",
            description: "Le membre dont vous voulez obtenir la photo de profil",
            type: 6,
        }
    ],
    run: async ({interaction, client}) => {
        await interaction.deferReply()
        const user = interaction.options.getUser("membre") ? interaction.options.getUser("membre") : interaction.user
        const embed = client.embed()
        .setDescription(`${user}`)
        .setImage(user.avatarURL({size: 512}))
        return await interaction.followUp({embeds: [embed]})
    }
})