export const jsonParse = function <T> (str: string): T | null {
    try {
        return JSON.parse(str);
    } catch (e) {
        return null;
    }
};