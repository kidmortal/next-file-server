"use server";

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

export async function updateMercadoLivreIntegration(data: {
  id: string;
  name: string;
  clientId: number;
  secretKey: string;
  uri: string;
  refreshToken: string;
}) {
  const result = await prisma.mercadoLivreIntegration.update({
    data: {
      ...data,
      appToken: "",
      refreshTokenUpdatedAt: new Date(),
    },
    where: {
      id: data.id,
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
  console.log("Fetch dumps");
  return integration;
}
