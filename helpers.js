export const helpers = {
  removeDollarSign: string => {
    const index = string.indexOf('$')
    return string.slice(0, index).trim()
  },

  capitalize: string => {
    let newString = string.toLowerCase()
    let array = newString.split('')
    array[0] = array[0].toUpperCase()
    let space = array.indexOf(' ') + 1
    array[space] = array[space].toUpperCase()
    return array.join('')
  }
}
