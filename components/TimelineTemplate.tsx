import { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
  accentColor?: string;
}

export default function TimelineTemplate({
  data,
  accentColor = "#06B6D4",
}: Props) {
  return (
    <div className="min-h-[1056px] w-full bg-white font-sans text-sm">
      {/* HEADER */}
      <div className="px-10 py-8 border-b-4" style={{ borderColor: accentColor }}>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          {data.personalInfo?.name}
        </h1>
        <p className="text-sm font-semibold mt-1" style={{ color: accentColor }}>
          {data.personalInfo?.title}
        </p>
        <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
          {data.personalInfo?.email && <span>✉ {data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span>📞 {data.personalInfo.phone}</span>}
          {data.personalInfo?.location && <span>📍 {data.personalInfo.location}</span>}
          {data.personalInfo?.linkedin && <span>🔗 {data.personalInfo.linkedin}</span>}
        </div>
      </div>

      <div className="flex px-10 py-6 gap-10">
        {/* MAIN LEFT */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Summary */}
          {data.summary && (
            <div>
              <h2
                className="text-xs font-black uppercase tracking-widest mb-2"
                style={{ color: accentColor }}
              >
                Summary
              </h2>
              <p className="text-xs text-gray-700 leading-relaxed">{data.summary}</p>
            </div>
          )}

          {/* Experience - Timeline */}
          {data.experience && data.experience.length > 0 && (
            <div>
              <h2
                className="text-xs font-black uppercase tracking-widest mb-4"
                style={{ color: accentColor }}
              >
                Career Timeline
              </h2>
              <div className="relative">
                {/* Vertical line */}
                <div
                  className="absolute left-3 top-0 bottom-0 w-0.5"
                  style={{ backgroundColor: accentColor, opacity: 0.3 }}
                />
                <div className="space-y-6">
                  {data.experience.map((exp, i) => (
                    <div key={i} className="relative pl-10">
                      {/* Timeline dot */}
                      <div
                        className="absolute left-1.5 top-1 w-3 h-3 rounded-full border-2 bg-white"
                        style={{ borderColor: accentColor }}
                      />
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{exp.position}</p>
                          <p className="text-xs font-semibold" style={{ color: accentColor }}>
                            {exp.company}
                          </p>
                        </div>
                        <span
                          className="text-xs shrink-0 ml-2 px-2 py-0.5 rounded-full text-white font-medium"
                          style={{ backgroundColor: accentColor }}
                        >
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
                              <span style={{ color: accentColor }}>›</span> {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Education Timeline */}
          {data.education && data.education.length > 0 && (
            <div>
              <h2
                className="text-xs font-black uppercase tracking-widest mb-4"
                style={{ color: accentColor }}
              >
                Education
              </h2>
              <div className="relative">
                <div
                  className="absolute left-3 top-0 bottom-0 w-0.5"
                  style={{ backgroundColor: accentColor, opacity: 0.3 }}
                />
                <div className="space-y-4">
                  {data.education.map((edu, i) => (
                    <div key={i} className="relative pl-10">
                      <div
                        className="absolute left-1.5 top-1 w-3 h-3 rounded-full border-2 bg-white"
                        style={{ borderColor: accentColor }}
                      />
                      <p className="font-bold text-gray-900 text-sm">{edu.degree}</p>
                      <p className="text-xs text-gray-500">{edu.school}</p>
                      <p className="text-xs text-gray-400">
                        {edu.startDate} – {edu.endDate ?? "Present"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-48 flex flex-col gap-5">
          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div>
              <h2
                className="text-xs font-black uppercase tracking-widest mb-2"
                style={{ color: accentColor }}
              >
                Skills
              </h2>
              <ul className="space-y-1.5">
                {data.skills.map((skill, i) => (
                  <li key={i} className="text-xs text-gray-600 flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: accentColor }}
                    />
                    {typeof skill === "string" ? skill : skill.name}
                  </li>
                ))}
              </ul>
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
                  <li key={i}>{typeof cert === "string" ? cert : cert.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <div>
              <h2
                className="text-xs font-black uppercase tracking-widest mb-2"
                style={{ color: accentColor }}
              >
                Projects
              </h2>
              <div className="space-y-2">
                {data.projects.map((proj, i) => (
                  <div key={i}>
                    <p className="font-bold text-xs text-gray-900">{proj.name}</p>
                    {proj.description && (
                      <p className="text-xs text-gray-500 mt-0.5">{proj.description}</p>
                    )}
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