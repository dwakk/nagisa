require("dotenv").config();
import { createApp } from "./exports";
import './database'
import { ExtendedClient } from "./exports";

export const client = new ExtendedClient();

async function main()  {
    const app = createApp();

    app.listen(3000, () => {
        console.log("[DASHBOARD]: Connecté sur le port 3000")
    })

    client.start();
}

main();