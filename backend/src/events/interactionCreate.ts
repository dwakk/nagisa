import { ChatInputCommandInteraction, EmbedBuilder, Collection, GuildMember, } from 'discord.js';
import { Event, ExtendedInteraction, checkPermissons, client, formatDuration } from "../exports";

const cooldown = new Collection()

export default new Event("interactionCreate", async (interaction: ChatInputCommandInteraction) => {
    try {

        if (checkPermissons(client, interaction) === false) {
            const embed = new EmbedBuilder()
            .setDescription(`🚫 - ${interaction.member}, Mes permissions ne sont pas correctement réglées. Vous devez me réinviter sur le serveur et cocher toutes les permissions!`)
            .setColor("Red")
            return await interaction.reply({embeds: [embed], ephemeral: true})
        }

        const bot = interaction.guild.members.cache.get(client.user.id) as GuildMember

        const command = client.commands.get(interaction.commandName);
        const guildData = await client.database.fetchGuild(interaction.guild)
        const data = {guild: guildData, cmd: command}
    
        if (!command) {
            client.commands.delete(command.name)
            return await interaction.reply({content: "Cette commande n'existe pas!", ephemeral: true});
        }
    
        if (data.guild.blacklist.includes(interaction.user.id)) {
            const embed = new EmbedBuilder()
            .setDescription(`🚫 - ${interaction.user}, Vous êtes dans la blacklist de ce serveur!`)
            .setColor("Red")
            return await interaction.reply({embeds: [embed], ephemeral: true})
        }
    
        if (command.userPermissions || command.botPermissions) {
            if (!interaction.memberPermissions.has(command.userPermissions)) {
                const embed = new EmbedBuilder()
                .setDescription(`🚫 - ${interaction.member}, Vous n'avez pas la permission \`${command.userPermissions}\` qui est requise pour effectuer cette commande!`)
                .setColor("Red")
                return await interaction.reply({embeds: [embed], ephemeral: true})
            }
            if (!bot.permissions.has(command.botPermissions)) {
                const embed = new EmbedBuilder()
                .setDescription(`🚫 - ${interaction.member}, Je n'ai pas la permission \`${command.botPermissions}\` qui est requise pour effectuer cette commande!`)
                .setColor("Red")
                return await interaction.reply({embeds: [embed], ephemeral: true})
            }

        }
    
        if (interaction.isAutocomplete()) {
            if (!command.autocomplete) return
            command.autocomplete(interaction)
        }

        if (command.cooldown) {
            if (cooldown.has(`slash-${command.name}${interaction.user.id}`)) {
                const cooldownExpiration = cooldown.get(`slash-${command.name}${interaction.user.id}`);
                if (typeof cooldownExpiration === 'number') {
                    const remainingTime = cooldownExpiration - Date.now();
                    return await interaction.reply({ content: `Vous devez attendre ${formatDuration(remainingTime)} avant de pouvoir réutiliser cette commande`, ephemeral: true});
                }
            }
    
            cooldown.set(`slash-${command.name}${interaction.user.id}`, Date.now() + command.cooldown);
            setTimeout(() => {
                cooldown.delete(`slash-${command.name}${interaction.user.id}`)
            }, command.cooldown);
        }
    
        command.run({
            client,
            interaction: interaction as ExtendedInteraction,
            data: data
        });

    } catch (err:any) {
        console.log(err.message)
    }


    
});