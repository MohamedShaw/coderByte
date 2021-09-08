import { api } from '@src/api';
import { addProduct } from '@src/slices';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

export type PRODUCT = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
};

async function getProduct() {
  return await api.get('products').json<PRODUCT[]>();
}

export const useProducts = () => {
  const dispatch = useDispatch();
  const { data = [], ...rest } = useQuery<unknown, Error, PRODUCT[]>(
    'PRODUCT',
    getProduct,
  );
  if (data.length) {
    dispatch(addProduct(data));
    // dispatch(addDataToFilter(data))
  }
  return {
    ...rest,
  };
};
