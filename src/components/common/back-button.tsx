import Link from "next/link";
import classNames from "classnames";

interface BackButtonProps {
  href: string
  tabIndex?: number
  float?: boolean
}
export default function BackButton({ href, tabIndex, float = false }: BackButtonProps){
  return (
    <Link href={href} className={classNames("justify-center items-center inline-flex bg-blue-100 rounded-full text-primary", {
      "absolute top-2 left-2": float
    })} style={{
      width: 48, height: 48
    }} tabIndex={tabIndex}>
      ◀
    </Link>
  )
}
