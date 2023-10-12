import { NetworkRequestModel } from '../../store/networkRequestModel';

export type TournamentsServerModel = TournamentModel[];

export type TournamentsReduxModel = NetworkRequestModel & {
  tournaments: TournamentsServerModel;
  initialLoad: boolean;
  listEnd: boolean;
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
