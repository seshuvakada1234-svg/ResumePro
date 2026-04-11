import { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
}

export default function BlackYellowTemplate({ data }: Props) {
  const info = data.personalInfo;

  // ── Correct field names from types/resume.ts ──
  const name = info.fullName || info.name || "Your Name";
  const title = info.title || data.title || "Your Title";
  const email = info.email || "";
  const phone = info.phone || "";
  const location = info.location || "";
  const linkedin = info.linkedin || "";
  const website = info.website || info.github || "";
  const photo = info.profileImage || info.photo || "";
  const summary = info.summary || data.summary || "";

  // Split name into first + last for big header
  const nameParts = name.trim().split(" ");
  const firstName = nameParts[0] ?? "YOUR";
  const lastName = nameParts.slice(1).join(" ") || "NAME";

  return (
    <div
      style={{
        width: "794px",
        minHeight: "1123px",
        height: "1123px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        backgroundColor: "#ffffff",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* ── LEFT DARK SIDEBAR ── */}
      <div
        style={{
          width: "224px",
          minHeight: "1123px",
          backgroundColor: "#1a1a1a",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        {/* Photo */}
        <div
          style={{
            width: "224px",
            height: "220px",
            backgroundColor: "#2a2a2a",
            overflow: "hidden",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {photo ? (
            <img
              src={photo}
              alt={name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.9,
                display: "block",
              }}
            />
          ) : (
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                backgroundColor: "#3a3a3a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "48px",
                fontWeight: "bold",
                color: "#666",
              }}
            >
              {firstName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Sidebar content */}
        <div
          style={{
            padding: "20px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flex: 1,
          }}
        >
          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div>
              <div
                style={{
                  backgroundColor: "#f5c518",
                  display: "inline-block",
                  padding: "2px 10px",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: "900",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    color: "#000",
                  }}
                >
                  Education
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {data.education.map((edu, i) => (
                  <div key={i}>
                    <p
                      style={{
                        fontSize: "10px",
                        fontWeight: "bold",
                        color: "#ffffff",
                        lineHeight: 1.3,
                        margin: 0,
                      }}
                    >
                      {edu.degree || "Your Degree"}
                    </p>
                    <p style={{ fontSize: "9px", color: "#aaaaaa", margin: "2px 0 0 0" }}>
                      {edu.school || "University"}
                    </p>
                    <p style={{ fontSize: "9px", color: "#888888", margin: "1px 0 0 0" }}>
                      {edu.startDate
                        ? `${edu.startDate} — ${edu.endDate ?? "Present"}`
                        : edu.year || ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <div>
              <div
                style={{
                  backgroundColor: "#f5c518",
                  display: "inline-block",
                  padding: "2px 10px",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: "900",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    color: "#000",
                  }}
                >
                  Certifications
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {data.certifications.map((cert, i) => (
                  <p
                    key={i}
                    style={{ fontSize: "9px", color: "#cccccc", margin: 0, lineHeight: 1.4 }}
                  >
                    {typeof cert === "string" ? cert : cert.name}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Spacer pushes contact to bottom */}
          <div style={{ flex: 1 }} />

          {/* Contact Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {phone && (
              <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "3px",
                    minHeight: "32px",
                    backgroundColor: "#f5c518",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                />
                <div>
                  <p style={{ fontSize: "10px", fontWeight: "bold", color: "#ffffff", margin: 0 }}>
                    Phone
                  </p>
                  <p style={{ fontSize: "9px", color: "#aaaaaa", margin: "2px 0 0 0" }}>
                    {phone}
                  </p>
                </div>
              </div>
            )}
            {email && (
              <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "3px",
                    minHeight: "32px",
                    backgroundColor: "#f5c518",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                />
                <div>
                  <p style={{ fontSize: "10px", fontWeight: "bold", color: "#ffffff", margin: 0 }}>
                    Email
                  </p>
                  <p
                    style={{
                      fontSize: "9px",
                      color: "#aaaaaa",
                      margin: "2px 0 0 0",
                      wordBreak: "break-all",
                    }}
                  >
                    {email}
                  </p>
                </div>
              </div>
            )}
            {linkedin && (
              <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "3px",
                    minHeight: "32px",
                    backgroundColor: "#f5c518",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                />
                <div>
                  <p style={{ fontSize: "10px", fontWeight: "bold", color: "#ffffff", margin: 0 }}>
                    LinkedIn
                  </p>
                  <p
                    style={{
                      fontSize: "9px",
                      color: "#aaaaaa",
                      margin: "2px 0 0 0",
                      wordBreak: "break-all",
                    }}
                  >
                    {linkedin}
                  </p>
                </div>
              </div>
            )}
            {website && (
              <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "3px",
                    minHeight: "32px",
                    backgroundColor: "#f5c518",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                />
                <div>
                  <p style={{ fontSize: "10px", fontWeight: "bold", color: "#ffffff", margin: 0 }}>
                    Website
                  </p>
                  <p style={{ fontSize: "9px", color: "#aaaaaa", margin: "2px 0 0 0" }}>
                    {website}
                  </p>
                </div>
              </div>
            )}
            {location && (
              <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "3px",
                    minHeight: "32px",
                    backgroundColor: "#f5c518",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                />
                <div>
                  <p style={{ fontSize: "10px", fontWeight: "bold", color: "#ffffff", margin: 0 }}>
                    Address
                  </p>
                  <p style={{ fontSize: "9px", color: "#aaaaaa", margin: "2px 0 0 0" }}>
                    {location}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── RIGHT MAIN CONTENT ── */}
      <div
        style={{
          flex: 1,
          minHeight: "1123px",
          display: "flex",
          flexDirection: "column",
          padding: "36px 32px",
          boxSizing: "border-box",
        }}
      >
        {/* Name + Title */}
        <div style={{ marginBottom: "24px" }}>
          <h1
            style={{
              fontSize: "42px",
              fontWeight: "900",
              color: "#111827",
              lineHeight: 0.95,
              margin: 0,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            {firstName}
          </h1>
          <h1
            style={{
              fontSize: "42px",
              fontWeight: "900",
              color: "#111827",
              lineHeight: 0.95,
              margin: "0 0 8px 0",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            {lastName}
          </h1>
          <p
            style={{
              fontSize: "11px",
              color: "#888888",
              marginTop: "8px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: "600",
            }}
          >
            {title}
          </p>
        </div>

        {/* Summary / About Me */}
        {summary && (
          <div style={{ marginBottom: "18px" }}>
            <div
              style={{
                backgroundColor: "#f5c518",
                display: "inline-block",
                padding: "3px 12px",
                marginBottom: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: "900",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  color: "#000",
                }}
              >
                About Me
              </span>
            </div>
            <p style={{ fontSize: "10px", color: "#555555", lineHeight: 1.6, margin: 0 }}>
              {summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {data.experience && data.experience.length > 0 && (
          <div style={{ marginBottom: "18px" }}>
            <div
              style={{
                backgroundColor: "#f5c518",
                display: "inline-block",
                padding: "3px 12px",
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: "900",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  color: "#000",
                }}
              >
                Work Experience
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {data.experience.map((exp, i) => (
                <div key={i} style={{ display: "flex", gap: "12px" }}>
                  <div style={{ width: "56px", flexShrink: 0 }}>
                    <p style={{ fontSize: "9px", color: "#888888", margin: 0, lineHeight: 1.5 }}>
                      {exp.startDate
                        ? `${exp.startDate}`
                        : exp.duration
                        ? exp.duration.split("-")[0]?.trim()
                        : ""}
                    </p>
                    <p style={{ fontSize: "9px", color: "#888888", margin: 0, lineHeight: 1.5 }}>
                      {exp.endDate
                        ? exp.endDate
                        : exp.duration
                        ? exp.duration.split("-")[1]?.trim() ?? "Present"
                        : "Present"}
                    </p>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: "bold",
                        color: "#111827",
                        margin: 0,
                      }}
                    >
                      {exp.position}
                    </p>
                    <p style={{ fontSize: "9px", color: "#888888", margin: "2px 0 4px 0" }}>
                      {exp.company}
                    </p>
                    {exp.description && (
                      <p
                        style={{
                          fontSize: "10px",
                          color: "#555555",
                          margin: "0 0 4px 0",
                          lineHeight: 1.5,
                        }}
                      >
                        {exp.description}
                      </p>
                    )}
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                        {exp.bullets.map((b, j) => (
                          <li
                            key={j}
                            style={{
                              fontSize: "10px",
                              color: "#555555",
                              lineHeight: 1.5,
                              display: "flex",
                              gap: "6px",
                            }}
                          >
                            <span style={{ color: "#888", flexShrink: 0 }}>•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div style={{ marginBottom: "18px" }}>
            <div
              style={{
                backgroundColor: "#f5c518",
                display: "inline-block",
                padding: "3px 12px",
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: "900",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  color: "#000",
                }}
              >
                Software Skill
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px 24px",
              }}
            >
              {data.skills.map((skill, i) => (
                <div key={i}>
                  <p
                    style={{
                      fontSize: "10px",
                      color: "#333333",
                      fontWeight: "500",
                      margin: "0 0 3px 0",
                    }}
                  >
                    {skill.name}
                  </p>
                  <div
                    style={{
                      height: "2px",
                      width: "36px",
                      backgroundColor: "#f5c518",
                      borderRadius: "2px",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div style={{ marginBottom: "18px" }}>
            <div
              style={{
                backgroundColor: "#f5c518",
                display: "inline-block",
                padding: "3px 12px",
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: "900",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  color: "#000",
                }}
              >
                Languages
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px 24px",
              }}
            >
              {data.languages.map((lang, i) => (
                <div key={i}>
                  <p
                    style={{
                      fontSize: "10px",
                      color: "#333333",
                      fontWeight: "500",
                      margin: "0 0 3px 0",
                    }}
                  >
                    {lang.name}
                    {lang.level ? ` — ${lang.level}` : ""}
                  </p>
                  <div
                    style={{
                      height: "2px",
                      width: "36px",
                      backgroundColor: "#f5c518",
                      borderRadius: "2px",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div style={{ marginBottom: "18px" }}>
            <div
              style={{
                backgroundColor: "#f5c518",
                display: "inline-block",
                padding: "3px 12px",
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: "900",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  color: "#000",
                }}
              >
                Projects
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {data.projects.map((proj, i) => (
                <div key={i}>
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: "bold",
                      color: "#111827",
                      margin: "0 0 2px 0",
                    }}
                  >
                    {proj.name}
                  </p>
                  {proj.description && (
                    <p
                      style={{
                        fontSize: "10px",
                        color: "#555555",
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
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