export type AuthErrorType = {
    code: number;
    message: string;
}

export type AuthSchema = {
    isPending: boolean;
    error: AuthErrorType | null;
}