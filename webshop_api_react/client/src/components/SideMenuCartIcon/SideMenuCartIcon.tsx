import { useContext } from "react";
import { GrCart } from "react-icons/gr";
import { StoreContext } from "../../Context-reducer/StoreContext";

function SideMenuCartIcon() {
  const storeContext = useContext(StoreContext);

  if (!storeContext) {
    return null;
  }

  const { products } = storeContext;

  return (
    <div className="relative">
      <span className="absolute right-7px top-[-4px] bg-gray-300 h-4 w-4 rounded-full flex items-center justify-center text-gray-800">
        {products.length}
      </span>
      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white ml-3 mr-3">
        <GrCart className="text-2xl text-black" />
      </div>
    </div>
  );
}

export default SideMenuCartIcon;
