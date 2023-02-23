export interface Category {
  id: string;
  name: string;
  emoji: string;
}

export enum CategoryFetchStatus {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed',
}
