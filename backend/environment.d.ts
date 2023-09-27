declare global {
    namespace NodeJS {
        interface ProcessEnv {
            secret: string;
            environment: "dev" | "prod" | "debug";
            id: string;
            callback: string;
            token: string;
        }
    }
}

export {};