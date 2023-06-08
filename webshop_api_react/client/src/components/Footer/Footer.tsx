import ErrorBoundry from "../../ErrorBoundry";

function Footer() {
  return (
    <ErrorBoundry>
      <footer className="h-12 bg-gray-900 flex justify-center items-center text-gray-300">
        <p>&copy; Copyright Webbshop-Grupp2 2023</p>
      </footer>
    </ErrorBoundry>
  );
}

export default Footer;
