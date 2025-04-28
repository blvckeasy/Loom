export const serverConfig = {
    protocol:   process.env.SERVER_PROTOCOL || "http",
    host:       process.env.SERVER_HOST     || "localhost",
    port:       process.env.SERVER_PORT     || 3000,
}