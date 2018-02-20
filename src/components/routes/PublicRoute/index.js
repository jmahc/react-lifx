import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PublicRoute = ({ component: Component, authed, ...rest }) => (
  <Route
    {...rest}
    render={props => (!authed ? <Component {...props} /> : <Redirect to="/" />)}
  />
)

export default PublicRoute
