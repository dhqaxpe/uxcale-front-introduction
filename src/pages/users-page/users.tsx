// NOTE: use in case of requiring "use" of react 19
import { Suspense } from 'react';
import { UserList } from '../user-list/user-list';

export function Users() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserList />
    </Suspense>
  );
}
