import {type User} from "@/components/user/user.types";

const DISTANCE_COST = 0.5

export const emptyUser = () => ({name: '', image: '', id: ''})
export function getAuthenticatedUser(): User {
  const sessionUser = sessionStorage.getItem('user')
  return sessionUser ? JSON.parse(sessionUser) as User : emptyUser()
}

export function setAuthenticatedUser(user: User){
  sessionStorage.setItem('user', JSON.stringify(user))
}

interface RawDriver {
  id: string;
  carCategory: { id: string; name: string; multiplier: number; } | null;
  name: string | null;
  image: string | null;
}
export const addDriverPrices = (dynamicMultiplier: number, distance: number, data?: RawDriver[]) => {
  return data?.map((driver) => {
    const carCategoryMultiplier = driver.carCategory?.multiplier ?? 1
    return {
      ...driver,
      image: driver.image ?? '',
      name: driver.name ?? '',
      price: (carCategoryMultiplier * dynamicMultiplier * distance * DISTANCE_COST)
    }
  }) ?? []
}
