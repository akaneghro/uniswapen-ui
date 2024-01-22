export const validateNumericInput = (event: any) => {
    let value = event.target?.value ?? event;

    if (/[^0-9.]/.test(value)) {
        value = value.replace(/[^0-9.]/g, "");
        event.target.value = value;
        return false;
    }

    if (
        (value === "." || value === "0") &&
        event.inputType !== "deleteContentBackward"
    ) {
        event.target.value = "0.";
        return false;
    }

    if (value.includes(".") && value.split(".").length >= 3) {
        event.target.value = value.slice(0, -1);
        return false;
    }

    return true;
};
