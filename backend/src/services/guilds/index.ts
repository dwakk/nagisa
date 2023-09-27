import axios, {  } from "axios";
import { User, api_url, PartialGuild } from "../../exports";

export async function getUserDataService(token: string) {
  const {data} = await axios.get(`${api_url}/users/@me`, {headers: {"Authorization": `Bearer ${token}`}})
  return data
}


async function getGuilds(tokenType: "Bot" | "Bearer", tokenValue: string): Promise<PartialGuild[]> {
  const authorizationHeader = tokenType === "Bot" 
    ? { Authorization: `Bot ${tokenValue}` }
    : { Authorization: `Bearer ${tokenValue}` };
  
  const response = await axios.get<PartialGuild[]>(`${api_url}/users/@me/guilds`, {
    headers: authorizationHeader
  });
  
  return response.data;
}

export async function getGuildById(id: string, headers: any): Promise<PartialGuild> {
  const {data} = await axios.get<PartialGuild>(`${api_url}/guilds/${id}`, {headers})
  return data
}

export async function getMutualGuildsService(userId: string): Promise<{ adminNoBot: PartialGuild[], mutualAdminGuilds: PartialGuild[] }> {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const [botGuilds, userGuilds] = await Promise.all([
    getGuilds("Bot", process.env.token),
    getGuilds("Bearer", user.accessToken)
  ]);

  const adminUserGuilds = userGuilds.filter(
    ({ permissions }) => (parseInt(permissions) & 0x8) === 0x8
  );

  // Convert botGuilds array to a Set for efficient membership checks
  const botGuildIds = new Set(botGuilds.map(guild => guild.id));

  const [adminNoBot, mutualAdminGuilds] = partition(adminUserGuilds, guild => botGuildIds.has(guild.id));

  // Modify guild icons using map
  adminNoBot.forEach(guild => {
    guild.icon = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`;
  });

  return { adminNoBot, mutualAdminGuilds };
}

// Helper function to partition an array based on a condition
function partition<T>(array: T[], condition: (item: T) => boolean): [T[], T[]] {
  const trueArray: T[] = [];
  const falseArray: T[] = [];

  for (const item of array) {
    if (condition(item)) {
      trueArray.push(item);
    } else {
      falseArray.push(item);
    }
  }

  return [trueArray, falseArray];
}