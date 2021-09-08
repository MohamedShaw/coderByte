import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PRODUCT } from '@src/hooks/useProducts';
import { RootState } from '@src/store';

interface ProductSate {
  data: PRODUCT[];
  filterData: PRODUCT[];
  favorite: object;
  items_count: number;
}

const initialState: ProductSate = {
  data: [],
  filterData: [],
  favorite: {},
  items_count: 0,
};

const productSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    addProduct(state, { payload }: PayloadAction<PRODUCT[]>) {
      state.data = payload;
      state.filterData = payload;
    },
    filterProduct(state, { payload }: PayloadAction<PRODUCT>) {
      const product = state.data.filter(
        item => item.category === payload.category,
      );
      state.filterData = product;
    },
    addToFavorite(state, { payload }: PayloadAction<PRODUCT>) {
      const product = payload;
      let favorite = { ...state.favorite };

      state.favorite[product.id] = { product };
      state.items_count = Object.keys(favorite).length;
    },

    removeFromFavorite: (state, { payload }: PayloadAction<number>) => {
      const id = payload;
      state.items_count -= 1;

      delete state.favorite[id];
    },
  },
});

export const productSelector = (state: RootState) => state.product.filterData;
export const productFavorive = (state: RootState) => state.product.favorite
export const favoriteCounter = (state: RootState) => state.product.items_count

export default productSlice.reducer;
export const { filterProduct, addProduct, addToFavorite, removeFromFavorite } =
  productSlice.actions;
