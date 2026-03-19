import { auth } from "@/lib/auth/auth-server";

export async function POST(req: Request) {
  const result = await auth.api.signOut({ headers: req.headers });

  // sends Set-Cookie in the response to expire the cookie in the browser
  const headers = new Headers({
    "Set-Cookie":
      "better-auth.session_token=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax",
    "Content-Type": "application/json",
  });

  return new Response(JSON.stringify(result), {
    status: result.success ? 200 : 500,
    headers,
  });
}
