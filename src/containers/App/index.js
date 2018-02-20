import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { NoMatchRoute, PublicRoute } from '@/components/routes'
import { Home } from '@/scenes'

import { getLights } from '%/state/lights/actions'

import '#/index.css'

import './styles.css'

const enhance = compose(withRouter, connect(null, { getLights }))

class App extends PureComponent {
  // Uncomment when it is time to continually call the API...
  // componentWillMount() {
  //   const { getLights } = this.props
  //   getLights()
  // }

  render() {
    return (
      <div className="App">
        <Switch key="app">
          <PublicRoute exact path="/" component={Home} />
          <Route component={NoMatchRoute} />
        </Switch>
      </div>
    )
  }
}

export default enhance(App)
