import ProductsList from "../ProductsList/ProductsList";
import ErrorBoundry from "../../Errorboundry";

function Home() {
  return (
    <ErrorBoundry>
      <div>
        <ErrorBoundry>
          <img
            className="flex p-2 items-center justify-center m-0"
            src="https://pictureserver.net/images/pic/da/0b/english_src_banner_picid_6684_image.jpg?ver=3"
            alt=""
          />
        </ErrorBoundry>
        <ErrorBoundry>
          <ProductsList />
        </ErrorBoundry>
      </div>
    </ErrorBoundry>
  );
}

export default Home;
