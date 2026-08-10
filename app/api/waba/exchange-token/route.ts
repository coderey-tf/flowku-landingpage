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

    const appId = body.appId?.trim() || process.env.META_APP_ID;
    const appSecret = body.appSecret?.trim() || process.env.META_APP_SECRET;
    const code = body.code?.trim();

    // Meta Embedded Signup (config_id) — analisis URL popup:
    // OAuth dialog popup URL:
    //   redirect_uri=https://staticxx.facebook.com/x/connect/xd_arbiter/?version=46#cb=...&domain=flowku.my.id...
    //   fallback_redirect_uri=https://flowku.my.id/waba-coexistence
    //
    // SDK JS pakai xd_arbiter sebagai redirect_uri internal.
    // Sudah coba:
    //   - page URL (fallback_redirect_uri) → 36008
    //   - tidak kirim redirect_uri → 36008
    // Satu-satunya yang belum: xd_arbiter URL itu sendiri.
    //
    // Server hanya melihat query portion sebelum fragment (#).
    // Jadi redirect_uri server-visible = https://staticxx.facebook.com/x/connect/xd_arbiter/?version=46
    const redirectUri =
      "https://staticxx.facebook.com/x/connect/xd_arbiter/?version=46";

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
      "https://graph.facebook.com/v26.0/oauth/access_token",
    );
    tokenUrl.searchParams.append("client_id", appId);
    tokenUrl.searchParams.append("client_secret", appSecret);
    tokenUrl.searchParams.append("code", code);
    tokenUrl.searchParams.append("redirect_uri", redirectUri);

    // Debug log
    console.log("[exchange-token]", {
      appId: appId.substring(0, 6) + "...",
      codeLen: code.length,
      frontendSent: body.redirectUri?.trim() || "(none)",
      redirectUriUsed: redirectUri,
      strategy: "xd_arbiter as redirect_uri",
      tokenUrl: tokenUrl.toString().replace(appSecret, "***"),
    });

    const res = await fetch(tokenUrl.toString(), {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();

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
