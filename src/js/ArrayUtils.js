export function ArrayIncludes(array, input) {
    return (
      array.includes(input.toLowerCase()) || array.includes(input.toUpperCase())
    );
}