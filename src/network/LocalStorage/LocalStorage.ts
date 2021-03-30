import {useAsyncStorage} from '@react-native-async-storage/async-storage';

interface ParsedPath {
  base?: string;
  ext?: string;
  name?: string;
}

const GetLastPathName = (fullPath: string): string => {
  var lastPathWithExt = fullPath.split('/').pop()?.split('.');
  if (lastPathWithExt) {
    return lastPathWithExt[0];
  }
  return fullPath;
};

const GetLocalItem = async (key: string): Promise<any> => {
  let val = await useAsyncStorage(key).getItem();
  if (val) {
    return Promise.resolve(JSON.parse(val));
  }
  return val;
};

const SetLocalItem = async (key: string, value: any) => {
  let _value = value;
  if (typeof value !== 'string') {
    _value = JSON.stringify(value);
  }
  return await useAsyncStorage(key).setItem(_value);
};

const RemoveLocalItem = async (key: string) => {
  return await useAsyncStorage(key).removeItem();
};

export {GetLastPathName, GetLocalItem, SetLocalItem, RemoveLocalItem};
