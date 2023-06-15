import React from "react";

interface AddToCartBtnProps {
  onClick: () => void;
  inStock: number;
}

const AddToCartBtn: React.FunctionComponent<AddToCartBtnProps> = ({
  onClick,
  inStock,
}) => {
  if (inStock < 1) {
    return null; // Return null to hide the button when inStock < 1
  }

  return (
    <button
      onClick={onClick}
      className="bg-Green-500 hover:bg-green-500 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
    >
      Köp
    </button>
  );
};

export default AddToCartBtn;
