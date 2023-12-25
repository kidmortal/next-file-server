import { ProductDumps } from "@/services/database/stock";
import { StockProduct, StockRuleProduct } from "@prisma/client";
import { create } from "zustand";

interface StoreState {
  ruleProducts: StockRuleProduct[];
  productsDump: StockProduct[];
  setRuleProducts: (ruleProducts: StockRuleProduct[]) => void;
  setProductsDump: (productsDump: StockProduct[]) => void;
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
