import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Animated,
} from 'react-native';
import { Surface, HStack } from '@react-native-material/core';
import { Spacer } from 'react-native-flex-layout';
import AsyncImage from '../../AsyncImage';
import { FlatGrid } from 'react-native-super-grid';
import { LeaguesSelectedContext } from '../../Context/LeagueSelected';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { GetTeamsByLeagueId } from '../../Api/Leagues/leagues';
import { ILeague } from '../../Api/Leagues/Interfaces/Ileague';
import {
  ITeam,
  ITeamsLeague,
} from '../../Api/Leagues/Interfaces/Teams/ITeamsLeague';

interface INavigation {
  navigate: (page: string) => {};
}

interface IHome {
  navigation: INavigation;
}

interface ILeagueX {
  id: number;
  name: string;
  type: string;
  logo: string;
}

interface ITest {
  league: ILeagueX;
  setLeague: React.Dispatch<React.SetStateAction<ILeagueX>>;
}

const HomeView = ({ navigation }: IHome) => {
  const { league } = React.useContext(LeaguesSelectedContext) as ITest;
  const [teamsByLeague, setTeamsByLeague] = useState<ILeague>();
  const [teamsIsLoading, setIsTeamsLoading] = useState<Boolean>(true);

  const [refresImage, setRefresImage] = useState<ILeagueX | undefined>(league);

  useEffect(() => {
    setRefresImage(undefined);
    changeLeague(league.id);
  }, [league]);

  const changeLeague = async (id: number) => {
    setTimeout(() => {
      setRefresImage(league);
    }, 100);
    setIsTeamsLoading(true);
    const response: ILeague = await GetTeamsByLeagueId(id);
    setTeamsByLeague(response);
    setIsTeamsLoading(false);
  };

  const [isLoading, setIsLoading] = useState(true);

  const onImageLoad = () => {
    setIsLoading(false);
  };

  const ItemTeam = ({ item }: { item: ITeam }) => {
    return (
      <Surface
        elevation={9}
        category="large"
        style={{
          width: 157,
          height: 201,
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
  };

  const SkeletonTeam = () => (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item width={157} height={201} />
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
          marginBottom: 10,
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
      {teamsByLeague != undefined ? (
        <FlatGrid
          fixed
          itemDimension={157}
          data={
            teamsIsLoading ? Array(6).fill('a') : teamsByLeague.data.response
          }
          renderItem={({ item }) => {
            return teamsIsLoading ? <SkeletonTeam /> : <ItemTeam item={item} />;
          }}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

export default HomeView;
