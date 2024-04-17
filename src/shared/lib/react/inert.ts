export const inert = function (state: boolean) {
    return { inert: state ? '' : undefined };
};