export const isRouteOf = function (pathname: string, route: string): boolean {
    const pathnameParts = pathname.split('/');
    const routeParts    = route.split('/');

    for (let i = 0; i < routeParts.length; i++) {
        if (routeParts[i][0] === ':') {
            continue;
        }

        if (routeParts[i] !== pathnameParts[i]) {
            return false;
        }
    }

    return true;
};