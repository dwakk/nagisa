import { Command } from "../../exports";
import { Kawaii } from "kawaii-api";
const api = new Kawaii("anonymous")

export default new Command({
    name: "kiss",
    description: "Embrassez un membre",
    cooldown: 3000,
    options: [
        {
            name: "membre",
            description: "Le membre que vous voulez embrasser",
            type: 6,
            required: true,
        },
    ],
    run: async ({interaction, client}) => {
        await interaction.deferReply()
        const user = interaction.options.getUser("membre")
        const response = await api.gif("kiss")
        const embed = client.embed()
        .setDescription(`${interaction.user} embrasse ${user}`)
        .setImage(response)
        return await interaction.followUp({embeds: [embed]})
    }
})