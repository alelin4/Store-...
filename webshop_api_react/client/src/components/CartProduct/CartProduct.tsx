interface CartItem {
  image: string;
  title: string;
  price: number;
}

function CartProduct({ cartItem }: { cartItem: CartItem }) {
  return (
    <>
      <div>
        <img src={cartItem.image} alt="Product" />
      </div>
      <div>
        <p>{cartItem.title}</p>
        <p>{cartItem.price}</p>
      </div>
    </>
  );
}

export default CartProduct;
