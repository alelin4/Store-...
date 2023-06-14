import ErrorBoundry from "../../ErrorBoundry";

function About() {
  return (
    <ErrorBoundry>
      <div className="flex flex-col pl-8 pr-8 pt-1 text-center ...">
      <h2 className="text-xl">Välkommen till vår "Om oss" sida!</h2>
      <p className="text-l">Vi är av Sveriges ledande inom möbler och speciellt sängar. Vi har sedan starten varit ett företag som vill erbjuda sköna, 
      hållbara och sängar av högkvalitet. Vi har stort fokus på hållbarhet för att du och naturen ska kunna sova gott om natten. Våra sängar byggs av 14 händer. 
      Sju duktiga sängbyggare med en gemensam strävan: att skapa en säng för livet.</p>
      <h2 className="text-xl pt-10">Vår Vision</h2>
      <p className="text-l">Vår vision är att vi ska vara det självklara valet för dig när det är dags att införskaffa sig en nu säng. 
      En god natts sömn är väsentligt för att klara dagen och vi ge dig alla förutsättningar du behöver för att starta på topp. 
      Vi brinner för att hitta rätt säng för varje persons unika behov och allt görs med omtanke för dig, sömnen och för livet. 
      Vi värnar om vår natur och tar därför ansvar för vår miljöpåverkan genom kontroll i alla led. Våra sängar tillverkas först efter 
      beställning vilket innebär att ingen säng tillverkas i onödan. Din säng levereras sedan hela vägen hem till dig, helt utan mellanhänder, 
      från beställning och hela vägen in till ditt sovrum. SÅ hos oss hittar en säng som passar just dig!</p>
      </div>
    </ErrorBoundry>
  );
}

export default About;
