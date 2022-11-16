export interface ITeamsLeague {
    'get': string;
    'parameters': {
        'league': string;
        'season': string;
    };
    'errors': never[];
    'results': number;
    'paging': {
        'current': number;
        'total': number;
    };
    'response': ITeam
  }

  export interface ITeam{
    'team': {
        'id': number;
        'name': string;
        'code': string;
        'country': string;
        'founded': number;
        'national': boolean;
        'logo': string;
    },'venue': {
      'id': number;
      'name': string;
      'address': string;
      'city': string;
      'capacity': number;
      'surface': string;
      'image': string;
  }
  }