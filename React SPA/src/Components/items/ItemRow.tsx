import React, { FC } from 'react';
import { Link, matchPath, useLocation, useRouteMatch } from 'react-router-dom';
import { guid } from '../../models/guid';
import { useUserStore } from '../common/UserStoreContext';
import { ItemPageParams } from './ItemPage';
import { ItemHeader } from './models';

type ItemRowProps = {
	item: ItemHeader;
	onDeleteItem: (id: guid) => void;
};

const ItemRow: FC<ItemRowProps> = ({ item, onDeleteItem }) => {
	const { readonly } = useUserStore();

	// The `path` lets us build <Route> paths that are
	// relative to the parent route, while the `url` lets
	// us build relative links.
	const { url } = useRouteMatch();
	const { pathname } = useLocation();

	const match = matchPath<ItemPageParams>(pathname, {
		path: '/items/:id',
		exact: true,
		strict: false,
	});
	const id = match ? match.params.id : null;

	function handleDeleteItem(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: guid): void {
		e.preventDefault();
		onDeleteItem(id);
	}

	return (
		<Link
			key={item.id}
			className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
				id === item.id ? 'active' : ''
			}`}
			to={`${url}/${item.id}`}>
			{item.name}

			<span className="badge badge-light">{item.numTags}</span>

			{!readonly && id === item.id && (
				<button className="btn btn-outline-danger" onClick={(e): void => handleDeleteItem(e, item.id)}>
					Delete
				</button>
			)}
		</Link>
	);
};

export default ItemRow;
