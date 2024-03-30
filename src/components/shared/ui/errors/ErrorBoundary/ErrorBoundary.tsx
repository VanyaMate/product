import React, { ErrorInfo } from 'react';
import ThrowError from '@/components/shared/ui/errors/ThrowError/ThrowError.tsx';


export type ErrorBoundaryProps = {
    children: React.ReactNode;
}

export type ErrorBoundaryState = {
    hasError: boolean;
    message: string;
    trace: string;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor (props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            message : '',
            trace   : '',
        };
    }

    componentDidCatch (error: Error, errorInfo: ErrorInfo) {
        console.log(error, errorInfo);
        this.setState({
            ...this.state,
            hasError: true,
            message : error.message,
            trace   : errorInfo.componentStack as string,
        });
    }

    render () {
        if (this.state.hasError) {
            return <ThrowError
                message={ this.state.message }
                trace={ this.state.trace }
            />;
        }

        return this.props.children;
    }
}