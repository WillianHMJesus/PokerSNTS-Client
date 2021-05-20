import React, { Component } from 'react';
import { Error, Warning } from '../alert';
import { getAll as getAllRankings } from '../../client/ranking';
import { getByRankingId } from '../../client/round';
import { getAll as getAllPlayers } from '../../client/player';
import { getByPosition } from '../../client/rankingPoint';
import { add } from '../../client/roundPoint';
import Loading from '../loading';

class RoundPoint extends Component {
  constructor() {
    super();

    this.state = {
      roundsDisabled: true,
      playersDisabled: true,
      positionDisabled: true,
      saveDisabled: true,
      rankings: [],
      rounds: [],
      players: [],
      errorAlert: {
        visible: false,
        messages: []
      },
      warningAlert: {
        visible: false,
        title: '',
        messages: []
      },
      roundPoint: {
        rankingId: '',
        roundId: '',
        playerId: '',
        position: '',
        point: ''
      },
      loading: true,
      regexp: /^[0-9\b]+$/
    };

    this.getRankings();

    this.handleRankingsChange = this.handleRankingsChange.bind(this);
    this.handleRoundsChange = this.handleRoundsChange.bind(this);
    this.handlePlayersChange = this.handlePlayersChange.bind(this);
    this.handlePositionChange = this.handlePositionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSetRankings(rankings) {
    this.setState({ rankings });
  };

  handleRankingsChange(event) {
    let value = event.target.value;
    if (value) {
      this.handleSetRankingId(value);
      this.getRoundsByRankingId(value);
    }
  }

  handleSetRankingId(rankingId) {
    this.setState(prevState => ({
      roundPoint: {
        ...prevState.roundPoint,
        rankingId
      }
    }));
  }

  handleSetRounds(rounds) {
    this.setState({ rounds });
  };

  handleSetRoundsDisabled(roundsDisabled) {
    this.setState({ roundsDisabled });
  };

  handleRoundsChange(event) {
    let value = event.target.value;
    if (value) {
      this.handleSetRoundId(value);
      this.getPlayers();
    }
  }

  handleSetRoundId(roundId) {
    this.setState(prevState => ({
      roundPoint: {
        ...prevState.roundPoint,
        roundId
      }
    }));
  }

  handleSetPlayers(players) {
    this.setState({ players });
  };

  handleSetPlayersDisabled(playersDisabled) {
    this.setState({ playersDisabled });
  };

  handlePlayersChange(event) {
    let value = event.target.value;
    if (value) {
      this.handleSetPlayerId(value);
      this.handleSetPositionDisabled(false);
    }
  }

  handleSetPlayerId(playerId) {
    this.setState(prevState => ({
      roundPoint: {
        ...prevState.roundPoint,
        playerId
      }
    }));
  }

  handleSetPositionDisabled(positionDisabled) {
    this.setState({ positionDisabled });
  };

  handlePositionChange(event) {
    let value = event.target.value;
    if (value === '' || this.state.regexp.test(value)) {
      this.handleSetPosition(value);
      if (value) { this.getPoint(value); }
    }
  }

  handleSetPosition(position) {
    this.setState(prevState => ({
      roundPoint: {
        ...prevState.roundPoint,
        position
      }
    }));
  }

  handleSetPoint(point) {
    this.setState(prevState => ({
      roundPoint: {
        ...prevState.roundPoint,
        point
      }
    }));
  }

  handleSetSaveDisabled(saveDisabled) {
    this.setState({ saveDisabled });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.handleLoading();

    add(this.state.roundPoint)
      .then(response => {
        window.location.pathname = '/';
      })
      .catch(error => {
        this.handleErrorAlert(error?.response?.data?.messages);
      }).finally(() => {
        this.handleDisabledLoading();
      })
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

  getRoundsByRankingId = rankingId => {
    this.handleLoading();
    getByRankingId(rankingId).then(response => {
      if (response.status === 200) {
        this.handleSetRounds(response.data);
        this.handleSetRoundsDisabled(false);
        this.handleDisabledWarningAlert();
      } else {
        this.handleWarningAlert('Ranking Vazio!', ['O Ranking selecionado ainda não possui rodadas.']);
        this.handleSetRounds([]);
        this.handleSetRoundsDisabled(true);
      }
    }).catch(error => {
      this.handleErrorAlert(error?.response?.data?.messages);
      this.handleSetRounds([]);
      this.handleSetRoundsDisabled(true);
    }).finally(() => {
      this.handleDisabledLoading();
    })
  }

  getPlayers = () => {
    this.handleLoading();
    getAllPlayers().then(response => {
      if (response.status === 200) {
        this.handleSetPlayers(response.data);
        this.handleSetPlayersDisabled(false);
        this.handleDisabledWarningAlert();
      } else {
        this.handleWarningAlert('Jogador Vazio!', ['Ainda não tem nenhum jogador cadastrado.']);
        this.handleSetPlayers([]);
        this.handleSetPlayersDisabled(true);
      }
    }).catch(error => {
      this.handleErrorAlert(error?.response?.data?.messages);
      this.handleSetPlayers([]);
      this.handleSetPlayersDisabled(true);
    }).finally(() => {
      this.handleDisabledLoading();
    })
  }

  getPoint = position => {
    this.handleLoading();
    getByPosition(position).then(response => {
      if (response.status === 200) {
        this.handleSetPoint(response.data.point);
        this.handleSetSaveDisabled(false);
        this.handleDisabledWarningAlert();
      } else {
        this.handleWarningAlert('Pontuação não Cadastrada!', ['Essa posição ainda não foi cadastrada.']);
        this.handleSetPoint('');
        this.handleSetSaveDisabled(true);
      }
    }).catch(error => {
      this.handleErrorAlert(error?.response?.data?.messages);
      this.handleSetPoint('');
      this.handleSetSaveDisabled(true);
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
            <h2>Pontuação</h2>
          </div>
          <div className="card-body">
            <form>
              <div className="form-floating mb-3">
                <select className="custom-select" value={this.state.roundPoint.rankingId} onChange={this.handleRankingsChange}>
                  <option value="">Ranking</option>
                  {this.state.rankings.map(ranking => (
                    <option key={ranking.id} value={ranking.id}>{ranking.description}</option>
                  ))}
                </select>
              </div>
              <div className="form-floating mb-3">
                <select className="custom-select" value={this.state.roundPoint.roundId} onChange={this.handleRoundsChange} disabled={this.state.roundsDisabled}>
                  <option value="">Rodada</option>
                  {this.state.rounds.map(round => (
                    <option key={round.id} value={round.id}>{round.description}</option>
                  ))}
                </select>
              </div>
              <div className="form-floating mb-3">
                <select className="custom-select" value={this.state.roundPoint.playerId} onChange={this.handlePlayersChange} disabled={this.state.playersDisabled}>
                  <option selected value="">Jogador</option>
                  {this.state.players.map(player => (
                    <option key={player.id} value={player.id}>{player.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" value={this.state.roundPoint.position}
                  onChange={this.handlePositionChange} autoComplete="off" placeholder="Posição" disabled={this.state.positionDisabled} />
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" value={this.state.roundPoint.point} placeholder="Pontuação" disabled />
              </div>
              <div className="row">&nbsp;</div>
              <button type="submit" className="btn btn-primary btn-block bg-dark border-dark" onClick={this.handleSubmit} disabled={this.state.saveDisabled}>Salvar</button>
            </form>
          </div>
        </div>
        {this.state.loading && <Loading />}
      </React.Fragment>
    )
  }
}

export default RoundPoint;