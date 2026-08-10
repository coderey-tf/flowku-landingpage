import { NextResponse } from "next/server";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { appId, appSecret, code, redirectUri } = body;

    if (!appId || !appSecret || !code) {
      return NextResponse.json(
        { error: { message: "appId, appSecret, dan code wajib diisi." } },
        {
          status: 400,
          headers: { "Access-Control-Allow-Origin": "*" },
        },
      );
    }

    const currentUrl = redirectUri || "https://flowku.my.id/waba-coexistence";
    const candidates = Array.from(
      new Set([
        currentUrl,
        currentUrl.endsWith("/") ? currentUrl.slice(0, -1) : `${currentUrl}/`,
        "https://flowku.my.id/waba-coexistence",
        "http://localhost:3000/waba-coexistence",
        "",
      ]),
    );

    let lastData: any = null;

    for (const uri of candidates) {
      const uriParam = encodeURIComponent(uri);
      const url = `https://graph.facebook.com/v20.0/oauth/access_token?client_id=${appId.trim()}&client_secret=${appSecret.trim()}&code=${code.trim()}${
        uri !== "" ? `&redirect_uri=${uriParam}` : ""
      }`;

      const res = await fetch(url, { method: "GET" });
      const data = await res.json();

      if (data.access_token) {
        return NextResponse.json(data, {
          headers: { "Access-Control-Allow-Origin": "*" },
        });
      }
      lastData = data;
      if (
        data.error?.message?.includes("has already been used") ||
        data.error?.message?.includes("expired")
      ) {
        break;
      }
    }

    return NextResponse.json(
      lastData || { error: { message: "Gagal menukarkan token." } },
      {
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
      },
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: { message: err.message || "Internal Server Error" } },
      {
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*" },
      },
    );
  }
}
