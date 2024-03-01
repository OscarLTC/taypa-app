import { selector } from 'recoil';
import { userState } from './user.atom';
import { Session } from '../../model/session.model';

export const userRedirect = selector({
  key: 'userRedirect',
  get: ({ get }) => {
    const user = get(userState);
    let redirect = '';
    if (user !== null && user !== '') {
      const session = user as Session;
      if (session.isLocked) {
        redirect = 'roles';
      } else {
        redirect = 'home';
      }
    } else if (user === '') {
      redirect = 'auth';
    } else {
      redirect = 'splash';
    }
    return redirect;
  },
});
