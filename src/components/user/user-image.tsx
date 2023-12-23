interface UserImageProps {
  image?: string
}
export default function UserImage({ image }: UserImageProps){
  return (
    <img src={image} height={40} width={40} alt="User image" className="rounded-full"/>
  )
}
