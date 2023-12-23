import UserImage from "@/components/user/user-image";
import classNames from "classnames";
import Link from "next/link";

interface UserFullProps {
  name: string
  image: string
  vertical?: boolean
  href?: string
}
export default function UserFull({ name, image, href = '', vertical = false }: UserFullProps){
  return (
    <Link href={href} className={classNames("flex items-center gap-2 text-primary", {
      "flex-col-reverse": vertical
    })}>
      <div>
        {name}
      </div>
      <UserImage image={image} />
    </Link>
  )
}
