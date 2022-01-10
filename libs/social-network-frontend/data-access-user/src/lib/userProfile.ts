import { api } from '@sn-htc/shared/data-access';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ConnectionCursor: string;
  DateTime: Date;
};

export type Address = {
  __typename?: 'Address';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  mode?: Maybe<PrivacyType>;
  region?: Maybe<Scalars['String']>;
};

export type AddressInput = {
  city: Scalars['String'];
  country: Scalars['String'];
  mode: Scalars['String'];
  region: Scalars['String'];
};

export type Birthday = {
  __typename?: 'Birthday';
  birthdate?: Maybe<Scalars['DateTime']>;
  mode?: Maybe<PrivacyType>;
};

export type BirthdayInput = {
  birthdate: Scalars['String'];
  mode: Scalars['String'];
};

export type DateRange = {
  __typename?: 'DateRange';
  fromDate?: Maybe<Scalars['DateTime']>;
  toDate?: Maybe<Scalars['DateTime']>;
};

export type Education = Node & {
  __typename?: 'Education';
  concentrations: Array<Maybe<Scalars['String']>>;
  dateRange?: Maybe<DateRange>;
  degree?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isGraduate?: Maybe<Scalars['Boolean']>;
  mode?: Maybe<PrivacyType>;
  school?: Maybe<Scalars['String']>;
};

export type EducationInput = {
  concentrations: Array<Maybe<Scalars['String']>>;
  degree?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  fromDate?: Maybe<Scalars['String']>;
  isGraduate?: Maybe<Scalars['Boolean']>;
  mode?: Maybe<Scalars['String']>;
  school?: Maybe<Scalars['String']>;
  toDate?: Maybe<Scalars['String']>;
};

export type Job = Node & {
  __typename?: 'Job';
  city?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  dateRange?: Maybe<DateRange>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isCurrentWork?: Maybe<Scalars['Boolean']>;
  mode?: Maybe<PrivacyType>;
  position?: Maybe<Scalars['String']>;
};

export type JobInput = {
  city?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  fromDate?: Maybe<Scalars['String']>;
  isCurrentWork?: Maybe<Scalars['Boolean']>;
  mode?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
  toDate?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addEducation?: Maybe<Education>;
  addJob?: Maybe<Job>;
  cancelSentRequest?: Maybe<User>;
  changeEmail?: Maybe<User>;
  changeName?: Maybe<User>;
  changePassword?: Maybe<User>;
  confirmFriendRequest?: Maybe<User>;
  deactivate?: Maybe<User>;
  declineFriendRequest?: Maybe<User>;
  editAddress?: Maybe<Profile>;
  editBio?: Maybe<Profile>;
  editBirthday?: Maybe<Profile>;
  editEducation?: Maybe<Education>;
  editGender?: Maybe<Profile>;
  editInterests?: Maybe<Profile>;
  editJob?: Maybe<Job>;
  editPhone?: Maybe<Profile>;
  follow?: Maybe<User>;
  null?: Maybe<Scalars['Boolean']>;
  removeEducation?: Maybe<Education>;
  removeFriend?: Maybe<User>;
  removeJob?: Maybe<Job>;
  sendFriendRequest?: Maybe<User>;
  unfollow?: Maybe<User>;
};


export type MutationAddEducationArgs = {
  educationInput: EducationInput;
  userId: Scalars['ID'];
};


export type MutationAddJobArgs = {
  jobInput: JobInput;
  userId: Scalars['ID'];
};


export type MutationCancelSentRequestArgs = {
  targetId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationChangeEmailArgs = {
  email: Scalars['String'];
  userId: Scalars['ID'];
};


export type MutationChangeNameArgs = {
  nameInput: NameInput;
  userId: Scalars['ID'];
};


export type MutationChangePasswordArgs = {
  passwordInput: PasswordInput;
  userId: Scalars['ID'];
};


export type MutationConfirmFriendRequestArgs = {
  targetId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationDeactivateArgs = {
  userId: Scalars['ID'];
};


export type MutationDeclineFriendRequestArgs = {
  targetId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationEditAddressArgs = {
  addressInput: AddressInput;
  userId: Scalars['ID'];
};


export type MutationEditBioArgs = {
  biography: Scalars['String'];
  userId: Scalars['ID'];
};


export type MutationEditBirthdayArgs = {
  birthdayInput: BirthdayInput;
  userId: Scalars['ID'];
};


export type MutationEditEducationArgs = {
  educationId: Scalars['ID'];
  educationInput: EducationInput;
  userId: Scalars['ID'];
};


export type MutationEditGenderArgs = {
  gender: Scalars['String'];
  userId: Scalars['ID'];
};


export type MutationEditInterestsArgs = {
  interests: Array<Maybe<Scalars['String']>>;
  userId: Scalars['ID'];
};


export type MutationEditJobArgs = {
  jobId: Scalars['ID'];
  jobInput: JobInput;
  userId: Scalars['ID'];
};


export type MutationEditPhoneArgs = {
  phoneInput: PhoneInput;
  userId: Scalars['ID'];
};


export type MutationFollowArgs = {
  followedId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationRemoveEducationArgs = {
  educationId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationRemoveFriendArgs = {
  friendId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationRemoveJobArgs = {
  jobId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationSendFriendRequestArgs = {
  targetId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationUnfollowArgs = {
  followedId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type NameInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
};

export type Node = {
  id: Scalars['ID'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['ConnectionCursor']>;
  hasNextPage?: Maybe<Scalars['Boolean']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
  startCursor?: Maybe<Scalars['ConnectionCursor']>;
};

export type PasswordInput = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type PhoneInput = {
  mode: Scalars['String'];
  phone: Scalars['String'];
};

export type PhoneNumber = {
  __typename?: 'PhoneNumber';
  mode?: Maybe<PrivacyType>;
  phone?: Maybe<Scalars['String']>;
};

export enum PrivacyType {
  Friend = 'FRIEND',
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Profile = Node & {
  __typename?: 'Profile';
  address?: Maybe<Address>;
  biography?: Maybe<Scalars['String']>;
  birthday?: Maybe<Birthday>;
  educations: Array<Maybe<Education>>;
  gender?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  interests: Array<Maybe<Scalars['String']>>;
  jobs: Array<Maybe<Job>>;
  joinedAt?: Maybe<Scalars['DateTime']>;
  phoneNumber?: Maybe<PhoneNumber>;
  user: User;
};

export type Query = {
  __typename?: 'Query';
  checkFollowing?: Maybe<Scalars['Boolean']>;
  checkFriend?: Maybe<Scalars['Boolean']>;
  checkRequestFriend?: Maybe<Scalars['Boolean']>;
  countFriends?: Maybe<Scalars['Int']>;
  countMutualFriends?: Maybe<Scalars['Int']>;
  getCurrentUser?: Maybe<User>;
  getEducation?: Maybe<Education>;
  getEducations?: Maybe<Array<Maybe<Education>>>;
  getFollowers?: Maybe<UserConnection>;
  getFollowings?: Maybe<UserConnection>;
  getFriendRequests?: Maybe<UserConnection>;
  getFriendSuggestions?: Maybe<UserConnection>;
  getFriends?: Maybe<UserConnection>;
  getJob?: Maybe<Job>;
  getJobs?: Maybe<Array<Maybe<Job>>>;
  getMutualFriends?: Maybe<UserConnection>;
  getSentRequests?: Maybe<UserConnection>;
  getUserProfile?: Maybe<Profile>;
};


export type QueryCheckFollowingArgs = {
  otherId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type QueryCheckFriendArgs = {
  otherId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type QueryCheckRequestFriendArgs = {
  otherId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type QueryCountFriendsArgs = {
  userId: Scalars['ID'];
};


export type QueryCountMutualFriendsArgs = {
  otherId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type QueryGetEducationArgs = {
  educationId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type QueryGetEducationsArgs = {
  userId: Scalars['ID'];
};


export type QueryGetFollowersArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  userId: Scalars['ID'];
};


export type QueryGetFollowingsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  userId: Scalars['ID'];
};


export type QueryGetFriendRequestsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  userId: Scalars['ID'];
};


export type QueryGetFriendSuggestionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  userId: Scalars['ID'];
};


export type QueryGetFriendsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  userId: Scalars['ID'];
};


export type QueryGetJobArgs = {
  jobId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type QueryGetJobsArgs = {
  userId: Scalars['ID'];
};


export type QueryGetMutualFriendsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  otherId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type QueryGetSentRequestsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  userId: Scalars['ID'];
};


export type QueryGetUserProfileArgs = {
  userId: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  null?: Maybe<Scalars['Boolean']>;
};

export type User = Node & {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['ConnectionCursor'];
  node: User;
};

export type AddEducationForUserMutationVariables = Exact<{
  userId: Scalars['ID'];
  educationInput: EducationInput;
}>;


export type AddEducationForUserMutation = { __typename?: 'Mutation', addEducation?: { __typename?: 'Education', id: string, school?: string | null | undefined, isGraduate?: boolean | null | undefined, description?: string | null | undefined, concentrations: Array<string | null | undefined>, degree?: string | null | undefined, mode?: PrivacyType | null | undefined, dateRange?: { __typename?: 'DateRange', fromDate?: Date | null | undefined, toDate?: Date | null | undefined } | null | undefined } | null | undefined };

export type AddJobForUserMutationVariables = Exact<{
  userId: Scalars['ID'];
  jobInput: JobInput;
}>;


export type AddJobForUserMutation = { __typename?: 'Mutation', addJob?: { __typename?: 'Job', id: string, company?: string | null | undefined, position?: string | null | undefined, city?: string | null | undefined, description?: string | null | undefined, mode?: PrivacyType | null | undefined, dateRange?: { __typename?: 'DateRange', fromDate?: Date | null | undefined, toDate?: Date | null | undefined } | null | undefined } | null | undefined };

export type CancelSentRequestForUserMutationVariables = Exact<{
  userId: Scalars['ID'];
  targetId: Scalars['ID'];
}>;


export type CancelSentRequestForUserMutation = { __typename?: 'Mutation', cancelSentRequest?: { __typename?: 'User', id: string } | null | undefined };

export type ChangeEmailForUserMutationVariables = Exact<{
  userId: Scalars['ID'];
  email: Scalars['String'];
}>;


export type ChangeEmailForUserMutation = { __typename?: 'Mutation', changeEmail?: { __typename?: 'User', id: string, email?: string | null | undefined } | null | undefined };

export type ChangeNameForUserMutationVariables = Exact<{
  userId: Scalars['ID'];
  nameInput: NameInput;
}>;


export type ChangeNameForUserMutation = { __typename?: 'Mutation', changeName?: { __typename?: 'User', id: string, firstName?: string | null | undefined, middleName?: string | null | undefined, lastName?: string | null | undefined } | null | undefined };

export type ChangePasswordForUserMutationVariables = Exact<{
  userId: Scalars['ID'];
  passwordInput: PasswordInput;
}>;


export type ChangePasswordForUserMutation = { __typename?: 'Mutation', changePassword?: { __typename?: 'User', id: string } | null | undefined };

export type CheckFollowingUserQueryVariables = Exact<{
  userId: Scalars['ID'];
  otherId: Scalars['ID'];
}>;


export type CheckFollowingUserQuery = { __typename?: 'Query', checkFollowing?: boolean | null | undefined };

export type CheckFriendUserQueryVariables = Exact<{
  userId: Scalars['ID'];
  otherId: Scalars['ID'];
}>;


export type CheckFriendUserQuery = { __typename?: 'Query', checkFriend?: boolean | null | undefined };

export type CheckRequestFriendUserQueryVariables = Exact<{
  userId: Scalars['ID'];
  otherId: Scalars['ID'];
}>;


export type CheckRequestFriendUserQuery = { __typename?: 'Query', checkRequestFriend?: boolean | null | undefined };

export type ConfirmFriendRequestForUserMutationVariables = Exact<{
  userId: Scalars['ID'];
  targetId: Scalars['ID'];
}>;


export type ConfirmFriendRequestForUserMutation = { __typename?: 'Mutation', confirmFriendRequest?: { __typename?: 'User', id: string } | null | undefined };

export type CountFriendsForUserQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type CountFriendsForUserQuery = { __typename?: 'Query', countFriends?: number | null | undefined };

export type CountMutualFriendsForUsersQueryVariables = Exact<{
  userId: Scalars['ID'];
  otherId: Scalars['ID'];
}>;


export type CountMutualFriendsForUsersQuery = { __typename?: 'Query', countMutualFriends?: number | null | undefined };

export type DeactivateUserMutationVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type DeactivateUserMutation = { __typename?: 'Mutation', deactivate?: { __typename?: 'User', id: string } | null | undefined };

export type DeclineFriendRequestForUserMutationVariables = Exact<{
  userId: Scalars['ID'];
  targetId: Scalars['ID'];
}>;


export type DeclineFriendRequestForUserMutation = { __typename?: 'Mutation', declineFriendRequest?: { __typename?: 'User', id: string } | null | undefined };

export type EditAddressForUserMutationVariables = Exact<{
  userId: Scalars['ID'];
  addressInput: AddressInput;
}>;


export type EditAddressForUserMutation = { __typename?: 'Mutation', editAddress?: { __typename?: 'Profile', id: string, address?: { __typename?: 'Address', city?: string | null | undefined, region?: string | null | undefined, country?: string | null | undefined, mode?: PrivacyType | null | undefined } | null | undefined } | null | undefined };

export type EditBioForUserMutationVariables = Exact<{
  userId: Scalars['ID'];
  biography: Scalars['String'];
}>;


export type EditBioForUserMutation = { __typename?: 'Mutation', editBio?: { __typename?: 'Profile', id: string, biography?: string | null | undefined } | null | undefined };

export type EditBirthdayForUserMutationVariables = Exact<{
  userId: Scalars['ID'];
  birthdayInput: BirthdayInput;
}>;


export type EditBirthdayForUserMutation = { __typename?: 'Mutation', editBirthday?: { __typename?: 'Profile', id: string, birthday?: { __typename?: 'Birthday', birthdate?: Date | null | undefined, mode?: PrivacyType | null | undefined } | null | undefined } | null | undefined };

export type EditEducationForUserMutationVariables = Exact<{
  userId: Scalars['ID'];
  educationId: Scalars['ID'];
  educationInput: EducationInput;
}>;


export type EditEducationForUserMutation = { __typename?: 'Mutation', editEducation?: { __typename?: 'Education', id: string, school?: string | null | undefined, isGraduate?: boolean | null | undefined, description?: string | null | undefined, concentrations: Array<string | null | undefined>, degree?: string | null | undefined, mode?: PrivacyType | null | undefined, dateRange?: { __typename?: 'DateRange', fromDate?: Date | null | undefined, toDate?: Date | null | undefined } | null | undefined } | null | undefined };

export type EditGenderForUserMutationVariables = Exact<{
  userId: Scalars['ID'];
  gender: Scalars['String'];
}>;


export type EditGenderForUserMutation = { __typename?: 'Mutation', editGender?: { __typename?: 'Profile', id: string, gender?: string | null | undefined } | null | undefined };

export type EditInterestsForUserMutationVariables = Exact<{
  userId: Scalars['ID'];
  interests: Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>;
}>;


export type EditInterestsForUserMutation = { __typename?: 'Mutation', editInterests?: { __typename?: 'Profile', id: string, interests: Array<string | null | undefined> } | null | undefined };

export type EditJobForUserMutationVariables = Exact<{
  userId: Scalars['ID'];
  jobId: Scalars['ID'];
  jobInput: JobInput;
}>;


export type EditJobForUserMutation = { __typename?: 'Mutation', editJob?: { __typename?: 'Job', id: string, company?: string | null | undefined, position?: string | null | undefined, city?: string | null | undefined, description?: string | null | undefined, isCurrentWork?: boolean | null | undefined, mode?: PrivacyType | null | undefined, dateRange?: { __typename?: 'DateRange', fromDate?: Date | null | undefined, toDate?: Date | null | undefined } | null | undefined } | null | undefined };

export type EditPhoneForUserMutationVariables = Exact<{
  userId: Scalars['ID'];
  phoneInput: PhoneInput;
}>;


export type EditPhoneForUserMutation = { __typename?: 'Mutation', editPhone?: { __typename?: 'Profile', id: string, phoneNumber?: { __typename?: 'PhoneNumber', phone?: string | null | undefined, mode?: PrivacyType | null | undefined } | null | undefined } | null | undefined };

export type FollowUserMutationVariables = Exact<{
  userId: Scalars['ID'];
  followedId: Scalars['ID'];
}>;


export type FollowUserMutation = { __typename?: 'Mutation', follow?: { __typename?: 'User', id: string } | null | undefined };

export type GetEducationForUserQueryVariables = Exact<{
  userId: Scalars['ID'];
  educationId: Scalars['ID'];
}>;


export type GetEducationForUserQuery = { __typename?: 'Query', getEducation?: { __typename?: 'Education', id: string, school?: string | null | undefined, isGraduate?: boolean | null | undefined, description?: string | null | undefined, concentrations: Array<string | null | undefined>, degree?: string | null | undefined, mode?: PrivacyType | null | undefined, dateRange?: { __typename?: 'DateRange', fromDate?: Date | null | undefined, toDate?: Date | null | undefined } | null | undefined } | null | undefined };

export type GetEducationsForUserQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetEducationsForUserQuery = { __typename?: 'Query', getEducations?: Array<{ __typename?: 'Education', id: string, school?: string | null | undefined, isGraduate?: boolean | null | undefined, description?: string | null | undefined, concentrations: Array<string | null | undefined>, degree?: string | null | undefined, mode?: PrivacyType | null | undefined, dateRange?: { __typename?: 'DateRange', fromDate?: Date | null | undefined, toDate?: Date | null | undefined } | null | undefined } | null | undefined> | null | undefined };

export type GetFollowersForUserQueryVariables = Exact<{
  userId: Scalars['ID'];
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
}>;


export type GetFollowersForUserQuery = { __typename?: 'Query', getFollowers?: { __typename?: 'UserConnection', totalCount?: number | null | undefined, pageInfo: { __typename?: 'PageInfo', hasNextPage?: boolean | null | undefined, hasPreviousPage?: boolean | null | undefined, startCursor?: string | null | undefined, endCursor?: string | null | undefined }, edges: Array<{ __typename?: 'UserEdge', cursor: string, node: { __typename?: 'User', id: string, firstName?: string | null | undefined, middleName?: string | null | undefined, lastName?: string | null | undefined } }> } | null | undefined };

export type GetFollowingsForUserQueryVariables = Exact<{
  userId: Scalars['ID'];
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
}>;


export type GetFollowingsForUserQuery = { __typename?: 'Query', getFollowings?: { __typename?: 'UserConnection', totalCount?: number | null | undefined, pageInfo: { __typename?: 'PageInfo', hasNextPage?: boolean | null | undefined, hasPreviousPage?: boolean | null | undefined, startCursor?: string | null | undefined, endCursor?: string | null | undefined }, edges: Array<{ __typename?: 'UserEdge', cursor: string, node: { __typename?: 'User', id: string, firstName?: string | null | undefined, middleName?: string | null | undefined, lastName?: string | null | undefined } }> } | null | undefined };

export type GetFriendRequestsForUserQueryVariables = Exact<{
  userId: Scalars['ID'];
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
}>;


export type GetFriendRequestsForUserQuery = { __typename?: 'Query', getFriendRequests?: { __typename?: 'UserConnection', totalCount?: number | null | undefined, pageInfo: { __typename?: 'PageInfo', hasNextPage?: boolean | null | undefined, hasPreviousPage?: boolean | null | undefined, startCursor?: string | null | undefined, endCursor?: string | null | undefined }, edges: Array<{ __typename?: 'UserEdge', cursor: string, node: { __typename?: 'User', id: string, firstName?: string | null | undefined, middleName?: string | null | undefined, lastName?: string | null | undefined } }> } | null | undefined };

export type GetFriendSuggestionsForUserQueryVariables = Exact<{
  userId: Scalars['ID'];
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
}>;


export type GetFriendSuggestionsForUserQuery = { __typename?: 'Query', getFriendSuggestions?: { __typename?: 'UserConnection', totalCount?: number | null | undefined, pageInfo: { __typename?: 'PageInfo', hasNextPage?: boolean | null | undefined, hasPreviousPage?: boolean | null | undefined, startCursor?: string | null | undefined, endCursor?: string | null | undefined }, edges: Array<{ __typename?: 'UserEdge', cursor: string, node: { __typename?: 'User', id: string, firstName?: string | null | undefined, middleName?: string | null | undefined, lastName?: string | null | undefined } }> } | null | undefined };

export type GetFriendsForUserQueryVariables = Exact<{
  userId: Scalars['ID'];
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
}>;


export type GetFriendsForUserQuery = { __typename?: 'Query', getFriends?: { __typename?: 'UserConnection', totalCount?: number | null | undefined, pageInfo: { __typename?: 'PageInfo', hasNextPage?: boolean | null | undefined, hasPreviousPage?: boolean | null | undefined, startCursor?: string | null | undefined, endCursor?: string | null | undefined }, edges: Array<{ __typename?: 'UserEdge', cursor: string, node: { __typename?: 'User', id: string, firstName?: string | null | undefined, middleName?: string | null | undefined, lastName?: string | null | undefined } }> } | null | undefined };

export type GetJobForUserQueryVariables = Exact<{
  userId: Scalars['ID'];
  jobId: Scalars['ID'];
}>;


export type GetJobForUserQuery = { __typename?: 'Query', getJob?: { __typename?: 'Job', id: string, company?: string | null | undefined, position?: string | null | undefined, city?: string | null | undefined, description?: string | null | undefined, isCurrentWork?: boolean | null | undefined, mode?: PrivacyType | null | undefined, dateRange?: { __typename?: 'DateRange', fromDate?: Date | null | undefined, toDate?: Date | null | undefined } | null | undefined } | null | undefined };

export type GetJobsForUserQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetJobsForUserQuery = { __typename?: 'Query', getJobs?: Array<{ __typename?: 'Job', id: string, company?: string | null | undefined, position?: string | null | undefined, city?: string | null | undefined, description?: string | null | undefined, isCurrentWork?: boolean | null | undefined, mode?: PrivacyType | null | undefined, dateRange?: { __typename?: 'DateRange', fromDate?: Date | null | undefined, toDate?: Date | null | undefined } | null | undefined } | null | undefined> | null | undefined };

export type GetMutualFriendsForUsersQueryVariables = Exact<{
  userId: Scalars['ID'];
  otherId: Scalars['ID'];
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
}>;


export type GetMutualFriendsForUsersQuery = { __typename?: 'Query', getMutualFriends?: { __typename?: 'UserConnection', totalCount?: number | null | undefined, pageInfo: { __typename?: 'PageInfo', hasNextPage?: boolean | null | undefined, hasPreviousPage?: boolean | null | undefined, startCursor?: string | null | undefined, endCursor?: string | null | undefined }, edges: Array<{ __typename?: 'UserEdge', cursor: string, node: { __typename?: 'User', id: string, firstName?: string | null | undefined, middleName?: string | null | undefined, lastName?: string | null | undefined } }> } | null | undefined };

export type GetProfileForUserQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetProfileForUserQuery = { __typename?: 'Query', getUserProfile?: { __typename?: 'Profile', id: string, gender?: string | null | undefined, biography?: string | null | undefined, joinedAt?: Date | null | undefined, interests: Array<string | null | undefined>, address?: { __typename?: 'Address', city?: string | null | undefined, region?: string | null | undefined, country?: string | null | undefined, mode?: PrivacyType | null | undefined } | null | undefined, birthday?: { __typename?: 'Birthday', birthdate?: Date | null | undefined, mode?: PrivacyType | null | undefined } | null | undefined, phoneNumber?: { __typename?: 'PhoneNumber', phone?: string | null | undefined, mode?: PrivacyType | null | undefined } | null | undefined, user: { __typename?: 'User', firstName?: string | null | undefined, middleName?: string | null | undefined, lastName?: string | null | undefined } } | null | undefined };

export type GetSentRequestsForUserQueryVariables = Exact<{
  userId: Scalars['ID'];
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
}>;


export type GetSentRequestsForUserQuery = { __typename?: 'Query', getSentRequests?: { __typename?: 'UserConnection', totalCount?: number | null | undefined, pageInfo: { __typename?: 'PageInfo', hasNextPage?: boolean | null | undefined, hasPreviousPage?: boolean | null | undefined, startCursor?: string | null | undefined, endCursor?: string | null | undefined }, edges: Array<{ __typename?: 'UserEdge', cursor: string, node: { __typename?: 'User', id: string, firstName?: string | null | undefined, middleName?: string | null | undefined, lastName?: string | null | undefined } }> } | null | undefined };

export type GetUserFromOktaQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserFromOktaQuery = { __typename?: 'Query', getCurrentUser?: { __typename?: 'User', id: string, username?: string | null | undefined, email?: string | null | undefined, firstName?: string | null | undefined, middleName?: string | null | undefined, lastName?: string | null | undefined } | null | undefined };

export type RemoveEducationForUserMutationVariables = Exact<{
  userId: Scalars['ID'];
  educationId: Scalars['ID'];
}>;


export type RemoveEducationForUserMutation = { __typename?: 'Mutation', removeEducation?: { __typename?: 'Education', id: string } | null | undefined };

export type RemoveFriendForUserMutationVariables = Exact<{
  userId: Scalars['ID'];
  friendId: Scalars['ID'];
}>;


export type RemoveFriendForUserMutation = { __typename?: 'Mutation', removeFriend?: { __typename?: 'User', id: string } | null | undefined };

export type RemoveJobForUserMutationVariables = Exact<{
  userId: Scalars['ID'];
  jobId: Scalars['ID'];
}>;


export type RemoveJobForUserMutation = { __typename?: 'Mutation', removeJob?: { __typename?: 'Job', id: string, company?: string | null | undefined, position?: string | null | undefined, city?: string | null | undefined, description?: string | null | undefined, mode?: PrivacyType | null | undefined, dateRange?: { __typename?: 'DateRange', fromDate?: Date | null | undefined, toDate?: Date | null | undefined } | null | undefined } | null | undefined };

export type SendFriendRequestForUserMutationVariables = Exact<{
  userId: Scalars['ID'];
  targetId: Scalars['ID'];
}>;


export type SendFriendRequestForUserMutation = { __typename?: 'Mutation', sendFriendRequest?: { __typename?: 'User', id: string } | null | undefined };

export type UnfollowUserMutationVariables = Exact<{
  userId: Scalars['ID'];
  followedId: Scalars['ID'];
}>;


export type UnfollowUserMutation = { __typename?: 'Mutation', unfollow?: { __typename?: 'User', id: string } | null | undefined };


export const AddEducationForUserDocument = `
    mutation AddEducationForUser($userId: ID!, $educationInput: EducationInput!) {
  addEducation(userId: $userId, educationInput: $educationInput) {
    id
    school
    isGraduate
    description
    concentrations
    degree
    dateRange {
      fromDate
      toDate
    }
    mode
  }
}
    `;
export const AddJobForUserDocument = `
    mutation AddJobForUser($userId: ID!, $jobInput: JobInput!) {
  addJob(userId: $userId, jobInput: $jobInput) {
    id
    company
    position
    city
    description
    dateRange {
      fromDate
      toDate
    }
    mode
  }
}
    `;
export const CancelSentRequestForUserDocument = `
    mutation CancelSentRequestForUser($userId: ID!, $targetId: ID!) {
  cancelSentRequest(userId: $userId, targetId: $targetId) {
    id
  }
}
    `;
export const ChangeEmailForUserDocument = `
    mutation ChangeEmailForUser($userId: ID!, $email: String!) {
  changeEmail(userId: $userId, email: $email) {
    id
    email
  }
}
    `;
export const ChangeNameForUserDocument = `
    mutation ChangeNameForUser($userId: ID!, $nameInput: NameInput!) {
  changeName(userId: $userId, nameInput: $nameInput) {
    id
    firstName
    middleName
    lastName
  }
}
    `;
export const ChangePasswordForUserDocument = `
    mutation ChangePasswordForUser($userId: ID!, $passwordInput: PasswordInput!) {
  changePassword(userId: $userId, passwordInput: $passwordInput) {
    id
  }
}
    `;
export const CheckFollowingUserDocument = `
    query CheckFollowingUser($userId: ID!, $otherId: ID!) {
  checkFollowing(userId: $userId, otherId: $otherId)
}
    `;
export const CheckFriendUserDocument = `
    query CheckFriendUser($userId: ID!, $otherId: ID!) {
  checkFriend(userId: $userId, otherId: $otherId)
}
    `;
export const CheckRequestFriendUserDocument = `
    query CheckRequestFriendUser($userId: ID!, $otherId: ID!) {
  checkRequestFriend(userId: $userId, otherId: $otherId)
}
    `;
export const ConfirmFriendRequestForUserDocument = `
    mutation ConfirmFriendRequestForUser($userId: ID!, $targetId: ID!) {
  confirmFriendRequest(userId: $userId, targetId: $targetId) {
    id
  }
}
    `;
export const CountFriendsForUserDocument = `
    query CountFriendsForUser($userId: ID!) {
  countFriends(userId: $userId)
}
    `;
export const CountMutualFriendsForUsersDocument = `
    query CountMutualFriendsForUsers($userId: ID!, $otherId: ID!) {
  countMutualFriends(userId: $userId, otherId: $otherId)
}
    `;
export const DeactivateUserDocument = `
    mutation DeactivateUser($userId: ID!) {
  deactivate(userId: $userId) {
    id
  }
}
    `;
export const DeclineFriendRequestForUserDocument = `
    mutation DeclineFriendRequestForUser($userId: ID!, $targetId: ID!) {
  declineFriendRequest(userId: $userId, targetId: $targetId) {
    id
  }
}
    `;
export const EditAddressForUserDocument = `
    mutation EditAddressForUser($userId: ID!, $addressInput: AddressInput!) {
  editAddress(userId: $userId, addressInput: $addressInput) {
    id
    address {
      city
      region
      country
      mode
    }
  }
}
    `;
export const EditBioForUserDocument = `
    mutation EditBioForUser($userId: ID!, $biography: String!) {
  editBio(userId: $userId, biography: $biography) {
    id
    biography
  }
}
    `;
export const EditBirthdayForUserDocument = `
    mutation EditBirthdayForUser($userId: ID!, $birthdayInput: BirthdayInput!) {
  editBirthday(userId: $userId, birthdayInput: $birthdayInput) {
    id
    birthday {
      birthdate
      mode
    }
  }
}
    `;
export const EditEducationForUserDocument = `
    mutation EditEducationForUser($userId: ID!, $educationId: ID!, $educationInput: EducationInput!) {
  editEducation(
    userId: $userId
    educationId: $educationId
    educationInput: $educationInput
  ) {
    id
    school
    isGraduate
    description
    concentrations
    degree
    dateRange {
      fromDate
      toDate
    }
    mode
  }
}
    `;
export const EditGenderForUserDocument = `
    mutation EditGenderForUser($userId: ID!, $gender: String!) {
  editGender(userId: $userId, gender: $gender) {
    id
    gender
  }
}
    `;
export const EditInterestsForUserDocument = `
    mutation EditInterestsForUser($userId: ID!, $interests: [String]!) {
  editInterests(userId: $userId, interests: $interests) {
    id
    interests
  }
}
    `;
export const EditJobForUserDocument = `
    mutation EditJobForUser($userId: ID!, $jobId: ID!, $jobInput: JobInput!) {
  editJob(userId: $userId, jobId: $jobId, jobInput: $jobInput) {
    id
    company
    position
    city
    description
    isCurrentWork
    dateRange {
      fromDate
      toDate
    }
    mode
  }
}
    `;
export const EditPhoneForUserDocument = `
    mutation EditPhoneForUser($userId: ID!, $phoneInput: PhoneInput!) {
  editPhone(userId: $userId, phoneInput: $phoneInput) {
    id
    phoneNumber {
      phone
      mode
    }
  }
}
    `;
export const FollowUserDocument = `
    mutation FollowUser($userId: ID!, $followedId: ID!) {
  follow(userId: $userId, followedId: $followedId) {
    id
  }
}
    `;
export const GetEducationForUserDocument = `
    query GetEducationForUser($userId: ID!, $educationId: ID!) {
  getEducation(userId: $userId, educationId: $educationId) {
    id
    school
    isGraduate
    description
    concentrations
    degree
    dateRange {
      fromDate
      toDate
    }
    mode
  }
}
    `;
export const GetEducationsForUserDocument = `
    query GetEducationsForUser($userId: ID!) {
  getEducations(userId: $userId) {
    id
    school
    isGraduate
    description
    concentrations
    degree
    dateRange {
      fromDate
      toDate
    }
    mode
  }
}
    `;
export const GetFollowersForUserDocument = `
    query GetFollowersForUser($userId: ID!, $first: Int, $last: Int, $before: String, $after: String) {
  getFollowers(
    userId: $userId
    first: $first
    last: $last
    before: $before
    after: $after
  ) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        firstName
        middleName
        lastName
      }
      cursor
    }
  }
}
    `;
export const GetFollowingsForUserDocument = `
    query GetFollowingsForUser($userId: ID!, $first: Int, $last: Int, $before: String, $after: String) {
  getFollowings(
    userId: $userId
    first: $first
    last: $last
    before: $before
    after: $after
  ) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        firstName
        middleName
        lastName
      }
      cursor
    }
  }
}
    `;
export const GetFriendRequestsForUserDocument = `
    query GetFriendRequestsForUser($userId: ID!, $first: Int, $last: Int, $before: String, $after: String) {
  getFriendRequests(
    userId: $userId
    first: $first
    last: $last
    before: $before
    after: $after
  ) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        firstName
        middleName
        lastName
      }
      cursor
    }
  }
}
    `;
export const GetFriendSuggestionsForUserDocument = `
    query GetFriendSuggestionsForUser($userId: ID!, $first: Int, $last: Int, $before: String, $after: String) {
  getFriendSuggestions(
    userId: $userId
    first: $first
    last: $last
    before: $before
    after: $after
  ) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        firstName
        middleName
        lastName
      }
      cursor
    }
  }
}
    `;
export const GetFriendsForUserDocument = `
    query GetFriendsForUser($userId: ID!, $first: Int, $last: Int, $before: String, $after: String) {
  getFriends(
    userId: $userId
    first: $first
    last: $last
    before: $before
    after: $after
  ) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        firstName
        middleName
        lastName
      }
      cursor
    }
  }
}
    `;
export const GetJobForUserDocument = `
    query GetJobForUser($userId: ID!, $jobId: ID!) {
  getJob(userId: $userId, jobId: $jobId) {
    id
    company
    position
    city
    description
    isCurrentWork
    dateRange {
      fromDate
      toDate
    }
    mode
  }
}
    `;
export const GetJobsForUserDocument = `
    query GetJobsForUser($userId: ID!) {
  getJobs(userId: $userId) {
    id
    company
    position
    city
    description
    isCurrentWork
    dateRange {
      fromDate
      toDate
    }
    mode
  }
}
    `;
export const GetMutualFriendsForUsersDocument = `
    query GetMutualFriendsForUsers($userId: ID!, $otherId: ID!, $first: Int, $last: Int, $before: String, $after: String) {
  getMutualFriends(
    userId: $userId
    otherId: $otherId
    first: $first
    last: $last
    before: $before
    after: $after
  ) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        firstName
        middleName
        lastName
      }
      cursor
    }
  }
}
    `;
export const GetProfileForUserDocument = `
    query GetProfileForUser($userId: ID!) {
  getUserProfile(userId: $userId) {
    id
    address {
      city
      region
      country
      mode
    }
    birthday {
      birthdate
      mode
    }
    phoneNumber {
      phone
      mode
    }
    gender
    biography
    joinedAt
    interests
    user {
      firstName
      middleName
      lastName
    }
  }
}
    `;
export const GetSentRequestsForUserDocument = `
    query GetSentRequestsForUser($userId: ID!, $first: Int, $last: Int, $before: String, $after: String) {
  getSentRequests(
    userId: $userId
    first: $first
    last: $last
    before: $before
    after: $after
  ) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        firstName
        middleName
        lastName
      }
      cursor
    }
  }
}
    `;
export const GetUserFromOktaDocument = `
    query GetUserFromOkta {
  getCurrentUser {
    id
    username
    email
    firstName
    middleName
    lastName
  }
}
    `;
export const RemoveEducationForUserDocument = `
    mutation RemoveEducationForUser($userId: ID!, $educationId: ID!) {
  removeEducation(userId: $userId, educationId: $educationId) {
    id
  }
}
    `;
export const RemoveFriendForUserDocument = `
    mutation RemoveFriendForUser($userId: ID!, $friendId: ID!) {
  removeFriend(userId: $userId, friendId: $friendId) {
    id
  }
}
    `;
export const RemoveJobForUserDocument = `
    mutation RemoveJobForUser($userId: ID!, $jobId: ID!) {
  removeJob(userId: $userId, jobId: $jobId) {
    id
    company
    position
    city
    description
    dateRange {
      fromDate
      toDate
    }
    mode
  }
}
    `;
export const SendFriendRequestForUserDocument = `
    mutation SendFriendRequestForUser($userId: ID!, $targetId: ID!) {
  sendFriendRequest(userId: $userId, targetId: $targetId) {
    id
  }
}
    `;
export const UnfollowUserDocument = `
    mutation UnfollowUser($userId: ID!, $followedId: ID!) {
  unfollow(userId: $userId, followedId: $followedId) {
    id
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    AddEducationForUser: build.mutation<AddEducationForUserMutation, AddEducationForUserMutationVariables>({
      query: (variables) => ({ document: AddEducationForUserDocument, variables })
    }),
    AddJobForUser: build.mutation<AddJobForUserMutation, AddJobForUserMutationVariables>({
      query: (variables) => ({ document: AddJobForUserDocument, variables })
    }),
    CancelSentRequestForUser: build.mutation<CancelSentRequestForUserMutation, CancelSentRequestForUserMutationVariables>({
      query: (variables) => ({ document: CancelSentRequestForUserDocument, variables })
    }),
    ChangeEmailForUser: build.mutation<ChangeEmailForUserMutation, ChangeEmailForUserMutationVariables>({
      query: (variables) => ({ document: ChangeEmailForUserDocument, variables })
    }),
    ChangeNameForUser: build.mutation<ChangeNameForUserMutation, ChangeNameForUserMutationVariables>({
      query: (variables) => ({ document: ChangeNameForUserDocument, variables })
    }),
    ChangePasswordForUser: build.mutation<ChangePasswordForUserMutation, ChangePasswordForUserMutationVariables>({
      query: (variables) => ({ document: ChangePasswordForUserDocument, variables })
    }),
    CheckFollowingUser: build.query<CheckFollowingUserQuery, CheckFollowingUserQueryVariables>({
      query: (variables) => ({ document: CheckFollowingUserDocument, variables })
    }),
    CheckFriendUser: build.query<CheckFriendUserQuery, CheckFriendUserQueryVariables>({
      query: (variables) => ({ document: CheckFriendUserDocument, variables })
    }),
    CheckRequestFriendUser: build.query<CheckRequestFriendUserQuery, CheckRequestFriendUserQueryVariables>({
      query: (variables) => ({ document: CheckRequestFriendUserDocument, variables })
    }),
    ConfirmFriendRequestForUser: build.mutation<ConfirmFriendRequestForUserMutation, ConfirmFriendRequestForUserMutationVariables>({
      query: (variables) => ({ document: ConfirmFriendRequestForUserDocument, variables })
    }),
    CountFriendsForUser: build.query<CountFriendsForUserQuery, CountFriendsForUserQueryVariables>({
      query: (variables) => ({ document: CountFriendsForUserDocument, variables })
    }),
    CountMutualFriendsForUsers: build.query<CountMutualFriendsForUsersQuery, CountMutualFriendsForUsersQueryVariables>({
      query: (variables) => ({ document: CountMutualFriendsForUsersDocument, variables })
    }),
    DeactivateUser: build.mutation<DeactivateUserMutation, DeactivateUserMutationVariables>({
      query: (variables) => ({ document: DeactivateUserDocument, variables })
    }),
    DeclineFriendRequestForUser: build.mutation<DeclineFriendRequestForUserMutation, DeclineFriendRequestForUserMutationVariables>({
      query: (variables) => ({ document: DeclineFriendRequestForUserDocument, variables })
    }),
    EditAddressForUser: build.mutation<EditAddressForUserMutation, EditAddressForUserMutationVariables>({
      query: (variables) => ({ document: EditAddressForUserDocument, variables })
    }),
    EditBioForUser: build.mutation<EditBioForUserMutation, EditBioForUserMutationVariables>({
      query: (variables) => ({ document: EditBioForUserDocument, variables })
    }),
    EditBirthdayForUser: build.mutation<EditBirthdayForUserMutation, EditBirthdayForUserMutationVariables>({
      query: (variables) => ({ document: EditBirthdayForUserDocument, variables })
    }),
    EditEducationForUser: build.mutation<EditEducationForUserMutation, EditEducationForUserMutationVariables>({
      query: (variables) => ({ document: EditEducationForUserDocument, variables })
    }),
    EditGenderForUser: build.mutation<EditGenderForUserMutation, EditGenderForUserMutationVariables>({
      query: (variables) => ({ document: EditGenderForUserDocument, variables })
    }),
    EditInterestsForUser: build.mutation<EditInterestsForUserMutation, EditInterestsForUserMutationVariables>({
      query: (variables) => ({ document: EditInterestsForUserDocument, variables })
    }),
    EditJobForUser: build.mutation<EditJobForUserMutation, EditJobForUserMutationVariables>({
      query: (variables) => ({ document: EditJobForUserDocument, variables })
    }),
    EditPhoneForUser: build.mutation<EditPhoneForUserMutation, EditPhoneForUserMutationVariables>({
      query: (variables) => ({ document: EditPhoneForUserDocument, variables })
    }),
    FollowUser: build.mutation<FollowUserMutation, FollowUserMutationVariables>({
      query: (variables) => ({ document: FollowUserDocument, variables })
    }),
    GetEducationForUser: build.query<GetEducationForUserQuery, GetEducationForUserQueryVariables>({
      query: (variables) => ({ document: GetEducationForUserDocument, variables })
    }),
    GetEducationsForUser: build.query<GetEducationsForUserQuery, GetEducationsForUserQueryVariables>({
      query: (variables) => ({ document: GetEducationsForUserDocument, variables })
    }),
    GetFollowersForUser: build.query<GetFollowersForUserQuery, GetFollowersForUserQueryVariables>({
      query: (variables) => ({ document: GetFollowersForUserDocument, variables })
    }),
    GetFollowingsForUser: build.query<GetFollowingsForUserQuery, GetFollowingsForUserQueryVariables>({
      query: (variables) => ({ document: GetFollowingsForUserDocument, variables })
    }),
    GetFriendRequestsForUser: build.query<GetFriendRequestsForUserQuery, GetFriendRequestsForUserQueryVariables>({
      query: (variables) => ({ document: GetFriendRequestsForUserDocument, variables })
    }),
    GetFriendSuggestionsForUser: build.query<GetFriendSuggestionsForUserQuery, GetFriendSuggestionsForUserQueryVariables>({
      query: (variables) => ({ document: GetFriendSuggestionsForUserDocument, variables })
    }),
    GetFriendsForUser: build.query<GetFriendsForUserQuery, GetFriendsForUserQueryVariables>({
      query: (variables) => ({ document: GetFriendsForUserDocument, variables })
    }),
    GetJobForUser: build.query<GetJobForUserQuery, GetJobForUserQueryVariables>({
      query: (variables) => ({ document: GetJobForUserDocument, variables })
    }),
    GetJobsForUser: build.query<GetJobsForUserQuery, GetJobsForUserQueryVariables>({
      query: (variables) => ({ document: GetJobsForUserDocument, variables })
    }),
    GetMutualFriendsForUsers: build.query<GetMutualFriendsForUsersQuery, GetMutualFriendsForUsersQueryVariables>({
      query: (variables) => ({ document: GetMutualFriendsForUsersDocument, variables })
    }),
    GetProfileForUser: build.query<GetProfileForUserQuery, GetProfileForUserQueryVariables>({
      query: (variables) => ({ document: GetProfileForUserDocument, variables })
    }),
    GetSentRequestsForUser: build.query<GetSentRequestsForUserQuery, GetSentRequestsForUserQueryVariables>({
      query: (variables) => ({ document: GetSentRequestsForUserDocument, variables })
    }),
    GetUserFromOkta: build.query<GetUserFromOktaQuery, GetUserFromOktaQueryVariables | void>({
      query: (variables) => ({ document: GetUserFromOktaDocument, variables })
    }),
    RemoveEducationForUser: build.mutation<RemoveEducationForUserMutation, RemoveEducationForUserMutationVariables>({
      query: (variables) => ({ document: RemoveEducationForUserDocument, variables })
    }),
    RemoveFriendForUser: build.mutation<RemoveFriendForUserMutation, RemoveFriendForUserMutationVariables>({
      query: (variables) => ({ document: RemoveFriendForUserDocument, variables })
    }),
    RemoveJobForUser: build.mutation<RemoveJobForUserMutation, RemoveJobForUserMutationVariables>({
      query: (variables) => ({ document: RemoveJobForUserDocument, variables })
    }),
    SendFriendRequestForUser: build.mutation<SendFriendRequestForUserMutation, SendFriendRequestForUserMutationVariables>({
      query: (variables) => ({ document: SendFriendRequestForUserDocument, variables })
    }),
    UnfollowUser: build.mutation<UnfollowUserMutation, UnfollowUserMutationVariables>({
      query: (variables) => ({ document: UnfollowUserDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useAddEducationForUserMutation, useAddJobForUserMutation, useCancelSentRequestForUserMutation, useChangeEmailForUserMutation, useChangeNameForUserMutation, useChangePasswordForUserMutation, useCheckFollowingUserQuery, useLazyCheckFollowingUserQuery, useCheckFriendUserQuery, useLazyCheckFriendUserQuery, useCheckRequestFriendUserQuery, useLazyCheckRequestFriendUserQuery, useConfirmFriendRequestForUserMutation, useCountFriendsForUserQuery, useLazyCountFriendsForUserQuery, useCountMutualFriendsForUsersQuery, useLazyCountMutualFriendsForUsersQuery, useDeactivateUserMutation, useDeclineFriendRequestForUserMutation, useEditAddressForUserMutation, useEditBioForUserMutation, useEditBirthdayForUserMutation, useEditEducationForUserMutation, useEditGenderForUserMutation, useEditInterestsForUserMutation, useEditJobForUserMutation, useEditPhoneForUserMutation, useFollowUserMutation, useGetEducationForUserQuery, useLazyGetEducationForUserQuery, useGetEducationsForUserQuery, useLazyGetEducationsForUserQuery, useGetFollowersForUserQuery, useLazyGetFollowersForUserQuery, useGetFollowingsForUserQuery, useLazyGetFollowingsForUserQuery, useGetFriendRequestsForUserQuery, useLazyGetFriendRequestsForUserQuery, useGetFriendSuggestionsForUserQuery, useLazyGetFriendSuggestionsForUserQuery, useGetFriendsForUserQuery, useLazyGetFriendsForUserQuery, useGetJobForUserQuery, useLazyGetJobForUserQuery, useGetJobsForUserQuery, useLazyGetJobsForUserQuery, useGetMutualFriendsForUsersQuery, useLazyGetMutualFriendsForUsersQuery, useGetProfileForUserQuery, useLazyGetProfileForUserQuery, useGetSentRequestsForUserQuery, useLazyGetSentRequestsForUserQuery, useGetUserFromOktaQuery, useLazyGetUserFromOktaQuery, useRemoveEducationForUserMutation, useRemoveFriendForUserMutation, useRemoveJobForUserMutation, useSendFriendRequestForUserMutation, useUnfollowUserMutation } = injectedRtkApi;

