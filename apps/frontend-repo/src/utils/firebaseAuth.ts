import { createRemoteJWKSet, jwtVerify } from "jose";

const FIREBASE_JWKS_URL = process.env.NEXT_PUBLIC_FIREBASE_JWKS_URL ?? "";
const FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
// Get Firebase JWK set (Google's public keys)
const JWKS = createRemoteJWKSet(new URL(FIREBASE_JWKS_URL));

export async function verifyFirebaseToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`,
      audience: FIREBASE_PROJECT_ID,
    });

    return payload; // Token is valid, return user data
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
