import { Component } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../interfaces';

const initState = { error: null };

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = initState;

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { error: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: info,
    });
    console.error('Error caught: ', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="error">
          <h2>Something went wrong. Please try again.</h2>
          <button onClick={() => this.setState(initState)}>
            {'Reset Error'}
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
