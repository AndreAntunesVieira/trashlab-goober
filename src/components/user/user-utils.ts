import {type User} from "@/components/user/user.types";

export const emptyUser = () => ({name: '', image: '', id: ''})
export function getAuthenticatedUser(): User {
  const sessionUser = sessionStorage.getItem('user')
  return sessionUser ? JSON.parse(sessionUser) as User : emptyUser()
}
