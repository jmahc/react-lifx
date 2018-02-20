import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, setPropTypes, withProps } from 'recompose'
import { Form as MyFormComponent, reduxForm, SubmissionError } from 'redux-form'

import './styles.css'

const enhance = compose(
  setPropTypes({
    heading: PropTypes.string,
    submitMethod: PropTypes.func.isRequired
  }),
  withProps(({ name, initialValues }) => ({
    form: name,
    initialValues
  })),
  // Maps the dispatch method to props.
  connect(),
  reduxForm({})
)

const Form = ({
  children,
  className,
  dispatch,
  error,
  handleSubmit,
  heading,
  initialValues,
  submitMethod,
  submitting
}) => {
  const classNames = classnames('Form', className, { 'has-error': error })

  return (
    <MyFormComponent
      className={classNames}
      onSubmit={handleSubmit((...args) => {
        console.log('Handle submit args:')
        console.info(...args)
        try {
          dispatch(submitMethod(...args))
        } catch (err) {
          throw new SubmissionError({ _error: err })
        }
      })}
    >
      {heading && <h1 className="Form-heading">{heading}</h1>}
      <div className="Form-content">{children}</div>
      <button className="Form-submit" type="submit">
        {submitting ? 'Submitting…' : 'Submit'}
      </button>
      {error && <div className="Form-error">{error}</div>}
    </MyFormComponent>
  )
}

export default enhance(Form)
