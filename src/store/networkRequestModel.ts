export enum NetworkRequestStatus {
  Unknown,
  InProgress,
  Success,
  Fail,
}

export type NetworkRequestModel = {
  networkRequestStatus: NetworkRequestStatus;
};
