import React, { createContext, useState } from 'react';

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

export const LeaguesSelectedContext = React.createContext<ITest | null>(null);

const LeagueSelectedProvider: React.FC<React.ReactNode> = ({
  children,
}: any) => {
  const [league, setLeague] = useState<ILeague>({
    id: 4,
    name: 'Euro Championship',
    type: 'Cup',
    logo: 'https://media.api-sports.io/football/leagues/4.png',
  });

  return (
    <LeaguesSelectedContext.Provider value={{ league, setLeague }}>
      {children}
    </LeaguesSelectedContext.Provider>
  );
};

export default LeagueSelectedProvider;
