import { GrContact, GrMailOption, GrPhone } from "react-icons/gr";

import SimpleForm from "./Form";

function Contact() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 mb-7 mt-3 py-7">
      <div className="w-full md:w-auto m-2 mb-8 flex flex-col md:flex-row border border-gray-200 rounded-lg">
        <div className="bg-gray-900 text-white w-full md:w-1/3 p-18 rounded-l-lg flex flex-col items-center justify-center">
          <h1 className="ml-8 font-bold from-stone-200 text-2xl mb-8 mt-3">
            Sleep<span className="font-semibold text-blue-500">Experts</span>
          </h1>
          <div className="flex items-center justify-center w-16 h-12 rounded-full bg-white mb-3">
            <GrPhone />
          </div>
          <div className="flex items-center justify-center w-16 h-12 rounded-full font-bold	 bg-white mb-3">
            <GrMailOption />
          </div>
          <div className="flex items-center justify-center w-16 h-12 rounded-full bg-white mb-3">
            <GrContact />
          </div>
        </div>

        <div className="w-full md:w-2/3 p-7">
          <h2 className="text-center text-xl font-bold mb-4">
            Vi finns här ifall du behöver nå oss.
          </h2>
          <div className="flex flex-wrap justify-center items-center">
            <div className="w-full md:w-1/2 md:border-r-2 md:pr-15 p-2">
              <p className="font-bold mb-2">Kontakt telefon:</p>
              <p className="mb-6">070-0000000</p>
              <p className="font-bold mb-2">Email:</p>
              <p>sleep@experts.se</p>
            </div>
            <div className="w-full md:w-1/2 p-4">
              <SimpleForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
