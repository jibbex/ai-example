const RESET = '\x1b[0m';
export const Log = {
    /**
     * Returns a string that is green colored in a the shell
     * @date 2024-03-15
     * @param { string|number } text
     */
    green: text => `\x1b[32m${text}${RESET}`,
    /**
     * Returns a string that is red colored in a the shell
     * @date 2024-03-15
     * @param { string|number } text
     */
    red: text => `\x1b[31m${text}${RESET}`,
    /**
     * Returns a string that is blue colored in a the shell
     * @date 2024-03-15
     * @param { string|number } text
     */
    blue: text => `\x1b[34m${text}${RESET}`,
    /**
     * Returns a string that is yello colored in a the shell
     * @date 2024-03-15
     * @param { string|number } text
     */
    yellow: text => `\x1b[33m${text}${RESET}`,
};