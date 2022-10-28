import { Ifixtures } from './IFixtures';

export interface ISeasons {
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
