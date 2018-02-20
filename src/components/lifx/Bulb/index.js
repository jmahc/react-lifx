import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
// import ColorTemp from 'color-temperature'

// import { toggleLightPower } from './state/actions'

import './styles.css'

const enhance = compose(connect())

class Bulb extends React.Component {
  toggleLightPower(bulbId) {
    fetch(`${process.env.API_URL}/lights/id:${bulbId}/toggle`, {
      headers: {
        Authorization: `Bearer ${process.env.LIFX_TOKEN}`
      },
      method: 'POST'
    }).then(response => {
      console.log('response is ', response)
      return response.json().then(res => {
        const data = res.results[0]
        console.log('res is ', data)
        if (data.status === 'ok') {
          console.log('status is ok!!! and ', data.status)
        }
        return res.results
      })
    })
  }

  render() {
    console.log('Bulb has props: ', this.props.data)
    console.log('and props: ', this.props)

    const {
      dispatch,
      data: { brightness, color, id, label, power }
    } = this.props
    const powerLabel = power === 'off' ? 'On' : 'Off'

    return (
      <div className="Bulb">
        <p>Name: {label}</p>
        <p>Brightness: {brightness}</p>
        <button onClick={() => this.toggleLightPower(id)}>
          <label>Turn {powerLabel}</label>
        </button>
      </div>
    )
  }
}

export default enhance(Bulb)
