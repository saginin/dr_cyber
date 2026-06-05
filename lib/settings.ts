export function appSettings() {
  return {
    appUrl: process.env.APP_URL || "http://localhost:3000",
    bookingLink:
      process.env.BOOKING_LINK || "https://calendly.com/saginin/30min",
    masterclassLink: process.env.MASTERCLASS_LINK || "/masterclass",
    adminNotificationEmail: process.env.ADMIN_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL || "",
    senderName: process.env.DEFAULT_SENDER_NAME || "Cyber Career Pathway Team",
    cohortName: process.env.PROGRAM_COHORT_NAME || "Cyber Career Switch Program",
    smsEnabled: process.env.SMS_ENABLED === "true"
  };
}
