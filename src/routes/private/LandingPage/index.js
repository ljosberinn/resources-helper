import React from 'react';
import { useUser } from '../../../hooks';

/**
 * @returns {React.FC} LandingPage
 */
export default function LandingPage() {
  const user = useUser();

  if (!user.id) {
    return null;
  }

  return JSON.stringify(user, null, 2);
}
