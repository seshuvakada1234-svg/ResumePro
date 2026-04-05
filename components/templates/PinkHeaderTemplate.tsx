import { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
}

export default function PinkHeaderTemplate({ data }: Props) {
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
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Pink top bar with address */}
      <div
        className="w-full px-10 py-3 flex flex-wrap justify-center gap-4 text-xs text-gray-700"
        style={{ backgroundColor: "#fce4e4" }}
      >
        {info.location && <span>{info.location}</span>}
        {info.phone && <span>• {info.phone}</span>}
        {info.email && <span>• {info.email}</span>}
      </div>

      {/* Name + Title */}
      <div className="text-center px-10 py-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold uppercase tracking-widest text-gray-900">
          {info.name || info.fullName || "Your Name"}
        </h1>
        <p className="text-sm text-gray-500 mt-1">{info.title ?? "Your Title"}</p>
      </div>

      {/* Body with left label column */}
      <div className="px-10 py-5 flex flex-col gap-4">

        {/* Summary */}
        {(data.summary || info.summary) && (
          <div className="flex gap-6 border-b border-gray-200 pb-4">
            <div className="w-24 shrink-0 pt-0.5">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-800">
                Summary
              </p>
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600 leading-relaxed">{data.summary || info.summary}</p>
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="flex gap-6 border-b border-gray-200 pb-4">
            <div className="w-24 shrink-0 pt-0.5">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-800">
                Skills
              </p>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                {data.skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-gray-700">
                    <span className="text-gray-400">•</span>
                    {typeof skill === "string" ? skill : skill.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="flex gap-6 border-b border-gray-200 pb-4">
            <div className="w-24 shrink-0 pt-0.5">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-800">
                Experience
              </p>
            </div>
            <div className="flex-1 flex flex-col gap-5">
              {data.experience.map((exp, i) => (
                <div key={i}>
                  <p className="text-sm font-bold uppercase text-gray-900">
                    {exp.position}
                    {exp.company ? ` AT ${exp.company.toUpperCase()}` : ""}
                  </p>
                  {(exp.company || exp.startDate || exp.duration) && (
                    <p className="text-xs font-semibold text-gray-700 mt-0.5">
                      {exp.company && <span>{exp.company}</span>}
                      {(exp.startDate || exp.duration) && (
                        <span className="text-gray-500">
                          {exp.company ? ", " : ""}
                          {exp.startDate ? `${exp.startDate} - ${exp.endDate ?? "Present"}` : exp.duration}
                        </span>
                      )}
                    </p>
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
          <div className="flex gap-6 border-b border-gray-200 pb-4">
            <div className="w-24 shrink-0 pt-0.5">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-800">
                Education
              </p>
            </div>
            <div className="flex-1 flex flex-col gap-3">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <p className="text-sm font-bold uppercase text-gray-900">{edu.school}</p>
                  {(edu.startDate || edu.endDate || edu.year) && (
                    <p className="text-xs text-gray-500">
                      {edu.startDate ? `${edu.startDate} - ${edu.endDate ?? "Present"}` : edu.year}
                    </p>
                  )}
                  {edu.degree && (
                    <p className="text-xs text-gray-600">{edu.degree}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div className="flex gap-6 pb-4">
            <div className="w-24 shrink-0 pt-0.5">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-800">
                Languages
              </p>
            </div>
            <div className="flex-1 flex flex-wrap gap-4">
              {data.languages.map((lang, i) => (
                <span key={i} className="text-xs text-gray-700">
                  {typeof lang === "string" ? lang : lang.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <div className="flex gap-6 pb-4">
            <div className="w-24 shrink-0 pt-0.5">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-800">
                Certifications
              </p>
            </div>
            <div className="flex-1">
              <ul className="space-y-0.5">
                {data.certifications.map((cert, i) => (
                  <li key={i} className="text-xs text-gray-700">
                    {typeof cert === "string" ? cert : cert.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
