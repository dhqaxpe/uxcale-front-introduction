import users_example_json from '../static/users.json';

export type UserId = number;
export type User = {
  id: UserId;
  picture?: string;
  username: string;
  firstName: string;
  lastName: string;
  lastName2: string;
  email: string;
  phone: string;
  nif: string;
};

export const USER_STATUS_STATES = ['ACTIVE', 'IDLE', 'DISCONECTED'] as const;
export type UserDetail = Omit<User, 'nif'> & {
  userStatus: (typeof USER_STATUS_STATES)[number];
  identification: {
    value: string;
    type: string;
  };
};

export type UserListApiResponse = typeof users_example_json;
