import React, { Component } from 'react'
import Web3 from 'web3'
import '../App.css'
import Slimes from '../abis/Slime.json'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'
import Game from './Game'
import Sidebar from './Sidebar'
import { Container, Row, Col, Button, Tab, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//import clientGame from './public/client.js'

var socket;

class App extends Component {


//componentWillMount is outdated and shouldn't be used anymore. replaced with componentDidMount()
  async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()

    socket = io.connect('http://localhost:5000');
    socket.on('connectionReceived', this.connectionReceivedAtServer);
  }

  connectionReceivedAtServer(data){
      console.log('connection received at server');
      socket.emit('send-message', 'hi from client');
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
    const networkData = Slimes.networks[networkId]

    if(networkData) {
      const abi = Slimes.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract })

      const totalSupply = await contract.methods.totalSupply().call()
      const connectedAccountsBalance = await contract.methods.balanceOf(accounts[0]).call()


      this.setState({ totalSupply })
      /*
      // Load Colors
      for (var i = 1; i <= totalSupply; i++) {
        const color = await contract.methods.colors(i - 1).call()
        this.setState({
          colors: [...this.state.colors, color]
        })
      }*/
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  async checkBalance(){
    //console.log(this.state.account);
    const balance = await this.state.contract.methods.balanceOf(this.state.account).call();
    //console.log(balance);
    if(balance < 5){
      window.alert('You need at least 5 slimes to activate lasers');
    }
    else{
      window.alert('pew pew');
    }

  }


  mint = () => {
    this.state.contract.methods.mintSlime(1).send({ from: this.state.account, value: '10000000000000001' })/*
    .once('receipt', (receipt) => {
      this.setState({
        colors: [...this.state.colors, color]
      })
    })*/
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      totalSupply: 0,
      colors: []
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account">{this.state.account}</span></small>
            </li>
          </ul>
        </nav>
        <Container fluid>
          <Row>
            <Col>
              <div className="row yellow-heading-row">
                <main role="main" className="col-lg-12 d-flex text-center">
                  <div className="content mr-auto ml-auto">
                    <h1 className="h1 text-left yellow-h1">MINT A YELLOW GAME PIECE</h1>
                    {/*<form onSubmit={(event) => {
                      event.preventDefault()//no idea what this does
                      this.mint()
                    }}>
                      <input
                        type='text'
                        className='form-control mb-1'
                        placeholder='e.g. #FFFFFF'
                        ref={(input) => { this.color = input }}
                      />*/}

                      <p>The color of happiness and optimism. Yellow is a cheerful and energetic color that brings fun and joy to the world. It makes learning easier as it affects the logical part of the brain, stimulating mentality and perception. It inspires thought and curiosity and boosts enthusiasm and confidence.</p>
                      <button
                        className="btn btn-dark"
                        onClick={() => this.mint()}
                        value='MINT'
                      >
                        MINT
                      </button>
                    {/*}</form>
                    <button onClick={() => this.checkBalance()}>
                      Activate Lasers
                    </button>
                    <button>
                      Send To Socket
                    </button>*/}
                  </div>
                </main>
              </div>
            </Col>
            <Col>
              <div className="row blue-heading-row">
                <main role="main" className="col-lg-12 d-flex text-center">
                  <div className="content mr-auto ml-auto">
                    <h1 className="h1 text-left yellow-h1">MINT A BLUE GAME PIECE</h1>
                    {/*<form onSubmit={(event) => {
                      event.preventDefault()//no idea what this does
                      this.mint()
                    }}>
                      <input
                        type='text'
                        className='form-control mb-1'
                        placeholder='e.g. #FFFFFF'
                        ref={(input) => { this.color = input }}
                      />*/}

                      <p>The color of trust and loyalty. Blue has a calming and relaxing effect on our psyche, that gives us peace and makes us feel confident and secure. It dislikes confrontation and too much attention, but it is an honest, reliable and responsible color and you can always count on its support.</p>
                      <button
                        className="btn btn-dark"
                        onClick={() => this.mint()}
                        value='MINT'
                      >
                        MINT
                      </button>
                    {/*}</form>
                    <button onClick={() => this.checkBalance()}>
                      Activate Lasers
                    </button>
                    <button>
                      Send To Socket
                    </button>*/}
                  </div>
                </main>
              </div>
            </Col>
          </Row>
        </Container>
        <hr/>
        <div className="text-left">
        <h1>ahaha</h1>
        </div>
        <Game  account = {this.state.account} contract = {this.state.contract}/>
      </div>


    );
  }
}

export default App;
