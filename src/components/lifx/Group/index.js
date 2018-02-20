import React from 'react'

// import { Bulb } from '@/components/lifx'

import './styles.css'

const Group = props => {
  const { groups } = props
  console.log('Group has props with groups: ', groups)
  return (
    <div className="Group">
      <h2>Lifx Groups</h2>
      <ul className="Group--list">
        {groups.map((v, i) => (
          <li className="Group--list-item" key={i}>
            {v}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Group
