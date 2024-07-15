const jose = require("jose");

export async function createJwtToken(userId: any, name: string) {
  const secret = new TextEncoder().encode(process.env.SECRET_TOKEN || "");
  const alg = process.env.ALG_KEY;
  const token = await new jose.SignJWT({
    userId: userId,
    name: name,
  })
    .setProtectedHeader({ alg })
    .sign(secret);

  return token;
}

export async function verifyJwtToken(jwt: any) {
  try {
    const secret = new TextEncoder().encode(process.env.SECRET_TOKEN || "");
    const payload = await jose.jwtVerify(jwt, secret);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function authTokenUserId(bearerToken: string) {
  const token = bearerToken.split(" ").at(1) || "";
  const payload = await verifyJwtToken(token);
  const userId = payload?.payload?.userId || "";
  if (!userId) {
    return null;
  }

  return userId;
}
