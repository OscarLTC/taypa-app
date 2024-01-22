import React from 'react';
import { render } from '@testing-library/react-native';

import WorkersList from './WorkersList';

describe('WorkersList', () => {
  it('should render successfully', () => {
    const { root } = render(< WorkersList />);
    expect(root).toBeTruthy();
  });
});
