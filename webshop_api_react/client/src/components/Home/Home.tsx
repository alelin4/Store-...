
import ProductsList from "../ProductsList/ProductsList";
import ProductCard from "../ProductCard/ProductCard";

import "./Home.css";
//import FilterDropdown from "../FilterDropdown/FilterDropdown";
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
          
        </ErrorBoundry>

        <ErrorBoundry>
          <ProductsList />
        </ErrorBoundry>
        <ErrorBoundry>

          <ProductCard />

        </ErrorBoundry>
      </div>
    </ErrorBoundry>
  );
}

export default Home;