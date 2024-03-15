export default class Result<T, E> {
    private resultValue: T | null;
    private resultError: E | null;

    private constructor(_value: T | null, _error: E | null) {
        this.resultValue = _value;
        this.resultError = _error;
    }

    static ok<T, E>(value: T): Result<T, E> {
        return new Result<T, E>(value, null);
    }

    static fail<T, E>(error: E): Result<T, E> {
        return new Result<T, E>(null, error);
    }

    isOk(): this is { value: T } {
        return this.resultError == null;
    }

    isError(): this is { error: E } {
        return this.resultError != null;
    }

    getValue(): T | null {
        return this.resultValue;
    }

    getError(): E | null {
        return this.resultError;
    }
}
