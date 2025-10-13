import type { DevTreeLinks } from "../types";

type DevTreeInputsProps = {
  item : DevTreeLinks
}

function DevTreeInputs({item} : DevTreeInputsProps ) {
  return (
    <div className="bg-white shadow-sm">
      <div
        className="w-12 h-12 shadow-sm"
        style={{backgroundImage: `url('/social/icon_${item.name}.svg')`}}
      ></div>
      <input type="text"
      
      />
    </div>
  )
}

export default DevTreeInputs