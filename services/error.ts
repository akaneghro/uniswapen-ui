export const errorCodes = {
    NETWORK_ERROR: 1,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
};

export const handleApiError = (error: any): number => {
    if (!error.response) {
        return errorCodes.NETWORK_ERROR;
    }

    return 0;
};
