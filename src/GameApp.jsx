import React, { useEffect, useState } from 'react'
import './App.css'
import { gameSubject, initGame, resetGame } from './Game'
import Board from './Board'
import { useParams, useHistory } from 'react-router-dom'
import { db } from './firebase'

const letters = ['a','b','c','d','e','f','g','h'];
function GameApp() {
  const [board, setBoard] = useState([])
  const [isGameOver, setIsGameOver] = useState()
  const [result, setResult] = useState()
  const [position, setPosition] = useState()
  const [initResult, setInitResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')
  const [game, setGame] = useState({})
  const [turn, setTurn] = useState("w");
  const { id } = useParams()
  const history = useHistory()
  const sharebleLink = window.location.href
  useEffect(() => {
    let subscribe
    async function init() {
      const res = await initGame(id !== 'local' ? db.doc(`games/${id}`) : null)
      setInitResult(res)
      setLoading(false)
      if (!res) {
        subscribe = gameSubject.subscribe((game) => {
          setTurn(game.turn)
          setBoard(game.board)
          setIsGameOver(game.isGameOver)
          setResult(game.result)
          setPosition(game.position)
          setStatus(game.status)
          setGame(game)
        })

      }
    }

    init()

    return () => subscribe && subscribe.unsubscribe()
  }, [id])

  async function copyToClipboard() {
    await navigator.clipboard.writeText(sharebleLink)
  }

  if (loading) {
    return 'Загрузка ...'
  }
  if (initResult === 'notfound') {
    return 'Игра не найдена'
  }

  if (initResult === 'intruder') {
    return 'Игра уже заполнена'
  }

  return (
    <div className="app-container">
      <div className="turn">{turn === "w" ? <p>Ход белых</p> : <p>Ход черных</p>}</div>
      {isGameOver && (
        <h2 className="vertical-text">
          ИГРА ОКОНЧЕНА
          <button onClick={async () => {
            await resetGame()
            history.push('/')
          }}>
            <span className="vertical-text"> НОВАЯ ИГРА</span>
          </button>
        </h2>
      )}
      {!isGameOver && (
          <div className="numbers">{letters.map((letter,index) => <div className="num">{index+1}</div>)}</div>
      )}
      {game.oponent && game.oponent.name && <span className="tag" id="opp">{game.oponent.name}</span>}
      <div className="board-container">

        <Board board={board} position={position} />
        <div className="letters">
          {letters.map(letter => <div className="letter">{letter}</div>)}
        </div>
        {game.member && game.member.name && <span className="tag">{game.member.name}</span>}
      </div>
      {result && <p className="vertical-text">{result}</p>}
      {status === 'waiting' && (
        <div className="share-game">
          <strong className="share">Для начала игры поделись этой ссылкой с другом:</strong>
          <br />
          <div className="field">
            <div className="control">
              <input type="text" name="" id="" className="input" readOnly value={sharebleLink} />
              <button className="btn" onClick={copyToClipboard}>⎘</button>
            </div>
          </div>
        </div>
      )}
    </div>

  )
}

export default GameApp
