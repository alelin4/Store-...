import React, { useState } from 'react';
interface FormValues {
    name: string;
    issue: string;
  }
  
  const SimpleForm: React.FC = () => {
    const [formValues, setFormValues] = useState<FormValues>({
      name: '',
      issue: '',
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log(formValues); // You can handle the form submission logic here
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Namn:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="issue">Ärende:</label>
          <textarea
            id="issue"
            name="issue"
            value={formValues.issue}
            onChange={handleChange}
            required
          />
        </div>
        <button className="text-center" type="submit">Skicka</button>
      </form>
    );
  };
  
  
  export default SimpleForm;