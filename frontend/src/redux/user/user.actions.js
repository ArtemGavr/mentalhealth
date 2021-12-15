import { Types} from './user.types'

export const ActionCreators = {
  
    login: (user) => ({ type: Types.LOGIN, payload: { user } })
  }