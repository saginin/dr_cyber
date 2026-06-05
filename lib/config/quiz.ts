import type { QuizQuestion } from "@/types/funnel";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    text: "What best describes your current background?",
    options: [
      { id: "healthcare", label: "Healthcare", scores: { grc: 3, iam: 1, ai: 1 } },
      { id: "finance", label: "Finance / Accounting", scores: { grc: 3, ai: 1 } },
      { id: "sales", label: "Sales / Customer Service", scores: { grc: 1, soc: 1, iam: 1 } },
      { id: "it-support", label: "IT Support", scores: { soc: 3, iam: 2, vuln: 2 } },
      { id: "networking", label: "Networking", scores: { cloud: 2, soc: 2, pentest: 1 } },
      { id: "software", label: "Software / Coding", scores: { pentest: 3, ai: 2, cloud: 1 } },
      { id: "admin-ops", label: "Administration / Operations", scores: { grc: 2, iam: 2 } },
      { id: "law-compliance", label: "Law / Compliance", scores: { grc: 4, ai: 1 } },
      { id: "student", label: "Student / Recent Graduate", scores: { foundation: 2, soc: 1 } },
      { id: "other", label: "Other", scores: { foundation: 2 } }
    ]
  },
  {
    id: "q2",
    text: "How comfortable are you with technology?",
    options: [
      { id: "beginner", label: "Beginner", scores: { foundation: 3, grc: 1 } },
      { id: "daily", label: "I use technology daily but not professionally", scores: { foundation: 2, iam: 1 } },
      { id: "basic-it", label: "I have basic IT knowledge", scores: { soc: 2, vuln: 1 } },
      { id: "professional-it", label: "I have professional IT experience", scores: { soc: 2, cloud: 2, vuln: 2 } },
      { id: "technical", label: "I am already technical", scores: { pentest: 2, cloud: 2, vuln: 1 } }
    ]
  },
  {
    id: "q3",
    text: "Which type of work do you enjoy most?",
    options: [
      { id: "technical-problems", label: "Solving technical problems", scores: { soc: 2, vuln: 2, pentest: 1 } },
      { id: "explaining", label: "Talking to people and explaining things", scores: { grc: 2, iam: 1 } },
      { id: "investigating", label: "Investigating alerts or incidents", scores: { soc: 4 } },
      { id: "risk-docs", label: "Managing risk and documentation", scores: { grc: 4, ai: 1 } },
      { id: "automation", label: "Building systems and automation", scores: { cloud: 2, pentest: 2, ai: 2 } },
      { id: "weaknesses", label: "Finding weaknesses in systems", scores: { pentest: 3, vuln: 2 } },
      { id: "compliance", label: "Learning laws, policies, and compliance", scores: { grc: 4, ai: 1 } }
    ]
  },
  {
    id: "q4",
    text: "Do you enjoy coding?",
    options: [
      { id: "yes", label: "Yes", scores: { pentest: 3, ai: 2, cloud: 1 } },
      { id: "no", label: "No", scores: { grc: 2, iam: 1, foundation: 1 } },
      { id: "maybe", label: "Maybe, but I am a beginner", scores: { foundation: 1, ai: 1, soc: 1 } },
      { id: "non-coding", label: "I prefer non-coding cybersecurity roles", scores: { grc: 3, iam: 2 } }
    ]
  },
  {
    id: "q5",
    text: "How much time can you study weekly?",
    options: [
      { id: "3-5", label: "3-5 hours", scores: { foundation: 2, grc: 1 } },
      { id: "5-8", label: "5-8 hours", scores: { grc: 1, soc: 1, iam: 1 } },
      { id: "8-12", label: "8-12 hours", scores: { soc: 1, cloud: 1, vuln: 1 } },
      { id: "12-plus", label: "12+ hours", scores: { pentest: 1, cloud: 1, soc: 1 } }
    ]
  },
  {
    id: "q6",
    text: "What is your career goal?",
    options: [
      { id: "first-job", label: "Get my first cybersecurity job", scores: { foundation: 1, soc: 2, grc: 1 } },
      { id: "it-to-cyber", label: "Move from IT into cybersecurity", scores: { soc: 2, vuln: 2, iam: 1 } },
      { id: "cloud-engineering", label: "Grow into cloud/security engineering", scores: { cloud: 4 } },
      { id: "grc", label: "Enter cyber risk/GRC", scores: { grc: 4 } },
      { id: "pentester", label: "Become a penetration tester", scores: { pentest: 4 } },
      { id: "consulting", label: "Start consulting eventually", scores: { grc: 1, pentest: 1, ai: 1 } },
      { id: "not-sure", label: "Not sure yet", scores: { foundation: 4 } }
    ]
  },
  {
    id: "q7",
    text: "What is your strongest existing skill?",
    options: [
      { id: "communication", label: "Communication", scores: { grc: 3, iam: 1 } },
      { id: "problem-solving", label: "Problem-solving", scores: { soc: 2, vuln: 1, pentest: 1 } },
      { id: "customer-service", label: "Customer service", scores: { iam: 2, soc: 1 } },
      { id: "documentation", label: "Documentation", scores: { grc: 3, vuln: 1 } },
      { id: "troubleshooting", label: "Technical troubleshooting", scores: { soc: 2, vuln: 2, iam: 1 } },
      { id: "research", label: "Research", scores: { ai: 2, grc: 1, pentest: 1 } },
      { id: "leadership", label: "Leadership", scores: { grc: 2, iam: 1 } },
      { id: "detail", label: "Attention to detail", scores: { soc: 2, grc: 1, vuln: 1 } }
    ]
  },
  {
    id: "q8",
    text: "What scares you most about switching careers?",
    options: [
      { id: "where-start", label: "I do not know where to start", scores: { foundation: 3 } },
      { id: "not-technical", label: "I am not technical enough", scores: { foundation: 2, grc: 1 } },
      { id: "wasting-money", label: "I am worried about wasting money", scores: { grc: 1, foundation: 1 } },
      { id: "job", label: "I am worried about not getting a job", scores: { foundation: 1, soc: 1 } },
      { id: "cert", label: "I do not know which certification to take", scores: { foundation: 2 } },
      { id: "confidence", label: "I lack confidence", scores: { foundation: 3 } }
    ]
  },
  {
    id: "q9",
    text: "Do you already have any certifications?",
    options: [
      { id: "none", label: "None", scores: { foundation: 2 } },
      { id: "a-plus", label: "CompTIA A+", scores: { soc: 1, iam: 1 } },
      { id: "network-plus", label: "Network+", scores: { soc: 2, cloud: 1, vuln: 1 } },
      { id: "security-plus", label: "Security+", scores: { soc: 2, grc: 1, vuln: 1 } },
      { id: "ccna", label: "CCNA", scores: { cloud: 2, soc: 2, pentest: 1 } },
      { id: "aws", label: "AWS Cloud Practitioner", scores: { cloud: 4 } },
      { id: "google-cyber", label: "Google Cybersecurity Certificate", scores: { soc: 2, foundation: 1 } },
      { id: "other", label: "Other", scores: { foundation: 1 } }
    ]
  },
  {
    id: "q10",
    text: "When do you want to start?",
    options: [
      { id: "immediately", label: "Immediately", scores: { soc: 1, grc: 1 } },
      { id: "30-days", label: "Within 30 days", scores: { soc: 1, grc: 1 } },
      { id: "3-months", label: "Within 3 months", scores: { foundation: 1 } },
      { id: "researching", label: "Just researching", scores: { foundation: 2 } }
    ]
  }
];
