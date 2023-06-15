import SimpleForm from "./Form";

function Contact() {
  return (
    <div className=" flex flex-col items-center justify-center gap-4 mb-7 mt-3 py-7">
      <div className="w-auto m-2 mb-8 p-7 border border-gray-200 rounded-lg">
        <h2 className=" flex flex-col items-center justify-center gap-4 mt-2 py-2 text-xl font-bold">
          Vi finns här ifall du behöver nå oss.
        </h2>
        <div className="flex flex-wrap justify-center items-center">
        <div className="w-1/2 border-r-2 pr-12 p-3">
            <p className="font-bold mb-2">Kontakt telefon:</p><p className="mb-6"> 070-0000000</p>
            <p className="font-bold mb-2">Email:</p><p> webshop@grupp2.se</p>
          </div>

          <div className="w-1/2 p-5">

            <SimpleForm />
          </div>
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default Contact;

// pl-2 pt-1 rad 8
