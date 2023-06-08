function CartProduct({ product }) {
  return (
    <>
      <div>
        <img src={product.image} />
      </div>
      <div>
        <p>{product.title}</p>
        <p>{product.price}</p>
      </div>
    </>
  );
}

export default CartProduct;
