import React from 'react'

import './styles.css'

const Collection = props => (
  <div className="Collection">
    <h2>Lifx {props.name}</h2>
    <ul className="Collection--list">
      {props.collection.map((v, i) => (
        <li className="Collection--list-item" key={i}>
          {v}
        </li>
      ))}
    </ul>
  </div>
)

export default Collection
