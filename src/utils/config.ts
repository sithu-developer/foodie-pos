interface Config {
    apiBaseUrl : string
    googleClientId : string
    googleClientSecret : string
    spaceEndpoint : string;
    spaceAccessKeyId : string;
    spaceSecretAccessKey : string;
    orderAppUrl : string;
}
export const config : Config = {
    apiBaseUrl : process.env.NEXT_PUBLIC_API_BASE_URL || "",
    googleClientId : process.env.GOOGLE_CLIENT_ID || "",
    googleClientSecret : process.env.GOOGLE_CLIENT_SECRET || "",
    spaceEndpoint : process.env.SPACE_ENDPOINT || "",
    spaceAccessKeyId : process.env.SPACE_ACCESS_KEY_ID || "",
    spaceSecretAccessKey : process.env.SPACE_SECRET_ACCESS_KEY || "",
    orderAppUrl : process.env.ORDER_APP_URL || "",
}