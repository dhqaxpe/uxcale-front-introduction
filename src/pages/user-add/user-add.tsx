import { FormEvent } from 'react';
import { User } from 'src/api/users/users.types';
import { push_user } from 'src/api/users/users.utils';

export function UserAdd() {
  const submit_action = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e?.currentTarget;
    if (!form) return;
    const data = new FormData(form);

    const user: any = {}; // FIXME: bad practice
    data.forEach((value, key) => {
      user[key] = value;
    });

    const new_user_id = await push_user(user as User);

    if (new_user_id) window.location.href = '/users/' + new_user_id;
  };

  return (
    <div className="user-add__form-container">
      <h1>Add User</h1>
      <form className="user-add__form" onSubmit={submit_action}>
        <input name="username" placeholder="username" required />
        <input name="name" placeholder="name" />
        <input name="firstname" placeholder="firstname" />
        <input name="lastname" placeholder="lastname" />
        <input name="lastname2" placeholder="lastname2" />
        <input name="email" type="email" placeholder="asdf@foo.me" />
        <input name="phone" placeholder="+34 923123456" />
        <input name="nif" placeholder="80347856P" />
        <input
          name="picture"
          defaultValue="https://picsum.photos/seed/id/200"
        />
        <button type="submit">Add user</button>
      </form>
    </div>
  );
}
