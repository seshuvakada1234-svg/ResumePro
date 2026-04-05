import { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
}

export default function MinimalProTemplate({ data }: Props) {
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
        fontFamily: "'Times New Roman', Georgia, serif",
        padding: "40px 50px",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Header */}
      <div className="text-center mb-1">
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Georgia, serif" }}>
          {info.name || info.fullName || "Your Name"}
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">{info.title ?? "Your Title"}</p>
      </div>

      {/* Contact bar */}
      <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500 mt-2 mb-4">
        {info.location && <span>{info.location}</span>}
        {info.location && info.phone && <span>•</span>}
        {info.phone && <span>{info.phone}</span>}
        {info.phone && info.email && <span>•</span>}
        {info.email && <span>{info.email}</span>}
      </div>

      <hr className="border-gray-300 mb-4" />

      {/* Summary */}
      {(data.summary || info.summary) && (
        <div className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 mb-1">Summary</h2>
          <p className="text-xs text-gray-600 leading-relaxed">{data.summary || info.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 mb-2">Experience</h2>
          <div className="flex flex-col gap-4">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <p className="text-sm font-bold text-gray-900">
                  {exp.position}
                  {(exp.startDate || exp.duration) && (
                    <span className="font-normal text-gray-600">
                      , {exp.startDate ? `${exp.startDate} - ${exp.endDate ?? "Current"}` : exp.duration}
                    </span>
                  )}
                </p>
                {exp.company && (
                  <p className="text-xs font-semibold text-gray-700 mt-0.5">{exp.company}</p>
                )}
                {exp.description && (
                  <p className="text-xs text-gray-600 mt-1 whitespace-pre-line">{exp.description}</p>
                )}
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="mt-1.5 space-y-0.5 ml-4">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="text-xs text-gray-600 list-disc">{b}</li>
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
        <div className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 mb-2">Education</h2>
          <div className="flex flex-col gap-2">
            {data.education.map((edu, i) => (
              <div key={i}>
                <p className="text-xs font-bold text-gray-900">
                  {edu.degree && edu.school
                    ? `${edu.degree}, ${edu.startDate ? `${edu.startDate} - ${edu.endDate ?? "Present"}` : edu.year}`
                    : edu.degree ?? edu.school}
                </p>
                {edu.school && (
                  <p className="text-xs text-gray-600">{edu.school}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 mb-2">Skills</h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-0.5">
            {data.skills.map((skill, i) => (
              <li key={i} className="text-xs text-gray-600 list-disc ml-4">
                {typeof skill === "string" ? skill : skill.name}
              </li>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 mb-2">Languages</h2>
          <div className="flex flex-wrap gap-4">
            {data.languages.map((lang, i) => (
              <span key={i} className="text-xs text-gray-600">
                {typeof lang === "string" ? lang : lang.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 mb-2">Certifications</h2>
          <ul className="space-y-0.5">
            {data.certifications.map((cert, i) => (
              <li key={i} className="text-xs text-gray-600 list-disc ml-4">
                {typeof cert === "string" ? cert : cert.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
