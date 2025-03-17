import { useEffect, useState } from 'react';
import {
  UserDetail as UserDetailType,
  UserId,
} from 'src/api/users/users.types';
import { fetch_user_detail } from 'src/api/users/users.utils';

export function UserDetail(props: { userId: string }) {
  const parsedUserId = parseInt(props.userId) as UserId;
  const [userInfo, setUserInfo] = useState<UserDetailType | null>(null);

  useEffect(() => {
    setUserInfo(null);
    (async () => {
      const response = await fetch_user_detail(parsedUserId);
      setUserInfo(response);
    })();
  }, []);

  return <section>The user Id is: {parsedUserId}</section>;
}
