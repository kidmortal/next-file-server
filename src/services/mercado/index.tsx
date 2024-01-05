"use server";

type NewApiTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  user_id: number;
  refresh_token: string;
};

export async function getMercadoLivreNewApiTokens(params: {
  clientId?: number;
  secretKey?: string;
  refreshToken?: string;
}): Promise<NewApiTokenResponse> {
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

export async function publishMercadoLivreProduct(acessToken: string) {
  const response = await fetch("https://api.mercadolibre.com/items", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${acessToken}`,
    },
    method: "POST",
    body: JSON.stringify({
      site_id: "MLB",
      title: "Item de test no ofertar",
      category_id: "MLB1672",
      price: 200,
      currency_id: "BRL",
      available_quantity: 1,
      buying_mode: "buy_it_now",
      listing_type_id: "gold_special",
      pictures: [],
      attributes: [
        {
          id: "ITEM_CONDITION",
          name: "Condição do item",
          value_id: "2230284",
          value_name: "Novo",
          value_struct: "null",
          attribute_group_id: "OTHERS",
          attribute_group_name: "Outros",
        },
      ],
      catalog_product_id: "MLB20697005",
      catalog_listing: true,
    }),
  });
  const data = await response.json();
  console.log(data);
}
