import { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
}

export default function LawyerClassicTemplate({ data }: Props) {
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
        fontFamily: "Georgia, 'Times New Roman', serif",
        padding: "40px 50px",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold uppercase tracking-widest text-gray-900">
          {info.name || info.fullName || "Your Name"}
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">{info.title ?? "Your Title"}</p>
        {info.location && (
          <p className="text-xs text-gray-500 mt-1">{info.location}</p>
        )}
        <div className="flex justify-center gap-6 mt-1 text-xs text-gray-600">
          {info.email && <span>{info.email}</span>}
          {info.phone && <span>{info.phone}</span>}
        </div>
      </div>

      <hr className="border-gray-300 mb-4" />

      {/* Summary */}
      {(data.summary || info.summary) && (
        <div className="mb-5">
          <div className="bg-gray-100 px-3 py-1 mb-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-center text-gray-800">
              Summary
            </h2>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">{data.summary || info.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-5">
          <div className="bg-gray-100 px-3 py-1 mb-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-center text-gray-800">
              Experience
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {data.experience.map((exp, i) => (
              <div key={i}>
                {/* Position + dotted line + date */}
                <div className="flex items-baseline gap-1">
                  <span className="text-gray-400 mr-1">❖</span>
                  <span className="text-sm font-bold text-gray-900 shrink-0">
                    {exp.position}
                    {exp.company ? `, ${exp.company}` : ""}
                  </span>
                  <span className="flex-1 border-b border-dotted border-gray-300 mx-2 mb-1" />
                  <span className="text-xs text-gray-500 shrink-0">
                    {exp.startDate ? `${exp.startDate} — ${exp.endDate ?? "Present"}` : exp.duration}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-xs text-gray-600 mt-1 whitespace-pre-line">{exp.description}</p>
                )}
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="mt-1.5 space-y-0.5 ml-4">
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
        <div className="mb-5">
          <div className="bg-gray-100 px-3 py-1 mb-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-center text-gray-800">
              Education
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {data.education.map((edu, i) => (
              <div key={i}>
                <div className="flex items-baseline gap-1">
                  <span className="text-gray-400 mr-1">❖</span>
                  <span className="text-sm font-bold text-gray-900 shrink-0">
                    {edu.school}
                  </span>
                  <span className="flex-1 border-b border-dotted border-gray-300 mx-2 mb-1" />
                  <span className="text-xs text-gray-500 shrink-0">
                    {edu.startDate ? `${edu.startDate} — ${edu.endDate ?? "Present"}` : edu.year}
                  </span>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-gray-500 italic ml-5">{edu.degree}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-5">
          <div className="bg-gray-100 px-3 py-1 mb-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-center text-gray-800">
              Skills
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-1">
            {data.skills.map((skill, i) => (
              <div key={i} className="flex items-baseline gap-1">
                <span className="text-xs text-gray-900 shrink-0">
                  {typeof skill === "string" ? skill : skill.name}
                </span>
                <span className="flex-1 border-b border-dotted border-gray-300 mx-2 mb-0.5" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <div className="mb-5">
          <div className="bg-gray-100 px-3 py-1 mb-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-center text-gray-800">
              Languages
            </h2>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-1">
            {data.languages.map((lang, i) => (
              <span key={i} className="text-xs text-gray-700">
                {typeof lang === "string" ? lang : lang.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
