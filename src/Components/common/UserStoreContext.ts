import React, { useContext } from 'react';

export type UserStore = {
	readonly: boolean;
	setReadonly: (value: boolean) => void;
};

export const UserStoreDefault: UserStore = {
	readonly: true,
	setReadonly: (value: boolean) => {},
};

const UserStoreContext = React.createContext<UserStore>(UserStoreDefault);
UserStoreContext.displayName = 'UserStoreContext displayName';

export default UserStoreContext;
export const useUserStore = (): UserStore => useContext(UserStoreContext);
