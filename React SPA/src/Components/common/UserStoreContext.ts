import React, { useContext } from 'react';

export type UserStore = {
	readonly: boolean;
	setReadonly: (value: boolean) => void;
};

export const UserStoreDefault: UserStore = {
	readonly: true,
	setReadonly: (_value: boolean) => {},
};

const UserStoreContext = React.createContext<UserStore>(UserStoreDefault);
UserStoreContext.displayName = '<User global configs>'; // customized debugger/extension experience

export default UserStoreContext;
export const useUserStore = (): UserStore => useContext(UserStoreContext);
