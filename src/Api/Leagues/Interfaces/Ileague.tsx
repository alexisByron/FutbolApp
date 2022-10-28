import { IResponse } from './IResponse';

export interface ILeague {
  data: {
    get: string;
    parameters: never[];
    errors: never[];
    results: number;
    paging: {
      current: number;
      total: number;
    };
    response: Array<IResponse>;
  };
}
