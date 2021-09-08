import {AppSpinner} from '@src/components';
import {Category} from '@src/components/Category';
import {CATEGORY, useCategory} from '@src/hooks';
import {selectCategory} from '@src/slices/product.slice';
import React from 'react';
import {useDispatch} from 'react-redux';

export const CategoryHOC = () => {
  const dispatch = useDispatch();
  const {data, isLoading} = useCategory();
  dispatch(selectCategory('ALL'));

  if (isLoading) {
    return <AppSpinner />;
  }

  return <Category category={data as CATEGORY} />;
};
