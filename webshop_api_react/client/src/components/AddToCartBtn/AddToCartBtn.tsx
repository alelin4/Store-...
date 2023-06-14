interface AddToCartButtonProps {
  onClick: () => void;
 
}

const AddToCartButton: React.FunctionComponent<AddToCartButtonProps> = ({
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-Green-500 hover:bg-green-500 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
    >
       Köp
    </button>
  );
};

export default AddToCartButton;
