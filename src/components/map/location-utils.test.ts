//@ts-nocheck
import {searchLocation, getDistance, isValidCoords, humanizeRide} from './location-utils';

// Configurando mock para fetch
global.fetch = require('jest-fetch-mock');

describe('Request methods', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  describe('#searchLocation', () => {

    it('should return data from Mapbox API', async () => {
      const mockResponse = {features: [{place_name: 'Test Location'}]};
      fetch.mockResponseOnce(JSON.stringify(mockResponse));

      const search = 'Test';
      const data = await searchLocation(search);

      expect(fetch).toHaveBeenCalledWith(expect.stringContaining(search));
      expect(data).toEqual(mockResponse);
    });
  });
  describe('#getDistance', () => {

    it('getDistance should return distance data from Mapbox API', async () => {
      const mockResponse = {routes: [{distance: 1000, duration: 600}]};
      fetch.mockResponseOnce(JSON.stringify(mockResponse));

      const pickupCoords = '0,0';
      const dropoffCoords = '1,1';
      const data = await getDistance(pickupCoords, dropoffCoords);

      expect(fetch).toHaveBeenCalledWith(expect.stringContaining(`${pickupCoords};${dropoffCoords}`));
      expect(data).toEqual(mockResponse);
    });
  })
})
describe('Validation methods', () => {
  describe('#isValidCoords', () => {
    it('should validate coordinates correctly', () => {
      expect(isValidCoords([0, 0])).toBe(false);
      expect(isValidCoords([1, 1])).toBe(true);
      expect(isValidCoords('1,1')).toBe(true);
    });
  });
});

describe('Transformation methods', () => {
  describe('#humanizeRide', () => {
    it('should convert ride data correctly', () => {
      const rideData = {distance: 10000, duration: 3600};
      const humanized = humanizeRide(rideData);

      expect(humanized).toEqual({
        ...rideData,
        distance: 10, // 10000 meters to kilometers
        duration: 60, // 3600 seconds to minutes
      });

      const nullData = humanizeRide(null);
      expect(nullData).toEqual({distance: 0, duration: 0});
    });
  });
});
