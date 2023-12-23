import Image from "next/image";

export default function Logo({ height = 48, width = 200 }){
  return <Image src="/Goober-logo.png" height={height} width={width} alt="Goober Logo"/>
}
