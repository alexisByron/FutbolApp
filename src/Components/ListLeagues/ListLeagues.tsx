import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { GetLeagues, GetLeaguesMock } from '../../Api/Leagues/leagues';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { HStack } from '@react-native-material/core';
import { Spacer } from 'react-native-flex-layout';
import AsyncImage from '../../AsyncImage';
import { useForm, Controller } from 'react-hook-form';
import { ILeague } from '../../Api/Leagues/Interfaces/Ileague';
import { IResponse } from '../../Api/Leagues/Interfaces/IResponse';
import { LeaguesSelectedContext } from '../../Context/LeagueSelected';

interface IListItem {
  index: number;
  item: IResponse;
}

interface ILeague2 {
  id: number;
  name: string;
  type: string;
  logo: string;
}

interface ITest {
  league: ILeague2;
  setLeague: React.Dispatch<React.SetStateAction<ILeague2>>;
}

interface INavigation {
  navigate: (page: string) => {};
}

interface IListLeagues {
  navigation: INavigation;
}

const ListLeagues = ({ navigation }: IListLeagues) => {
  const [Leagues, setLeagues] = useState<Array<IResponse>>([]);
  const [LeaguesFiltered, setLeaguesFiltered] = useState<Array<IResponse>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { setLeague } = React.useContext(LeaguesSelectedContext) as ITest;

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

  interface ILeague2 {
    id: number;
    name: string;
    type: string;
    logo: string;
  }

  const changeLeagueSelected = (item: ILeague2) => {
    setLeague(item);
    navigation.navigate('Home');
  };

  const ListItem = ({ item, index }: IListItem) => {
    return (
      <TouchableOpacity
        onPress={() => changeLeagueSelected(item.league)}
        key={index}>
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
            {item.league.name}, {item.country.name}
          </Text>
          <Spacer />
          <AsyncImage style={{}} source={{ uri: item.league.logo }} />
        </HStack>
      </TouchableOpacity>
    );
  };

  const LoadingElement = () => (
    <SkeletonPlaceholder>
      <View style={{ paddingLeft: 20, paddingRight: 20 }}>
        <SkeletonPlaceholder.Item
          marginTop={20}
          width={'100%'}
          height={50}
          borderRadius={50}
        />
        {Array(9)
          .fill('a')
          .map(({ element, index }: { element: String; index: number }) => (
            <View style={{ flexDirection: 'row', marginTop: 20 }} key={index}>
              <SkeletonPlaceholder.Item
                marginTop={20}
                width={250}
                height={20}
              />
              <SkeletonPlaceholder.Item
                width={60}
                height={60}
                borderRadius={50}
                marginLeft={40}
              />
            </View>
          ))}
      </View>
    </SkeletonPlaceholder>
  );

  return isLoading ? (
    <ScrollView style={{ height: '100%', marginBottom: 50 }}>
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
              backgroundColor: 'rgba(128,128,128, 0.2)',
              height: 55,
              padding: 20,
              margin: 20,
              borderRadius: 50,
              color: 'black',
            }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Busca una liga...."
            placeholderTextColor="black"
          />
        )}
        name="LeagueSearched"
      />
      <FlatList
        data={LeaguesFiltered}
        renderItem={ListItem}
        style={{ height: '100%', marginBottom: 50 }}
      />
    </>
  );
};

export default ListLeagues;
