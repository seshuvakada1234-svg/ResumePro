import { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
  accentColor?: string;
  sidebarColor?: string;
}

export default function SidebarRightTemplate({
  data,
  accentColor = "#1E3A5F",
  sidebarColor = "#EFF6FF",
}: Props) {
  return (
    <div className="flex min-h-[1056px] w-full bg-white font-sans text-sm">
      {/* LEFT MAIN CONTENT */}
      <div className="flex-1 p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="border-b-2 pb-4" style={{ borderColor: accentColor }}>
          <h1 className="text-2xl font-bold text-gray-900">
            {data.personalInfo?.name}
          </h1>
          <p className="text-sm mt-1" style={{ color: accentColor }}>
            {data.personalInfo?.title}
          </p>
        </div>

        {/* Summary */}
        {data.summary && (
          <div>
            <h2
              className="text-xs font-bold uppercase tracking-widest mb-2 pb-1 border-b"
              style={{ color: accentColor, borderColor: accentColor }}
            >
              Professional Summary
            </h2>
            <p className="text-xs text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div>
            <h2
              className="text-xs font-bold uppercase tracking-widest mb-3 pb-1 border-b"
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
                      <p className="text-xs font-medium" style={{ color: accentColor }}>
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

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div>
            <h2
              className="text-xs font-bold uppercase tracking-widest mb-3 pb-1 border-b"
              style={{ color: accentColor, borderColor: accentColor }}
            >
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu, i) => (
                <div key={i} className="flex justify-between">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{edu.degree}</p>
                    <p className="text-xs text-gray-500">{edu.school}</p>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0 ml-2">
                    {edu.startDate} – {edu.endDate ?? "Present"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div>
            <h2
              className="text-xs font-bold uppercase tracking-widest mb-3 pb-1 border-b"
              style={{ color: accentColor, borderColor: accentColor }}
            >
              Projects
            </h2>
            <div className="space-y-3">
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

      {/* RIGHT SIDEBAR */}
      <div
        className="w-56 shrink-0 p-5 flex flex-col gap-5"
        style={{ backgroundColor: sidebarColor }}
      >
        {/* Contact */}
        <div>
          <h2
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: accentColor }}
          >
            Contact
          </h2>
          <ul className="space-y-1.5 text-xs text-gray-600 break-all">
            {data.personalInfo?.email && <li>✉ {data.personalInfo.email}</li>}
            {data.personalInfo?.phone && <li>📞 {data.personalInfo.phone}</li>}
            {data.personalInfo?.location && (
              <li>📍 {data.personalInfo.location}</li>
            )}
            {data.personalInfo?.linkedin && (
              <li>🔗 {data.personalInfo.linkedin}</li>
            )}
          </ul>
        </div>

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div>
            <h2
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: accentColor }}
            >
              Skills
            </h2>
            <ul className="space-y-1 text-xs text-gray-600">
              {data.skills.map((skill, i) => (
                <li key={i} className="flex items-center gap-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: accentColor }}
                  />
                  {typeof skill === "string" ? skill : skill.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div>
            <h2
              className="text-xs font-bold uppercase tracking-widest mb-2"
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

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <div>
            <h2
              className="text-xs font-bold uppercase tracking-widest mb-2"
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
      </div>
    </div>
  );
}