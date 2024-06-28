'use client';

import { ReactNode, useContext, useEffect } from 'react';
import { typeUser } from '../../types/types';
import { UserContext } from './UserProvider';

type Props = {
  children: ReactNode;
  user: typeUser;
};
export default function UserLayout(props: Props) {
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    setUser(props.user);
  }, [setUser, props.user]);

  return <>{props.children}</>;
}
