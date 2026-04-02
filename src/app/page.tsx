"use client";

import { useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDownload = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = document.getElementById("resume-preview");

      if (!element) {
        console.error("Preview element not found");
        setLoading(false);
        return;
      }

      await html2pdf()
        .from(element)
        .save("resume.pdf");
    } catch (error) {
      console.error("PDF generation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      
      {/* FORM */}
      <div>
        <h2 className="text-xl font-bold mb-4">Personal Info</h2>

        <input name="fullName" placeholder="Full Name"
          className="border p-2 w-full mb-3"
          value={formData.fullName}
          onChange={handleChange}
        />

        <input name="email" placeholder="Email"
          className="border p-2 w-full mb-3"
          value={formData.email}
          onChange={handleChange}
        />

        <textarea name="summary" placeholder="Summary"
          className="border p-2 w-full mb-3"
          value={formData.summary}
          onChange={handleChange}
        />

        <button
          type="button"
          onClick={handleDownload}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Download PDF
        </button>

        {loading && <p className="mt-2">Generating PDF...</p>}
      </div>

      {/* PREVIEW */}
      <div
        id="resume-preview"
        className="bg-white p-8 shadow-lg min-h-[500px]"
      >
        <h1 className="text-3xl font-bold text-center">
          {formData.fullName || "YOUR NAME"}
        </h1>

        <p className="text-center mt-2">
          {formData.email}
        </p>

        <hr className="my-4" />

        <p>{formData.summary}</p>
      </div>

    </div>
  );
}