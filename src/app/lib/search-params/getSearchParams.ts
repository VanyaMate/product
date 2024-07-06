export const getSearchParams = function (options: Record<string, any>): string {
    const convertedOptions: Record<string, string> = {};

    Object.entries(options).forEach(([ key, value ]) => {
        convertedOptions[key] = value;
    });

    return new URLSearchParams(convertedOptions).toString();
};