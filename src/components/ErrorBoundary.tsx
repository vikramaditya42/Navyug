import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    let readable = 'Something went wrong while loading this section.';
    try {
      const parsed = JSON.parse(error.message);
      if (parsed?.operationType) {
        readable = `Unable to complete ${parsed.operationType} request. Please sign in or try again.`;
      }
    } catch {
      if (error.message) {
        readable = error.message;
      }
    }
    return { hasError: true, message: readable };
  }

  componentDidCatch(error: Error) {
    console.error('App ErrorBoundary caught:', error);
  }

  handleReset = () => {
    this.setState({ hasError: false, message: '' });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6">
          <div className="max-w-md w-full rounded-2xl border border-[#E5E9F0] dark:border-[#242E42] bg-white dark:bg-[#161D2B] p-6 text-center">
            <div className="w-11 h-11 rounded-xl bg-[#EEF2FA] dark:bg-[#1E293B] text-[#2D4A8A] dark:text-[#7CA0F0] flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-[#141926] dark:text-[#F1F5F9] mb-2">
              Temporarily Interrupted
            </h2>
            <p className="text-sm text-[#4B5568] dark:text-[#94A3B8] mb-5 leading-relaxed">
              {this.state.message}
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-[#2D4A8A] text-white text-sm font-medium hover:bg-[#223A6E] transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
