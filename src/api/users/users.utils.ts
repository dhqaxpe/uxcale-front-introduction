import {
  User,
  USER_STATUS_STATES,
  UserDetail,
  UserId,
  UserListApiResponse,
} from './users.types';
import user_list from 'src/api/static/users.json';

const cached_user_list = user_list as UserListApiResponse;
const STORAGE_KEY = 'UXCALE_USERS';

function save_to_storage(user_list: UserListApiResponse): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user_list));
}

function get_from_storage(): UserListApiResponse | undefined {
  const storage_list = localStorage.getItem(STORAGE_KEY);
  if (storage_list === null) return undefined;
  return JSON.parse(storage_list) as UserListApiResponse;
}

export async function fetch_paginated_users(
  page: number, // starts at 0
  size: number,
): Promise<UserListApiResponse> {
  const temp_user_list = get_from_storage() ?? cached_user_list;
  const final_users = temp_user_list.data.slice(
    page * size,
    page * size + size,
  );
  save_to_storage(temp_user_list);
  const result = new Promise<UserListApiResponse>((resolve) => {
    setTimeout(() => resolve({ ...temp_user_list, data: final_users }), 3000);
  });

  // IF API
  // const api_result = await fetch("localhost:3000/api/v1/users");
  // const json_api_result = await api_result.json();
  // return json_api_result as UserListApiResponse;

  return result;
}

// Dirty mock but really dont care since the API change is SO minimal
export async function fetch_user_detail(
  userId: UserId,
): Promise<UserDetail | null> {
  const temp_user_list = get_from_storage() ?? cached_user_list;
  const user = temp_user_list.data.find((user) => user.id === userId);
  if (!user) return null;
  save_to_storage(temp_user_list);
  return {
    ...user,
    userStatus:
      USER_STATUS_STATES[Math.floor(Math.random() * USER_STATUS_STATES.length)],
    identification: { value: user.nif, type: 'nif' },
  };

  // IF API
  // const api_result = await fetch(`localhost:3000/api/v1/users/${userId}`);
  // const json_api_result = await api_result.json();
  // return json_api_result as UserDetail;
}

export async function push_user(user: User): Promise<number> {
  const temp_user_list = get_from_storage() ?? cached_user_list;
  const id = temp_user_list.data.length + 20; // NOTE: fun
  temp_user_list.data.push({
    picture: 'https://picsum.photos/seed/laborum/200',
    ...user,
    id,
  });
  save_to_storage(temp_user_list);
  return new Promise((resolve) => setTimeout(() => resolve(id), 2000));
}

export async function delete_user(userId: UserId): Promise<User | undefined> {
  const temp_user_list = get_from_storage() ?? cached_user_list;
  const user = temp_user_list.data.find((u) => u.id === userId);
  if (!user) return undefined;
  temp_user_list.data.splice(temp_user_list.data.indexOf(user), 1);
  save_to_storage(temp_user_list);
  return Promise.resolve(user);
}
