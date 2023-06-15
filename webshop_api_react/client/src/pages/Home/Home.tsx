import ProductsList from "../../components/Product/ProductsList/ProductsList";
import ErrorBoundry from "../../Errorboundry";

function Home() {
  return (
    <ErrorBoundry>
      <div>
        <ErrorBoundry>
          <div className="flex justify-center w-full">
            <img
              className="max-w-screen-2xl flex flex-col items-center gap-3 lg:grid lg:grid-cols-4"
              src="https://pictureserver.net/images/pic/da/0b/english_src_banner_picid_6684_image.jpg?ver=3"
              alt=""
            />
          </div>
        </ErrorBoundry>
        <ErrorBoundry>
          <ProductsList />
        </ErrorBoundry>
      </div>
    </ErrorBoundry>
  );
}

export default Home;
