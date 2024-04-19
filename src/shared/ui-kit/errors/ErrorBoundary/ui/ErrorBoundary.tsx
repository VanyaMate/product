import { ErrorInfo, ReactNode, Component } from 'react';
import { ThrowError } from '@/shared/ui-kit/errors/ThrowError/ui/ThrowError.tsx';


export type ErrorBoundaryProps = {
    children: ReactNode;
}

export type ErrorBoundaryState = {
    hasError: boolean;
    message: string;
    trace: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor (props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            message : '',
            trace   : '',
        };
    }

    componentDidCatch (error: Error, errorInfo: ErrorInfo) {
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