"use server";

export async function getMercadoLivreNewApiTokens(params: {
  clientId?: number;
  secretKey?: string;
  refreshToken?: string;
}) {
  console.log("refresh");
  const refreshParams = {
    grant_type: "refresh_token",
    client_id: `${params.clientId}`,
    client_secret: params.secretKey ?? "",
    refresh_token: params.refreshToken ?? "",
  };

  const response = await fetch("https://api.mercadolibre.com/oauth/token", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: new URLSearchParams(refreshParams),
  });
  const data = await response.json();
  return data;
  // todo
}
