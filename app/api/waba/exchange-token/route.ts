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

    // Try without redirect_uri first (Standard Meta Graph API spec for Embedded Signup JS SDK)
    const urlNoRedirect = `https://graph.facebook.com/v20.0/oauth/access_token?client_id=${appId.trim()}&client_secret=${appSecret.trim()}&code=${code.trim()}`;
    let res = await fetch(urlNoRedirect, { method: "GET" });
    let data = await res.json();

    if (data.access_token) {
      return NextResponse.json(data, {
        headers: { "Access-Control-Allow-Origin": "* text/plain" },
      });
    }

    // Secondary attempt with redirectUri if provided
    if (redirectUri && redirectUri.trim()) {
      const urlWithRedirect = `${urlNoRedirect}&redirect_uri=${encodeURIComponent(redirectUri.trim())}`;
      res = await fetch(urlWithRedirect, { method: "GET" });
      const dataWithRedirect = await res.json();
      if (dataWithRedirect.access_token) {
        return NextResponse.json(dataWithRedirect, {
          headers: { "Access-Control-Allow-Origin": "*" },
        });
      }
    }

    return NextResponse.json(
      data || { error: { message: "Gagal menukarkan token." } },
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
