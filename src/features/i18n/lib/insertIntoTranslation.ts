export const insertIntoTranslation = function (translation: string, data: Record<string, string>) {
    const keys = Object.keys(data);

    keys.forEach((key) => {
        const regexp = new RegExp(`{{${key}}}`);
        if (regexp.test(translation)) {
            translation = translation.replace(regexp, data[key]);
        }
    });

    return translation;
};