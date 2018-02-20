import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { getIn } from 'seamless-immutable'

import { Bulb, Collection } from '@/components/lifx'

import './styles.css'

const setGroups = lightList => {
  console.log('Setting groups...')
  const groups = []
  lightList.forEach((v, i) => {
    let name = v.group.name
    if (!groups.includes(name)) groups.push(name)
  })
  return groups
}
const setLocations = lightList => {
  console.log('Setting locations...')
  const locations = []
  lightList.forEach((v, i) => {
    let name = v.location.name
    if (!locations.includes(name)) locations.push(name)
  })
  return locations
}

const enhance = compose(
  connect(state => {
    const data = getIn(state, ['lights', 'data'])
    return {
      groups: setGroups(data),
      lights: data,
      locations: setLocations(data)
    }
  }, {})
)

class Home extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      groups: this.props.groups || [],
      locations: this.props.locations || []
    }
  }

  render() {
    return (
      <div className="Home">
        <p className="Home-intro">Control the bulbs from here!</p>
        <div className="Home-main">
          <Collection collection={this.state.groups} name="Groups" />
          <Collection collection={this.state.locations} name="Locations" />
          <ul>
            {this.props.lights.map((v, i) => {
              return (
                <li key={i}>
                  <Bulb data={v} />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
export default enhance(Home)
