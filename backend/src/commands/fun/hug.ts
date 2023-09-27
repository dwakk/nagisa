import { Command } from "../../exports";
import { Kawaii } from "kawaii-api";
const api = new Kawaii("anonymous")

export default new Command({
    name: "hug",
    description: "Faites un câlin à un membre",
    cooldown: 3000,
    options: [
        {
            name: "membre",
            description: "Le membre à qui vous voulez faire un câlin",
            type: 6,
            required: true,
        },
    ],
    run: async ({interaction, client}) => {
        await interaction.deferReply()
        const user = interaction.options.getUser("membre")
        const response = await api.gif("hug")
        const embed = client.embed()
        .setDescription(`${interaction.user} fait un câlin à ${user}`)
        .setImage(response)
        return await interaction.followUp({embeds: [embed]})
    }
})