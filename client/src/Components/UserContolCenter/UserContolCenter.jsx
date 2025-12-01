import { Button } from '../Button/Button';
import style from './UserContolCenter.module.css';

export const UserContolCenter = ({ users }) => {
  return (
    <ul className={style.UserContolCenter}>
      {users.map((user) => (
        <li key={user.email}>
          <span>{user.fullname}</span>
          <span>{user.roleName}</span>
          <div className={style.controllers}>
            <Button icon="icon-pencil" />
            <Button className={style.delete} icon="icon-trash" />
          </div>
        </li>
      ))}
    </ul>
  );
};
