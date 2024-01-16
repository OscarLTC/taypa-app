import React from 'react';
import { render } from '@testing-library/react-native';

import Sessions from './SessionsScreen';

describe('Sessions', () => {
  it('should render successfully', () => {
    const { root } = render(<Sessions />);
    expect(root).toBeTruthy();
  });
});
