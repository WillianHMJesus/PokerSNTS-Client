import React, { Component } from 'react';
import { getAll, getOverrallById, update } from '../../client/ranking';
import { Error, Warning } from '../alert';
import Loading from '../loading';
import { getUser } from '../account/auth';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      rankings: [],
      selectedRanking: {},
      overrallRanking: {
        players: []
      },
      alerts: {
        errorVisible: false,
        errorModalVisible: false,
        errorModalMessages: null
      },
      loading: true,
      regexp: /^[1-9][\.\d]*(,\d+)?$/
    };

    this.handleAwardChange = this.handleAwardChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getRankings();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedRanking.id !== prevState.selectedRanking.id) {
      this.getOverrallRanking(this.state.selectedRanking.id);
    }
  }

  handleSetRankings(rankings) {
    this.setState({ rankings });
  };

  handleSetOverrallRanking(overrallRanking) {
    this.setState({ overrallRanking });
  };

  handleSetSelectedRanking(selectedRanking) {
    this.setState({ selectedRanking });
  };

  handleLoading() {
    this.setState({ loading: true });
  }

  handleDisabledLoading() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  handleErrorAlert() {
    this.setState({
      alerts: {
        warningVisible: false,
        errorVisible: true
      }
    });
  }

  handleDisabledErrorAlert() {
    this.setState(prevState => ({
      alerts: {
        ...prevState.alerts,
        errorVisible: false
      }
    }));
  }

  handleAwardChange(event) {
    let value = event.target.value;
    if (value === '' || this.state.regexp.test(value)) {
      this.handleSetAwardSelectedRanking(event.target.value);
    }
  }

  handleSetAwardSelectedRanking(awardValue) {
    this.setState(prevState => ({
      selectedRanking: {
        ...prevState.selectedRanking,
        awardValue
      }
    }));
  };

  handleSubmit(event) {
    event.preventDefault();
    this.handleLoading();

    update(this.state.selectedRanking)
      .then(response => {
        window.location.pathname = '/';
      })
      .catch(error => {
        this.handleErrorModalAlert(error?.response?.data?.messages);
      })
  }

  handleErrorModalAlert(messages) {
    this.setState({
      alerts: {
        errorModalMessages: messages,
        errorModalVisible: true
      }
    });
  }

  getRankings = () => {
    getAll().then(response => {
      if (response.status === 200) {
        let rankings = response.data.slice(0, 3);
        this.handleSetRankings(rankings);
        this.handleSetSelectedRanking(rankings[0])
        this.handleDisabledErrorAlert();
      }
    }).catch(error => {
      this.handleErrorAlert();
    }).finally(() => {
      this.handleDisabledLoading();
    })
  }

  getOverrallRanking = rankingId => {
    this.handleLoading();
    getOverrallById(rankingId).then(response => {
      if (response.status === 200) {
        this.handleSetOverrallRanking(response.data);
        this.handleDisabledErrorAlert();
      }
    }).catch(error => {
      this.handleErrorAlert();
    }).finally(() => {
      this.handleDisabledLoading();
    })
  }

  render() {
    return (
      <div className="card text-center">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            {this.state.rankings && this.state.rankings.map((ranking, index) => {
              let active = ranking === this.state.selectedRanking ? 'active' : '';
              return (<li className="nav-item" key={ranking.id}>
                <button className={`nav-link ${active}`} onClick={() => this.handleSetSelectedRanking(ranking)}>
                  {ranking.description}
                </button>
              </li>)
            })}
          </ul>
        </div>
        <div className="card-body">
          {this.state.overrallRanking.players.length > 0 &&
            <React.Fragment>
              <div className="form-row">
                <div className="form-group col-md-3">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">R$</span>
                      {getUser() &&
                        <a href="null" className="input-group-text" data-toggle="modal" data-target="#awardModal">
                          <span>{this.state.overrallRanking.awardValue?.toFixed(2)}</span>
                        </a>
                      }
                      {!getUser() &&
                        <span className="input-group-text">{this.state.overrallRanking.awardValue?.toFixed(2)}</span>
                      }
                    </div>
                    <input type="text" className="form-control" value="Ranking" />
                  </div>
                </div>
                <div className="form-group col-md-3">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">R$</span>
                      <span className="input-group-text">{this.state.overrallRanking.leaderValue?.toFixed(2)}</span>
                    </div>
                    <input type="text" className="form-control" value={this.state.overrallRanking.leaderPlayer} />
                  </div>
                </div>
                <div className="form-group col-md-3">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">R$</span>
                      <span className="input-group-text">{this.state.overrallRanking.viceLeaderValue?.toFixed(2)}</span>
                    </div>
                    <input type="text" className="form-control" value={this.state.overrallRanking.viceLeaderPlayer} />
                  </div>
                </div>
                <div className="form-group col-md-3">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">R$</span>
                      <span className="input-group-text">{this.state.overrallRanking.averageValue?.toFixed(2)}</span>
                    </div>
                    <input type="text" className="form-control" value={this.state.overrallRanking.averagePlayer} />
                  </div>
                </div>
              </div>
              <div class="table-responsive-sm">
                <table className="table table-hover table-sm border">
                  <thead className="thead-dark border border-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Jogador</th>
                      <th scope="col">Pontos</th>
                      <th scope="col">Partidas</th>
                      <th scope="col">Média</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.overrallRanking.players && this.state.overrallRanking.players.map((player, item) => {
                      return (
                        <tr key={player.id}>
                          <th scope="row">{item + 1}</th>
                          <td>{player.name}</td>
                          <td>{player.points}</td>
                          <td>{player.matches}</td>
                          <td>{player.average}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </React.Fragment>
          }
          {this.state.alerts.errorVisible && <Error />}
          {this.state.overrallRanking.players.length === 0 && !this.state.alerts.errorVisible &&
            <Warning title='Ranking vazio!' messages={['O Ranking selecionado ainda não possui rodadas.']} />}
        </div>
        {this.state.loading && <Loading />}
        <div className="modal fade" id="awardModal" role="dialog" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">{this.state.selectedRanking.description}</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {this.state.alerts.errorModalVisible && <Error messages={this.state.errorModalMessages} />}
                <form>
                  <div className="row">&nbsp;</div>
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" value={this.state.selectedRanking.awardValue} onChange={this.handleAwardChange} autoComplete="off" placeholder="Valor Ranking" />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block bg-dark border-dark" onClick={this.handleSubmit}>Salvar</button>
                  <div className="row">&nbsp;</div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;