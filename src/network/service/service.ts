import {
  GetLastPathName,
  GetLocalItem,
  RemoveLocalItem,
  SetLocalItem,
} from '../LocalStorage/LocalStorage';
import {CachePolicy, IService} from './constants';

class Service implements IService {
  private static _instance = new Service();
  private constructor() {}
  static get instance() {
    return this._instance;
  }

  fetch = async (
    endpoint: string,
    cachePolicy: CachePolicy = CachePolicy.RETURN_CACHE_ELSE_LOAD,
  ): Promise<any> => {
    const pathName = GetLastPathName(endpoint);

    switch (cachePolicy) {
      case CachePolicy.ALWAYS_IGNORE_CACHE: {
        return this.getNetworkResponse(endpoint);
      }
      case CachePolicy.RETURN_CACHE_ELSE_LOAD: {
        let cacheData = await GetLocalItem(pathName);
        if (cacheData) {
          return cacheData;
        } else {
          let networkResponse = await this.getNetworkResponse(endpoint);
          SetLocalItem(pathName, networkResponse);
          return networkResponse;
        }
      }
      case CachePolicy.INVALIDATE_CACHE_AND_LOAD: {
        RemoveLocalItem(pathName);
        let networkResponse = await this.getNetworkResponse(endpoint);
        SetLocalItem(pathName, networkResponse);
        return networkResponse;
      }
    }
  };

  private getNetworkResponse = async (endpoint: string): Promise<any> => {
    try {
      let response = await fetch(endpoint);
      return response.json();
    } catch (error) {
      console.error(error);
    }
  };
}

export default Service.instance;
