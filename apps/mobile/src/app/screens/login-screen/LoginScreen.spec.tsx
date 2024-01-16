import React from 'react';
import { render } from '@testing-library/react-native';

import LoginScreen from './LoginScreen';

describe('Login', () => {
  it('should render successfully', () => {
    const { root } = render(<LoginScreen />);
    expect(root).toBeTruthy();
  });
});
