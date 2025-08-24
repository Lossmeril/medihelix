"use client";

import { contactFormAccessKey } from "@/data/webGlobals";
import React, { FormEvent, useState } from "react";

const ContactForm: React.FC = () => {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Posílám...");
    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.append("access_key", contactFormAccessKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Formulář byl úspěšně odeslán");
        form.reset();
      } else {
        console.log("Error", data);
        setResult(data.message || "Došlo k chybě při odesílání formuláře");
      }
    } catch (error) {
      setResult("Došlo k chybě při odesílání formuláře");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full mx-auto bg-lobster-100 p-8">
      <h3 className="text-2xl font-bold mb-4 text-dark uppercase">
        Kontaktní formulář
      </h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm mb-1 opacity-65">
            Jméno
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            minLength={2}
            className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-steel/50"
            placeholder="Vaše jméno"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm mb-1 opacity-65">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            minLength={3}
            className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-steel/50"
            placeholder="vas@email.cz"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm mb-1 opacity-65">
            Zpráva
          </label>
          <textarea
            id="message"
            name="message"
            required
            minLength={2}
            rows={4}
            className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-steel/50"
            placeholder="Vaše zpráva..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-3.5 py-2.5 bg-steel text-light rounded-md text-md font-semibold shadow-xs transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel hover:bg-steel-700"
        >
          {isSubmitting ? "Odesílání..." : "Odeslat formulář"}
        </button>
      </form>

      {result && (
        <div
          className={`mt-4 p-3 rounded ${
            result.includes("úspěšně")
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {result}
        </div>
      )}
    </div>
  );
};

export default ContactForm;
