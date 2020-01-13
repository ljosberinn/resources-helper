import React, { useEffect, useState, createContext, useCallback } from 'react';
import { useIdentityContext } from 'react-netlify-identity';
import INITIAL_STATE from '../models/user';
import { UserService } from '../services';
import MineUtil from '../utils/mine';
import { createSafeAbortController } from '../constants/browserAPIs';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const { user: netlifyUser } = useIdentityContext();
  const [user, setUser] = useState(INITIAL_STATE);

  useEffect(() => {
    const controller = createSafeAbortController();

    if (netlifyUser?.id) {
      const service = new UserService(controller.signal);

      try {
        service.get(netlifyUser.id).then(setUser);
      } catch (error) {
        service.create(netlifyUser.id).then(setUser);
      }
    }

    return () => {
      controller.abort();
    };
  }, [netlifyUser]);

  /**
   * @param {number} resourceId the id of a mine resource
   */
  const setMineAmount = useCallback(
    resourceId => ({ target: { value } }) => {
      const sanitizedAmount =
        value > 0
          ? value <= MineUtil.MAX_MINES
            ? parseInt(value)
            : MineUtil.MAX_MINES
          : 0;

      setUser(user => ({
        ...user,
        mines: user.mines.map(mine => {
          if (mine.resourceId === resourceId) {
            return { ...mine, amount: sanitizedAmount };
          }

          return mine;
        }),
      }));
    },
    [],
  );

  /**
   * @param {number} resourceId the id of a mine resource
   */
  const setMineRate = useCallback(
    resourceId => ({ target: { value } }) => {
      const sanitizedRate = value > 0 ? parseInt(value) : 0;

      setUser(user => ({
        ...user,
        mines: user.mines.map(mine => {
          if (mine.resourceId === resourceId) {
            return {
              ...mine,
              ratePerHour: sanitizedRate,
            };
          }

          return mine;
        }),
      }));
    },
    [],
  );

  return (
    <UserContext.Provider value={{ ...user, setMineAmount, setMineRate }}>
      {children}
    </UserContext.Provider>
  );
}
