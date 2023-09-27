import { CommandType } from "../exports";

export class Command {
    constructor(commandOptions: CommandType) {
        Object.assign(this, commandOptions);
    }
}