import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { getIn } from 'seamless-immutable'

import { Bulb, Collection } from '@/components/lifx'

import './styles.css'

const setCollection = (bulbs, collectionName) => {
  const collection = []

  if (bulbs.length > 0) {
    bulbs.forEach((v, i) => {
      let name = v[collectionName].name
      if (!collection.includes(name)) collection.push(name)
    })
  }

  return collection
}

const enhance = compose(
  connect(state => {
    const data = getIn(state, ['lights', 'data'])

    return {
      groups: setCollection(data, 'group') || [],
      lights: data || [],
      locations: setCollection(data, 'location') || []
    }
  }, {})
)

class Home extends PureComponent {
  render() {
    const { groups, lights, locations } = this.props

    return (
      <div className="Home">
        <p className="Home-intro">Control the bulbs from here!</p>
        <div className="Home-main">
          <div className="Home--collection">
            {groups.length > 0 && (
              <Collection collection={groups} name="Groups" />
            )}
            {locations.length > 0 && (
              <Collection collection={locations} name="Locations" />
            )}
          </div>
          <div className="Home--bulb">
            {lights.length > 0 && (
              <ul className="Home--bulb-list">
                {lights.map((v, i) => (
                  <li className="Home--bulb-list-item" key={i}>
                    <Bulb bulb={v} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default enhance(Home)
