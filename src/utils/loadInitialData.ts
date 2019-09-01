import {
  DATA_ENDPOINT
} from './constants';

export const getData = () => {
  return fetch(DATA_ENDPOINT)
    .then((res) => {
      return res.json();
    })
    .then((jsonData) => {
      return jsonData.questions;
    });
};
