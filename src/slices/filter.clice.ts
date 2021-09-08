import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PRODUCT} from '@src/hooks/useProducts';
import {RootState} from '@src/store';

interface ProductSate {
  filterData: PRODUCT[];

  filterCategory: string;
}

const initialState: ProductSate = {
  filterData: [],

  filterCategory: 'ALL',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    selectCategory(state, {payload}: PayloadAction<string>) {
      state.filterCategory = payload;
    },

    filterProduct(state, {payload}: PayloadAction<any>) {
      const {category, data} = payload;

      const filterData = data.filter(item => item.category === category);
      return {
        ...state,
        filterData,
      };
    },
  },
});

export const productFilters = (state: RootState) => state.filter;

export default filterSlice.reducer;
export const {filterProduct, selectCategory} = filterSlice.actions;
