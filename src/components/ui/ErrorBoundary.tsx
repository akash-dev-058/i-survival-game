import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-900 text-white" role="alert">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <pre className="bg-gray-800 p-2 rounded mb-4 max-w-xl overflow-auto text-xs">
              {this.state.error.message}\n{this.state.error.stack}
            </pre>
          )}
          <button
            onClick={this.handleRetry}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
