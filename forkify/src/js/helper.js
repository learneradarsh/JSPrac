import { TIME_OUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async url => {
  try {
    const result = await Promise.race([fetch(url), timeout(TIME_OUT_SEC)]);
    if (!result.ok) {
      throw new Error(`${result.message}`);
    }
    return result.json();
  } catch (error) {
    throw error;
  }
};
