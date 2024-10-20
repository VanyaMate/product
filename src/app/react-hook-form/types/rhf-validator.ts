export type RhfValidatorResponse =
    string
    | true;
export type RhfValidator<T> = (value: T) => RhfValidatorResponse;
