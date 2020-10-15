import React, { FC, useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { guid } from '../../models/guid';
import ObjectDump from '../common/ObjectDump';
import { ApiResult, useGet } from '../helpers/useHttp';
import { Item } from './ItemsPage';

export type ItemPageProps = {
}
export type ItemPageParams = {
	id: string,
}

export const ItemPage: FC<ItemPageProps> = () => {
	let { url, path } = useRouteMatch();
	console.log(url, path);

	let { id } = useParams<ItemPageParams>();
	const { isValid, item, loading } = useItem(id);

	if (!isValid) {
		return <p>Invalid item</p>;
	}

	return (
		<>
			{loading && <p>Loading...</p>}

			<span>Item Page ID: {id}</span>

			<ObjectDump value={item} />
		</>
	);
}

function useItem(id: guid): ApiResult<Item> {
	const url = `https://localhost:44358/Items/${id}`;

	const result = useGet<Item>(url);
	return result;
}
