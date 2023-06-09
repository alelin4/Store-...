interface AddToCartButtonProps {
  onClick: () => void;
}

const AddToCartButton: React.FunctionComponent<AddToCartButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-indigo-500 text-white text-lg font-medium rounded-full"
    >
       Plus +
    </button>
  );
};

export default AddToCartButton;
