import { NetworkRequestModel } from '../../store/networkRequestModel';

export type TournamentsModel = NetworkRequestModel & {
  tournaments: TournamentModel[];
};

type TournamentModel = {
  id: string;
  name: string;
  organizer: string;
  game: string;
  participants: {
    current: number;
    max: number;
  };
  startDate: Date;
};
