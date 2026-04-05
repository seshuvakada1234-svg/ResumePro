import { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
  accentColor?: string;
  headerBg?: string;
}

export default function SplitHeaderTemplate({
  data,
  accentColor = "#7C3AED",
  headerBg = "#7C3AED",
}: Props) {
  return (
    <div className="min-h-[1056px] w-full bg-white font-sans text-sm flex flex-col">
      {/* FULL WIDTH HEADER */}
      <div
        className="w-full px-10 py-8 text-white"
        style={{ backgroundColor: headerBg }}
      >
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black tracking-tight leading-none">
              {data.personalInfo?.name}
            </h1>
            <p className="text-sm mt-1 opacity-80 font-medium tracking-wide">
              {data.personalInfo?.title}
            </p>
          </div>
          <div className="text-right text-xs opacity-80 space-y-0.5">
            {data.personalInfo?.email && <p>✉ {data.personalInfo.email}</p>}
            {data.personalInfo?.phone && <p>📞 {data.personalInfo.phone}</p>}
            {data.personalInfo?.location && <p>📍 {data.personalInfo.location}</p>}
            {data.personalInfo?.linkedin && <p>🔗 {data.personalInfo.linkedin}</p>}
          </div>
        </div>
      </div>

      {/* TWO COLUMN BODY */}
      <div className="flex flex-1">
        {/* LEFT COLUMN */}
        <div className="w-2/3 p-8 flex flex-col gap-6 border-r border-gray-100">
          {/* Summary */}
          {data.summary && (
            <div>
              <h2
                className="text-xs font-black uppercase tracking-widest mb-2 pb-1 border-b-2"
                style={{ color: accentColor, borderColor: accentColor }}
              >
                Profile
              </h2>
              <p className="text-xs text-gray-700 leading-relaxed">{data.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <div>
              <h2
                className="text-xs font-black uppercase tracking-widest mb-3 pb-1 border-b-2"
                style={{ color: accentColor, borderColor: accentColor }}
              >
                Experience
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{exp.position}</p>
                        <p className="text-xs font-semibold" style={{ color: accentColor }}>
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400 shrink-0 ml-2">
                        {exp.startDate} – {exp.endDate ?? "Present"}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="mt-1 space-y-0.5">
                        {exp.bullets.map((b, j) => (
                          <li key={j} className="text-xs text-gray-600 flex gap-1">
                            <span style={{ color: accentColor }}>•</span> {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <div>
              <h2
                className="text-xs font-black uppercase tracking-widest mb-3 pb-1 border-b-2"
                style={{ color: accentColor, borderColor: accentColor }}
              >
                Projects
              </h2>
              <div className="space-y-2">
                {data.projects.map((proj, i) => (
                  <div key={i}>
                    <p className="font-bold text-gray-900 text-sm">{proj.name}</p>
                    {proj.description && (
                      <p className="text-xs text-gray-600 mt-0.5">{proj.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-1/3 p-6 flex flex-col gap-5 bg-gray-50">
          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div>
              <h2
                className="text-xs font-black uppercase tracking-widest mb-2"
                style={{ color: accentColor }}
              >
                Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 rounded text-white font-medium"
                    style={{ backgroundColor: accentColor }}
                  >
                    {typeof skill === "string" ? skill : skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div>
              <h2
                className="text-xs font-black uppercase tracking-widest mb-2"
                style={{ color: accentColor }}
              >
                Education
              </h2>
              <div className="space-y-3">
                {data.education.map((edu, i) => (
                  <div key={i}>
                    <p className="font-bold text-gray-900 text-xs">{edu.degree}</p>
                    <p className="text-xs text-gray-500">{edu.school}</p>
                    <p className="text-xs text-gray-400">
                      {edu.startDate} – {edu.endDate ?? "Present"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <div>
              <h2
                className="text-xs font-black uppercase tracking-widest mb-2"
                style={{ color: accentColor }}
              >
                Certifications
              </h2>
              <ul className="space-y-1 text-xs text-gray-600">
                {data.certifications.map((cert, i) => (
                  <li key={i} className="flex gap-1 items-start">
                    <span style={{ color: accentColor }}>✓</span>
                    {typeof cert === "string" ? cert : cert.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div>
              <h2
                className="text-xs font-black uppercase tracking-widest mb-2"
                style={{ color: accentColor }}
              >
                Languages
              </h2>
              <ul className="space-y-1 text-xs text-gray-600">
                {data.languages.map((lang, i) => (
                  <li key={i}>
                    {typeof lang === "string" ? lang : `${lang.name} — ${lang.level ?? ""}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}