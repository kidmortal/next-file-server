import {
  getMercadoLivreIntegration,
  updateMercadoLivreIntegration,
} from "@/services/database/integration";
import {
  createProductPublish,
  getLastTenPublishedProduct,
} from "@/services/database/publish";
import { getAllProductDumps } from "@/services/database/stock";
import { getStockRules } from "@/services/database/stockRule";
import { getMercadoLivreNewApiTokens } from "@/services/mercado";
import { PublishProduct } from "@/utils/calculatePublish";
import {
  MercadoLivreIntegration,
  PublishedProduct,
  StockProduct,
  StockRuleProduct,
} from "@prisma/client";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface StoreState {
  ruleProducts: StockRuleProduct[];
  productsDump: StockProduct[];
  publishedProducts: PublishedProduct[];
  integration: MercadoLivreIntegration | null;
  isFetching: {
    products: boolean;
    rules: boolean;
    publish: boolean;
  };
  publishProducts: (products: PublishProduct[]) => Promise<void>;
  fetchProducts: () => Promise<void>;
  fetchStockRules: () => Promise<void>;
  fetchPublishedProducts: () => Promise<void>;
  fetchIntegration: () => Promise<void>;
  generateNewApiToken: () => Promise<void>;
}

const useStore = create(
  immer<StoreState>((set, get) => ({
    ruleProducts: [],
    productsDump: [],
    integration: null,
    publishedProducts: [],
    isFetching: {
      publish: false,
      products: true,
      rules: true,
    },
    fetchProducts: async () => {
      set((s: StoreState) => {
        s.isFetching.products = true;
      });
      const data = await getAllProductDumps();
      set((s: StoreState) => {
        s.productsDump = data;
        s.isFetching.products = false;
      });
    },
    fetchPublishedProducts: async () => {
      set((s: StoreState) => {
        s.isFetching.publish = true;
      });
      const data = await getLastTenPublishedProduct();
      set((s: StoreState) => {
        s.publishedProducts = data;
        s.isFetching.publish = false;
      });
    },
    publishProducts: async (products: PublishProduct[]) => {
      set((s: StoreState) => {
        s.isFetching.publish = true;
      });
      await createProductPublish(products);
      set((s: StoreState) => {
        s.isFetching.publish = false;
      });
      get().fetchProducts();
      get().fetchStockRules();
    },
    fetchStockRules: async () => {
      set((s: StoreState) => {
        s.isFetching.rules = true;
      });
      const data = await getStockRules();
      set((s: StoreState) => {
        s.ruleProducts = data;
        s.isFetching.rules = false;
      });
    },
    fetchIntegration: async () => {
      const data = await getMercadoLivreIntegration();
      set((s: StoreState) => {
        s.integration = data;
      });
    },
    generateNewApiToken: async () => {
      const integration = get().integration;
      console.log("teste123");
      if (integration) {
        const data = await getMercadoLivreNewApiTokens(integration);
        console.log("dadossssssss");
        console.log(data);
        await updateMercadoLivreIntegration(integration.id, {
          clientId: integration.clientId,
          name: integration.name,
          refreshToken: data.refresh_token,
          secretKey: integration.secretKey,
          uri: integration.uri,
          appToken: data.access_token,
        });
        get().fetchIntegration();
      }
    },
  }))
);

export default useStore;
