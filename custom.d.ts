export interface SignUpErrors {
  username: string[]
  password: string[]
  passwordConfirmation: string[]
}

export interface SignUpUser extends SignInUser {
  passwordConfirmation: string
}

export interface SignInUser {
  username: string
  password: string
}

export interface User {
  username: string
  password: string
}
