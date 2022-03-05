import bcrypt from 'bcryptjs'

export const createPasswordHash = async (password) => {
  return bcrypt.hash(password, 8);
}

export const comparePassword = (userPassword, dbPassword) => {
  return bcrypt.compare(userPassword, dbPassword)
}