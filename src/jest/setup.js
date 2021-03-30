import {jest} from '@jest/globals';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('react-native-elements', () => {
  return {
    Icon: () => {
      return null;
    },
    Button: () => {
      return null;
    },
  };
});

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('../network/service/service');
