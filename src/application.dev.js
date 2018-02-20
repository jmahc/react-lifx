import React from 'react'
import { render } from 'react-dom'

import Root from '@/containers/Root'
import store from '@/store'

const renderApplication = ApplicationComponent => {
  const AppContainer = require('react-hot-loader').AppContainer
  /**
   * Trick babel to avoid hoisting `<AppContainer />`
   * via `babel-plugin-transform-react-constant-elements`.
   * Found here: https://github.com/LWJGL/lwjgl3-www/
   */
  const noHoist = {}

  render(
    <AppContainer {...noHoist}>
      <ApplicationComponent store={store} />
    </AppContainer>,
    document.getElementById('root')
  )
}

// Render the application using the `<Root />` container.
renderApplication(Root)

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NewRoot = require('./containers/Root')
    renderApplication(NewRoot)
  })
}
