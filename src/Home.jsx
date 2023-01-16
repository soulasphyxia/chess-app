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
          
          <div className="BG">

            
            <div className="Title">Играть в Томские шахматы онлайн на сайте</div>

            <div className="Pic"></div>
            <p className="comm">Всегда хочется отдохнуть и заняться своим любимым делом. Все мы люди, и все мы устаем, и у каждого из нас должно быть свое хобби, чтобы предаться ему со всей душой. Если вы неравнодушны к шахматам – этот сайт то, что вам нужно. Здесь вы сможете играть в шахматы онлайн. Вам не нужно скачивать шахматы. Просто заходите на наш портал и играйте бесплатно в эту великую игру, которая не даст вам скучать.</p>
 
            <div >
                 <button className="play-btn pointer" onClick={handlePlayOnline}> Начать игру</button>
            </div>
            
                <div classname = "play-btnBlock">
                    <button className="play-btn pointer" onClick={handlePlayOnline}> Начать игру </button>
                </div>
				<div>
				<form classname="link-btn" action = "https://xchess.ru/pravila-igry-v-shakhmaty-polnoe-rukovodstvo.html">
					<button className="rules_btn pointer"> Правила игры </button>

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
