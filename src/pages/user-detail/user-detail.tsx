import { useEffect, useState } from 'react';
import {
  UserDetail as UserDetailType,
  UserId,
} from 'src/api/users/users.types';
import { delete_user, fetch_user_detail } from 'src/api/users/users.utils';

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

  const remove = async () => {
    const confirm = window.confirm('Remove user?');
    if (confirm) {
      const removed_user = await delete_user(parsedUserId);
      if (removed_user) window.location.href = '../';
    }
  };

  return (
    <section className="user__detail">
      <div className="user-card">
        <img src={userInfo?.picture} />
        <div className="user-card__name">
          {userInfo?.firstName} {userInfo?.lastName} {userInfo?.lastName2}
        </div>
        <div className="user-card__contact">
          <a href={`mailto:${userInfo?.email}`}>Mail: {userInfo?.email}</a>
          <a href={`tel:${userInfo?.email}`}>Tel: {userInfo?.phone}</a>
        </div>
        <div className="user-card__actions">
          <button onClick={remove}>Despedir</button>
        </div>
      </div>
    </section>
  );
}
