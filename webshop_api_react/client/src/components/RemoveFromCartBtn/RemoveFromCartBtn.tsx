interface RemoveFromCartBtnProps {
  onClick: () => void;
}

const RemoveFromCartBtn: React.FunctionComponent<RemoveFromCartBtnProps> = ({
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-red-500 text-white text-lg font-medium rounded-full"
    >
      Minus -
    </button>
  );
};

export default RemoveFromCartBtn;
