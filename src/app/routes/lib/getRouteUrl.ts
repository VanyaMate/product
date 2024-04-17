export const getRouteUrl = function (url: string, params?: Record<string, string>): string {
    return params ? Object.entries(params).reduce((acc, [ key, value ]) => {
        return acc.replace(`:${ key }`, value);
    }, url) : url;
};