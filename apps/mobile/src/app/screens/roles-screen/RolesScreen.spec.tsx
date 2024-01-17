import React from 'react';
import { render } from '@testing-library/react-native';

import RolesScreen from './RolesScreen';

describe('RolesScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< RolesScreen />);
    expect(root).toBeTruthy();
  });
});
