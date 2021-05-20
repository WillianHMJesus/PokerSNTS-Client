import React, { Component } from 'react';
import ReactInputDateMask from 'react-input-date-mask';
import { Error, Warning } from '../alert';
import { add } from '../../client/round';
import Loading from '../loading';
import { getAll as getAllRankings } from '../../client/ranking';

class Round extends Component {
  constructor() {
    super();

    this.state = {
      errorAlert: {
        visible: false,
        messages: []
      },
      warningAlert: {
        visible: false,
        title: '',
        messages: []
      },
      rankings: [],
      round: {
        description: '',
        date: '',
        rankingId: ''
      },
      loading: true
    };

    this.getRankings();

    this.handleRankingsChange = this.handleRankingsChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
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

  handleWarningAlert(title, messages) {
    this.setState({
      warningAlert: {
        visible: true,
        title,
        messages
      }
    })
  }

  handleDisabledWarningAlert() {
    this.setState({
      warningAlert: {
        visible: false,
        title: '',
        messages: []
      }
    })
  }

  handleSetRankingId(rankingId) {
    this.setState(prevState => ({
      round: {
        ...prevState.round,
        rankingId
      }
    }));
  }

  handleRankingsChange(event) {
    let value = event.target.value;
    this.handleSetRankingId(value);
  }

  handleSetRankings(rankings) {
    this.setState({ rankings });
  };

  handleSetDescription(description) {
    this.setState(prevState => ({
      round: {
        ...prevState.round,
        description
      }
    }));
  };

  handleDescriptionChange(event) {
    let value = event.target.value;
    this.handleSetDescription(value);
  }

  handleSetDate(date) {
    this.setState(prevState => ({
      round: {
        ...prevState.round,
        date
      }
    }));
  };

  handleDateChange(value) {
    this.handleSetDate(value);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.handleLoading();

    let date = this.parseDate(this.state.round.date);
    add({ ...this.state.round, date })
      .then(response => {
        window.location.pathname = '/';
      })
      .catch(error => {
        this.handleErrorAlert(error?.response?.data?.messages);
      }).finally(() => {
        this.handleDisabledLoading();
      })
  }

  parseDate(date) {
    var parts = date.split("/");
    return new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
  }

  getRankings = () => {
    getAllRankings().then(response => {
      if (response.status === 200) {
        this.handleSetRankings(response.data);
        this.handleDisabledWarningAlert();
      } else {
        this.handleWarningAlert('Ranking Vazio!', ['Ainda não tem nenhum ranking cadastrado.']);
      }
    }).catch(error => {
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
        {this.state.warningAlert.visible && <Warning title={this.state.warningAlert.title} messages={this.state.warningAlert.messages} />}
        <div className="card text-center">
          <div className="card-header">
            <h2>Rodada</h2>
          </div>
          <div className="card-body">
            <div className="row">&nbsp;</div>
            <form>
              <div className="form-floating mb-3">
                <select className="custom-select" value={this.state.round.rankingId} onChange={this.handleRankingsChange}>
                  <option value="">Ranking</option>
                  {this.state.rankings.map(ranking => (
                    <option key={ranking.id} value={ranking.id}>{ranking.description}</option>
                  ))}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" value={this.state.description} onChange={this.handleDescriptionChange} autoComplete="off" placeholder="Descrição" />
              </div>
              <div className="form-floating mb-3">
                <ReactInputDateMask mask="dd/mm/yyyy" className="form-control" value={this.state.date} onChange={this.handleDateChange} autoComplete="off" placeholder="Data" />
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

export default Round;