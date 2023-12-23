import {debounce} from "next/dist/server/utils";
import {type FormEvent, useState} from "react";
import {searchLocation} from "@/components/map/location-utils";

interface LocationFormProps {
  name: string
  placeholder: string
  tabIndex: number
  onChange(coords: [number, number]): void
}

interface RouteFeature {
  id: string
  place_name: string
  center: [number, number]
}

const LocationForm = ({ name, placeholder, tabIndex, onChange}: LocationFormProps) => {
  const [list, setList] = useState<RouteFeature[]>([])

  const selectFeature = (interator: RouteFeature[], placeName: string) => {
    if(interator?.[0]){
      const selectedFeature = interator.find((feature: RouteFeature) => feature.place_name === placeName)
      if(selectedFeature) onChange(selectedFeature.center)
    }
  }
  const handleOnChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    const placeName = target.value
    selectFeature(list, placeName)
    void searchLocation(placeName)
      .then(({ features }: {features: RouteFeature[]}) => {
        setList(features)
        selectFeature(features, placeName)
      })

  }
  const debouncedOnChange = debounce(handleOnChange, 1500)
  return (
    <div>
      <input id={name} name={name} list={`${name}-datalist`} className="p-2 w-full bg-[#DDDDDD]" placeholder={placeholder} tabIndex={tabIndex}
             onChange={debouncedOnChange}/>

      <datalist id={`${name}-datalist`}>
        {list.map(item => (
          <option key={item.id} value={item.place_name}></option>
        ))}
      </datalist>
    </div>
  )
}

export default LocationForm
