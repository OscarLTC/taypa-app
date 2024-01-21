import React from 'react';
import { render } from '@testing-library/react-native';

import DishDetails from './DishDetails';

describe('DishDetails', () => {
  it('should render successfully', () => {
    const { root } = render(< DishDetails />);
    expect(root).toBeTruthy();
  });
});
