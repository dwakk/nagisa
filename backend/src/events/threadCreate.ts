import { Event } from "../exports";

export default new Event("threadCreate", async (thread) => {
    thread.joined ? null : await thread.join()
})