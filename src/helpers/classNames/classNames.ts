export type ClassNamesMods = Record<string, boolean | string>;

export const classNames = function (mainClass: string, mods: ClassNamesMods, additional: string[]): string {
    return [
        mainClass,
        ...additional,
        ...Object.entries(mods)
            .filter(([ _, value ]) => value)
            .map(([ className ]) => className),
    ]
        .join(' ');
};