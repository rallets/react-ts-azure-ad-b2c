import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { get, HttpResponse } from './http';

export type ApiResult<T> = {
	loading: boolean,
	isValid: boolean,
	item: T | null,
}

export function useGet<T>(url: string): ApiResult<T> {
	const [result, setResult] = React.useState<T | null>(null);
	const [isValid, setIsValid] = React.useState<boolean>(true);
	const [loading, setLoading] = React.useState(false);

	useEffect(() => {
		const abortController = new AbortController();

		const fetchData = async () => {
			setLoading(true);

			let response: HttpResponse<T>;
			try {
				response = await get<T>(
					url, {
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

		return function cancel() {
			abortController.abort();
		}
	}, [url]);

	return { item: result, loading, isValid: isValid };
}
