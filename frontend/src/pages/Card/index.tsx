import React from 'react'
import { useParams } from 'react-router-dom'

const Card = () => {
    const { id } = useParams()
  return (
    <div>{id}</div>
  )
}

export default Card