import { NetworkRequestModel } from 'src/domain/networkRequest/networkRequestModel';

export type TournamentsServerModel = TournamentModel[];

export type TournamentsReduxModel = TournamentsLocalModal & {
  tournaments: TournamentsServerModel;
};

export type TournamentsLocalModal = NetworkRequestModel & {
  initialLoad: boolean;
  listEnd: boolean;
  page: number;
  searchQuery: string;
};

export type TournamentModel = {
  id: string;
  name: string;
  organizer: string;
  game: string;
  participants: {
    current: number;
    max: number;
  };
  startDate: string;
};
