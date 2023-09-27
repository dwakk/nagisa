import { Guild } from "../../exports";
import {
  BlackListData,
  ManagersAction,
  PartnershipEmbed,
  PartnershipManager,
  PartnershipPlugin,
  SinglePartnershipData,
} from "../../typings/Plugins";
import { Request, Response } from "express";

export async function getBlacklistData(guildId: string): Promise<string[]> {
  const data = await Guild.findOne({ guildId });
  return data.blacklist;
}

export async function getPartnershipData(guildId: string) {
  const data = await Guild.findOne({guildId});
  return data.options[0].data as PartnershipPlugin;
}

export async function handleBlacklist(guildId: string, data: BlackListData[]) {
  const guild = await Guild.findOne({ guildId });
  if (!guild) {
    throw new Error(`Couldn't find guild with id ${guildId}`);
  }
  for (const user of data) {
    switch (user.operation) {
      case "pull":
        if (!guild.blacklist.includes(user.id)) break
        guild.blacklist = guild.blacklist.filter((id) => id !== user.id);
        break;
      case "push":
        if (guild.blacklist.includes(user.id)) break
        guild.blacklist.push(user.id);
        break;
      default:
        break;
    }
    guild.markModified("blacklist");
    await guild.save();
  }
  const updated = await Guild.findOne({ guildId });
  return updated;
}

export async function handleEmbed(guildId: string, embed: PartnershipEmbed) {
  const guild = await Guild.findOne({ guildId });
  if (!guild) {
    throw new Error(`Couldn't find guild with id ${guildId}`);
  }
  const { author, title, description, image, footer, timestamp } = embed;

  const guildEmbed = guild.options[0].data.embed as PartnershipEmbed;

  Object.entries({ title, description, image, timestamp }).forEach(
    ([key, value]) => {
      value !== "undefined" ? (guildEmbed[key] = value) : null;
    }
  );

  if (author.name !== "undefined") {
    guildEmbed.author.name = author.name;
  }

  if (author.icon !== "undefined") {
    guildEmbed.author.icon = author.icon;
  }

  if (footer.text !== "undefined") {
    guildEmbed.footer.text = footer.text;
  }

  if (footer.icon !== "undefined") {
    guildEmbed.footer.icon = footer.icon;
  }

  guild.markModified("options");
  await guild.save();
  const updated = await Guild.findOne({ guildId });
  return updated;
}

export async function handleManagers(guildId: string, data: ManagersAction[]) {
  const guild = await Guild.findOne({ guildId});
  if (!guild) {
    throw new Error(`Couldn't find guild with id ${guildId}`);
  }

  let managers = guild.options[0].data.managers as PartnershipManager[];

  for (const manager of data) {
    switch (manager.operation) {
      case "pull":
        const index = managers.findIndex((m) => m.id === manager.id);
        if (index !== -1) {
          managers.splice(index, 1);
        } else {
          throw new Error(`No manager with id ${manager.id} found`);
        }
        guild.markModified("options");
        await guild.save();
        break;
      case "push":
        if (managers.some((m) => m.id === manager.id)) {
          throw new Error(`Manager with id ${manager.id} already exists`);
        } else {
          managers.push({ id: manager.id, count: 0 });
        }
        guild.markModified("options");
        await guild.save();
        break;
      default:
        break;
    }
  }
  const updated = await Guild.findOne({ guildId});
  return updated;
}


export async function getSinglePartnershipData(guildId: string, id: string) {
  const guild = await Guild.findOne({guildId})
  if (!guild) {
    throw new Error(`Couldn't find guild with id ${id}`);
  }
  const partnerships = guild.options[0].data.partnerships as SinglePartnershipData[]
  for (const partnership of partnerships) {
    if (partnership.id === id) {
      return partnership
    }
  }
  throw new Error(`Could not find partnership with id ${id}`);
}


export async function handlePartnershipSettings(guildId: string, data: {enabled: boolean | "undefined" , channel: string}) {
  const {enabled, channel} = data
  const guild = await Guild.findOne({guildId})
  if (!guild) {
    throw new Error(`Couldn't find guild with id ${guildId}`);
  }

  const partnershipPlugin = guild.options[0].data as PartnershipPlugin
  if (partnershipPlugin.enabled === enabled) {
    throw new Error(`Setting already set on ${enabled}`)
  }

  if (partnershipPlugin.channel === channel) {
    throw new Error(`Channel ${channel} is already set as partnership chanel`)
  }

  if (enabled !== "undefined") {
    partnershipPlugin.enabled = enabled
  }

  if (channel !== "undefined") {
    partnershipPlugin.channel = channel
  }

  
  guild.markModified("options");
  await guild.save();

  const updated = await Guild.findOne({guildId})
  return updated
}