import jwtDecode from 'jwt-decode';
import { UserPayload } from '../models';

const Storage = {
  get: (key: string): string | null => {
    if (window.localStorage) {
      return window.localStorage.getItem(key);
    }
    return null;
  },
  set: (key: string, value: string): void => {
    if (window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  },
  remove: (key: string): void => {
    if (window.localStorage) {
      window.localStorage.removeItem(key);
    }
  },
  decode: (token: string): UserPayload => jwtDecode<UserPayload>(token),
  clear: (): void => {
    if (window.localStorage) {
      window.localStorage.clear();
    }
  },
};

export default Storage;
