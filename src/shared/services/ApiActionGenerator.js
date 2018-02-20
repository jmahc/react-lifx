export default namespace => action => ({
  FAILURE: `${namespace}/${action}_FAILURE`,
  REQUEST: `${namespace}/${action}_REQUEST`,
  SUCCESS: `${namespace}/${action}_SUCCESS`,
  TRIGGER: `${namespace}/${action}_TRIGGER`
})
