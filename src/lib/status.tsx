/**
 * Represents the status of an operation.
 */
enum Status {
    OK,             // Operation completed successfully.
    FETCHED_FAILED, // Failed to fetch data.
    READY,          // Initial state.
    LOADING,        // Data is currently being loaded.
}


export { Status };