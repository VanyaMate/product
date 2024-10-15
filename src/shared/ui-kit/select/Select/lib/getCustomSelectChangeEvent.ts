export const getCustomSelectChangeEvent = function (value: string) {
    return new CustomEvent('change', {
        bubbles   : true,
        composed  : true,
        cancelable: false,
        detail    : { value },
    });
};