import { serverConfig } from "./server.config";

export const googleAuthConfig = {
    client_id:      process.env.GOOGLE_CLOUD_CLIENT_ID,
    client_secret:  process.env.GOOGLE_CLOUD_CLIENT_SECRET,
    redirect_uri:   `${serverConfig.protocol}://api.${serverConfig.domain}/v1/auth/google/callback`,
}