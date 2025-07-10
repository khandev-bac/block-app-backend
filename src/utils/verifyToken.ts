import { decodeJwt } from "jose";
export const verifyGoogleToken = async (idToken: string) => {
    const payload = decodeJwt(idToken)
    if (!payload.email || !payload.sub) {
        throw new Error('Invalid Google token')
    }
    return {
        id: payload.sub as string,
        email: payload.email as string,
        name: payload.name as string ?? null,
        profile: payload.picture as string ?? null
    }
}