export function deepCopy(arr) {
    try {
        return JSON.parse(JSON.stringify(arr));
    } catch (error) {
        return arr;
    }
}