export const classesContains = function (elementClass: string, ...classes: string[]): boolean {
    const elementClasses = elementClass.split(' ');
    return classes.every((_class) => elementClasses.includes(_class));
};