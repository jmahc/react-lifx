import Validator from 'validatorjs'

const VALIDATION_MESSAGES = {
  required: 'Required',
  email: 'Must be an email address',
  date: 'Must be a real date'
}

export default rules => values => {
  const validation = new Validator(values, rules, VALIDATION_MESSAGES)

  validation.passes()
  return validation.errors.all()
}
