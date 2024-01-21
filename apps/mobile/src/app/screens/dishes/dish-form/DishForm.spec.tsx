import React from 'react';
import { render } from '@testing-library/react-native';

import DishForm from './DishForm';

describe('DishForm', () => {
  it('should render successfully', () => {
    const { root } = render(< DishForm />);
    expect(root).toBeTruthy();
  });
});
