/**
 * Converts a JavaScript object into a JSON string. 
 * The maximum nesting depth is at 14'0000. This should be possible.
 * JavaScript has no tail call optimization like C or C++. Therefore recursive functions
 * a in general not the best idea. Java has the same problem. But there is a solution, 
 * which uses Object creation to cache the method calls. But trough the heap allocations
 * it suffers heavy on runtime performance. 
 * 
 * @param {object} obj - The input object to be converted.
 * @returns {string} - The resulting JSON string.
 * @throws {Error} - Throws an error if the maximum number of function calls on the call stack is exceeded.
 * 
 * @deprecated Just for fun. I was bored. Use JSON.stringify ...
 */
export default function jsonStringify(obj) {
    /**
     * Recursive helper function to create the JSON string.
     * @param {object} obj - The input object to be converted.
     * @param {number} calls - The current number of function calls.
     * @returns {{ result: string, calls: number }} - An object containing the resulting JSON string and updated call count.
     */
    function createObjAsStr(obj, calls) {
        if (MAX_CALLS <= calls) {
            throw new Error('too many functions on call stack');
        }
    
        const isArray = Array.isArray(obj);
        let result = isArray ? '[' : '{';
    
        for (const [key, val] of Object.entries(obj)) {
            if (!isArray) {
                result += `"${key}":`;
            }
            
            switch (typeof val) {
                case 'string': 
                    result += `"${val}"`;
                    break;
                case 'undefined':
                case 'boolean':
                case 'number':
                    result +=  val === null || typeof val == 'undefined' ? 'null' : String(val);
                    break;
                case 'object': {
                    const res = createObjAsStr(val, calls++);
                    calls = res.calls;
                    result += res.result;
                    break;
                }
                    
            }

            result += ',';
        }
    
        result = result.substring(0, result.length - 1);
    
        result += isArray ? ']' : '}';
    
        return { result, calls };
    }

    const MAX_CALLS = 0x36B0;
    return createObjAsStr(obj, 1).result;
}