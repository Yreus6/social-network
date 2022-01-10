import React, { useEffect } from 'react';
import { useQuery } from '@sn-htc/shared/data-access';
import { useHistory } from 'react-router-dom';
import { User } from '@sn-htc/social-network-frontend/data-access-user';
import UserProfile from './containers/UserProfile';
import './Profile.scss';

interface ProfileProps {
  user: User;
}

export const Profile = (props: ProfileProps) => {
  const history = useHistory();
  const query = useQuery();

  useEffect(() => {
    const userId = query.get('userId');

    if (!userId) {
      history.push(`/profile?userId=${props.user.id}`);
    }
  }, [query.get('userId')]);

  return (
    query.get('userId')
      ? <UserProfile currentUserId={props.user.id} userId={query.get('userId')!} />
      : <div />
  );
};
