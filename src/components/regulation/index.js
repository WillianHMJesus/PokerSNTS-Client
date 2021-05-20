import React, { Component } from 'react';
import Loading from '../loading';

class Regulation extends Component {
  constructor() {
    super();

    this.state = {
      loading: true
    };

    this.handleDisabledLoading();
  }

  handleDisabledLoading() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <div className="row ">&nbsp;</div>
          <h2 className="text-center">Regulamento</h2>
          <div className="row ">&nbsp;</div>
          <p className="text-justify">
            - Os participantes devem jogar ao menos 50% dos jogos válidos para receber premiação do ranking.<br /><br />
          - Valor de aposta para o ranking é de 50% do valor arrecadado, menos o valor da entrada do 2° colocado.<br /><br />
          - Os ganhadores do ranking são 1° e 2° em pontos corridos e 1° em média. A divisão fica 50% para 1° em pontos, 25% para 2° em pontos e 25% para 1° em média.<br /><br />
          - O valor da aposta para o jogo é de 50% para o campeão da mesa e 1  aposta para o vice da mesa e o restante para o cofre do ranking.
        </p>
        </div>
        <hr />
        <div className="row ">&nbsp;</div>
        <div>
          <table className="table table-bordered  table-sm text-center">
            <thead className="table-dark">
              <tr>
                <th colSpan="2" scope="col">Pontuação Ranking</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1ª</td>
                <td>16</td>
              </tr>
              <tr>
                <td>2ª</td>
                <td>12</td>
              </tr>
              <tr>
                <td>3ª</td>
                <td>9</td>
              </tr>
              <tr>
                <td>4ª</td>
                <td>6</td>
              </tr>
              <tr>
                <td>5ª</td>
                <td>4</td>
              </tr>
              <tr>
                <td>6ª</td>
                <td>2</td>
              </tr>
              <tr>
                <td>7ª</td>
                <td>1</td>
              </tr>
              <tr>
                <td>8ª</td>
                <td>1</td>
              </tr>
              <tr>
                <td>9ª</td>
                <td>1</td>
              </tr>
              <tr>
                <td>10ª</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>
        </div>
        {this.state.loading && <Loading />}
      </React.Fragment>
    )
  }
}

export default Regulation;