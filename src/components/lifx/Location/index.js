import React from 'react'

// import { Bulb } from '@/components/lifx'

import './styles.css'

const Location = props => {
  const { locations } = props
  console.log('Location has props with locations: ', locations)
  return (
    <div className="Location">
      <h2>Lifx Locations</h2>
    </div>
  )
}

export default Location
