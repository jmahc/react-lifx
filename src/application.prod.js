import React from 'react'
import { render } from 'react-dom'

import Root from '@/containers/Root'
import store from '@/store'

const renderApplication = ApplicationComponent => {
  render(
    <ApplicationComponent store={store} />,
    document.getElementById('root')
  )
}

// Render the application using the `<Root />` container.
renderApplication(Root)
