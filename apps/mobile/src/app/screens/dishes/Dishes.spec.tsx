import React from 'react';
import { render } from '@testing-library/react-native';

import Dishes from './Dishes';

describe('Dishes', () => {
  it('should render successfully', () => {
    const { root } = render(< Dishes />);
    expect(root).toBeTruthy();
  });
});
