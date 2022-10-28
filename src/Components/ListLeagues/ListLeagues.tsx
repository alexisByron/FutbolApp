import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, FlatList, TextInput } from 'react-native';
import { GetLeagues, GetLeaguesMock } from '../../Api/Leagues/leagues';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { HStack } from '@react-native-material/core';
import { Spacer } from 'react-native-flex-layout';
import AsyncImage from '../../AsyncImage';
import { useForm, Controller } from 'react-hook-form';
import { ILeague } from '../../Api/Leagues/Interfaces/Ileague';
import { IResponse } from '../../Api/Leagues/Interfaces/IResponse';

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

  const LeagueSearchedValue: string = watch('LeagueSearched');

  useEffect(() => {
    setIsLoading(true);
    getLeaguesApi();
  }, []);

  const getLeaguesApi = async () => {
    const responseApi: ILeague = await GetLeaguesMock();
    setLeagues(responseApi.data.response);
    setLeaguesFiltered(responseApi.data.response);
    setIsLoading(false);
  };

  useEffect(() => {
    const result = Leagues.filter(liga =>
      liga.league.name
        .toLowerCase()
        .includes(LeagueSearchedValue.toLowerCase()),
    );
    setLeaguesFiltered(result);
  }, [LeagueSearchedValue]);

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
      <AsyncImage
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
            placeholder="Busca una liga...."
            placeholderTextColor="white"
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
