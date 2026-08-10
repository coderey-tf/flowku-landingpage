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

    const uriParam = redirectUri ? encodeURIComponent(redirectUri.trim()) : "";
    const url = `https://graph.facebook.com/v20.0/oauth/access_token?client_id=${appId.trim()}&client_secret=${appSecret.trim()}&code=${code.trim()}${
      uriParam ? `&redirect_uri=${uriParam}` : ""
    }`;

    const res = await fetch(url, { method: "GET" });
    const data = await res.json();

    return NextResponse.json(data, {
      status: res.ok ? 200 : 400,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
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
