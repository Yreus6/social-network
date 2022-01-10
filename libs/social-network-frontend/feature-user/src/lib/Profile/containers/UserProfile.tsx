import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBCol,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBRow,
  MDBSpinner,
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
  MDBToast
} from 'mdb-react-ui-kit';
import Friends from '../components/Friends/Friends';
import {
  useCancelSentRequestForUserMutation,
  useCheckFollowingUserQuery,
  useCheckFriendUserQuery,
  useCheckRequestFriendUserQuery,
  useConfirmFriendRequestForUserMutation,
  useCountFriendsForUserQuery,
  useFollowUserMutation,
  useGetProfileForUserQuery,
  useRemoveFriendForUserMutation,
  useSendFriendRequestForUserMutation,
  useUnfollowUserMutation
} from '@sn-htc/social-network-frontend/data-access-user';
import About from '../components/About/About';
import { DateTime } from 'luxon';

interface UserProfileProps {
  currentUserId: string;
  userId: string;
}

const UserProfile = (props: UserProfileProps) => {
  const { data: profileData, isLoading: profileLoading, error: profileError } = useGetProfileForUserQuery({
    userId: props.userId
  });
  const { data: countFriendsData, isLoading: countFriendsLoading, refetch: countFriendsRefetch } = useCountFriendsForUserQuery({
    userId: props.userId
  });
  const { data: checkFriendData, isLoading: checkFriendLoading, refetch: checkFriendRefetch } = useCheckFriendUserQuery({
    userId: props.currentUserId,
    otherId: props.userId
  });
  const { data: checkFollowingData, isLoading: checkFollowingLoading, refetch: checkFollowingRefetch } = useCheckFollowingUserQuery({
    userId: props.currentUserId,
    otherId: props.userId
  });
  const { data: checkRequestFriendData, isLoading: checkRequestFriendLoading, refetch: checkRequestFriendRefetch } = useCheckRequestFriendUserQuery({
    userId: props.currentUserId,
    otherId: props.userId
  });
  const { data: checkReceiveRequestData, isLoading: checkReceiveRequestLoading, refetch: checkReceiveRequestRefetch } = useCheckRequestFriendUserQuery({
    userId: props.userId,
    otherId: props.currentUserId
  });
  const [sendFriendRequest, { isLoading: isAddFriendUpdating }] = useSendFriendRequestForUserMutation();
  const [cancelSentRequest, { isLoading: isCancelSentRequestUpdating }] = useCancelSentRequestForUserMutation();
  const [confirmFriendRequest, { isLoading: isConfirmRequestUpdating }] = useConfirmFriendRequestForUserMutation();
  const [removeFriend, { isLoading: isRemoveUpdating }] = useRemoveFriendForUserMutation();
  const [follow, { isLoading: isFollowUpdating }] = useFollowUserMutation();
  const [unfollow, { isLoading: isUnfollowUpdating }] = useUnfollowUserMutation();
  const [basicActive, setBasicActive] = useState<string>('posts');
  const [displayName, setDisplayName] = useState<string>('');
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);
  const [refetchFriends, setRefetchFriends] = useState<boolean>(false);

  const handleBasicClick = (value: string) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  const addFriend = async (currentUserId?: string, targetUserId?: string) => {
    if (currentUserId && targetUserId) {
      try {
        await sendFriendRequest({
          userId: currentUserId,
          targetId: targetUserId
        }).unwrap();
        await checkRequestFriendRefetch();
      } catch {
        setShowErrorToast(true);
      }
    }
  };

  const cancelFriendRequest = async (currentUserId?: string, targetUserId?: string) => {
    if (currentUserId && targetUserId) {
      try {
        await cancelSentRequest({
          userId: props.currentUserId,
          targetId: props.userId
        }).unwrap();
        await checkRequestFriendRefetch();
      } catch {
        setShowErrorToast(true);
      }
    }
  };

  const confirmRequest = async (currentUserId?: string, targetUserId?: string) => {
    if (currentUserId && targetUserId) {
      try {
        await confirmFriendRequest({
          userId: currentUserId,
          targetId: targetUserId
        }).unwrap();
        await countFriendsRefetch();
        await checkFriendRefetch();
        await checkFollowingRefetch();
        await checkRequestFriendRefetch();
        await checkReceiveRequestRefetch();
        setRefetchFriends(true);
      } catch {
        setShowErrorToast(true);
      }
    }
  };

  const unfriendUser = async (currentUserId?: string, targetUserId?: string) => {
    if (currentUserId && targetUserId) {
      try {
        await removeFriend({
          userId: currentUserId,
          friendId: targetUserId
        }).unwrap();
        await countFriendsRefetch();
        await checkFriendRefetch();
        await checkFollowingRefetch();
        await checkRequestFriendRefetch();
        await checkReceiveRequestRefetch();
        setRefetchFriends(true);
      } catch {
        setShowErrorToast(true);
      }
    }
  };

  const followUser = async (currentUserId?: string, targetUserId?: string) => {
    if (currentUserId && targetUserId) {
      try {
        await follow({
          userId: currentUserId,
          followedId: targetUserId
        }).unwrap();
        await checkFollowingRefetch();
        setRefetchFriends(true);
      } catch {
        setShowErrorToast(true);
      }
    }
  };

  const unfollowUser = async (currentUserId?: string, targetUserId?: string) => {
    if (currentUserId && targetUserId) {
      try {
        await unfollow({
          userId: currentUserId,
          followedId: targetUserId
        }).unwrap();
        await checkFollowingRefetch();
        setRefetchFriends(true);
      } catch {
        setShowErrorToast(true);
      }
    }
  };

  useEffect(() => {
    if (profileData && !profileLoading) {
      if (profileData.getUserProfile) {
        const firstName = profileData.getUserProfile.user.firstName!;
        const lastName = profileData.getUserProfile.user.lastName!;
        const middleName = profileData.getUserProfile.user.middleName ?? '';

        setDisplayName(`${firstName} ${lastName} ${middleName}`);
      }
    }
  }, [profileData, profileLoading]);

  useEffect(() => {
    if (showErrorToast) {
      setTimeout(() => {
        setShowErrorToast(false);
      });
    }
  }, [showErrorToast]);

  if (profileError) {
    return (
      <div className='d-flex justify-content-center align-items-center vh-100'>
        Oops! Something went wrong.
      </div>
    );
  }

  if (profileLoading) {
    return (
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <MDBSpinner role='status'>
          <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
      </div>
    );
  }

  if (!profileData?.getUserProfile && !profileLoading) {
    return (
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <h1 data-test='profile-not-found'>Profile Not Found</h1>
      </div>
    );
  }

  return (
    <div className='profile my-0'>
      <MDBRow className='me-0'>
        <MDBCol md='2' xl='3' sm='0' />
        <MDBCol className='m-0 p-0 pb-4' md='8' xl='6' sm='12'>
          <div className='profile-main mb-3'>
            <div className='position-relative'>
              <img className='img-fluid banner' src={'https://picsum.photos/1200/1300'} alt='Banner' />
              <img className='position-absolute avatar border border-4 border-white rounded-circle' src={'https://i.pravatar.cc/300'} alt='Avatar' />
            </div>
            <div className='px-4 d-flex flex-column'>
              <div className='align-self-end d-flex flex-row mt-3 button-group'>
                {props.currentUserId !== props.userId &&
                !checkFriendLoading && !checkFollowingLoading &&
                !checkRequestFriendLoading && !checkReceiveRequestLoading &&
                <>
                  <MDBDropdown>
                    {!checkFriendData?.checkFriend && !checkRequestFriendData?.checkRequestFriend &&
                    !checkReceiveRequestData?.checkRequestFriend &&
                    <MDBBtn
                      data-test='add-friend-btn'
                      color='light'
                      className='shadow-0'
                      style={{ backgroundColor: '#DBE0E5' }}
                      onClick={() => addFriend(props.currentUserId, props.userId)}
                      disabled={isAddFriendUpdating}
                    >
                      {isAddFriendUpdating ?
                        <>
                          <MDBSpinner size='sm' role='status' tag='span' className='me-2' />
                          Sending Request
                        </> : <>Add Friend</>
                      }
                    </MDBBtn>
                    }

                    {!checkFriendData?.checkFriend && checkRequestFriendData?.checkRequestFriend &&
                    !checkReceiveRequestData?.checkRequestFriend &&
                    <MDBBtn
                      data-test='cancel-request-btn'
                      color='light'
                      className='shadow-0'
                      style={{ backgroundColor: '#DBE0E5' }}
                      onClick={() => cancelFriendRequest(props.currentUserId, props.userId)}
                      disabled={isCancelSentRequestUpdating}
                    >
                      {isCancelSentRequestUpdating ?
                        <>
                          <MDBSpinner size='sm' role='status' tag='span' className='me-2' />
                          Cancel Request
                        </> : <>Cancel Request</>
                      }
                    </MDBBtn>
                    }

                    {!checkFriendData?.checkFriend && !checkRequestFriendData?.checkRequestFriend &&
                    checkReceiveRequestData?.checkRequestFriend &&
                    <MDBBtn
                      color='light'
                      className='shadow-0'
                      style={{ backgroundColor: '#DBE0E5' }}
                      onClick={() => confirmRequest(props.currentUserId, props.userId)}
                      disabled={isConfirmRequestUpdating}
                    >
                      {isConfirmRequestUpdating ?
                        <>
                          <MDBSpinner size='sm' role='status' tag='span' className='me-2' />
                          Confirm Request
                        </> : <>Confirm Request</>
                      }
                    </MDBBtn>
                    }

                    {checkFriendData?.checkFriend &&
                    <MDBDropdownToggle
                      data-test='friends-toggle-btn'
                      color='light'
                      className='shadow-0'
                      style={{ backgroundColor: '#DBE0E5' }}
                      disabled={isRemoveUpdating || isUnfollowUpdating || isFollowUpdating}
                    >
                      Friends
                    </MDBDropdownToggle>
                    }

                    <MDBDropdownMenu>
                      {checkFriendData?.checkFriend &&
                      <MDBDropdownItem style={{ backgroundColor: 'unset' }}>
                        <MDBDropdownLink
                          data-test='unfriend-btn'
                          tag='button' type='button'
                          onClick={() => unfriendUser(props.currentUserId, props.userId)}
                        >
                          Unfriend
                        </MDBDropdownLink>
                      </MDBDropdownItem>
                      }
                      <MDBDropdownItem style={{ backgroundColor: 'unset' }}>
                        {!checkFollowingLoading && checkFollowingData?.checkFollowing ?
                        <MDBDropdownLink
                          tag='button' type='button'
                          onClick={() => unfollowUser(props.currentUserId, props.userId)}
                        >
                          Unfollow
                        </MDBDropdownLink>
                        :
                        <MDBDropdownLink
                          tag='button' type='button'
                          onClick={() => followUser(props.currentUserId, props.userId)}
                        >
                          Follow
                        </MDBDropdownLink>
                        }
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>

                  <MDBBtn
                    style={{ backgroundColor: '#2065EF', height: '36px' }}
                    className='me-2 ms-2 shadow-0'
                  >
                    Inbox
                  </MDBBtn>
                </>
                }
              </div>
              <div>
                <h3 data-test='display-name'>{displayName}</h3>
                {!countFriendsLoading && countFriendsData &&
                <span>{countFriendsData.countFriends} Friends</span>
                }
                <p style={{ textAlign: 'justify' }}>
                  {profileData?.getUserProfile?.biography}
                </p>
              </div>
              <div className='d-flex flex-row align-items-center justify-content-end'>
                {profileData?.getUserProfile?.birthday &&
                <>
                  <MDBIcon fas icon='gift' />
                  <p className='m-0 flex-grow-1 ms-1'>
                    {DateTime.fromISO(profileData?.getUserProfile?.birthday?.birthdate!.toString(), { zone: 'utc' }).toFormat('dd-MM-yyyy')}
                  </p>
                </>
                }
              </div>
              <MDBTabs>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleBasicClick('posts')}
                    active={basicActive === 'posts'}
                  >
                    Posts
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleBasicClick('about')}
                    active={basicActive === 'about'}
                  >
                    About
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleBasicClick('photos')}
                    active={basicActive === 'photos'}
                  >
                    Photos
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleBasicClick('friends')}
                    active={basicActive === 'friends'}
                  >
                    Friends
                  </MDBTabsLink>
                </MDBTabsItem>
              </MDBTabs>
            </div>
          </div>
          <MDBTabsContent>
            <MDBTabsPane show={basicActive === 'posts'}>Tab 1 content</MDBTabsPane>
            <MDBTabsPane show={basicActive === 'about'}>
              {profileData?.getUserProfile &&
              <About
                currentUserId={props.currentUserId}
                userId={props.userId}
                profile={{
                  ...profileData.getUserProfile,
                  interests: profileData.getUserProfile.interests.map(i => i ?? ''),
                  educations: [],
                  jobs: [],
                  user: {
                    ...profileData.getUserProfile.user,
                    id: props.userId
                  }
                }}
              />
              }
            </MDBTabsPane>
            <MDBTabsPane show={basicActive === 'photos'}>
              Photos
            </MDBTabsPane>
            <MDBTabsPane show={basicActive === 'friends'}>
              <Friends
                currentUserId={props.currentUserId}
                userId={props.userId}
                refetchFriends={refetchFriends}
                reset={() => setRefetchFriends(false)}
              />
            </MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
        <MDBCol md='2' xl='3' sm='0' />
      </MDBRow>
      <MDBToast
        color='danger'
        show={showErrorToast}
        autohide
        position='top-right'
        delay={3000}
        appendToBody
        headerContent={
          <>
            <strong className='me-auto'>Error!</strong>
          </>
        }
        bodyContent='An error occurred. Please retry.'
      />
    </div>
  );
};

export default UserProfile;
