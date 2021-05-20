import React, { Component } from 'react';
import { Error } from '../alert';
import { add } from '../../client/ranking';
import Loading from '../loading';

class Ranking extends Component {
  constructor() {
    super();

    this.state = {
      errorAlert: {
        visible: false,
        messages: []
      },
      description: '',
      loading: true
    };

    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
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

  handleErrorAlert(messages) {
    this.setState({
      errorAlert: {
        visible: true,
        messages
      }
    })
  }

  handleSetDescription(description) {
    this.setState({ description });
  };

  handleDescriptionChange(event) {
    let value = event.target.value;
    this.handleSetDescription(value);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.handleLoading();

    let description = this.state.description;
    add({ description })
      .then(response => {
        window.location.pathname = '/';
      })
      .catch(error => {
        this.handleErrorAlert(error?.response?.data?.messages);
      }).finally(() => {
        this.handleDisabledLoading();
      })
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">&nbsp;</div>
        <div className="row">&nbsp;</div>
        {this.state.errorAlert.visible && <Error messages={this.state.errorAlert.messages} />}
        <div className="card text-center">
          <div className="card-header">
            <h2>Ranking</h2>
          </div>
          <div className="card-body">
            <div className="row">&nbsp;</div>
            <form>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" value={this.state.description} onChange={this.handleDescriptionChange} autoComplete="off" placeholder="Descrição" />
              </div>
              <div className="row">&nbsp;</div>
              <button type="submit" className="btn btn-primary btn-block bg-dark border-dark" onClick={this.handleSubmit}>Salvar</button>
            </form>
          </div>
        </div>
        {this.state.loading && <Loading />}
      </React.Fragment>
    )
  }
}

export default Ranking;