import '@testing-library/jest-dom';
import { screen, wrapper } from '@sn-htc/social-network-frontend/utils-testing';
import Landing from './Landing';

describe('Landing Page', () => {
  it('should render correctly', async () => {
    wrapper(<Landing />, { isAuthenticated: false });

    expect(await screen.findByTestId('socivio-landing')).toBeVisible();
  });
});
