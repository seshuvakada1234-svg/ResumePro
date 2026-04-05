import { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
  accentColor?: string;
}

export default function GridTemplate({
  data,
  accentColor = "#F59E0B",
}: Props) {
  return (
    <div className="min-h-[1056px] w-full bg-white font-sans text-sm">
      {/* HEADER */}
      <div
        className="w-full px-10 py-7 text-white"
        style={{ backgroundColor: "#0F172A" }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black tracking-tight">
              {data.personalInfo?.name}
            </h1>
            <p className="text-sm mt-0.5 font-medium" style={{ color: accentColor }}>
              {data.personalInfo?.title}
            </p>
          </div>
          <div className="text-right text-xs text-gray-300 space-y-0.5">
            {data.personalInfo?.email && <p>{data.personalInfo.email}</p>}
            {data.personalInfo?.phone && <p>{data.personalInfo.phone}</p>}
            {data.personalInfo?.location && <p>{data.personalInfo.location}</p>}
          </div>
        </div>
      </div>

      {/* SUMMARY STRIP */}
      {data.summary && (
        <div className="px-10 py-4 bg-gray-50 border-b border-gray-200">
          <p className="text-xs text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* GRID BODY */}
      <div className="p-8 grid grid-cols-3 gap-5">
        {/* EXPERIENCE - spans 2 cols */}
        {data.experience && data.experience.length > 0 && (
          <div className="col-span-2">
            <h2
              className="text-xs font-black uppercase tracking-widest mb-3 flex items-center gap-2"
              style={{ color: accentColor }}
            >
              <span
                className="inline-block w-4 h-0.5"
                style={{ backgroundColor: accentColor }}
              />
              Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border border-gray-100 bg-white shadow-sm"
                >
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
                          <span style={{ color: accentColor }}>▸</span> {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RIGHT COLUMN */}
        <div className="col-span-1 flex flex-col gap-5">
          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div>
              <h2
                className="text-xs font-black uppercase tracking-widest mb-2"
                style={{ color: accentColor }}
              >
                Skills
              </h2>
              <div className="flex flex-wrap gap-1">
                {data.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 rounded border font-medium"
                    style={{ borderColor: accentColor, color: accentColor }}
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
              <div className="space-y-2">
                {data.education.map((edu, i) => (
                  <div
                    key={i}
                    className="p-2 rounded border border-gray-100 bg-gray-50"
                  >
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
                  <li key={i} className="flex gap-1">
                    <span style={{ color: accentColor }}>✓</span>
                    {typeof cert === "string" ? cert : cert.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* PROJECTS - full width cards */}
        {data.projects && data.projects.length > 0 && (
          <div className="col-span-3">
            <h2
              className="text-xs font-black uppercase tracking-widest mb-3 flex items-center gap-2"
              style={{ color: accentColor }}
            >
              <span
                className="inline-block w-4 h-0.5"
                style={{ backgroundColor: accentColor }}
              />
              Projects
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {data.projects.map((proj, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border-l-4 bg-gray-50"
                  style={{ borderColor: accentColor }}
                >
                  <p className="font-bold text-gray-900 text-xs">{proj.name}</p>
                  {proj.description && (
                    <p className="text-xs text-gray-500 mt-1">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}