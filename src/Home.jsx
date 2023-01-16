import React, { useState } from 'react'
import { auth, db } from './firebase'
import { useHistory } from 'react-router-dom'
export default function Home() {
    const { currentUser } = auth
    const [showModal, setShowModal] = useState(false)
    const history = useHistory()
    const newGameOptions = [
        { label: 'Черные', value: 'b' },
        { label: 'Чёрные', value: 'b' },
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
          <div className="BG">

            <div className="Title">Играть в шахматы онлайн на сайте</div>
            <div className="Pic"></div>

            <div className="LinkBG">
                <a class="Link" href="https://en.wikipedia.org/wiki/Rules_of_chess">Перейдя по данной ссылке, вы можете ознакомиться с правилами игры в шахматы.</a>
            </div>
 
            <div >
                 <button className="play-btn" onClick={handlePlayOnline}> Начать игру</button>
            </div>
            
                <div classname = "play-btnBlock">
                    <button className="play-btn" onClick={handlePlayOnline}> Начать игру </button>
                </div>
				<div>
				<form classname="link-btn" action = "https://xchess.ru/pravila-igry-v-shakhmaty-polnoe-rukovodstvo.html">
					<button > Правила игры </button>
				</form>
				</div>
            <div className={`modal ${showModal ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="card">
                        <div className="card-content">
                            <div className="content">
                                Пожалуйста выберите сторону, за которую желаете играть
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
                <button className="modal-close is-large" onClick={() => setShowModal(false)}></button>
            </div>
          </div>
        </>
    )
}
