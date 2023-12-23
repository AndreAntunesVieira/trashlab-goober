export interface User {
  name: string
  image: string
  id: string
}
export interface Driver extends User{
  carCategory: {id: string, name: string, multiplier: number} | null
  price: number
  licensePlate?: string
}
