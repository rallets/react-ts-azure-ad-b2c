import { AuthError } from 'msal';
import React, { FC } from 'react';

export declare type LoginFunction = () => void;

export interface UnauthenticatedProps {
	error: AuthError | null;
	login: LoginFunction;
}

const Unauthenticated: FC<UnauthenticatedProps> = ({ error, login }) => {
	return (
		<div>
			{error && (
				<p>
					<span>An error occurred during authentication, please try again!</span>
				</p>
			)}
			<p>
				<span>Hey stranger, you look new!</span>
				<button onClick={login}>Login</button>
			</p>
		</div>
	);
};

export default Unauthenticated;
