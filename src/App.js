import React, { useState, useEffect } from 'react'
import './App.css'
import ScoreBoard from './components/Scoreboard'
import Cards from './components/cards'

const App = () => {
  const maxScore = 10
  const nCardsRow = 3
  const [cardsId, setCardsId] = useState(rndCards(maxScore, nCardsRow))
  const [selected, setSelected] = useState([])
  const [score, setScore] = useState(0)
  const [record, setRecord] = useState(0)

  useEffect(() => {

    function setRndCards() {
      let newCards = []
      const selectedUpdated = this !== undefined ? selected.concat(this) : selected
      do {
        newCards = rndCards(maxScore, nCardsRow)
      } while (newCards.every((card) => selectedUpdated.includes(card)))
      setCardsId(newCards)
    }

    function handleClick() {
      const cardId = parseInt(this.id)
      if (selected.includes(cardId)) {
        resetGame()
      } else {
        const scoreUpdated = score + 1
        if (scoreUpdated === maxScore) {
          removeEventListener(cardsE)
          resetGame(true)
        } else {
          setSelected(selected.concat(cardId))
          setScore(scoreUpdated)
          setRndCards.bind(cardId)()
        }
      }
    }

    function resetGame(win = false) {
      setSelected([])
      if (win) {
        const scoreUpdated = score + 1
        if (scoreUpdated > record) setRecord(scoreUpdated)
      } else {
        if (score > record) setRecord(score)
      }
      setScore(0)
      setRndCards()
    }

    const cardsE = document.querySelectorAll('.card')
    cardsE.forEach((card) => {
      card.addEventListener('click', handleClick)
    })
    const removeEventListener = (elements) => {
      elements.forEach((card) => {
        card.removeEventListener('click', handleClick)
      })
    }
    return () => removeEventListener(cardsE)

  });

  useEffect(() => {
    (async () => {
      const loader = document.getElementById('loader')
      const cardsE = document.querySelector('.cards')
      cardsE.classList.add('hide')
      loader.className = ''
      await new Promise(function (resolve) {
        setTimeout(function () { resolve(); }, 300);
      })
      loader.className = 'hide'
      cardsE.classList.remove('hide')
    })()
  })

  return (
    <>
      <ScoreBoard maxScore={maxScore} score={score} record={record} />
      <Loader />
      <Cards max={maxScore} cardsId={cardsId}/>
    </>
  )
}

const rndCards = (max, nCards) => {
  let rndNumbers = []
  let rndNumber = 0
  for (let i = 0; i < nCards; i++) {
    do {
      rndNumber = Math.floor((Math.random() * max) + 1)
    } while (rndNumbers.includes(rndNumber))
    rndNumbers.push(rndNumber)
  }
  return rndNumbers
}
const Loader = () => {
  return <div id="loader" className="hide"></div>
}

export default App
