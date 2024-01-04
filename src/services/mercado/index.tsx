async function getNewApiTokens(params: {
  clientId?: number;
  secretKey?: string;
  uri?: string;
  refreshToken?: string;
}): Promise<void> {
  // todo
}

export const MercadoLivreService = {
  getNewApiTokens,
};
