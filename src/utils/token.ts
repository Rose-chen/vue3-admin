const SET_TOKEN = (token: string) => {
  sessionStorage.setItem('TOKEN', token)
}

const GET_TOKEN = () => {
  return sessionStorage.getItem('TOKEN')
}

export { SET_TOKEN, GET_TOKEN }
