exports.countNumber = (value) => {
  if (!value) return '0.00'
  var intPart = Number(value) | 0
  var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')

  var floatPart = '.00'
  var value2Array = String(value).split('.')

  if (value2Array.length === 2) {
    floatPart = value2Array[1].toString()

    if (floatPart.length === 1) {
      return intPartFormat + '.' + floatPart + '0'
    } else {
      return intPartFormat + '.' + floatPart
    }
  } else {
    return intPartFormat + floatPart
  }
}
