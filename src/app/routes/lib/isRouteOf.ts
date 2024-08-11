export const isRouteOf = function (pathname: string, route: string, strict: boolean = false, params: string[] = []): boolean {
    const pathnameParts = pathname.split('/');
    const routeParts    = route.split('/');

    let i = 0;
    let p = 0;

    for (; i < pathnameParts.length; i++) {
        if (routeParts[i] === undefined) {
            return false;
        }

        if (routeParts[i][0] === ':') {
            if (pathnameParts[i] === params[p]) {
                p += 1;
                continue;
            }

            return false;
        }

        if (routeParts[i] !== pathnameParts[i]) {
            return false;
        }
    }

    if (strict && (i !== routeParts.length || p !== params.length)) {
        return false;
    }

    return true;
};