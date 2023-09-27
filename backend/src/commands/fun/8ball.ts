import { Command } from "../../exports";
import {answers} from "../../utils/answers"

export default new Command({
    name: "8ball",
    description: "Demandez quelque chose à la balle magique 8",
    cooldown: 3000,
    options: [
        {
            name: "question",
            description: "Ce que vous souhaitez demander à la balle magique 8",
            type: 3,
            required: true,
        }
    ],
    run: async ({interaction, client}) => {
        await interaction.deferReply()
        const question = interaction.options.get("question").value
        const embed = client.embed()
        .setDescription(`> **${interaction.member}:** ${question}\n\n🎱 ${answers[Math.round(Math.random()*answers.length)]}`)
        return await interaction.followUp({embeds: [embed]})
    }
})