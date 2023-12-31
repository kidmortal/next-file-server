import { getAllProductDumps } from "@/services/database/stock";
import { getStockRules } from "@/services/database/stockRule";
import { StockProduct, StockRuleProduct } from "@prisma/client";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface StoreState {
  ruleProducts: StockRuleProduct[];
  productsDump: StockProduct[];
  isFetching: {
    products: boolean;
    rules: boolean;
  };
  fetchProducts: () => Promise<void>;
  fetchStockRules: () => Promise<void>;
}

const useStore = create(
  immer<StoreState>((set) => ({
    ruleProducts: [],
    productsDump: [],
    isFetching: {
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
  }))
);

export default useStore;
