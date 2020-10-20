import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { get, del, HttpResponse, put, post } from './http';

export type ApiResult<T> = {
	loading: boolean;
	isValid: boolean;
	payload: T | null;
};

export function useGet<T>(url: string): [ApiResult<T>, () => void] {
	const [refresh, setRefresh] = React.useState<{}>({});
	const [result, setResult] = React.useState<T | null>(null);
	const [isValid, setIsValid] = React.useState<boolean>(true);
	const [loading, setLoading] = React.useState(false);

	const doRefresh = (): void => {
		setRefresh({});
	};

	useEffect(() => {
		const abortController = new AbortController();

		const fetchData = async (): Promise<void> => {
			setLoading(true);

			let response: HttpResponse<T>;
			try {
				response = await get<T>(url, {
					headers: {
						'content-type': 'application/json',
					},
					signal: abortController.signal,
				});
				setResult(response.parsedBody || null);
				setIsValid(true);
				// setLoading(false);
			} catch (e) {
				setResult(null);
				setIsValid(false);
				// setLoading(false);
				console.log(e);
				toast.error(e.message);
			} finally {
				setLoading(false);
			}
		};
		fetchData();

		return function cancel(): void {
			abortController.abort();
		};
	}, [url, refresh]);

	return [{ payload: result, loading, isValid: isValid }, doRefresh];
}

export async function deleteAsync<T>(url: string): Promise<T | null> {
	let result: T | null = null;
	let response: HttpResponse<T>;
	try {
		response = await del<T>(url, {
			headers: {
				'content-type': 'application/json',
			},
		});
		result = response.parsedBody || null;
	} catch (e) {
		result = null;
		console.log(e);
		toast.error(e.message);
	}

	return result;
}

export async function putAsync<TRequest, TResponse>(url: string, body: TRequest): Promise<TResponse | null> {
	let result: TResponse | null = null;
	let response: HttpResponse<TResponse>;
	try {
		response = await put<TResponse>(url, body, {
			headers: {
				'content-type': 'application/json',
			},
		});
		result = response.parsedBody || null;
	} catch (e) {
		result = null;
		console.log(e);
		toast.error(e.message);
	}

	return result;
}

export async function postAsync<TRequest, TResponse>(url: string, body: TRequest): Promise<TResponse | null> {
	let result: TResponse | null = null;
	let response: HttpResponse<TResponse>;
	try {
		response = await post<TResponse>(url, body, {
			headers: {
				'content-type': 'application/json',
			},
		});
		result = response.parsedBody || null;
	} catch (e) {
		result = null;
		console.log(e);
		toast.error(e.message);
	}

	return result;
}
