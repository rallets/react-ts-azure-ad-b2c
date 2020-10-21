import { guid } from '../../models/guid';
import { environment } from '../common/env';
import { ApiResult, deleteAsync, postAsync, putAsync, useGet } from '../helpers/useHttp';
import { ItemEditData } from './ItemEditForm';
import { EItemSearchType, Item, ItemHeader, ItemsSearchRequest, ValidTextRequest } from './models';

export function useGetItems(): [ApiResult<ItemHeader[]>, () => void] {
	const url = `${environment.apiBaseUrl}/Items/`;

	const result = useGet<ItemHeader[]>(url);
	return result;
}

export async function deleteItem(id: guid): Promise<boolean> {
	const url = `${environment.apiBaseUrl}/Items/${id}`;

	const result = await deleteAsync<boolean>(url);
	return result || false;
}

export function useItem(id: guid): [ApiResult<Item>, () => void] {
	const url = `${environment.apiBaseUrl}/Items/${id}`;

	const result = useGet<Item>(url);
	return result;
}

export async function editItem(id: guid, item: ItemEditData): Promise<boolean> {
	const url = `${environment.apiBaseUrl}/Items/${id}`;

	const result = await putAsync<ItemEditData, boolean>(url, item);
	return result || false;
}

export async function createItem(item: ItemEditData): Promise<boolean> {
	const url = `${environment.apiBaseUrl}/Items/`;

	const result = await postAsync<ItemEditData, boolean>(url, item);
	return result || false;
}

export async function isTextValid(text: string): Promise<boolean> {
	const url = `${environment.apiBaseUrl}/Items/valid-text`;

	const result = await postAsync<ValidTextRequest, boolean>(url, { text });
	return result || false;
}

export async function searchItems(type: EItemSearchType, text: string): Promise<ItemHeader[] | null> {
	const url = `${environment.apiBaseUrl}/Items/search`;

	const result = await postAsync<ItemsSearchRequest, ItemHeader[]>(url, { type: +type, text });
	return result;
}
