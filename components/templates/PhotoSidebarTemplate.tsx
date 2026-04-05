import { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
}

export default function PhotoSidebarTemplate({ data }: Props) {
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
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* ── TOP HEADER ── */}
      <div className="flex items-start gap-6 px-10 pt-10 pb-6 border-b border-gray-300">
        {/* Photo */}
        <div
          className="shrink-0 w-28 h-28 rounded overflow-hidden bg-gray-200 border border-gray-300"
          style={{ minWidth: "112px" }}
        >
          {(info.photo || info.profileImage) ? (
            <img
              src={info.photo || info.profileImage}
              alt={info.name || info.fullName}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 text-3xl font-bold">
              {(info.name || info.fullName)?.charAt(0) ?? "A"}
            </div>
          )}
        </div>

        {/* Name + Title + Contact */}
        <div className="flex-1">
          <h1
            className="text-3xl font-bold text-gray-900 leading-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {info.name || info.fullName || "Your Name"}
          </h1>
          <p className="text-base text-gray-500 mt-1 mb-4">
            {info.title ?? "Your Title"}
          </p>

          {/* Contact row */}
          <div className="flex flex-col gap-1 text-xs text-gray-600">
            {info.email && (
              <div className="flex items-center gap-2">
                <span>✉</span>
                <span>{info.email}</span>
              </div>
            )}
            {info.location && (
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>{info.location}</span>
              </div>
            )}
            {info.phone && (
              <div className="flex items-center gap-2">
                <span>📞</span>
                <span>{info.phone}</span>
              </div>
            )}
            {info.linkedin && (
              <div className="flex items-center gap-2">
                <span>🔗</span>
                <span>{info.linkedin}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="px-10 py-6 flex flex-col gap-6">

        {/* SUMMARY */}
        {(data.summary || info.summary) && (
          <div className="flex gap-6">
            <div className="w-28 shrink-0">
              <p
                className="text-xs font-bold uppercase tracking-widest text-gray-900 pt-0.5"
                style={{ letterSpacing: "0.12em" }}
              >
                Summary
              </p>
            </div>
            <div className="flex-1 border-l border-gray-300 pl-6">
              <p className="text-xs text-gray-700 leading-relaxed">
                {data.summary || info.summary}
              </p>
            </div>
          </div>
        )}

        {/* EXPERIENCE */}
        {data.experience && data.experience.length > 0 && (
          <div className="flex gap-6">
            <div className="w-28 shrink-0">
              <p
                className="text-xs font-bold uppercase tracking-widest text-gray-900 pt-0.5"
                style={{ letterSpacing: "0.12em" }}
              >
                Experience
              </p>
            </div>
            <div className="flex-1 border-l border-gray-300 pl-6 flex flex-col gap-5">
              {data.experience.map((exp, i) => (
                <div key={i}>
                  {/* Date */}
                  <p className="text-xs text-gray-400 mb-0.5">
                    {exp.startDate ? `${exp.startDate} — ${exp.endDate ?? "Present"}` : exp.duration}
                  </p>
                  {/* Position + Company */}
                  <p className="text-sm font-bold text-gray-900">
                    {exp.position}
                    {exp.company ? `, ${exp.company}` : ""}
                  </p>
                  {/* Description */}
                  {exp.description && (
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                  {/* Bullets */}
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="mt-1.5 space-y-0.5">
                      {exp.bullets.map((b, j) => (
                        <li
                          key={j}
                          className="text-xs text-gray-600 flex gap-2"
                        >
                          <span className="mt-0.5 shrink-0">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EDUCATION */}
        {data.education && data.education.length > 0 && (
          <div className="flex gap-6">
            <div className="w-28 shrink-0">
              <p
                className="text-xs font-bold uppercase tracking-widest text-gray-900 pt-0.5"
                style={{ letterSpacing: "0.12em" }}
              >
                Education
              </p>
            </div>
            <div className="flex-1 border-l border-gray-300 pl-6 flex flex-col gap-3">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <p className="text-xs text-gray-400 mb-0.5">
                    {edu.startDate ? `${edu.startDate} — ${edu.endDate ?? "Present"}` : edu.year}
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    {edu.school}
                    {edu.degree ? `, ${edu.degree}` : ""}
                  </p>
                  {edu.gpa && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      GPA: {edu.gpa}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SKILLS */}
        {data.skills && data.skills.length > 0 && (
          <div className="flex gap-6">
            <div className="w-28 shrink-0">
              <p
                className="text-xs font-bold uppercase tracking-widest text-gray-900 pt-0.5"
                style={{ letterSpacing: "0.12em" }}
              >
                Skills
              </p>
            </div>
            <div className="flex-1 border-l border-gray-300 pl-6">
              <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                {data.skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                    <span className="text-gray-400">•</span>
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* LANGUAGES */}
        {data.languages && data.languages.length > 0 && (
          <div className="flex gap-6">
            <div className="w-28 shrink-0">
              <p
                className="text-xs font-bold uppercase tracking-widest text-gray-900 pt-0.5"
                style={{ letterSpacing: "0.12em" }}
              >
                Languages
              </p>
            </div>
            <div className="flex-1 border-l border-gray-300 pl-6">
              <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                {data.languages.map((lang, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                    <span className="text-gray-400">•</span>
                    {lang.name}
                    {lang.level && (
                      <span className="text-gray-400">— {lang.level}%</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CERTIFICATIONS */}
        {data.certifications && data.certifications.length > 0 && (
          <div className="flex gap-6">
            <div className="w-28 shrink-0">
              <p
                className="text-xs font-bold uppercase tracking-widest text-gray-900 pt-0.5"
                style={{ letterSpacing: "0.12em" }}
              >
                Certifications
              </p>
            </div>
            <div className="flex-1 border-l border-gray-300 pl-6 flex flex-col gap-1">
              {data.certifications.map((cert, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                  <span className="text-gray-400">•</span>
                  {typeof cert === "string" ? cert : cert.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {data.projects && data.projects.length > 0 && (
          <div className="flex gap-6">
            <div className="w-28 shrink-0">
              <p
                className="text-xs font-bold uppercase tracking-widest text-gray-900 pt-0.5"
                style={{ letterSpacing: "0.12em" }}
              >
                Projects
              </p>
            </div>
            <div className="flex-1 border-l border-gray-300 pl-6 flex flex-col gap-3">
              {data.projects.map((proj, i) => (
                <div key={i}>
                  <p className="text-sm font-bold text-gray-900">{proj.name}</p>
                  {proj.description && (
                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                      {proj.description}
                    </p>
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
