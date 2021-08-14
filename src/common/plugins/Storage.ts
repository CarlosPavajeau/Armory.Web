import jwtDecode from 'jwt-decode';

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
  decode: (token: string): unknown => jwtDecode(token),
  clear: (): void => {
    if (window.localStorage) {
      window.localStorage.clear();
    }
  },
};

export default Storage;
