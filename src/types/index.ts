export type PinType = 'safe' | 'caution' | 'danger';

export interface Pin {
  _id: string;
  location: {
    latitude: number;
    longitude: number;
  };
  type: PinType;
  details: string;
  createdBy: string;
  createdAt: Date;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  walletAddress?: string;
}