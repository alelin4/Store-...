

import { GrContact, GrMailOption, GrPhone, GrView } from "react-icons/gr";
import SimpleForm from "./Form";


function About() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 mb-7 mt-3 py-7">
      <div className="w-full md:w-auto m-2 mb-8 flex flex-col md:flex-row border border-gray-200 rounded-lg">
      <div className="w-full md:w-2/3 p-3">
      <h1 className="ml-8 font-bold from-stone-200 text-2xl  mt-3">
            Om OSS!
          </h1>

          <div className="flex flex-wrap justify-center items-center w-full md:w-96 p-3">
            <p className="text-l">
              Vi är av Sveriges ledande inom möbler och speciellt sängar. Vi har sedan starten varit ett företag som vill erbjuda sköna, hållbara och sängar av högkvalitet. Vi har stort fokus på hållbarhet för att du och naturen ska kunna sova gott om natten. Våra sängar byggs av 14 händer. Sju duktiga sängbyggare med en gemensam strävan: att skapa en säng för livet.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-auto m-2 mb-8 flex flex-col md:flex-row border border-gray-200 rounded-lg">
        <div className="bg-gray-900 text-white w-full md:w-1/3 p-8 rounded-l-lg flex flex-col items-center justify-center">
          <h1 className="ml-2 font-bold from-stone-200 text-2xl mb-8 mt-3">
            Vår <span className="font-semibold text-blue-500">Vision</span>
          </h1>

          <div className="flex items-center justify-center w-16 h-12 rounded-full font-bold bg-white mb-3">
            <GrView />
          </div>
        </div>

        <div className="w-full md:w-2/3 p-3">
        <h1 className="ml-8 font-bold from-stone-200 text-2xl  mt-3">
            Vår Vision
          </h1>

          <div className="flex flex-wrap justify-center items-center w-full md:w-96 p-3">
            <p className="text-l">
              Vår vision är att vi ska vara det självklara valet för dig när det är dags att införskaffa sig en nu säng. En god natts sömn är väsentligt för att klara dagen och vi ge dig alla förutsättningar du behöver för att starta på topp. Vi brinner för att hitta rätt säng för varje persons unika behov och allt görs med omtanke för dig, sömnen och för livet. Vi värnar om vår natur och tar därför ansvar för vår miljöpåverkan genom kontroll i alla led. Våra sängar tillverkas först efter beställning vilket innebär att ingen säng tillverkas i onödan. Din säng levereras sedan hela vägen hem till dig, helt utan mellanhänder, från beställning och hela vägen in till ditt sovrum. SÅ hos oss hittar en säng som passar just dig!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
