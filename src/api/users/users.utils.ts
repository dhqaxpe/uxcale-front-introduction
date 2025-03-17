import {
  User,
  USER_STATUS_STATES,
  UserDetail,
  UserId,
  UserListApiResponse,
} from './users.types';
import user_list from 'src/api/static/users.json';

const cached_user_list = user_list;

export async function fetch_all_users(): Promise<UserListApiResponse> {
  const result = new Promise<UserListApiResponse>((resolve) => {
    setTimeout(() => resolve(cached_user_list), 3000);
  });
  return result;
}

export async function fetch_paginated_users(
  page: number, // starts at 0
  size: number,
): Promise<UserListApiResponse> {
  const final_users = cached_user_list.data.slice(
    page * size,
    page * size + size,
  );
  const result = new Promise<UserListApiResponse>((resolve) => {
    setTimeout(() => resolve({ ...cached_user_list, data: final_users }), 3000);
  });
  return result;
}

// Dirty mock but really dont care since the API change is SO minimal
export async function fetch_user_detail(
  userId: UserId,
): Promise<UserDetail | null> {
  const user = cached_user_list.data.find((user) => user.id === userId);
  if (!user) return null;
  return {
    ...user,
    userStatus:
      USER_STATUS_STATES[Math.floor(Math.random() * USER_STATUS_STATES.length)],
    identification: { value: user.nif, type: 'nif' },
  };
}

export async function push_user(user: User): Promise<boolean> {
  cached_user_list.data.push({
    picture: 'https://picsum.photos/seed/laborum/200',
    ...user,
  });
  return new Promise((resolve) => setTimeout(() => resolve(true), 2000));
}
