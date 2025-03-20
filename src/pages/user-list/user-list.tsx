'use client';

import { useEffect, useState } from 'react';
import { UserListApiResponse } from 'src/api/users/users.types';
import { fetch_paginated_users } from 'src/api/users/users.utils';
import { UserRow } from 'src/components/user-row/user-row';
import { Link } from 'wouter';

export function UserList() {
  // const userResponse = use(fetch_all_users());
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 16;

  const [userResponse, setUserResponse] = useState<
    UserListApiResponse | undefined
  >(undefined);

  useEffect(() => {
    setUserResponse(undefined);
    (async () => {
      const response = await fetch_paginated_users(page, PAGE_SIZE);
      setUserResponse(response);
    })();
  }, [page]);

  return (
    <section className="users-page">
      <div className="user-list__heading">
        <h1>Users</h1>
        <Link href="/users/add" className="user-list__add__link">
          +
        </Link>
      </div>
      <ul className="user-list">
        {userResponse
          ? userResponse.data.map((user) => (
              <UserRow
                key={'user-row_' + user.id}
                href={'/users/' + user.id}
                {...user}
              />
            ))
          : [...Array(PAGE_SIZE).keys()].map((key) => (
              <span key={'skeleton_' + key} className="user-row__skeleton" />
            ))}
      </ul>
      <div className="user-list__pagination-controls">
        <button
          onClick={() => setPage((prev) => (prev > 0 ? prev - 1 : 0))}
          className="user-list__pagination-controls__button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
          </svg>
        </button>
        <label>{page + 1}</label>
        <button
          className="user-list__pagination-controls__button"
          onClick={() =>
            userResponse &&
            setPage((prev) =>
              prev < userResponse.pagination.totalPages - 1 ? prev + 1 : prev,
            )
          }
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
          </svg>
        </button>
      </div>
    </section>
  );
}
