import { Link } from "react-router-dom";
import ErrorBoundry from "../../Errorboundry";
import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product_card">
      <ErrorBoundry>
        <div className="product_card_info">
          <Link to="/:id">
            <p>{"{Poduct_image}"}</p>
            <p>{"{Product_titel}"}</p>
            <p>{"{Price}"}</p>
          </Link>
        </div>
      </ErrorBoundry>
    </div>
  );
}

export default ProductCard;
