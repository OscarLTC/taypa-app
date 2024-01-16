import React from 'react';
import { render } from '@testing-library/react-native';

import RecoverScreen from './RecoverScreen';

describe('RecoverScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< RecoverScreen />);
    expect(root).toBeTruthy();
  });
});
