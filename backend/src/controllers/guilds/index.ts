import { Request, Response } from "express";
import {
  ExtendedGuild,
  Guild,
  User,
  getGuildById,
  getMutualGuildsService,
  getUserDataService,
} from "../../exports";
import { ManagersAction, PartnershipEmbed, PartnershipManager, PartnershipPlugin } from "../../typings/Plugins";
import { getBlacklistData, getPartnershipData, getSinglePartnershipData, handleBlacklist, handleEmbed, handleManagers, handlePartnershipSettings } from "./plugin";


export async function getGuildsController(req: Request, res: Response) {
  const user = req.user as User;
  try {
    const {mutualAdminGuilds, adminNoBot} = await getMutualGuildsService(user.id);
    return res.send({ mutualAdminGuilds, adminNoBot });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}


export async function getUserDataController(req: Request, res: Response) {
  const user = req.user as User
  try {
    const data = await getUserDataService(user.accessToken)
    return res.send(data).status(200)
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}




export async function getSingleGuildController(req: Request, res: Response) {
  const guildId = req.params.id
  const g = await Guild.findOne({guildId})
  if (!g) {
    return res.sendStatus(400)
  }
  const {options, blacklist} = g
  
  const {name, icon} = await getGuildById(guildId, {Authorization: `Bot ${process.env.token}`})
  const guild: ExtendedGuild = {
    guildId,
    name,
    icon: `https://cdn.discordapp.com/icons/${guildId}/${icon}`,
    blacklist,
    options
  }
  res.send(guild)
}


export async function getSingleGuildPluginController(req: Request, res: Response) {
  const plugin = req.params.plugin
  const id = req.params.id
  let data:string[] | PartnershipPlugin;
  try {
    switch (plugin) {
      case "blacklist":
        data = await getBlacklistData(id)
        break
      case "partnership":
        data = await getPartnershipData(id)
        break
    }
  return res.status(200).json(data)
  } catch (err) {
    return res.sendStatus(400)
  }
}


export async function handleBlacklistController(req: Request, res: Response) {
  const {id} = req.params
  const data = req.body
  try {
    const updated = await handleBlacklist(id, data)
    return res.status(200).json(updated)
  } catch (err) {
    return res.status(400).json({msg: err.message})
  }
}

export async function handlePartnerShipEmbedController(req: Request, res: Response) {
  const { id } = req.params;
  const { embed } = req.body;
  
  try {
    const updated = await handleEmbed(id, embed)
    return res.status(200).json(updated)
  } catch (err) {
    return res.status(400).json({msg: err.message})
  }
}

export async function handlePartnershipManagersController(req: Request, res: Response) {
  const { id } = req.params
  const data = req.body as ManagersAction[]

  try {
    const updated = await handleManagers(id, data)
    return res.status(200).json(updated)
  } catch (err) {
    return res.status(500).json({msg: err.message})
  }
}


export async function getSingleGuildPartnershipController(req: Request, res: Response) {
  const {id, partnershipid} = req.params
  try {
    const data = await getSinglePartnershipData(id, partnershipid)
    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({msg: err.message})
  }
}

export async function handlePartnershipSettingsController(req: Request, res: Response) {
  const {id} = req.params
  const data = req.body
  try {
    const updated = await handlePartnershipSettings(id, data)
    return res.status(200).json(updated)
  } catch (err) {
    return res.status(500).json({msg: err.message})
  }
}