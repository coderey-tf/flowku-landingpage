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

    // Utamakan mengambil App Secret & App ID dari Environment Variable demi keamanan
    const appId = body.appId?.trim() || process.env.META_APP_ID;
    const appSecret = body.appSecret?.trim() || process.env.META_APP_SECRET;
    const code = body.code?.trim();
    // redirect_uri harus identik dengan yang dikirim FB.login() via config_id.
    // Frontend mengirim redirectUri (halaman saat ini), fallback ke empty string.
    const redirectUri = body.redirectUri?.trim() || "";

    if (!appId || !appSecret || !code) {
      return NextResponse.json(
        { error: { message: "appId, appSecret, dan code wajib diisi." } },
        {
          status: 400,
          headers: { "Access-Control-Allow-Origin": "*" },
        },
      );
    }

    const tokenUrl = new URL(
      "https://graph.facebook.com/v20.0/oauth/access_token",
    );
    tokenUrl.searchParams.append("client_id", appId);
    tokenUrl.searchParams.append("client_secret", appSecret);
    tokenUrl.searchParams.append("code", code);
    tokenUrl.searchParams.append("redirect_uri", redirectUri);

    // Debug log (hanya di server, tidak exposed ke client)
    console.log("[exchange-token]", {
      appId: appId.substring(0, 6) + "...",
      codeLen: code.length,
      redirectUri: redirectUri || "(empty)",
      tokenUrl: tokenUrl.toString().replace(appSecret, "***"),
    });

    const res = await fetch(tokenUrl.toString(), {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();

    // Jika Meta mengembalikan respons error
    if (!res.ok || data.error) {
      return NextResponse.json(
        {
          error: {
            message:
              data.error?.message ||
              "Gagal menukarkan token dari Meta Graph API.",
            type: data.error?.type,
            code: data.error?.code,
            error_subcode: data.error?.error_subcode,
          },
        },
        {
          status: res.status || 400,
          headers: { "Access-Control-Allow-Origin": "*" },
        },
      );
    }

    // Berhasil mendapatkan access_token
    return NextResponse.json(data, {
      status: 200,
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
