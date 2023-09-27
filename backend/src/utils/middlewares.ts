import { NextFunction, Request, Response } from "express";
import { ExtendedClient, User, getMutualGuildsService } from "../exports";
import { ChatInputCommandInteraction } from "discord.js";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => (req.user ? next() : res.status(403));

export function formatDuration(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000) % 60;
  const minutes = Math.floor(milliseconds / 1000 / 60) % 60;
  const hours = Math.floor(milliseconds / 1000 / 60 / 60) % 24;
  const days = Math.floor(milliseconds / 1000 / 60 / 60 / 24);

  const daysLabel = days === 1 ? "jour" : "jours";
  const hoursLabel = hours === 1 ? "heure" : "heures";
  const minutesLabel = minutes === 1 ? "minute" : "minutes";
  const secondsLabel = seconds === 1 ? "seconde" : "secondes";

  const parts = [];
  if (days > 0) parts.push(`${days} ${daysLabel}`);
  if (hours > 0) parts.push(`${hours} ${hoursLabel}`);
  if (minutes > 0) parts.push(`${minutes} ${minutesLabel}`);
  if (seconds > 0) parts.push(`${seconds} ${secondsLabel}`);
  return parts.join(", ");
}

export function checkPermissons(
  client: ExtendedClient,
  interaction: ChatInputCommandInteraction
): Boolean {
  return interaction.guild.members.cache
    .get(client.user.id)
    .permissions.has([
      "ManageRoles",
      "ManageChannels",
      "KickMembers",
      "BanMembers",
      "ManageNicknames",
      "ManageGuildExpressions",
      "ReadMessageHistory",
      "ModerateMembers",
      "SendMessages",
      "SendMessagesInThreads",
      "ManageMessages",
      "ManageThreads",
      "EmbedLinks",
      "AttachFiles",
      "ReadMessageHistory",
      "AddReactions",
      "UseExternalEmojis",
      "UseApplicationCommands",
      "Connect",
      "Speak",
      "PrioritySpeaker",
    ]);
}

export function generatePartnershipID(): string {
  return Array.from({length: 10}, () => Math.floor(Math.random() * 10)).join('');
}