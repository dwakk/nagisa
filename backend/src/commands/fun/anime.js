const {Command} = require('../../exports')
const {TextChannel, ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder} = require('discord.js')
const scraper = require('mal-scraper')

module.exports = new Command({
    name: "anime",
    description: "Cherchez un anime",
    cooldown: 3000,
    options: [
        {
            name: "anime",
            description: "Nom de l'anime",
            type: 3,
            required: true,
        }
    ],
    run: async ({interaction, client}) => {
        
        let allowNsfw = false
        interaction.channel instanceof TextChannel ? allowNsfw = interaction.channel.nsfw : null
        const name = interaction.options.get("anime").value.toString()
        const response = await scraper.getInfoFromName(name)
        const {englishTitle, title, picture ,rating, aired, type, episodes, score, popularity, url} = response

        if (!url) {
            const embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`🚫 - ${interaction.user}, Aucun anime n'a été trouvé avec le titre \`${name}*\``)
            return await interaction.reply({embeds: [embed], ephemeral: true})
        }

        if (!allowNsfw && rating.includes("R")) {
            const embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`🚫 - ${interaction.user}, Cet anime est noté 17+ mais le salon n'est pas NSFW!`)
            return await interaction.reply({embeds: [embed], ephemeral: true})
        }
        await interaction.deferReply()
        const age = rating.split(" ").slice(0, 1).join(" ")
        const date = aired.split(' ')
        const startDate = date.slice(0, 3).join(' ')
        let endDate = date.slice(4, 7).join(" ");

        episodes === "1" ? endDate = startDate : null

        const imgbtn = new ButtonBuilder()
        .setLabel("Image")
        .setURL(picture)
        .setStyle(ButtonStyle.Link)

        const lnkbtn = new ButtonBuilder()
        .setLabel("Lien")
        .setURL(url)
        .setStyle(ButtonStyle.Link)

        const row = new ActionRowBuilder()
        .addComponents(imgbtn, lnkbtn)

        let acctitle = title
        englishTitle !== title ? acctitle = `${acctitle} - ${englishTitle}` : null

        const embed = client.embed()
        .setTitle(acctitle)
        .setThumbnail(picture)
        .addFields(
            {name: "Type", value: type, inline: true},
            {name: "Episodes", value: episodes, inline: true},
            {name: '\u200B', value: '\u200B', inline: true },
            {name: "Date de début", value: startDate, inline: true},
            {name: "Date de fin", value: endDate, inline: true},
            {name: '\u200B', value: '\u200B', inline: true },
            {name: "Score", value: score, inline: true},
            {name: "Popularité", value: popularity, inline: true},
            {name: '\u200B', value: '\u200B', inline: true },
            {name: "Restriction d'âge", value: age}
        )

        return await interaction.followUp({embeds: [embed], components: [row]})
    }
})