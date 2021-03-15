import Vue from 'vue';
import axios, { AxiosResponse } from 'axios';

export const createAxiosAuthHeader = (token: string) => `Bearer ${token}`;

export const getResponseData = <T>(
  response: AxiosResponse<any>
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const body = response.data;

    if (response.status === 200 || response.status === 201 || response.status === 204) {
      resolve(body as T);
    } else {
      reject();
    }
  });
};

export const createResponseCheckHandler = (
  resolver: (value?: {} | PromiseLike<{}> | undefined) => void
) => {
  return (response: AxiosResponse<any>) => {
    return new Promise((resolve, reject) => {
      const body = response.data;

      if (response.status === 200 || response.status === 204) {
        resolver();
        resolve();
      } else {
        reject();
      }
    });
  };
};

export const createErrorDataHandler = (
  requestName: string,
  rejector: (reason?: any) => void
) => {
  return (error: any) => {
    console.log(requestName, error);
    rejector(error);
  };
};

export const setOneElement = <T extends { id: string }>(
  array: T[],
  element: T
) => {
  const currentElementIndex = array.findIndex((value) => {
    return value.id === element.id;
  });

  if (currentElementIndex === -1) {
    array.push(element);
  } else {
    Vue.set(
      array,
      currentElementIndex,
      Object.assign({}, array[currentElementIndex], element)
    );
  }
};
