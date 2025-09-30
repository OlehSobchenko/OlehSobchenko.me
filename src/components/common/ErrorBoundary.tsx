'use client';

import { Component, ComponentType, ReactNode } from 'react';

type ErrorBoundaryProps = {
    fallback?: ReactNode;
    errorComponent?: ComponentType<{ error?: unknown }>;
    children: ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
    error?: unknown;
};

export default class ErrorBoundary extends Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);

        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            if (this.props.errorComponent) {
                const ErrorComponent = this.props.errorComponent;

                return <ErrorComponent error={ this.state.error }/>;
            }

            if (this.props.fallback) {
                return this.props.fallback;
            }

            return <div>Something went wrong.</div>;
        }

        return this.props.children;
    }
}
