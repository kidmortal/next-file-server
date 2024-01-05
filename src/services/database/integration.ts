"use server";

import { getMercadoLivreNewApiTokens } from "@/services/mercado";
import { prisma } from "./db";

export async function createMercadoLivreIntegration(data: {
  name: string;
  clientId: number;
  secretKey: string;
  uri: string;
  refreshToken: string;
}) {
  const result = await prisma.mercadoLivreIntegration.create({
    data: {
      ...data,
      appToken: "",
      refreshTokenUpdatedAt: new Date(),
    },
  });
  return result;
}

export async function updateMercadoLivreIntegration(
  id: string,
  data: {
    name: string;
    clientId: number;
    secretKey: string;
    uri: string;
    appToken?: string;
    refreshToken: string;
  }
) {
  const result = await prisma.mercadoLivreIntegration.update({
    data: {
      ...data,
      refreshTokenUpdatedAt: new Date(),
    },
    where: {
      id: id,
    },
  });
  return result;
}

export async function getMercadoLivreIntegration() {
  const integration = await prisma.mercadoLivreIntegration.findFirst({});
  if (!integration) {
    const result = await createMercadoLivreIntegration({
      clientId: 9999999,
      name: "default integration",
      refreshToken: "0000000000",
      secretKey: "00000000000",
      uri: "default.uri.com",
    });
    if (result.id) {
      return result;
    }
  }
  return integration;
}

export async function renewAppTokenMercadoLiveIntegration() {
  const integration = await prisma.mercadoLivreIntegration.findFirst({});
  if (integration) {
    const newPair = await getMercadoLivreNewApiTokens(integration);
    await prisma.mercadoLivreIntegration.update({
      where: {
        id: integration.id,
      },
      data: {
        appToken: newPair.access_token,
        refreshToken: newPair.refresh_token,
        refreshTokenUpdatedAt: new Date(),
      },
    });
  }
}
