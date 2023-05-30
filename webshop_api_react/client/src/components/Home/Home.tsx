import Products from "../Products/Products";
import ProductCard from "../ProductCard/ProductCard";
import "./Home.css";
import FilterDropdown from "../FilterDropdown/FilterDropdown";
import ErrorBoundry from "../../Errorboundry";

function Home() {
  return (
    <ErrorBoundry>
      <div>
        <ErrorBoundry>
          <img
            src="https://pictureserver.net/images/pic/da/0b/english_src_banner_picid_6684_image.jpg?ver=3"
            alt=""
          />
        </ErrorBoundry>
        <ErrorBoundry>
          <FilterDropdown filter={undefined} setFilter={undefined} />
        </ErrorBoundry>

        <ErrorBoundry>
          <Products />
        </ErrorBoundry>
        <ErrorBoundry>
          <ProductCard product={undefined} />
        </ErrorBoundry>
      </div>
    </ErrorBoundry>
  );
}

export default Home;
