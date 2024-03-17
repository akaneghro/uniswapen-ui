export const formatAccount = (input: string): string => {
    if (input.length <= 10) {
        return input;
    }

    return input.slice(0, 6) + "..." + input.slice(-4);
};

export const formatDate = (input: Date): string => {
    const date = new Date(input);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

export const calculatePercentage = (value: number, total: number): number => {
    return (value / total) * 100;
};
