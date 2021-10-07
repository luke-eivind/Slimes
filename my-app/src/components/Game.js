import React, { Component } from 'react';
import Web3 from 'web3';
import '../App.css'; //don't think app.css is needed here
import '../Game.css';
import ReactDOM from 'react-dom';


class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null)
    };
  }


  async checkBalance(){
    //console.log(this.state.account);
    const balance = await this.props.contract.methods.balanceOf(this.props.account).call();
    //console.log(balance);
    let tokId;
    for(let i = 0; i<balance; i++){
      tokId = await this.props.contract.methods.tokenOfOwnerByIndex(this.props.account, i).call();
      console.log(tokId);
    }
    console.log(this.props.account);
    let ownerOfToken = await this.props.contract.methods.ownerOf(tokId)
    console.log('owner is ' + ownerOfToken);
    //await this.props.contract.methods.approve('0x000000000000000000000000000000000000dEaD', tokId);
    await this.props.contract.methods.safeTransferFrom(this.props.account, '0x000000000000000000000000000000000000dEaD', tokId).send({ from: this.props.account}); //leftoooooooooooooffffffffffffffffffff
    //await this.props.contract.methods.transfer(this.props.account, '0x000000000000000000000000000000000000dEaD', tokId);
    if(balance < 5){
      window.alert('You need at least 10 slimes to play a token');
      return false;
    }
    else{
      return true;
    }
  }

  async handleClick(i){
    const squares = this.state.squares.slice();
    if(squares[i] == null){
      let sufficientBalance = await this.checkBalance();
      if(sufficientBalance){
        squares[i] = 'O';
      }
    }
    else{
      window.alert('A slime has already been played in this square!');
    }
    this.setState({squares: squares});
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'SLIMEBALL';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
        </div>
        <div className="board-row">
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
        </div>
        <div className="board-row">
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
          {this.renderSquare(20)}
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
        </div>
        <div className="board-row">
          {this.renderSquare(24)}
          {this.renderSquare(25)}
          {this.renderSquare(26)}
          {this.renderSquare(27)}
          {this.renderSquare(28)}
          {this.renderSquare(29)}
          {this.renderSquare(30)}
          {this.renderSquare(31)}
        </div>
        <div className="board-row">
          {this.renderSquare(32)}
          {this.renderSquare(33)}
          {this.renderSquare(34)}
          {this.renderSquare(35)}
          {this.renderSquare(36)}
          {this.renderSquare(37)}
          {this.renderSquare(38)}
          {this.renderSquare(39)}
        </div>
        <div className="board-row">
          {this.renderSquare(40)}
          {this.renderSquare(41)}
          {this.renderSquare(42)}
          {this.renderSquare(43)}
          {this.renderSquare(44)}
          {this.renderSquare(45)}
          {this.renderSquare(46)}
          {this.renderSquare(47)}
        </div>
        <div className="board-row">
          {this.renderSquare(48)}
          {this.renderSquare(49)}
          {this.renderSquare(50)}
          {this.renderSquare(51)}
          {this.renderSquare(52)}
          {this.renderSquare(53)}
          {this.renderSquare(54)}
          {this.renderSquare(55)}
        </div>
        <div className="board-row">
          {this.renderSquare(56)}
          {this.renderSquare(57)}
          {this.renderSquare(58)}
          {this.renderSquare(59)}
          {this.renderSquare(60)}
          {this.renderSquare(61)}
          {this.renderSquare(62)}
          {this.renderSquare(63)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {


  render() {
    return (
      <div className="game">
        <div className="game-board">
        <p></p>
          <Board account = {this.props.account} contract = {this.props.contract}/>
        </div>
        <div className="game-info">
          <div></div>
          <ol></ol>
        </div>
      </div>
    );
  }
}

export default Game;