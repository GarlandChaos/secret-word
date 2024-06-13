export function arrayIncludes(array, input) {
    return (
      array.includes(input.toLowerCase()) || array.includes(input.toUpperCase())
    );
}