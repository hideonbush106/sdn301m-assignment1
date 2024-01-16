export const capitalToKebab = (str: string) => {
  return str.toLowerCase().replace(/\s+/g, '-')
}

export const kebabToCapital = (str: string) => {
  // Split the string into words using hyphens as delimiters
  const words = str.split('-')

  // Capitalize the first letter of each word
  const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1))

  // Join the capitalized words with spaces
  return capitalizedWords.join(' ')
}

export const convertStringToColorArray = (string: string) => {
  if (!string) return []
  // Split the string into individual colors using commas as delimiters
  const colorArray = string.split(',')

  // Remove any leading or trailing whitespace from each color
  return colorArray.map((color) => color.trim())
}
