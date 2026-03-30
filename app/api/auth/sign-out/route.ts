import { auth } from "@/lib/auth/auth-server";

export async function POST(req: Request) {
  const result = await auth.api.signOut({ headers: req.headers });

  const isProd = process.env.NODE_ENV === "production";

  const cookieName = isProd
    ? "__Secure-better-auth.session_token"
    : "better-auth.session_token";

  const headers = new Headers({
    "Set-Cookie": `${cookieName}=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax${
      isProd ? "; Secure" : ""
    }`,
    "Content-Type": "application/json",
  });

  return new Response(JSON.stringify(result), {
    status: result.success ? 200 : 500,
    headers,
  });
}
