import React, { FC } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { guid } from '../../models/guid';
import { environment } from '../common/env';
import ObjectDump from '../common/ObjectDump';
import { ApiResult, useGet } from '../helpers/useHttp';
import { Item } from './ItemsPage';

export type ItemPageProps = {};
export type ItemPageParams = {
	id: string;
};

export const ItemPage: FC<ItemPageProps> = () => {
	const { url, path } = useRouteMatch();
	console.log(url, path);

	const { id } = useParams<ItemPageParams>();
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
};

function useItem(id: guid): ApiResult<Item> {
	const url = `${environment.apiBaseUrl}/Items/${id}`;

	const result = useGet<Item>(url);
	return result;
}
