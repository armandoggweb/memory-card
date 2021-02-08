import React from 'react'
import './scoreboard.css'
const ScoreBoard = (props) =>{
  const {maxScore, score, record} = props
  return(
    <ul>
      <li>Max Score: {maxScore}</li>
      <li>Score: {score}</li>
      <li>Record: {record}</li>
    </ul>
  )
}

export default ScoreBoard