interface RemoveFromCartBtnProps {
  onClick: () => void;
}

const RemoveFromCartBtn: React.FunctionComponent<RemoveFromCartBtnProps> = ({
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-red-500 text-white text-s font-medium rounded-full hover:opacity-50"
    >
      Ta bort
    </button>
  );
};

export default RemoveFromCartBtn;
