import { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
}

export default function DarkNavyTemplate({ data }: Props) {
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
        fontFamily: "'Montserrat', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <div className="bg-[#1a2a4a] flex items-center px-8 py-6 gap-6 shrink-0">
        <div className="relative w-[106px] h-[106px] shrink-0">
          <svg viewBox="0 0 110 110" className="absolute inset-0 w-full h-full">
            <polygon
              points="55,4 102,29 102,81 55,106 8,81 8,29"
              fill="none"
              stroke="#4a6fa5"
              strokeWidth="3"
            />
            <polygon points="55,12 94,33 94,77 55,98 16,77 16,33" fill="#2a3f6a" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center z-10">
            {info.profileImage || info.photo ? (
              <img
                src={info.profileImage || info.photo}
                alt={info.fullName || info.name}
                className="w-20 h-20 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-[#3a5a8a] flex items-center justify-center text-white text-2xl font-extrabold">
                {(info.fullName || info.name)?.charAt(0) ?? "A"}
              </div>
            )}
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-white text-[23px] font-extrabold tracking-[2.5px] uppercase leading-tight">
            {info.fullName || info.name || "Your Name"}
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[#a0b8d8] text-[10.5px] font-medium tracking-[3px] uppercase whitespace-nowrap">
              {info.title || "Job Title / Profession"}
            </span>
            <div className="flex-1 h-[1px] bg-[#a0b8d8] opacity-40" />
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <div className="w-[205px] bg-[#1a2a4a] shrink-0 px-4 py-6 text-white flex flex-col gap-6 overflow-hidden">
          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-[10.5px] font-bold tracking-[2.5px] uppercase border-b border-white/15 pb-1 mb-3">
              Contact
            </h3>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-[#2a3f6a] border border-[#4a6fa5] flex items-center justify-center shrink-0 text-[10px]">
                📞
              </div>
              <span className="text-[9.5px] text-[#c0d0e8] leading-tight mt-1">
                {info.phone}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-[#2a3f6a] border border-[#4a6fa5] flex items-center justify-center shrink-0 text-[10px]">
                ✉️
              </div>
              <span className="text-[9.5px] text-[#c0d0e8] leading-tight mt-1 break-all">
                {info.email}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-[#2a3f6a] border border-[#4a6fa5] flex items-center justify-center shrink-0 text-[10px]">
                📍
              </div>
              <span className="text-[9.5px] text-[#c0d0e8] leading-tight mt-1">
                {info.location}
              </span>
            </div>
            {info.website && (
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-[#2a3f6a] border border-[#4a6fa5] flex items-center justify-center shrink-0 text-[10px]">
                  🌐
                </div>
                <span className="text-[9.5px] text-[#c0d0e8] leading-tight mt-1 break-all">
                  {info.website}
                </span>
              </div>
            )}
          </div>

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-[10.5px] font-bold tracking-[2.5px] uppercase border-b border-white/15 pb-1 mb-3">
                Skills
              </h3>
              <div className="space-y-2">
                {data.skills.map((skill, i) => (
                  <div key={i} className="space-y-1">
                    <div className="text-[9px] text-[#c0d0e8] text-center tracking-wider uppercase">
                      {typeof skill === "string" ? skill : skill.name}
                    </div>
                    <div className="h-[5px] bg-[#2a3f6a] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#4a8fe8] to-[#6db3ff] rounded-full"
                        style={{ width: `${typeof skill === "string" ? 80 : skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-[10.5px] font-bold tracking-[2.5px] uppercase border-b border-white/15 pb-1 mb-3">
                Language
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {data.languages.map((lang, i) => {
                  const level = typeof lang === "string" ? 100 : lang.level;
                  const dashOffset = 100.5 - (level * 100.5) / 100;
                  return (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className="relative w-[38px] h-[38px]">
                        <svg viewBox="0 0 42 42" className="w-full h-full -rotate-90">
                          <circle
                            cx="21"
                            cy="21"
                            r="16"
                            fill="none"
                            stroke="#2a3f6a"
                            strokeWidth="4"
                          />
                          <circle
                            cx="21"
                            cy="21"
                            r="16"
                            fill="none"
                            stroke="#4a8fe8"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray="100.5"
                            strokeDashoffset={dashOffset}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-[7.5px] font-bold text-white">
                          {level}%
                        </div>
                      </div>
                      <span className="text-[8px] text-[#c0d0e8] text-center">
                        {typeof lang === "string" ? lang : lang.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 px-6 py-6 overflow-hidden flex flex-col gap-5">
          {/* Profile */}
          {(info.summary || data.summary) && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h2 className="text-[11px] font-bold text-white bg-[#1a2a4a] px-3 py-1 tracking-[2px] uppercase [clip-path:polygon(0_0,93%_0,100%_50%,93%_100%,0_100%)] shrink-0">
                  Profile
                </h2>
                <div className="flex-1 h-[1px] bg-[#1a2a4a] opacity-20" />
                <div className="w-[7px] h-[7px] rounded-full bg-[#1a2a4a] shrink-0" />
              </div>
              <p className="text-[10px] text-[#555] leading-relaxed">
                {info.summary || data.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h2 className="text-[11px] font-bold text-white bg-[#1a2a4a] px-3 py-1 tracking-[2px] uppercase [clip-path:polygon(0_0,93%_0,100%_50%,93%_100%,0_100%)] shrink-0">
                  Experience
                </h2>
                <div className="flex-1 h-[1px] bg-[#1a2a4a] opacity-20" />
                <div className="w-[7px] h-[7px] rounded-full bg-[#1a2a4a] shrink-0" />
              </div>
              <div className="space-y-4">
                {data.experience.map((exp, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="text-[8px] text-[#4a8fe8] font-bold w-11 text-right leading-tight pt-1 shrink-0">
                      {exp.startDate ? (
                        <>
                          {exp.startDate}
                          <br />
                          {exp.endDate || "Present"}
                        </>
                      ) : (
                        exp.duration
                      )}
                    </div>
                    <div className="w-[1px] bg-[#d0d8e8] shrink-0" />
                    <div className="flex-1">
                      <div className="text-[11px] font-bold text-[#1a2a4a]">
                        {exp.position}
                      </div>
                      <div className="text-[9px] text-[#4a8fe8] font-semibold">
                        {exp.company}
                      </div>
                      <p className="text-[9px] text-[#666] leading-relaxed mt-1 whitespace-pre-line">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h2 className="text-[11px] font-bold text-white bg-[#1a2a4a] px-3 py-1 tracking-[2px] uppercase [clip-path:polygon(0_0,93%_0,100%_50%,93%_100%,0_100%)] shrink-0">
                  Education
                </h2>
                <div className="flex-1 h-[1px] bg-[#1a2a4a] opacity-20" />
                <div className="w-[7px] h-[7px] rounded-full bg-[#1a2a4a] shrink-0" />
              </div>
              <div className="space-y-4">
                {data.education.map((edu, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="text-[8px] text-[#4a8fe8] font-bold w-11 text-right leading-tight pt-1 shrink-0">
                      {edu.startDate ? (
                        <>
                          {edu.startDate}
                          <br />
                          {edu.endDate || "Present"}
                        </>
                      ) : (
                        edu.year
                      )}
                    </div>
                    <div className="w-[1px] bg-[#d0d8e8] shrink-0" />
                    <div className="flex-1">
                      <div className="text-[11px] font-bold text-[#1a2a4a]">
                        {edu.degree}
                      </div>
                      <div className="text-[9px] text-[#4a8fe8] font-semibold">
                        {edu.school}
                      </div>
                      {edu.gpa && (
                        <p className="text-[9px] text-[#666] mt-0.5">
                          GPA: {edu.gpa}
                        </p>
                      )}
                    </div>
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
