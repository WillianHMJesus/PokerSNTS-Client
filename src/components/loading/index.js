import React, { Component } from 'react';
import './loading.css';

class Loading extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="loader-container">
          <div className="loader">
            <h1 className="text-center text-white">Carregando...</h1>
            <img src="http://poker-snts.s3.us-east-2.amazonaws.com/imagens/loading.gif" width="100%" height="100%" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Loading;