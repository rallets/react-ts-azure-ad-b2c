import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export type NotFoundPageProps = {
}

export const NotFoundPage: FC<NotFoundPageProps> = () => {
	return (
		<div>
			<h2>Page Not Found</h2>
			<p>
				<Link to="/">Back to Home</Link>
			</p>
		</div>
	);
}
