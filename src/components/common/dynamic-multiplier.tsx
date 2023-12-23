import classNames from "classnames";

interface DynamicMultiplierProps {
  multiplier: number
}
export default function DynamicMultiplier({ multiplier }: DynamicMultiplierProps){
  return (
    <div>
      Dynamic multiplier: <b
      style={{width: 32, height: 32}}

      className={classNames('items-center justify-center inline-flex rounded-full', {
        'text-green-500 bg-green-200': multiplier === 1,
        'text-red-500 bg-red-200': multiplier > 1
      })}
    ><small>x</small>{multiplier}</b>
    </div>
  )
}
