import React, { Component } from 'react';
import './loading.css';

class Loading extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="loader-container">
          <div className="loader">
            <h1 className="text-center text-white">Carregando...</h1>
            <img src="https://s3.amazonaws.com/poker.snts/imagens/loading.gif" width="100%" height="100%" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Loading;