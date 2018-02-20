import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from '@/containers/App'

// forceRefresh:
// ~ https://reacttraining.com/react-router/web/api/BrowserRouter/forceRefresh-bool
// Found this here:
// ~ https://github.com/LWJGL/lwjgl3-www/
const supportsHistory = 'pushState' in window.history

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter forceRefresh={!supportsHistory}>
      <App />
    </BrowserRouter>
  </Provider>
)

export default Root
