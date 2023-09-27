import {Event} from "../exports"

export default new Event("ready", (client) => {
    client.user.setStatus("online");
    const activities = [
        { name: `${client.guilds.cache.size} Serveurs`, type: 2 },
        { name: `${client.users.cache.size} Utilisateurs`, type: 3 },
        { name: "Version bêta", type: 5 },
    ];
    let i: number = 0;
    setInterval(() => {
        if (!client.user) return
        if (i >= activities.length) i = 0;
        client.user.setActivity(activities[i].name, { type: activities[i].type });
        i++;
    }, 10000);
    console.log(`[CLIENT]: Connecté sur ${client.user.tag}`);
})