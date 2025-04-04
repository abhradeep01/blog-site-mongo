import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      hasError: false
    };
  }

  static getDerivedStateFromError(error){
    if(error){
      return {
        hasError:true
      }
    }
  }

  componentDidCatch(error, errorInfo){
    console.error("Caught error:",error,errorInfo);
  }

  render(){
    if(this.state.hasError){
      return <h1>something went wrong.</h1>
    }
    return this.props
  }
}

export default ErrorBoundary;