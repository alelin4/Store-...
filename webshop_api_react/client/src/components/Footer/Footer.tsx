import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <div className=" bottom-0 w-full h-36 bg-gray-900 flex flex-col justify-center items-center text-gray-300">

      <div className="p-2 flex space-x-4 mb-3">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook
            className="text-gray-300 hover:text-gray-500"
            size={30}
          />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter
            className="text-gray-300 hover:text-gray-500"
            size={30}
          />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram
            className="text-gray-300 hover:text-gray-500"
            size={30}
          />
        </a>
      </div>
      <div className="block mb-5">
        <h3 className="mr-4">&copy; Copyright SleepExperts 2023</h3>
      </div>
      </div>
  );
}

export default Footer;
