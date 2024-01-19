import React from 'react';
import { render } from '@testing-library/react-native';

import DishList from './DishList';

describe('DishList', () => {
  it('should render successfully', () => {
    const { root } = render(< DishList />);
    expect(root).toBeTruthy();
  });
});
