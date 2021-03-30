export enum CachePolicy {
  ALWAYS_IGNORE_CACHE,
  RETURN_CACHE_ELSE_LOAD,
  INVALIDATE_CACHE_AND_LOAD,
}

export interface IService {
  fetch: (endpoint: string, cachePolicy?: CachePolicy) => Promise<any>;
}

export const Endpoint = {
  GET_FOOD_LIST: 'https://api.jsonbin.io/b/5fce7e1e2946d2126fff85f0',
};
