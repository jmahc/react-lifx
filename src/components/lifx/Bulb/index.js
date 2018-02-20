import React, { Component } from 'react'
import { ChromePicker } from 'react-color'
import Slider from 'react-rangeslider'

import { rgbFromKelvin, rgbToHex } from '%/services/colorHelpers'

import './styles.css'

class Bulb extends Component {
  constructor(props) {
    super(props)

    this.state = {
      brightness: 0,
      color: {
        hex: '',
        hue: 0,
        kelvin: 0,
        rgb: {
          red: 0,
          green: 0,
          blue: 0
        },
        saturation: 0
      },
      picker: '',
      power: false,
      slider: 50
    }

    this.handleColorChange = this.handleColorChange.bind(this)
    this.handleBrightnessChange = this.handleBrightnessChange.bind(this)
  }

  componentWillMount() {
    const { bulb: { brightness, color, power } } = this.props

    const rgb = rgbFromKelvin(color.kelvin)
    const hex = rgbToHex(rgb.red, rgb.green, rgb.blue)

    this.setState({
      brightness,
      color: {
        hex,
        hue: color.hue,
        kelvin: color.kelvin,
        rgb,
        saturation: color.saturation
      },
      picker: hex,
      power: power === 'off' ? false : true,
      slider: Math.round(brightness * 100)
    })
  }

  handleColorChange(newColor) {
    console.log('Color selected: ', newColor)

    this.setState({
      picker: newColor.hex
    })
  }

  handleBrightnessOnChange(value) {
    console.log('On change brightness with: ', value)
  }

  handleBrightnessChange(newBrightness) {
    console.log('Brightness value selected: ', newBrightness)

    // this.setState({
    //   slider: newBrightness / 100
    // })
  }

  toggleColor(bulbId, selectedColor) {
    console.log('Toggle color with id: ', bulbId)
    console.log('Toggle color with color: ', selectedColor)

    fetch(`${process.env.API_URL}/lights/id:${bulbId}/state`, {
      body: JSON.stringify({
        color: selectedColor
      }),
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${process.env.LIFX_TOKEN}`,
        'accept-encoding': 'gzip, deflate',
        'content-type': 'application/json'
      },
      method: 'PUT'
    }).then(response => {
      console.log('response is ', response)

      return response.json().then(res => {
        const data = res.results[0]
        console.log('res is ', data)

        if (data.status === 'ok') {
          console.log('We are ok!')
        }

        return data
      })
    })
  }

  togglePower(bulbId) {
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
          this.setState({
            power: !this.state.power
          })
        }

        return data
      })
    })
  }

  render() {
    const { bulb: { brightness, id, label } } = this.props
    const { color: { hex }, picker, power, slider } = this.state
    const powerLabel = power ? 'On' : 'Off'

    console.log('Bulb has props: ', this.props.bulb)
    console.log('and props: ', this.props)
    console.log('Hex is: ', hex)

    return (
      <div className="Bulb">
        <p className="Bulb-name">
          Name: <span>{label}</span>
        </p>
        <p>Brightness: {brightness}</p>
        <div className="Bulb-color">
          <p style={{ color: hex }}>Color</p>
          <div className="Bulb--color-selector">
            <ChromePicker
              color={picker}
              onChangeComplete={this.handleChangeComplete}
            />
            <br />
            <hr />
            <div className="slider">
              <Slider
                max={100}
                min={0}
                value={50}
                onChange={this.handleBrightnessOnChange}
                onChangeComplete={this.handleBrightnessChange}
                orientation="horizontal"
              />
            </div>
            <hr />
            <br />
            <button
              className="Bulb-button"
              onClick={() => this.toggleColor(id, picker)}
            >
              <label>Change color!</label>
            </button>
          </div>
        </div>
        <hr />
        <div className="Bulb-power">
          <button className="Bulb-button" onClick={() => this.togglePower(id)}>
            <label>Turn {powerLabel}</label>
          </button>
        </div>
      </div>
    )
  }
}

export default Bulb
