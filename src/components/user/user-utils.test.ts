import {getAuthenticatedUser, setAuthenticatedUser, addDriverPrices, emptyUser} from './user-utils';

// Mock global sessionStorage
const mockSessionStorage = (function () {
  let store: any = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: any) {
      store[key] = String(value);
    },
    clear() {
      store = {};
    }
  };
})();

Object.defineProperty(global, 'sessionStorage', {
  value: mockSessionStorage
});

describe('Authentication functions', () => {
  beforeEach(() => {
    mockSessionStorage.clear();
  });
  describe('#getAuthenticatedUser', () => {
    it('should return a default user if no user is in session storage', () => {
      expect(getAuthenticatedUser()).toEqual(emptyUser());
    });
  });
  describe('#setAuthenticatedUser', () => {
    it('should save user to session storage', () => {
      const testUser = {name: 'Test User', image: 'test-image.jpg', id: '123'};
      setAuthenticatedUser(testUser);
      expect(getAuthenticatedUser()).toEqual(testUser);
    });
  });
});

describe('#addDriverPrices', () => {
  it('should correctly calculate prices', () => {
    const drivers = [
      {id: '1', carCategory: {id: 'cat1', name: 'Standard', multiplier: 1}, name: 'Driver1', image: 'image1'},
      {id: '2', carCategory: null, name: null, image: null}
    ];
    const dynamicMultiplier = 2;
    const distance = 10;
    const result = addDriverPrices(dynamicMultiplier, distance, drivers);
    expect(result).toEqual([
      {
        id: '1',
        carCategory: {id: 'cat1', name: 'Standard', multiplier: 1},
        name: 'Driver1',
        image: 'image1',
        price: 10
      },
      {id: '2', carCategory: null, name: '', image: '', price: 10}
    ]);
  });
});
