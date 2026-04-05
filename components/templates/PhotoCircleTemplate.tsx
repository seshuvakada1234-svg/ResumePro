import { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
}

export default function PhotoCircleTemplate({ data }: Props) {
  const info = data.personalInfo ?? {};

  return (
    <div
      style={{
        width: "794px",
        height: "1123px",
        minHeight: "1123px",
        maxHeight: "1123px",
        overflow: "hidden",
        background: "#ffffff",
        fontFamily: "sans-serif",
        display: "grid",
        gridTemplateColumns: "220px 1fr"
      }}
    >
      {/* LEFT SIDEBAR */}
      <div className="bg-gray-100 flex flex-col items-center pt-8 px-4 gap-6 h-full">
        {/* Circular Photo */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-300 shrink-0">
          {(info.photo || info.profileImage) ? (
            <img src={info.photo || info.profileImage} alt={info.name || info.fullName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-4xl font-bold">
              {(info.name || info.fullName)?.charAt(0) ?? "A"}
            </div>
          )}
        </div>

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="w-full">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-700 mb-2 border-b border-gray-300 pb-1">
              Skills
            </h3>
            <ul className="space-y-1.5">
              {data.skills.map((skill, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                  <span className="mt-0.5 text-gray-400">•</span>
                  {typeof skill === "string" ? skill : skill.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div className="w-full">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-700 mb-2 border-b border-gray-300 pb-1">
              Languages
            </h3>
            <ul className="space-y-1.5">
              {data.languages.map((lang, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                  <span className="mt-0.5 text-gray-400">•</span>
                  {typeof lang === "string" ? lang : lang.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <div className="w-full">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-700 mb-2 border-b border-gray-300 pb-1">
              Certifications
            </h3>
            <ul className="space-y-1.5">
              {data.certifications.map((cert, i) => (
                <li key={i} className="text-xs text-gray-600">
                  {typeof cert === "string" ? cert : cert.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* RIGHT MAIN CONTENT */}
      <div className="flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-4 border-b border-gray-200">
          <h1 className="text-2xl font-extrabold uppercase tracking-wide text-gray-900">
            {info.name || info.fullName || "Your Name"}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">{info.title ?? "Your Title"}</p>
          <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
            {info.email && <span>✉ {info.email}</span>}
            {info.location && <span>📍 {info.location}</span>}
            {info.phone && <span>📞 {info.phone}</span>}
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-5 flex flex-col gap-5">
          {/* Summary */}
          {(data.summary || info.summary) && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-2">
                Summary
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed">{data.summary || info.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-3">
                Experience
              </h2>
              <div className="flex flex-col gap-4">
                {data.experience.map((exp, i) => (
                  <div key={i}>
                    <p className="text-sm font-bold text-gray-900">
                      {exp.position}{exp.company ? `, ${exp.company}` : ""}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {exp.startDate ? `${exp.startDate} — ${exp.endDate ?? "Present"}` : exp.duration}
                    </p>
                    {exp.description && (
                      <p className="text-xs text-gray-600 mt-1 whitespace-pre-line">{exp.description}</p>
                    )}
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="mt-1.5 space-y-0.5">
                        {exp.bullets.map((b, j) => (
                          <li key={j} className="text-xs text-gray-600 flex gap-2">
                            <span className="shrink-0">•</span><span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-3">
                Education
              </h2>
              <div className="flex flex-col gap-3">
                {data.education.map((edu, i) => (
                  <div key={i}>
                    <p className="text-sm font-bold text-gray-900">
                      {edu.degree}{edu.school ? `, ${edu.school}` : ""}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {edu.startDate ? `${edu.startDate} — ${edu.endDate ?? "Present"}` : edu.year}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
