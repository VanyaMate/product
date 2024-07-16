export type RequestXhrMethods = 'POST' | 'GET' | 'PATCH' | 'DELETE' | 'PUT';

export type RequestXhrParams = {
    method: RequestXhrMethods;
    isJson?: boolean;
    body?: XMLHttpRequestBodyInit;
    headers?: Record<string, string>;
    onUploadProgress?: (progress: number) => void;
}

export type RequestXhrInterceptor = (url: string, params: RequestXhrParams) => Promise<[ string, RequestXhrParams ]>;
export type ResponseXhrInterceptor = (xml: XMLHttpRequest) => Promise<XMLHttpRequest>;
export type RequestXhr = (url: string, params: RequestXhrParams) => Promise<XMLHttpRequest>;

export const createXhrWithInterceptors = function (
    requestInterceptors: RequestXhrInterceptor[],
    responseInterceptors: ResponseXhrInterceptor[],
): RequestXhr {
    return (url: string, params: RequestXhrParams) =>
        new Promise<XMLHttpRequest>((resolve, reject) => {
            (async () => {
                try {
                    for (const interceptor of requestInterceptors) {
                        [ url, params ] = await interceptor(url, params);
                    }

                    let xhr = new XMLHttpRequest();
                    xhr.open(params.method, url);

                    for (const key in params.headers) {
                        xhr.setRequestHeader(key, params.headers[key]);
                    }

                    xhr.addEventListener('readystatechange', async () => {
                        if (xhr.readyState === 4) {
                            for (const interceptor of responseInterceptors) {
                                xhr = await interceptor(xhr);
                            }

                            resolve(xhr);
                        }
                    });

                    if (params.onUploadProgress) {
                        xhr.upload.addEventListener('progress', (event) => {
                            if (event.lengthComputable) {
                                params.onUploadProgress(100 * (event.loaded / event.total));
                            }
                        });
                    }

                    xhr.send(params.body);
                } catch (e) {
                    reject(e);
                }
            })();
        });
};