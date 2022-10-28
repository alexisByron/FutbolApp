import React, { useEffect, useState, type PropsWithChildren } from 'react';
import {
  ScrollView,
  View,
  Text,
  FlatList,
  TextInput,
  Button,
} from 'react-native';
import { GetLeagues, GetLeaguesMock } from '../Api/leagues';
import { Divider } from '@react-native-material/core';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { HStack } from '@react-native-material/core';
import { Spacer } from 'react-native-flex-layout';
import { MyImage } from '../myImage';

import { useForm, Controller } from 'react-hook-form';

interface Ifixtures {
  events: boolean;
  lineups: boolean;
  statistics_fixtures: boolean;
  statistics_players: boolean;
}

interface ISeasons {
  year: number;
  start: string;
  end: string;
  current: boolean;
  coverage: {
    fixtures: Ifixtures;
    standings: boolean;
    players: boolean;
    top_scorers: boolean;
    top_assists: boolean;
    top_cards: boolean;
    injuries: boolean;
    predictions: boolean;
    odds: boolean;
  };
}

interface IResponse {
  league: {
    id: number;
    name: string;
    type: string;
    logo: string;
  };
  country: {
    name: string;
    code: string | null;
    flag: string | null;
  };
  seasons: Array<ISeasons>;
}

interface Ileague {
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

const ListLeagues = () => {
  const [Leagues, setLeagues] = useState<Array<IResponse>>([]);
  const [LeaguesFiltered, setLeaguesFiltered] = useState<Array<IResponse>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      LeagueSearched: '',
    },
  });
  const onSubmit = (data: any) => console.log(data);
  const title: any = watch('LeagueSearched');

  useEffect(() => {
    setIsLoading(true);
    getLeaguesApi();
  }, []);

  const getLeaguesApi = async () => {
    const responseApi: Ileague = await GetLeaguesMock();
    setLeagues(responseApi.data.response);
    setLeaguesFiltered(responseApi.data.response);
    setIsLoading(false);
  };

  useEffect(() => {
    const result = Leagues.filter((liga)=>liga.league.name.toLowerCase().includes(title.toLowerCase()))
    setLeaguesFiltered(result);
  }, [title]);

  const ListItem = ({ item }: any) => (
    <HStack
      m={4}
      spacing={6}
      style={{ marginRight: 20, marginLeft: 20, height: 70 }}>
      <Text
        style={{
          textAlign: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          textAlignVertical: 'center',
          alignContent: 'center',
        }}>
        {item.league.name}
      </Text>
      <Spacer />
      <MyImage
        thumbnailSource={{
          uri: item.league.logo,
        }}
        source={{ uri: item.league.logo }}
      />
    </HStack>
  );

  const LoadingElement = () => (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        marginLeft={20}
        flexDirection="row"
        marginBottom={20}>
        <SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item marginTop={20} width={250} height={20} />
        </SkeletonPlaceholder.Item>

        <SkeletonPlaceholder.Item
          width={60}
          height={60}
          borderRadius={50}
          marginLeft={40}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );

  return isLoading ? (
    <ScrollView style={{ height: '100%' }}>
      <LoadingElement />
      <LoadingElement />
      <LoadingElement />
      <LoadingElement />
      <LoadingElement />
      <LoadingElement />
      <LoadingElement />
      <LoadingElement />
      <LoadingElement />
    </ScrollView>
  ) : (
    <>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{
              backgroundColor: 'gray',
              height: 50,
              padding: 20,
              margin: 20,
              borderRadius: 50,
              color: 'white',
            }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Busca una liga"
          />
        )}
        name="LeagueSearched"
      />
      <FlatList
        data={LeaguesFiltered}
        renderItem={ListItem}
        style={{ height: '100%' }}
      />
    </>
  );
};

export default ListLeagues;
