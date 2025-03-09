import { Component } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../../interfaces';
import style from './ErrorBoundary.module.css';

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
        <div className={style['root-wrapper']}>
          <div className={style['error-wrapper']}>
            <div className={style.header}>Star★Error</div>
            <h2>Something went wrong. Please try again.</h2>
            <button onClick={() => this.setState(initState)}>{'Reset Error'}</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
