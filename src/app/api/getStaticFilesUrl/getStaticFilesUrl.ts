export const getStaticFilesUrl = function (path: string): string {
    return new URL(path, __STATIC__).toString();
};