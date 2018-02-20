import ct from 'color-temperature'

/**
 * Convert kelvin to RGB
 * - e.g. convert typical candlelight (1850K ) to RGB:
 *
 * const rgb = ct.colorTemperature2rgb(1850)
 * // Produces:
 * // rgb.red (1-255)
 * // rgb.green (1-255)
 * // rgb.blue (1-255)
 */

export const rgbFromKelvin = temp => ct.colorTemperature2rgb(temp)

export const getHex = c => {
  let hex = c.toString(16)
  return hex.length == 1 ? '0' + hex : hex
}

export const rgbToHex = (r, g, b) => `#${getHex(r)}${getHex(g)}${getHex(b)}`
