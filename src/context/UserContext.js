import React, { useEffect, useState, createContext } from 'react';
import { useIdentityContext } from 'react-netlify-identity';
import INITIAL_STATE from '../models/user';

export const UserContext = createContext(INITIAL_STATE);

async function getUser(id, callback) {
  callback({ ...INITIAL_STATE, id });
  return;

  const response = await fetch(`/.netlify/functions/getUser?id=${id}`);
  const json = await response.json();

  callback(json);
}

async function createUser(id, callback) {
  const response = await fetch('/.netlify/functions/createUser', {
    method: 'POST',
    body: { id },
  });

  if (response.ok) {
    callback({ ...INITIAL_STATE, id });
  }
}

export default function UserProvider({ children }) {
  const { user: netlifyUser } = useIdentityContext();
  const [user, setUser] = useState(INITIAL_STATE);

  useEffect(() => {
    if (netlifyUser?.id) {
      try {
        getUser(netlifyUser.id, setUser);
      } catch (error) {
        createUser(netlifyUser.id, setUser);
      }
    }
  }, [netlifyUser]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
