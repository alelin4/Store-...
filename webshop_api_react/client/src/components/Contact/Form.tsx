import React, { useState } from "react";

interface FormValues {
  name: string;
  email: string;
  issue: string;
}

const SimpleForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    email: "",
    issue: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formValues); // Fixa logiken för "skicka här"
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Namn:</label>
        <input
          type="text"
          id="name"
          name="name"
          className="border rounded-lg px-2 py-1 mt-1 w-full mb-3"
          value={formValues.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          className="border rounded-lg px-2 py-1 mt-1 w-full mb-3"
          type="text"
          id="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="issue">Ärende:</label>
        <textarea
          id="issue"
          name="issue"
          className="border rounded-lg px-2 py-1 mt-1 w-full mb-4"
          value={formValues.issue}
          onChange={handleChange}
          required
        />
      </div>
      <button
        className="bg-blue-600 text-white text- font-medium rounded-lg py-1 px-3"
        type="submit"
      >
        Skicka
      </button>
    </form>
  );
};

export default SimpleForm;
