export const suppressDecapCMSErrors = () => {
    if (typeof window !== 'undefined') {
        const originalError = console.error;

        console.error = (...args: any[]) => {
            const message = args[0];

            if (
                typeof message === 'string' &&
                (
                    message.includes('Warning: Failed prop type: Invalid prop `children` supplied to `ErrorBoundary`') ||
                    message.includes('Warning: Failed prop type: Invalid prop `children` supplied to `Modal`') ||
                    message.includes('decap-cms')
                )
            ) {
                return;
            }

            originalError.apply(console, args);
        };
    }
};
