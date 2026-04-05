import { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
  accentColor?: string;
  sidebarColor?: string;
}

export default function SidebarLeftTemplate({
  data,
  accentColor = "#4F46E5",
  sidebarColor = "#EEF2FF",
}: Props) {
  return (
    <div className="flex min-h-[1056px] w-full bg-white font-sans text-sm">
      {/* LEFT SIDEBAR */}
      <div
        className="w-64 shrink-0 p-6 flex flex-col gap-6"
        style={{ backgroundColor: sidebarColor }}
      >
        {/* Avatar placeholder */}
        <div className="flex flex-col items-center gap-2">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold"
            style={{ backgroundColor: accentColor }}
          >
            {data.personalInfo?.name?.charAt(0) ?? "A"}
          </div>
          <h1 className="text-center font-bold text-base text-gray-900 leading-tight">
            {data.personalInfo?.name}
          </h1>
          <p className="text-center text-xs text-gray-500">
            {data.personalInfo?.title}
          </p>
        </div>

        {/* Contact */}
        <div>
          <h2
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: accentColor }}
          >
            Contact
          </h2>
          <ul className="space-y-1 text-xs text-gray-600">
            {data.personalInfo?.email && <li>✉ {data.personalInfo.email}</li>}
            {data.personalInfo?.phone && <li>📞 {data.personalInfo.phone}</li>}
            {data.personalInfo?.location && (
              <li>📍 {data.personalInfo.location}</li>
            )}
            {data.personalInfo?.linkedin && (
              <li>🔗 {data.personalInfo.linkedin}</li>
            )}
            {data.personalInfo?.website && (
              <li>🌐 {data.personalInfo.website}</li>
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
            <ul className="space-y-2">
              {data.skills.map((skill, i) => (
                <li key={i}>
                  <div className="flex justify-between text-xs text-gray-700 mb-0.5">
                    <span>{typeof skill === "string" ? skill : skill.name}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        backgroundColor: accentColor,
                        width: `${typeof skill === "object" && skill.level ? skill.level : 80}%`,
                      }}
                    />
                  </div>
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
                <li key={i} className="flex justify-between">
                  <span>{typeof lang === "string" ? lang : lang.name}</span>
                  {typeof lang === "object" && lang.level && (
                    <span className="text-gray-400">{lang.level}</span>
                  )}
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

      {/* RIGHT MAIN CONTENT */}
      <div className="flex-1 p-8 flex flex-col gap-6">
        {/* Summary */}
        {data.summary && (
          <div>
            <h2
              className="text-xs font-bold uppercase tracking-widest mb-1 pb-1 border-b"
              style={{ color: accentColor, borderColor: accentColor }}
            >
              Profile
            </h2>
            <p className="text-gray-700 leading-relaxed text-xs">{data.summary}</p>
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
                      <p className="text-xs" style={{ color: accentColor }}>
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
                <div key={i} className="flex justify-between items-start">
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
    </div>
  );
}