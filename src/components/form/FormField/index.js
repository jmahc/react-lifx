import React from 'react'
import classnames from 'classnames'
import { Field } from 'redux-form'

import './styles.css'

const FormField = ({ name, children, ...rest }) => (
  <Field name={name} children={children} component={FieldContent} {...rest} />
)

const FieldContent = ({ children, label, meta, name, input }) => {
  const { touched, error } = meta
  const errorLabel = touched && error ? error[0] : null
  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, ...input)
  )

  return (
    <div className={classnames('FormField', { 'has-error': errorLabel })}>
      {childrenWithProps}
      {errorLabel && <ErrorLabel message={errorLabel} />}
    </div>
  )
}

const ErrorLabel = ({ message }) => (
  <div className="FormField-error">{message}</div>
)

export default FormField
