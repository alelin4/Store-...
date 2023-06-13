function CartProduct({ cartItem }) {
  return (
    <>
      <div>
        <img src={cartItem.image} />
      </div>
      <div>
        <p>{cartItem.title}</p>
        <p>{cartItem.price}</p>
      </div>
    </>
  );
}

export default CartProduct;
