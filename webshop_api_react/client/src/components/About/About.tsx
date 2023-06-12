import ErrorBoundry from "../../Errorboundry";

function About() {
  return (
    <ErrorBoundry>
      <div className="flex flex-col pl-2 pt-1 text-center ...">
      <h2 className="text-xl">Välkommen till vår "Om oss" sida!</h2>
      <p className="text-l">Vi är av Sveriges ledande inom möbler och speciellt sängar. Vi har sedan starten varit ett företag som vill erbjuda sköna, hållbara och sängar av högkvalitet.</p>
      <h2 className="text-xl pt-10">Vår Vision</h2>
      <p className="text-l">Vår vision är att vi ska vara det självklara valet för dig när det är dags att införskaffa sig en nu säng. Hos oss är alla kunder välkomna!</p>
      </div>
    </ErrorBoundry>
  );
}

export default About;
