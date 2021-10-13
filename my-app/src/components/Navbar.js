import React, { useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import Game from './Game'
import Mint from './Mint'
import '../Navbar.css';

const MINT_KEY = 'mint'
const GAME_KEY = 'game'

export default function Navbar(props) {
  const [activeKey, setActiveKey] = useState(MINT_KEY)
  return (
    <div className = "d-flex flex-column">
        <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
          <Nav variant = "tabs">
            <Nav.Item>
              <Nav.Link eventKey = {MINT_KEY}>Mint</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey = {GAME_KEY}>Game</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey = {GAME_KEY}>
              <Game account = {props.account} contract = {props.contract}/>
            </Tab.Pane>
            <Tab.Pane eventKey = {MINT_KEY}>
              <Mint />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
  )
}
