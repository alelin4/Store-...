import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";

function ProductDetails() {
  return (
    <div>
      <p>{"{Product_image}"}</p>
      <p>{"{Product_title}"}</p>
      <p>{"{Product_price}"}</p>
      <p>{"{Product_description}"}</p>
      <AddToCartBtn />
    </div>
  );
}

export default ProductDetails;
