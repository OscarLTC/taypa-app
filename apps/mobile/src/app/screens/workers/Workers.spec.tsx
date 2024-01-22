import React from 'react';
import { render } from '@testing-library/react-native';

import Workers from './Workers';

describe('Workers', () => {
  it('should render successfully', () => {
    const { root } = render(< Workers />);
    expect(root).toBeTruthy();
  });
});
