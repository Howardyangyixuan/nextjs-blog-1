export type SignUpErrors = {
  username: string[]
  password: string[]
  passwordConfirmation: string[]
}

export type SignUpUser = {
  username: string
  password: string
  passwordConfirmation: string
}

export type User = {
  username: string
  password: string
}
