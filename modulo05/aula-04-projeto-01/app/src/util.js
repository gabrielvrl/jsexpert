const safeRegex = require("safe-regex")

class InvalidRegexError extends Error {
  constructor(exp){
    super(`Invalid regex expression: ${exp}`)
    this.name = 'InvalidRegexError'
  }
}

const evaluateRegex = (exp) => {
  const isSafe = safeRegex(exp)
  if(isSafe) return exp;

  throw new InvalidRegexError(exp)
}

module.exports = { evaluateRegex, InvalidRegexError }