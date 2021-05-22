import React, { Component } from 'react';
import { getUser, signOut } from '../account/auth';

class Header extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    signOut();
    window.location.pathname = '/'
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          <img src="https://poker-snts.s3.us-east-2.amazonaws.com/imagens/logo.png" width="30" height="30" className="d-inline-block align-top" alt="" />
        PokerSNTS
      </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className={`nav-item ${ window.location.pathname === '/' ? 'active' : ''}`}>
              <a className="nav-link" href="/">Ranking</a>
            </li>
            {getUser() &&
              <React.Fragment>
                <li className={`nav-item ${ window.location.pathname.includes('/round-point') ? 'active' : ''}`}>
                  <a className="nav-link" href="/round-point">Pontuação</a>
                </li>
                <li className={`nav-item ${ window.location.pathname.includes('/ranking') ? 'active' : ''}`}>
                  <a className="nav-link" href="/ranking">Ranking</a>
                </li>
                <li className={`nav-item ${ window.location.pathname.includes('/round') ? 'active' : ''}`}>
                  <a className="nav-link" href="/round">Rodada</a>
                </li>
                <li className={`nav-item ${ window.location.pathname.includes('/player') ? 'active' : ''}`}>
                  <a className="nav-link" href="/player">Jogador</a>
                </li>
              </React.Fragment>}
            <li className={`nav-item ${ window.location.pathname === '/regulation' ? 'active' : ''}`}>
              <a className="nav-link" href="/regulation">Regulamento</a>
            </li>
          </ul>
          {!getUser() &&
            <React.Fragment>
              <div className="form-inline my-2 my-lg-0">
                <a className="btn btn-outline-light my-2 my-sm-0" href="/signin">Login</a>
              </div>
            </React.Fragment>}
          {getUser() &&
            <React.Fragment>
              <form className="form-inline my-2 my-lg-0">
                <button className="btn btn-outline-light my-2 my-sm-0" onClick={this.handleSubmit}>Logout</button>
              </form>
            </React.Fragment>}
        </div>
      </nav>
    );
  }
}

export default Header;