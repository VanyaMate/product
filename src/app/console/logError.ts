export const logError = function (info: string = '') {
    return function (error: unknown): void {
        console.group(`%cError${ info ? `: ${ info }`
                                      : '' }`, `display: block; width: 100%; padding: 5px; border: 1px solid #fa5555; background: rgba(255, 50, 50, .5); color: rgba(255, 200, 200);`);

        console.log(`Response:`, error);
        console.groupEnd();
    };
};