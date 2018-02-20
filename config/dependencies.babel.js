import packageJson from '../package.json'

function getVendorDependencies() {
  let dependencies = []

  Object.keys(packageJson.dependencies).filter(key => {
    if (key !== 'normalize.css') return dependencies.push(key)
  })

  return dependencies
}

const response = getVendorDependencies()

export default response
