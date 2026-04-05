import { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
}

export default function CrimsonTemplate({ data }: Props) {
  const info = data.personalInfo ?? {};

  return (
    <div
      style={{
        width: "794px",
        height: "1123px",
        minHeight: "1123px",
        maxHeight: "1123px",
        overflow: "hidden",
        background: "#f9f4ef",
        fontFamily: "'Lato', sans-serif",
        display: "flex",
      }}
    >
      {/* SIDEBAR */}
      <div className="w-[232px] bg-[#8b1a2a] shrink-0 relative flex flex-col overflow-hidden">
        {/* Diagonal corner top-right */}
        <div
          className="absolute top-0 right-0 w-0 h-0 border-solid border-t-[65px] border-r-[65px] border-t-[#f9f4ef] border-r-transparent z-0"
        />

        <div className="flex justify-center pt-9 pb-4 relative z-10">
          <div className="w-[116px] h-[116px] rounded-full bg-[#6a1020] border-4 border-white/20 overflow-hidden flex items-center justify-center text-4xl text-white font-bold font-serif">
            {info.profileImage || info.photo ? (
              <img
                src={info.profileImage || info.photo}
                alt={info.fullName || info.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              (info.fullName || info.name)?.charAt(0) ?? "A"
            )}
          </div>
        </div>

        <div className="px-5 pb-4 relative z-10">
          <div className="font-serif text-[25px] font-bold text-white tracking-[2px] uppercase leading-none">
            {info.fullName || info.name || "Your Name"}
          </div>
          <div className="text-[9.5px] text-white/65 tracking-[2px] uppercase mt-1.5 font-light">
            {info.title || "Professional Title"}
          </div>
        </div>

        <div className="px-5 pb-4 relative z-10 space-y-4">
          {/* Contact */}
          <div className="space-y-2">
            <h3 className="text-[10px] font-bold tracking-[3px] uppercase text-white border-b-2 border-white/20 pb-1 mb-2">
              Contact
            </h3>
            <div className="flex items-start gap-2">
              <span className="text-white/55 text-[11px] mt-0.5 shrink-0">☎</span>
              <span className="text-white/85 text-[10px] leading-tight break-all">
                {info.phone}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-white/55 text-[11px] mt-0.5 shrink-0">✉</span>
              <span className="text-white/85 text-[10px] leading-tight break-all">
                {info.email}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-white/55 text-[11px] mt-0.5 shrink-0">📍</span>
              <span className="text-white/85 text-[10px] leading-tight">
                {info.location}
              </span>
            </div>
          </div>

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-[10px] font-bold tracking-[3px] uppercase text-white border-b-2 border-white/20 pb-1 mb-2">
                Skills
              </h3>
              <ul className="space-y-1.5">
                {data.skills.map((skill, i) => (
                  <li key={i} className="text-[10.5px] text-white/85 flex items-center gap-2">
                    <span className="text-white/45 text-[13px] leading-none">•</span>
                    {typeof skill === "string" ? skill : skill.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Language */}
          {data.languages && data.languages.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-[10px] font-bold tracking-[3px] uppercase text-white border-b-2 border-white/20 pb-1 mb-2">
                Language
              </h3>
              <ul className="space-y-1.5">
                {data.languages.map((lang, i) => (
                  <li key={i} className="text-[10.5px] text-white/85 flex items-center gap-2">
                    <span className="text-white/45 text-[13px] leading-none">•</span>
                    {typeof lang === "string" ? lang : lang.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 px-8 py-9 flex flex-col gap-5 overflow-hidden">
        {/* About Me */}
        {(info.summary || data.summary) && (
          <div className="space-y-1">
            <div className="text-[10px] font-bold tracking-[4px] uppercase text-[#8b1a2a]">
              About Me
            </div>
            <div className="h-[1px] bg-[#c0a090] mb-3" />
            <p className="text-[10.5px] text-[#444] leading-relaxed">
              {info.summary || data.summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="space-y-1">
            <div className="text-[10px] font-bold tracking-[4px] uppercase text-[#8b1a2a]">
              Work Experience
            </div>
            <div className="h-[1px] bg-[#c0a090] mb-3" />
            <div className="space-y-4">
              {data.experience.map((exp, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <div className="text-[12px] font-bold text-[#1a1a1a]">
                      {exp.position}
                    </div>
                    <div className="text-[10px] text-[#888] font-normal shrink-0">
                      {exp.startDate ? `${exp.startDate} – ${exp.endDate || "Present"}` : exp.duration}
                    </div>
                  </div>
                  <div className="text-[10px] text-[#8b1a2a] font-bold">
                    {exp.company}
                  </div>
                  <p className="text-[10px] text-[#555] leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className="space-y-1">
            <div className="text-[10px] font-bold tracking-[4px] uppercase text-[#8b1a2a]">
              Education
            </div>
            <div className="h-[1px] bg-[#c0a090] mb-3" />
            <div className="space-y-3">
              {data.education.map((edu, i) => (
                <div key={i} className="flex justify-between items-start">
                  <div>
                    <div className="text-[12px] font-bold text-[#1a1a1a]">
                      {edu.school}
                    </div>
                    <div className="text-[10px] text-[#555] mt-0.5">
                      {edu.degree}
                    </div>
                  </div>
                  <div className="text-[10px] text-[#888] shrink-0 whitespace-nowrap">
                    {edu.startDate ? `${edu.startDate} – ${edu.endDate || "Present"}` : edu.year}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {data.references && data.references.length > 0 && (
          <div className="space-y-1">
            <div className="text-[10px] font-bold tracking-[4px] uppercase text-[#8b1a2a]">
              References
            </div>
            <div className="h-[1px] bg-[#c0a090] mb-3" />
            <div className="grid grid-cols-2 gap-4">
              {data.references.map((ref, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-[12px] font-bold text-[#1a1a1a]">
                    {ref.name}
                  </div>
                  <div className="text-[9.5px] text-[#8b1a2a]">
                    {ref.position} {ref.company && `| ${ref.company}`}
                  </div>
                  <div className="text-[9px] text-[#666] leading-tight">
                    <span className="font-bold text-[#444]">Phone: </span>
                    {ref.phone}
                  </div>
                  <div className="text-[9px] text-[#666] leading-tight">
                    <span className="font-bold text-[#444]">Email: </span>
                    {ref.email}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
