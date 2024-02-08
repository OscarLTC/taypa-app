import { selector } from 'recoil';
import { userState } from './user.atom';

export const isUserSignedInSelector = selector({
  key: 'IsUserSignedIn',
  get: ({ get }) => {
    const user = get(userState);
    return {
      isUserSignedIn: user !== null,
      isUserLocked: user?.isLocked ?? false,
    };
  },
});
