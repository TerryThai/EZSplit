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
  },
  getBase64: file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  },
  parseBase64: base64 => {
    let idx = base64.indexOf(',') + 1
    return base64.slice(idx)
  }
}
