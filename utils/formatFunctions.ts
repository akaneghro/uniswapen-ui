export const formatAccount = (input: string): string => {
    if (input.length <= 10) {
        return input;
    }

    return input.slice(0, 6) + "..." + input.slice(-4);
};

export const formatFeeTier = (input: number): string => {
    return (input / 10000).toFixed(2) + "%";
};
