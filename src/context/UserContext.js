import React, { useEffect, useState, createContext } from 'react';
import { useIdentityContext } from 'react-netlify-identity';
import INITIAL_STATE from '../models/user';
import UserService from '../services/user';
import { useAbortSignal } from '../hooks';

export const UserContext = createContext(INITIAL_STATE);

export default function UserProvider({ children }) {
  const { user: netlifyUser } = useIdentityContext();
  const [user, setUser] = useState(INITIAL_STATE);

  const { signal, abort } = useAbortSignal();

  useEffect(() => {
    if (netlifyUser?.id) {
      const service = new UserService(signal);

      try {
        service.get(netlifyUser.id).then(setUser);
      } catch (error) {
        service.create(netlifyUser.id).then(setUser);
      }

      return abort;
    }
  }, [netlifyUser, abort, signal]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
