import React from 'react'
import classnames from 'classnames'
import { compose, defaultProps } from 'recompose'

import './styles.css'

const enhance = compose(defaultProps({ type: 'text' }))

const Input = ({ className, icon, size, ...props }) => {
  const classNames = classnames(className, 'Input', {
    'has-icon': !!icon,
    'Input--small': size === 'small'
  })

  return (
    <div className={classNames}>
      <input className="Input-field" {...props} />
    </div>
  )
}

export default enhance(Input)
