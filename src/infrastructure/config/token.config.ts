export const tokenConfig = {
    access: {
        secretKey:      process.env.JWT_SECRET,
        expireSeconds:  Number(process.env.JWT_TOKEN_EXPIRE_SECONDS)
    }
}