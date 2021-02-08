import React from 'react'
import './card.css'

const Card = (props) => {
  const { id, url } = props
  return (
    <>
      <img id={id} className="card" src={url} alt="theOffice" />
    </>
  )
}

export default Card
