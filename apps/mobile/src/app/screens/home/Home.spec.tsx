import React from 'react';
import { render } from '@testing-library/react-native';

import Home from './Home';

describe('Home', () => {
  it('should render successfully', () => {
    const { root } = render(< Home />);
    expect(root).toBeTruthy();
  });
});
