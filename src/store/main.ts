import {
  getMercadoLivreIntegration,
  renewAppTokenMercadoLiveIntegration,
} from "@/services/database/integration";
import { getLastTenPublishedProduct } from "@/services/database/publish";
import { getAllProductDumps } from "@/services/database/stock";
import { getStockRules } from "@/services/database/stockRule";
import { getAllDatabaseUsers, getDatabaseUser } from "@/services/database/user";
import { publishMercadoLivreProduct } from "@/services/mercado";
import { PublishProduct } from "@/utils/calculatePublish";
import {
  MercadoLivreIntegration,
  PublishedProduct,
  StockProduct,
  StockRuleProduct,
  User,
} from "@prisma/client";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface StoreState {
  ruleProducts: StockRuleProduct[];
  productsDump: StockProduct[];
  publishedProducts: PublishedProduct[];
  integration: MercadoLivreIntegration | null;
  user?: User;
  users: User[];
  isFetching: {
    user: boolean;
    products: boolean;
    rules: boolean;
    publish: boolean;
    integration: boolean;
  };
  publishProducts: (products: PublishProduct[]) => Promise<void>;
  fetchUser: (email: string) => Promise<void>;
  fetchAllUsers: () => Promise<void>;
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
    user: undefined,
    users: [],
    publishedProducts: [],
    isFetching: {
      user: false,
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
    fetchUser: async (email: string) => {
      set((s: StoreState) => {
        s.isFetching.user = true;
      });
      const fetchedUser = await getDatabaseUser(email);
      set((s: StoreState) => {
        s.user = fetchedUser;
        s.isFetching.user = false;
      });
    },
    fetchAllUsers: async () => {
      const users = await getAllDatabaseUsers();
      set((s: StoreState) => {
        s.users = users;
      });
    },
  }))
);

export default useStore;
