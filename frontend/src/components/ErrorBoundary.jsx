import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full text-center p-8 bg-white rounded-3xl shadow-2xl border border-gray-100">
            <div className="w-20 h-20 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.34c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Something went wrong</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              We encountered an unrecoverable error. This often happens if the backend server is experiencing issues.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left overflow-auto max-h-32 border border-gray-100">
                <code className="text-xs text-rose-600 break-all font-mono">
                    {this.state.error && this.state.error.toString()}
                </code>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-rose-500 transition-all duration-300 shadow-lg shadow-gray-200"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
