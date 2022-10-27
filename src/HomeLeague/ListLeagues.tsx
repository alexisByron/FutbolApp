import React, {useEffect, useState, type PropsWithChildren} from 'react';
import {
  ScrollView,
  View,
} from 'react-native';

import {GetLeagues} from '../Api/leagues';
import {ListItem} from '@react-native-material/core';

const ListLeagues = () => {
  const [Leagues, setLeagues] = useState([]);

  useEffect(() => {
    getLeaguesApi();
  }, []);

  const getLeaguesApi = async () => {
    const responseApi: any = await GetLeagues();
    setLeagues(responseApi.data.response);
  };

  return (
    <ScrollView>
      {Leagues.map((liga: any, index: number) => {
        return <ListItem title={liga.league.name} key={index} />;
      })}
    </ScrollView>
  );
};

export default ListLeagues;
