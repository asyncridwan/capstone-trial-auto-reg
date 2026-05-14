const generatePlateNumber = () => {

  const states = ["LAG", "ABJ", "KAN", "PHC" , "RIV", "KAD", "ENUGU", "IMO", "ANAMBRA", "DELTA"]

  const randomState =
    states[Math.floor(Math.random() * states.length)]

  const numbers =
    Math.floor(100 + Math.random() * 900)

  const letters =
    Math.random().toString(36)
      .substring(2, 5)
      .toUpperCase()

  return `${randomState}-${numbers}-${letters}`
}

module.exports = generatePlateNumber