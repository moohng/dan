export default function random(...args) {
  if (args.length === 0) {
    return Math.random()
  }
  if (args.length === 1) {
    const length = parseInt(args[0], 10) || 32
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    const charactersLength = characters.length
    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random * charactersLength))
    }
    return result
  }
  const min = parseInt(args[0], 10) || 0
  const max = parseInt(args[1], 10) || 1
  const isInteger = !!args[2]
  const result = Math.random() * Math.abs(max - min) + min
  return isInteger ? Math.floor(result) : result
}
