import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Animated,
} from 'react-native';
import { HStack, VStack } from '@react-native-material/core';
import { Spacer } from 'react-native-flex-layout';
import AsyncImage from '../../AsyncImage';

import { Surface, Stack } from '@react-native-material/core';
import { FlatGrid } from 'react-native-super-grid';

import { LeaguesSelectedContext } from '../../Context/LeagueSelected';
import {
  GetTeamsByLeagueId,
  GetTeamsByLeagueMock,
} from '../../Api/Leagues/leagues';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface IHome {
  navigation: any;
}

interface ILeague {
  id: number;
  name: string;
  type: string;
  logo: string;
}

interface ITest {
  league: ILeague;
  setLeague: React.Dispatch<React.SetStateAction<ILeague>>;
}

const HomeView = ({ navigation }: IHome) => {
  const { league } = React.useContext(LeaguesSelectedContext) as ITest;
  const [teamsByLeague, setTeamsByLeague] = useState<any>({});
  const [teamsIsLoading, setIsTeamsLoading] = useState<Boolean>(true);

  const [refresImage, setRefresImage] = useState<any>(league);

  useEffect(() => {
    setRefresImage(undefined);
    changeLeague(league.id);
  }, [league]);

  const changeLeague = async (id: number) => {
    setTimeout(() => {
      setRefresImage(league);
    }, 100);
    setIsTeamsLoading(true);
    const response = await GetTeamsByLeagueMock(id);
    // const response = await GetTeamsByLeagueId(id);
    setTeamsByLeague(response.data);
    setIsTeamsLoading(false);
  };

  const [isLoading, setIsLoading] = useState(true);

  const onImageLoad = () => {
    setIsLoading(false);
  };

  const ItemTeam = ({ item }: any) => (
    <Surface
      elevation={2}
      category="medium"
      style={{
        width: 180,
        height: 180,
      }}
      key={item.team.id}>
      <View style={{ marginTop: 10 }}>
        <AsyncImage
          style={{
            height: 100,
            width: 100,
            alignSelf: 'center',
          }}
          source={{
            uri: item.team.logo,
          }}
        />
      </View>

      <Spacer />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 18,
          paddingBottom: 10,
        }}>
        {item.team.name}
      </Text>
    </Surface>
  );

  const SkeletonTeam = () => (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item width={180} height={180} />
    </SkeletonPlaceholder>
  );

  return (
    <View style={{ marginBottom: 120 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ListLeagues')}
        style={{
          backgroundColor: 'rgba(128,128,128, 0.2)',
          marginLeft: 20,
          marginRight: 20,
          marginTop: 10,
          borderRadius: 50,
          paddingLeft: 5,
          paddingRight: 5,
          marginBottom:10
        }}>
        {refresImage != undefined ? (
          <HStack
            m={4}
            spacing={6}
            style={{ marginRight: 20, marginLeft: 20, height: 50 }}>
            <Text
              style={{
                textAlign: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                textAlignVertical: 'center',
                alignContent: 'center',
                color: 'black',
                fontSize: 20,
              }}>
              {refresImage.name}
            </Text>
            <Spacer />
            <AsyncImage
              style={{
                height: 50,
                width: 50,
              }}
              source={{
                uri: refresImage.logo,
              }}
            />
          </HStack>
        ) : (
          <></>
        )}
      </TouchableOpacity>
      <FlatGrid
        fixed
        itemDimension={180}
        data={teamsIsLoading ? Array(9).fill('a') : teamsByLeague.response}
        renderItem={({ item }) => {
          return teamsIsLoading ? <SkeletonTeam /> : <ItemTeam item={item} />;
        }}
      />
    </View>
  );
};

export default HomeView;
