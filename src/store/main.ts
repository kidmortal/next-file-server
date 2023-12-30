import { getAllProductDumps } from "@/services/database/stock";
import { getStockRules } from "@/services/database/stockRule";
import { StockProduct, StockRuleProduct } from "@prisma/client";
import { create } from "zustand";

interface StoreState {
  ruleProducts: StockRuleProduct[];
  productsDump: StockProduct[];
  isFetching: boolean;
  fetchProducts: () => Promise<void>;
  fetchStockRules: () => Promise<void>;
}

const useStore = create<StoreState>((set) => ({
  ruleProducts: [],
  productsDump: [],
  isFetching: true,
  fetchProducts: async () => {
    set({ isFetching: true });
    const data = await getAllProductDumps();
    set({ productsDump: data, isFetching: false });
  },
  fetchStockRules: async () => {
    set({ isFetching: true });
    const data = await getStockRules();
    set({ ruleProducts: data, isFetching: false });
  },
}));

export default useStore;
