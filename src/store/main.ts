import { ProductDumps } from "@/services/database/stock";
import { StockRuleProduct } from "@prisma/client";
import { create } from "zustand";

interface StoreState {
  ruleProducts: StockRuleProduct[];
  productsDump: ProductDumps;
  setRuleProducts: (ruleProducts: StockRuleProduct[]) => void;
  setProductsDump: (productsDump: ProductDumps) => void;
}

const useStore = create<StoreState>((set) => ({
  ruleProducts: [],
  productsDump: [],
  setRuleProducts: (fetchedRuleProducts) => {
    set({ ruleProducts: fetchedRuleProducts });
  },
  setProductsDump: (fetchedProductsDump) => {
    set({ productsDump: fetchedProductsDump });
  },
}));

export default useStore;
