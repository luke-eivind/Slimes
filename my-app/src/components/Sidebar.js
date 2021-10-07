import React, { useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import Game from './Game'

const MINT_KEY = 'mint'
const GAME_KEY = 'game'

export default function Sidebar(account, contract) {
  const [activeKey, setActiveKey] = useState(MINT_KEY)
  return (
    <div style = {{width: 250}} className = "d-flex flex-column">
        <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
          <Nav variant = "tabs" className = "justify-content-center">
            <Nav.Item>
              <Nav.Link eventKey = {MINT_KEY}>Mint</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey = {GAME_KEY}>Game</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey = {GAME_KEY}>
              <Game account = {account} contract = {contract}/>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
  )
}
