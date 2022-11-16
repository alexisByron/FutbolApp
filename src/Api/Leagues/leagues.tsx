import axios, { AxiosRequestConfig } from 'axios';
import { Env } from '../../Enviroment/Environment';
import { ILeague } from './Interfaces/Ileague';
import { ITeamsLeague } from './Interfaces/Teams/ITeamsLeague';
import Leagues from './Leagues.json'

interface IHeaders {
  'X-RapidAPI-Key': string;
  'X-RapidAPI-Host': string;
}

interface IOptions {
  method: 'GET' | 'POST';
  url: string;
  headers: IHeaders;
}

export const GetLeagues = () => {
  const options: AxiosRequestConfig<IOptions> = {
    method: 'GET',
    url: `${Env.BaseUrl}/leagues`,
    headers: {
      'X-RapidAPI-Key': Env.RapidAPIKey,
      'X-RapidAPI-Host': Env.RapidAPIHost,
    },
  };

  return axios.request(options);
};

export const GetTeamsByLeagueId = (id: number) => {
  const options: AxiosRequestConfig<IOptions> = {
    method: 'GET',
    url: `${Env.BaseUrl}/teams?league=${id}&season=2020`,
    headers: {
      'X-RapidAPI-Key': Env.RapidAPIKey,
      'X-RapidAPI-Host': Env.RapidAPIHost,
    },
  };

  return axios.request(options);
};

export const GetLeaguesMock: () => Promise<ILeague> = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(Leagues);
    }, 2000);
  });
