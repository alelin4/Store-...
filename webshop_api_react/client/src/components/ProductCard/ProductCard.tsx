import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";
import "/src/index.css"

function ProductCard( { product } ) {
  return(

    <div className="md:container md:mx-auto"> 
    <img className="object-contain h-48 w-96 ..." src={product.image} alt="" />
      <h1 >{product.title}</h1>
      <p>{product.price} Kr</p>
   
   <AddToCartBtn/>
    </div>
  )
}

export default ProductCard;
