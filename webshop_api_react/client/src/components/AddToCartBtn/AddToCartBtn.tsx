interface AddToCartButtonProps {
  onClick: () => void;
 
}

const AddToCartButton: React.FunctionComponent<AddToCartButtonProps> = ({
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg text-lg hover:opacity-50"
    >
       Köp
    </button>
  );
};

export default AddToCartButton;
