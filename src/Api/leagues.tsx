import axios from 'axios';
import {Env} from '../Enviroment/Environment';

export const GetLeagues = () => {
  const options: any = {
    method: 'GET',
    url: `${Env.BaseUrl}/leagues`,
    headers: {
      'X-RapidAPI-Key': Env.RapidAPIKey,
      'X-RapidAPI-Host': Env.RapidAPIHost,
    },
  };

  return axios.request(options);
};
