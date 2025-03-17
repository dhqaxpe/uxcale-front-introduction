import { User } from 'src/api/users/users.types';
import { Link } from 'wouter';

export function UserRow(props: User & { href?: string }) {
  return (
    <li className="user-row">
      <Link className="user-row__link" href={props.href ?? ''}>
        <img className="user-row__item" src={props.picture} />
        <div className="user-row__item user-row__real-name">
          <div>{props.firstName}</div>
          <div>{props.lastName}</div>
        </div>
        <div className="user-row__item">{props.username}</div>
        <div className="user-row__item">{props.email}</div>
        <div className="user-row__item">{props.phone}</div>
      </Link>
    </li>
  );
}
