import { getData } from '../loadInitialData';
import { DATA_ENDPOINT } from '../constants';
import fetch from 'isomorphic-fetch';
(<any>global).fetch = fetch;

describe('loadInitialData() integration test', () => {
  it('should load data', async() => {
    const data = await getData();
    console.log(data);
  });
});