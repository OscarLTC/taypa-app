import React from 'react';
import { render } from '@testing-library/react-native';

import EmailConfirmationScreen from './EmailConfirmationScreen';

describe('EmailConfirmationScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< EmailConfirmationScreen />);
    expect(root).toBeTruthy();
  });
});
