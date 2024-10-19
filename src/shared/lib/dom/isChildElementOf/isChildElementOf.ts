const MAX_STEPS = 100;

export const isChildElementOf = function (parentElement: HTMLElement, childElement: HTMLElement): boolean {
    for (let i = 0; i < MAX_STEPS; i++) {
        if (parentElement === childElement.parentElement) {
            return true;
        }

        childElement = childElement.parentElement;

        if (childElement === null) {
            return false;
        }
    }

    return false;
};