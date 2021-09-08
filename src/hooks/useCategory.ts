import { api } from '@src/api';
import { useQuery } from 'react-query';

export type CATEGORY = string[];

function getCategory() {
  return api.get('products/categories').json<CATEGORY>();
}

export const useCategory = () => {
  const { data: category, ...rest } = useQuery('CATEGORY', getCategory);
  let data = ['ALL']
  if (category) {
    data = [...data, ...category]

  }
  return {
    data,
    ...rest,
  };
};
