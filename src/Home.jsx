import React, { useState } from 'react'
import { auth, db } from './firebase'
import { useHistory } from 'react-router-dom'
export default function Home() {
    const { currentUser } = auth
    const [showModal, setShowModal] = useState(false)
    const history = useHistory()
    const newGameOptions = [
        { label: 'Черные', value: 'b' },
        { label: 'Белые', value: 'w' },
        { label: 'Случайно', value: 'r' },
    ]

    function handlePlayOnline() {
        setShowModal(true)
    }

    async function startOnlineGame(startingPiece) {
        const member = {
            uid: currentUser.uid,
            piece: startingPiece === 'r' ? ['b', 'w'][Math.round(Math.random())] : startingPiece,
            name: localStorage.getItem('userName'),
            creator: true
        }
        const game = {
            status: 'waiting',
            members: [member],
            gameId: `${Date.now()}`,
        }
        await db.collection('games').doc(game.gameId).set(game)
        history.push(`/game/${game.gameId}`)
    }

    return (
        <>
            
                <div className="menu">
                    <p style={{fontSize: 35}}>Шахматы Онлайн</p>
                    <button className="play-btn" onClick={handlePlayOnline}> Играть </button>
                    <button className="rules-btn" onClick={()=>{window.open("https://xchess.ru/pravila-igry-v-shakhmaty-polnoe-rukovodstvo.html",'_blank')}}>Правила</button>
                </div>
            <div className={`modal ${showModal ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="card">
                        <div className="card-content">
                            <div className="content">
                                Выберите сторону, за которую хотите начать:
                            </div>
                        </div>
                        <footer className="card-footer">
                            {newGameOptions.map(({ label, value }) => (
                                <span className="card-footer-item pointer" key={value}
                                    onClick={() => startOnlineGame(value)}>
                                    {label}
                                </span>
                            ))}
                        </footer>
                    </div>
                </div>
                <button className="modal-close" onClick={() => setShowModal(false)}></button>
            </div>
        </>
    )
}
