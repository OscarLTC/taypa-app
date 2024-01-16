import React from 'react';
import { render } from '@testing-library/react-native';

import HomeScreen from './HomeScreen';

describe('Home', () => {
  it('should render successfully', () => {
    const { root } = render(<HomeScreen />);
    expect(root).toBeTruthy();
  });
});
