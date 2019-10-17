import bcrypt from 'bcryptjs'

export const comparePassword = async function(password: string, hash: string) {
  return await bcrypt.compare(password, hash)
}

export const hashPassword = async function(password: string) {
  return await bcrypt.hash(password, await bcrypt.genSalt(4))
}

export const hash = async function(toHash: string, saltComplexity: number = 4) {
  return await bcrypt.hash(toHash, await bcrypt.genSalt(saltComplexity))
}
