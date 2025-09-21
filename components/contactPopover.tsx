"use client";

import { contactFormAccessKey } from "@/data/webGlobals";
import React, { useState } from "react";

const ContactPopover: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const hasOpened = localStorage.getItem("contactPopoverOpened");
    if (!hasOpened) {
      const timer = setTimeout(() => {
        setOpen(true);
        localStorage.setItem("contactPopoverOpened", "true");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.name) newErrors.name = "Prosím, zadejte své celé jméno.";
    if (!form.email)
      newErrors.email = "Prosím, zadejte svou e-mailovou adresu.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Prosím, zadejte platnou e-mailovou adresu.";
    if (!form.message) newErrors.message = "Prosím, zadejte svou zprávu.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidated(true);
    if (!validate()) return;
    setLoading(true);
    setResult("Prosímete čekejte...");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: contactFormAccessKey,
          subject: "Nový dotaz z webu Medihelix - kontaktní popup",
          name: form.name,
          email: form.email,
          message: form.message,
          botcheck: "",
        }),
      });
      const json = await response.json();
      if (response.status === 200) {
        setResult(json.message);
      } else {
        setResult(json.message || "Něco se pokazilo!");
      }
    } catch (error) {
      setResult("Něco se pokazilo!");
    }
    setLoading(false);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setResult(""), 5000);
  };

  return (
    <>
      {open && (
        <div
          className="fixed flex flex-col z-50 bottom-[100px] top-0 right-0 left-0 sm:top-auto sm:right-5 sm:left-auto h-[calc(100%-95px)] w-full sm:w-[350px] overflow-auto min-h-[250px] sm:h-[600px] border border-gray-300 bg-white shadow-2xl rounded-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex p-5 flex-col justify-center items-center h-32 bg-sky">
            <h3 className="text-lg text-white font-bold">Máte dotaz?</h3>
            <p className="text-white opacity-80">
              Rádi jej zodpovíme! Napište nám!
            </p>
          </div>
          <div className="bg-gray-50 flex-grow p-6">
            <form
              className="needs-validation"
              noValidate
              onSubmit={handleSubmit}
            >
              <input
                type="hidden"
                name="access_key"
                value={contactFormAccessKey}
              />
              <input
                type="hidden"
                name="subject"
                value="New Submission from Web3Forms"
              />
              <input
                type="checkbox"
                name="botcheck"
                style={{ display: "none" }}
              />

              <div className="mb-4">
                <label
                  htmlFor="full_name"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Vaše jméno
                </label>
                <input
                  type="text"
                  name="name"
                  id="full_name"
                  placeholder="Jan Novák"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 placeholder-gray-300 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 ${
                    validated && errors.name
                      ? "border-red-400"
                      : "border-gray-300"
                  }`}
                />
                {validated && errors.name && (
                  <div className="text-red-400 text-sm mt-1">{errors.name}</div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Vaše e-mailová adresa
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="jan@novak.cz"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 placeholder-gray-300 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 ${
                    validated && errors.email
                      ? "border-red-400"
                      : "border-gray-300"
                  }`}
                />
                {validated && errors.email && (
                  <div className="text-red-400 text-sm mt-1">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Vaše zpráva
                </label>
                <textarea
                  rows={4}
                  name="message"
                  id="message"
                  placeholder="Vaše zpráva"
                  required
                  value={form.message}
                  onChange={handleChange}
                  className={`w-full h-28 px-3 py-2 placeholder-gray-300 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 ${
                    validated && errors.message
                      ? "border-red-400"
                      : "border-gray-300"
                  }`}
                />
                {validated && errors.message && (
                  <div className="text-red-400 text-sm mt-1">
                    {errors.message}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <button
                  type="submit"
                  className="rounded-md text-md font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky bg-sky text-light hover:bg-sky-700 px-3.5 py-2.5 shadow-xs w-full"
                  disabled={loading}
                >
                  {loading ? "Posílám..." : "Odeslat zprávu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <button
        id="w3f__widget--btn"
        onClick={() => setOpen((o) => !o)}
        className="fixed z-40 right-5 bottom-5 shadow-lg flex justify-center items-center w-14 h-14 bg-sky rounded-xl focus:outline-none hover:bg-sky-600 focus:bg-sky-600 transition duration-300 ease"
      >
        {!open ? (
          <svg
            className="w-6 h-6 text-white absolute"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-white absolute"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        )}
      </button>
    </>
  );
};

export default ContactPopover;
