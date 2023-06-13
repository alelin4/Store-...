import { Divider } from '../../../node_modules/@mui/material/index';
import SimpleForm from './Form';

function Contact() {
  return (
    <>
    <h2 className="text-xl pb-4 text-center">Vi finns här ifall du behöver nå oss.</h2>
    <div className="flex flex-wrap justify-center items-center  ..."> 
      <div>
        <p className="text-l">Kontakt telefon: 070-0000000</p>
        <p className="text-l">Email: webshop@grupp2.se</p>
      </div>

      <div>
      <SimpleForm className="text-xl" />
      </div>
    </div>
    </>
    )
  }

export default Contact;

// pl-2 pt-1 rad 8


 
