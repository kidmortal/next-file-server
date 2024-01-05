import {
  getMercadoLivreIntegration,
  renewAppTokenMercadoLiveIntegration,
} from "@/services/database/integration";
import {
  createProductPublish,
  getLastTenPublishedProduct,
} from "@/services/database/publish";
import { getAllProductDumps } from "@/services/database/stock";
import { getStockRules } from "@/services/database/stockRule";
import {
  getMercadoLivreNewApiTokens,
  publishMercadoLivreProduct,
} from "@/services/mercado";
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
    integration: boolean;
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
      integration: true,
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
      // await createProductPublish(products);
      const token = get().integration?.appToken;
      if (token) {
        await publishMercadoLivreProduct(token);
        set((s: StoreState) => {
          s.isFetching.publish = false;
        });
        get().fetchProducts();
        get().fetchStockRules();
      }
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
      set((s: StoreState) => {
        s.isFetching.integration = true;
      });
      const data = await getMercadoLivreIntegration();
      set((s: StoreState) => {
        s.integration = data;
        s.isFetching.integration = false;
      });
    },
    generateNewApiToken: async () => {
      const integration = get().integration;
      if (integration) {
        set((s: StoreState) => {
          s.isFetching.integration = true;
        });
        await renewAppTokenMercadoLiveIntegration();
        get().fetchIntegration();
      }
    },
  }))
);

export default useStore;
