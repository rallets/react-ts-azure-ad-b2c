export interface HttpResponse<T> extends Response {
	parsedBody?: T;
}

export async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
	const response: HttpResponse<T> = await fetch(request);

	try {
		// may error if there is no body
		response.parsedBody = await response.json();
	} catch (ex) {
		// nop
	}

	if (!response.ok) {
		const e = response.statusText || (response.parsedBody as any)?.title;
		throw new Error(e);
	}
	return response;
}

export async function get<T>(path: string, args: RequestInit = {}): Promise<HttpResponse<T>> {
	args.method = args.method || 'get';
	return await http<T>(new Request(path, args));
}

export async function post<T>(path: string, body: any, args: RequestInit = {}): Promise<HttpResponse<T>> {
	args.method = args.method || 'post';
	args.body = args.body || JSON.stringify(body);
	return await http<T>(new Request(path, args));
}

export async function put<T>(path: string, body: any, args: RequestInit = {}): Promise<HttpResponse<T>> {
	args.method = args.method || 'put';
	args.body = args.body || JSON.stringify(body);
	return await http<T>(new Request(path, args));
}

export async function del<T>(path: string, args: RequestInit = {}): Promise<HttpResponse<T>> {
	args.method = args.method || 'delete';
	return await http<T>(new Request(path, args));
}
