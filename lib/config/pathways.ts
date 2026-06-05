import type { PathwayResult } from "@/types/funnel";

export const pathways: PathwayResult[] = [
  {
    id: "grc",
    name: "Cyber GRC / Risk Pathway",
    bestFor:
      "Healthcare, finance, operations, legal, compliance, admin, documentation-heavy, and communication-focused professionals.",
    why:
      "Your answers point toward risk, documentation, policy, stakeholder communication, and structured decision-making. These strengths transfer well into governance, risk, and compliance roles.",
    certification: "CompTIA Security+ or an ISO 27001/NIST fundamentals milestone",
    sequence: "Foundations -> Security+ -> risk frameworks -> policy/GRC portfolio",
    roadmap: [
      "Cybersecurity Foundations",
      "Networking Basics",
      "Security+",
      "Risk Management",
      "ISO 27001 / NIST / SOC 2 basics",
      "Policy writing",
      "GRC portfolio project",
      "Resume and interview preparation"
    ],
    projects: [
      "Write an acceptable use policy and incident escalation policy",
      "Map a small business to NIST CSF controls",
      "Create a SOC 2 readiness checklist"
    ]
  },
  {
    id: "soc",
    name: "SOC Analyst Pathway",
    bestFor: "IT support, helpdesk, detail-oriented learners, and people who enjoy investigation.",
    why:
      "Your answers show interest in troubleshooting, investigation, alerts, and practical defensive work. SOC analyst roles reward structured analysis and curiosity.",
    certification: "CompTIA Security+ with SIEM and log analysis labs",
    sequence: "Foundations -> networking/Linux -> Security+ -> SIEM -> SOC portfolio",
    roadmap: [
      "Cybersecurity Foundations",
      "Networking Basics",
      "Linux Basics",
      "Security+",
      "SIEM Tools",
      "Incident Response Basics",
      "Log Analysis",
      "SOC Lab Portfolio",
      "Resume and interview preparation"
    ],
    projects: [
      "Build a home SIEM dashboard",
      "Analyze failed login and malware alert logs",
      "Document an incident response triage report"
    ]
  },
  {
    id: "cloud",
    name: "Cloud Security Pathway",
    bestFor: "IT professionals, cloud learners, sysadmins, and people interested in AWS/Azure.",
    why:
      "Your answers suggest technical systems interest, cloud goals, networking exposure, or infrastructure curiosity. Cloud security builds on those strengths.",
    certification: "AWS Cloud Practitioner or Azure Fundamentals",
    sequence: "Foundations -> cloud fundamentals -> IAM -> cloud controls -> portfolio",
    roadmap: [
      "Cybersecurity Foundations",
      "Networking Basics",
      "Cloud Fundamentals",
      "AWS Cloud Practitioner or Azure Fundamentals",
      "IAM Basics",
      "Cloud Security Controls",
      "Vulnerability Management",
      "Cloud Security Portfolio Project"
    ],
    projects: [
      "Harden an AWS account baseline",
      "Create an IAM least-privilege access plan",
      "Document cloud logging and alerting controls"
    ]
  },
  {
    id: "pentest",
    name: "Penetration Testing / Ethical Hacking Pathway",
    bestFor: "Technical learners, networking students, Linux users, and people who enjoy offensive security labs.",
    why:
      "Your answers show appetite for technical problem-solving, coding or scripting, and finding weaknesses in systems. This pathway requires hands-on practice and patience.",
    certification: "eJPT or Pentest+ after core foundations",
    sequence: "Foundations -> networking/Linux -> scripting -> web security -> labs",
    roadmap: [
      "Cybersecurity Foundations",
      "Networking",
      "Linux",
      "Security+",
      "Python/Scripting Basics",
      "Web Security Basics",
      "Pentest+ or eJPT",
      "Capture-the-Flag Labs",
      "Practical Portfolio"
    ],
    projects: [
      "Complete beginner CTF writeups",
      "Build a legal web vulnerability lab report",
      "Create a remediation-focused pentest summary"
    ]
  },
  {
    id: "iam",
    name: "Identity and Access Management Pathway",
    bestFor:
      "IT support, admin, operations, HR systems, and people who like access, permissions, and controls.",
    why:
      "Your answers align with structured systems, access reviews, user support, permissions, and control design. IAM is a strong bridge between operations and security.",
    certification: "Security+ plus Active Directory or Azure AD fundamentals",
    sequence: "Foundations -> IAM concepts -> directory services -> access projects",
    roadmap: [
      "Cybersecurity Foundations",
      "Networking Basics",
      "IAM Concepts",
      "Active Directory Basics",
      "Cloud IAM",
      "CyberArk / Okta / Azure AD exposure",
      "Access Review Projects",
      "Resume and interview preparation"
    ],
    projects: [
      "Design a joiner-mover-leaver workflow",
      "Run a mock access review",
      "Document least-privilege role groups"
    ]
  },
  {
    id: "vuln",
    name: "Vulnerability Management Pathway",
    bestFor: "IT, infrastructure, operations, and technically curious professionals.",
    why:
      "Your answers point toward troubleshooting, systems awareness, remediation, and technical curiosity. Vulnerability management turns those traits into repeatable security operations.",
    certification: "Security+ with vulnerability scanning practice",
    sequence: "Foundations -> assets -> scanning -> CVSS -> remediation reporting",
    roadmap: [
      "Cybersecurity Foundations",
      "Networking Basics",
      "Asset Management",
      "Vulnerability Scanning",
      "CVSS Basics",
      "Remediation Tracking",
      "Vulnerability Report Project",
      "Resume and interview preparation"
    ],
    projects: [
      "Create a vulnerability report from a lab scan",
      "Prioritize findings using CVSS and business impact",
      "Build a remediation tracker"
    ]
  },
  {
    id: "ai",
    name: "LLM / AI Security Introduction Pathway",
    bestFor:
      "Professionals interested in AI governance, AI risk, data privacy, prompt injection, and emerging security concerns.",
    why:
      "Your answers suggest interest in emerging technology, risk, governance, privacy, or automation. AI security is a newer path that pairs well with strong fundamentals.",
    certification: "Cybersecurity foundations plus an AI governance/security milestone",
    sequence: "Foundations -> AI basics -> data security -> LLM risks -> governance project",
    roadmap: [
      "Cybersecurity Foundations",
      "AI and LLM Basics",
      "Data Security Basics",
      "Prompt Injection Concepts",
      "AI Governance",
      "AI Risk Assessment",
      "LLM Security Checklist Project",
      "Resume and interview positioning"
    ],
    projects: [
      "Build an LLM security checklist",
      "Assess prompt injection risks for a chatbot",
      "Create an AI data leakage prevention policy"
    ]
  },
  {
    id: "foundation",
    name: "Cybersecurity Foundation / Undecided Pathway",
    bestFor: "Beginners who are unsure where to start.",
    why:
      "Your answers show that you may benefit from a structured foundation before choosing a specialization. That is a practical starting point, especially if confidence or direction is the main blocker.",
    certification: "Security+ introduction or a cybersecurity foundations milestone",
    sequence: "Foundations -> networking -> labs -> career mapping -> choose track",
    roadmap: [
      "Cybersecurity Foundations",
      "Networking Basics",
      "Career Pathway Orientation",
      "Security+ Introduction",
      "Hands-on Labs",
      "Career Mapping Session",
      "Choose Specialization Track"
    ],
    projects: [
      "Create a personal cybersecurity lab journal",
      "Document basic network and security concepts",
      "Compare three target job descriptions and skill gaps"
    ]
  }
];

export function getPathway(idOrName: string) {
  return pathways.find((pathway) => pathway.id === idOrName || pathway.name === idOrName) ?? pathways[7];
}
