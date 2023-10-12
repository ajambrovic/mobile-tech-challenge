import { NetworkRequestStatus } from '../../store/networkRequestModel';
import { TournamentsModel } from './tournamentsModel';

const initialState: TournamentsModel = {
  networkRequestStatus: NetworkRequestStatus.InProgress,
  tournaments: [],
};

export default function tournaments(state = initialState, _action: unknown) {
  return state;
}
