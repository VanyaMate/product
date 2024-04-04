export const findBodyParentElement = function (element: HTMLElement): HTMLElement {
    let parentElement: HTMLElement = element;
    let iterations: number         = 0;
    while (parentElement.parentElement !== null && parentElement.parentElement.tagName !== 'BODY' && iterations <= 100) {
        parentElement = parentElement.parentElement;
        iterations += 1;
    }
    return parentElement;
};