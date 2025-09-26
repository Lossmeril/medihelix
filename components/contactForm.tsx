"use client";

import React, { FormEvent, useState } from "react";

import { contactFormAccessKey } from "@/data/webGlobals";

interface ContactFormProps {
  product?: { name: string };
}

const ContactForm: React.FC<ContactFormProps> = ({ product }) => {
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
    <div id="kontakt" className="w-full mx-auto bg-sky-50 rounded-xl p-10">
      <svg
        className="w-12 h-12 mb-5 bg-sky-300 p-3 rounded-lg"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      <h2 className="text-2xl font-semibold mb-4">
        {!product ? "Kontaktní formulář" : `Máte dotaz k tomuto produktu?`}
      </h2>
      <p className="text-sm text-gray-600">
        {!product
          ? `Máte-li jakékoliv dotazy ohledně naší nabídky, technických detailů, či potenciální spolupráce, neváhejte se na nás obrátit; rádi vaše dotazy zodpovíme. Kontaktovat nás můžete skrze kontaktní formulář níže, nebo na email`
          : "Máte-li jakékoliv dotazy ohledně tohoto produktu, technických specifikací, či chcete tento produkt poptat, neváhejte se na nás obráti skrze kontaktní formulář níže, nebo na email"}{" "}
        <a
          href="mailto:info@medihelix.cz"
          className="text-sky-600 hover:underline"
        >
          info@medihelix.cz
        </a>
      </p>
      <form onSubmit={onSubmit} className="space-y-4 mt-10">
        <input
          type="hidden"
          name="subject"
          value={
            !product?.name
              ? "Nový dotaz z webu MediHelix"
              : `Nový dotaz z webu MediHelix - ${product.name}`
          }
        />

        {product?.name && (
          <input type="hidden" name="product" value={product.name} />
        )}

        <div>
          <label
            htmlFor="name"
            className="block text-sm mb-1 text-dark font-semibold"
          >
            Jméno
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            minLength={2}
            className="w-full px-4 py-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-sky/50"
            placeholder="Vaše jméno"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm mb-1 text-dark font-semibold"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            minLength={3}
            className="w-full px-4 py-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-sky/50"
            placeholder="vas@email.cz"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm mb-1 text-dark font-semibold"
          >
            Zpráva
          </label>
          <textarea
            id="message"
            name="message"
            required
            minLength={2}
            rows={4}
            className="w-full px-4 py-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-sky/50"
            placeholder="Vaše zpráva..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-3.5 py-2.5 bg-sky text-white rounded-md text-md font-semibold shadow-xs transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky hover:bg-sky-700"
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
