import React, { Component } from 'react';
import { signIn } from '../../client/user';
import { Error } from '../alert';
import Loading from '../loading';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: {
        visible: false,
        messages: []
      },
      userName: '',
      password: '',
      loading: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDisabledLoading();
  }

  handleLoading() {
    this.setState({ loading: true });
  }

  handleDisabledLoading() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.handleLoading();

    signIn(this.state.userName, this.state.password)
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data));
        this.redirectSignIn();
      })
      .catch(error => {
        this.handleErrorAlert(error?.response?.data?.messages);
        this.setState({ password: '' });
      }).finally(() => {
        this.handleDisabledLoading();
      })
  }

  handleErrorAlert(messages) {
    this.setState({
      alert: {
        visible: true,
        messages
      }
    })
  }

  redirectSignIn = () => {
    if (this.props.location && this.props.location.pathname !== '/signin') {
      window.location.pathname = this.props.location.pathname;
    }
    window.location.pathname = '/';
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">&nbsp;</div>
        <div className="row">&nbsp;</div>
        {this.state.alert.visible && <Error messages={this.state.alert.messages} />}
        <div className="card text-center">
          <div className="card-header">
            <h2>Login</h2>
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-floating mb-3">
                <label for="email" className="form-label">Email</label>
                <input type="text" name="userName" className="form-control" value={this.state.userName} onChange={this.handleInputChange} />
              </div>
              <div className="mb-3">
                <label for="password" className="form-label">Senha</label>
                <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.handleInputChange} />
              </div>
              <div className="row">&nbsp;</div>
              <button type="submit" className="btn btn-primary btn-block bg-dark border-dark">Entrar</button>
            </form>
          </div>
        </div>
        {this.state.loading && <Loading />}
      </React.Fragment>
    )
  }
}

export default SignIn;