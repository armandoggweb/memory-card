import React, { useState, useEffect } from "react"
import './cards.css'
import Card from './card'
const Cards = (props) => {
  const { max, cardsId } = props;
  const [cards, setCards] = useState([])
  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}=dwight%20schrute`,
          { mode: 'cors' })
        const imgsData = await response.json()
        const cardsFetched = imgsData.data.slice(0, max + 1)
        setCards(cardsFetched.map((img) => img.images.downsized.url))

      } catch (e) {
        console.log(e)
      }
    })()

  }, [])

  return (
    <div className="cards">
      {cardsId.map((id) => <Card key={id} id={id} url={cards[id]} />)}
    </div>
  )
}

export default Cards