import {AppSpinner} from '@src/components';
import {Category} from '@src/components/Category';
import {CATEGORY, useCategory} from '@src/hooks';
import React from 'react';

export const CategoryHOC = () => {
  const {data, isLoading} = useCategory();
  if (isLoading) {
    return <AppSpinner />;
  }

  return <Category category={data as CATEGORY} />;
};
