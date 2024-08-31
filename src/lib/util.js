/**
 * Debounce a function.
 * @param {Function} fn - The function to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {Function} The debounced function.
 */
export default function debounce(fn, delay) {
    let timeout;
    return function() {
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
    };
}