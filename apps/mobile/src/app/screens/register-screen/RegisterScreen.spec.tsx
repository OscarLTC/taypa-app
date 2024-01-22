import React from 'react';
import { render } from '@testing-library/react-native';

import RegisterScreen from './RegisterScreen';

describe('RegisterScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< RegisterScreen />);
    expect(root).toBeTruthy();
  });
});
