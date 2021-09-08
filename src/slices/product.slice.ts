import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PRODUCT } from '@src/hooks/useProducts';
import { RootState } from '@src/store';

interface ProductSate {
  data: PRODUCT[];
  favorite: object;
  filterCategory: string;

}

const initialState: ProductSate = {
  data: [],
  favorite: {},

  filterCategory: 'ALL',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    selectCategory(state, { payload }: PayloadAction<string>) {
      state.filterCategory = payload;
    },
    addProduct(state, { payload }: PayloadAction<PRODUCT[]>) {
      state.data = payload;

    },
    filterProduct(state, { payload }: PayloadAction<string>) {
      let favorite = null
      favorite = state.data.filter(item => item.category === payload);

      return {
        ...state,
        filterData: favorite,
        filters: favorite
      };
    },
    addToFavorite(state, { payload }: PayloadAction<PRODUCT>) {
      const product = payload;
      let favorite = { ...state.favorite };

      state.favorite[product.id] = { ...payload };


    },

    removeFromFavorite: (state, { payload }: PayloadAction<number>) => {
      const id = payload;

      delete state.favorite[id];
    },
  },
});

export const productSelector = (state: RootState) => state.product.data;
export const productFavorive = (state: RootState) => state.product.favorite;
export const filterByCategory = (state: RootState) =>
  state.product.filterCategory;

export default productSlice.reducer;
export const {
  filterProduct,
  addProduct,
  addToFavorite,
  removeFromFavorite,
  selectCategory,
} = productSlice.actions;
