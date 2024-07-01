'use client';
import { typeUser } from '../../types/types';

import * as React from 'react';
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';

type IUserContext = {
  user: typeUser;
  setUser(user: typeUser): void;
};

export const UserContext = createContext({} as IUserContext);

interface ProviderProps {
  children: ReactNode;
}

export default function UserProvider(props: ProviderProps) {
  const [user, setUser] = useState<typeUser>({} as typeUser);

  const value = useMemo(() => {
    return {
      user,
      setUser,
    };
  }, [user]);

  return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
}

