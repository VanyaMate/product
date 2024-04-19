export type ThunkError = {
    code: number;
    message: string;
}

export type ThunkState = {
    isPending: boolean;
    error: ThunkError | null;
}