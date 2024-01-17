import React from 'react';
import { render } from '@testing-library/react-native';

import WorkersScreen from './WorkersScreen';

describe('WorkersScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< WorkersScreen />);
    expect(root).toBeTruthy();
  });
});
