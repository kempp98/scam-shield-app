import { EmailScenarioData } from '@/types/email-simulation';

// Sample phishing email scenario
export const phishingEmailScenario: EmailScenarioData = {
  id: "scenario-email-phishing-001",
  type: "email",
  category: "phishing",
  isScam: true,
  difficulty: "beginner",
  sender: {
    name: "PayPal Security Team",
    email: "security-services@paypa1-support.com"
  },
  emails: [
    {
      id: "email-1",
      subject: "PayPal: Your account has been limited until we hear from you",
      from: {
        name: "PayPal Security Team",
        email: "security-services@paypa1-support.com"
      },
      to: {
        name: "User",
        email: "user@example.com"
      },
      date: "Today, 9:32 AM",
      body: `<div style="font-family: Arial, sans-serif;">
        <img src="/images/paypal-logo.png" alt="PayPal" style="max-width: 120px; margin-bottom: 20px;" />
        <p>Dear Valued Customer,</p>
        <p>We've noticed some <strong>unusual activity</strong> on your PayPal account. As a security measure, we've <strong>temporarily limited some features</strong> on your account.</p>
        <p>You'll need to verify your information to restore full access to your account. Please click the button below to verify your information:</p>
        <div style="text-align: center; margin: 25px 0;">
          <a href="#" style="display: inline-block; background-color: #0070ba; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Verify My Account</a>
        </div>
        <p>If you don't verify your account within 24 hours, we may have to permanently limit your account access.</p>
        <p>If you didn't make any recent changes to your account, please secure your account immediately.</p>
        <p>Thank you for your cooperation.</p>
        <p>Sincerely,<br>PayPal Security Team</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 11px; color: #666;">Please do not reply to this email. This mailbox is not monitored and you will not receive a response. For assistance, log in to your PayPal account and click "Help" located in the top right-hand corner of any PayPal page.</p>
        <p style="font-size: 11px; color: #666;">Copyright © 2025 PayPal, Inc. All rights reserved.</p>
      </div>`,
      hasAttachments: false,
      isRead: false,
      isImportant: true,
      folder: "inbox",
      redFlags: [
        {
          id: "suspicious-sender-email",
          text: "Email address misspells 'PayPal' as 'Paypa1'",
          explanation: "Scammers often use lookalike domains with slight misspellings, substituting numbers for letters (notice the '1' instead of 'l' in 'paypa1')."
        },
        {
          id: "urgency-tactic",
          text: "Creates urgency with 24-hour time limit",
          explanation: "Creating artificial urgency is a common tactic to pressure you into acting without careful consideration."
        },
        {
          id: "generic-greeting",
          text: "Generic greeting that doesn't include your name",
          explanation: "Legitimate PayPal emails typically address you by name, not as 'Valued Customer'."
        },
        {
          id: "suspicious-link",
          text: "Requests you to click a button to verify information",
          explanation: "Legitimate services rarely ask you to verify account information via email links. Instead, they ask you to log in directly to their website."
        }
      ]
    }
  ],
  redFlags: [
    {
      id: "suspicious-sender-email",
      text: "Email address misspells 'PayPal' as 'Paypa1'",
      explanation: "Scammers often use lookalike domains with slight misspellings, substituting numbers for letters (notice the '1' instead of 'l' in 'paypa1')."
    },
    {
      id: "urgency-tactic",
      text: "Creates urgency with 24-hour time limit",
      explanation: "Creating artificial urgency is a common tactic to pressure you into acting without careful consideration."
    },
    {
      id: "generic-greeting",
      text: "Generic greeting that doesn't include your name",
      explanation: "Legitimate PayPal emails typically address you by name, not as 'Valued Customer'."
    },
    {
      id: "suspicious-link",
      text: "Requests you to click a button to verify information",
      explanation: "Legitimate services rarely ask you to verify account information via email links. Instead, they ask you to log in directly to their website."
    }
  ],
  identificationQuestion: {
    options: [
      {
        id: "legitimate",
        text: "This is a legitimate email from PayPal",
        isCorrect: false,
        feedback: "This is actually a phishing email. Look carefully at the sender's email address - it uses 'paypa1' with a number '1' instead of 'paypal'. Also, legitimate PayPal emails address you by name, not 'Valued Customer'."
      },
      {
        id: "scam",
        text: "This is a phishing email attempting to steal my information",
        isCorrect: true,
        feedback: "Correct! This is a phishing email. Key red flags include the misspelled sender email address ('paypa1'), the generic greeting, the urgency tactics, and the request to click a button to verify your information."
      }
    ]
  },
  actionQuestion: {
    options: [
      {
        id: "click-verify",
        text: "Click the 'Verify My Account' button in the email",
        isCorrect: false,
        safetyImpact: -10,
        feedback: "This would be dangerous. The button likely leads to a fake PayPal site designed to steal your login credentials or personal information."
      },
      {
        id: "reply-with-info",
        text: "Reply to the email with your account information",
        isCorrect: false,
        safetyImpact: -10,
        feedback: "Never reply to suspicious emails with personal information. Legitimate companies will never ask you to send sensitive information via email."
      },
      {
        id: "ignore-delete",
        text: "Ignore and delete the email",
        isCorrect: true,
        safetyImpact: 8,
        feedback: "Good choice. Ignoring and deleting suspicious emails is a safe approach."
      },
      {
        id: "verify-directly",
        text: "Manually go to the official PayPal website to check your account status",
        isCorrect: true,
        safetyImpact: 10,
        feedback: "Excellent choice! Always verify account issues by typing the official URL directly into your browser or using the official app, never by clicking links in emails."
      },
      {
        id: "report-phishing",
        text: "Report the email as phishing to PayPal and your email provider",
        isCorrect: true,
        safetyImpact: 10,
        feedback: "Excellent! Reporting phishing attempts helps protect others and improves detection systems."
      }
    ]
  }
};

// Sample legitimate email scenario
export const legitimateEmailScenario: EmailScenarioData = {
  id: "scenario-email-legitimate-001",
  type: "email",
  category: "banking",
  isScam: false,
  difficulty: "beginner",
  sender: {
    name: "Chase Bank",
    email: "no-reply@chase.com"
  },
  emails: [
    {
      id: "email-1",
      subject: "Your Chase statement is ready",
      from: {
        name: "Chase Bank",
        email: "no-reply@chase.com"
      },
      to: {
        name: "John Smith",
        email: "jsmith@example.com"
      },
      date: "Today, 7:15 AM",
      body: `<div style="font-family: Arial, sans-serif;">
        <img src="/images/chase-logo.png" alt="Chase" style="max-width: 100px; margin-bottom: 20px;" />
        <p>Hello John Smith,</p>
        <p>Your Chase credit card statement is ready to view online.</p>
        <p><strong>Account:</strong> Credit Card ending in 1234<br>
        <strong>Statement Period:</strong> March 5 - April 4, 2025<br>
        <strong>Balance:</strong> $432.17</p>
        <p>To view your statement, please sign in to <a href="https://chase.com">chase.com</a> or use the Chase Mobile app.</p>
        <p>If you have any questions, please call the number on the back of your card.</p>
        <p>Thank you for being a Chase customer.</p>
        <p>This is an automated email. Please do not reply.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 11px; color: #666;">For your security, we'll never ask for your personal information in an email.</p>
        <p style="font-size: 11px; color: #666;">© 2025 JPMorgan Chase & Co.</p>
      </div>`,
      hasAttachments: false,
      isRead: false,
      folder: "inbox"
    }
  ],
  identificationQuestion: {
    options: [
      {
        id: "legitimate",
        text: "This is a legitimate email from Chase Bank",
        isCorrect: true,
        feedback: "Correct! This appears to be a legitimate email from Chase. The email address is from the official chase.com domain, it addresses you by name, doesn't ask you to click suspicious links, and doesn't create false urgency."
      },
      {
        id: "scam",
        text: "This is a phishing email attempting to steal my information",
        isCorrect: false,
        feedback: "This is actually a legitimate email notification. Notice that it comes from the actual chase.com domain, addresses you by name, doesn't create false urgency, and directs you to sign in to the official website rather than clicking a link in the email."
      }
    ]
  },
  actionQuestion: {
    options: [
      {
        id: "login-official",
        text: "Manually go to chase.com or open the Chase app to view your statement",
        isCorrect: true,
        safetyImpact: 10,
        feedback: "Excellent choice! Going directly to the official website or app is the safest way to view your account information."
      },
      {
        id: "ignore",
        text: "Ignore the email if you don't want to check your statement now",
        isCorrect: true,
        safetyImpact: 8,
        feedback: "This is fine. The email is simply a notification, and there's no urgent action required."
      },
      {
        id: "click-link",
        text: "Click the link in the email to go to Chase's website",
        isCorrect: false,
        safetyImpact: 2,
        feedback: "While this email appears legitimate, it's still safer to manually type the URL or use the app rather than clicking links in emails, even from trusted sources."
      },
      {
        id: "reply",
        text: "Reply to the email with questions about your statement",
        isCorrect: false,
        safetyImpact: -2,
        feedback: "The email states it's automated and not to reply. For questions about your account, you should contact customer service through official channels."
      }
    ]
  }
};

// Sample job scam email scenario
export const jobScamEmailScenario: EmailScenarioData = {
  id: "scenario-email-job-scam-001",
  type: "email",
  category: "job-scam",
  isScam: true,
  difficulty: "intermediate",
  sender: {
    name: "HR Department",
    email: "hr-recruitment@amazon-careers-intl.com"
  },
  emails: [
    {
      id: "email-1",
      subject: "CONGRATULATIONS! Your application for Remote Work has been ACCEPTED!",
      from: {
        name: "HR Department",
        email: "hr-recruitment@amazon-careers-intl.com"
      },
      to: {
        name: "Recipient",
        email: "recipient@example.com"
      },
      date: "Yesterday, 3:47 PM",
      body: `<div style="font-family: Arial, sans-serif;">
        <img src="/images/amazon-logo.png" alt="Amazon" style="max-width: 120px; margin-bottom: 20px;" />
        <p>CONGRATULATIONS!!!</p>
        <p>Your application for the position of <strong>Data Entry Specialist (Work From Home)</strong> has been <strong>ACCEPTED</strong>!</p>
        <p>We at Amazon are pleased to offer you this opportunity to join our growing team of remote workers. After reviewing your resume, our HR team has determined you are a perfect match for this position.</p>
        <p><strong>POSITION DETAILS:</strong></p>
        <ul>
          <li>Salary: $35/hour</li>
          <li>Hours: 15-40 hours/week (flexible)</li>
          <li>Benefits: Medical, dental after 30 days</li>
          <li>Equipment: Provided by company</li>
        </ul>
        <p>To move forward with the onboarding process, we need you to:</p>
        <ol>
          <li>Confirm your acceptance within 24 HOURS</li>
          <li>Complete the registration form: <a href="#">Click here to register</a></li>
          <li>Provide your bank account information for direct deposit setup</li>
          <li>Pay a refundable $200 security deposit for equipment</li>
        </ol>
        <p>Don't miss this amazing opportunity! Positions are filling FAST!</p>
        <p>Regards,<br>
        HR Department<br>
        Amazon Careers International</p>
      </div>`,
      hasAttachments: false,
      isRead: true,
      isImportant: false,
      folder: "inbox",
      redFlags: [
        {
          id: "suspicious-domain",
          text: "Email is from 'amazon-careers-intl.com' not amazon.com",
          explanation: "Legitimate Amazon emails come from amazon.com domains, not third-party domains that include 'amazon' in the name."
        },
        {
          id: "excessive-capitalization",
          text: "Excessive use of capital letters and exclamation points",
          explanation: "Professional companies don't use excessive capitalization or multiple exclamation points in official communications."
        },
        {
          id: "too-good-to-be-true",
          text: "$35/hour for data entry work is suspiciously high",
          explanation: "Job scams often offer salaries well above market rates to attract victims."
        },
        {
          id: "request-for-money",
          text: "Asks for a 'refundable security deposit'",
          explanation: "Legitimate employers never ask for money during the hiring process."
        },
        {
          id: "request-for-banking-info",
          text: "Requests bank account information before starting work",
          explanation: "Legitimate companies wouldn't ask for your banking information until after you've officially been hired and completed proper paperwork."
        },
        {
          id: "urgency-tactic",
          text: "Creates urgency with '24 HOURS' deadline",
          explanation: "Scammers create artificial urgency to pressure victims into making hasty decisions."
        }
      ]
    }
  ],
  redFlags: [
    {
      id: "suspicious-domain",
      text: "Email is from 'amazon-careers-intl.com' not amazon.com",
      explanation: "Legitimate Amazon emails come from amazon.com domains, not third-party domains that include 'amazon' in the name."
    },
    {
      id: "excessive-capitalization",
      text: "Excessive use of capital letters and exclamation points",
      explanation: "Professional companies don't use excessive capitalization or multiple exclamation points in official communications."
    },
    {
      id: "too-good-to-be-true",
      text: "$35/hour for data entry work is suspiciously high",
      explanation: "Job scams often offer salaries well above market rates to attract victims."
    },
    {
      id: "request-for-money",
      text: "Asks for a 'refundable security deposit'",
      explanation: "Legitimate employers never ask for money during the hiring process."
    },
    {
      id: "request-for-banking-info",
      text: "Requests bank account information before starting work",
      explanation: "Legitimate companies wouldn't ask for your banking information until after you've officially been hired and completed proper paperwork."
    },
    {
      id: "urgency-tactic",
      text: "Creates urgency with '24 HOURS' deadline",
      explanation: "Scammers create artificial urgency to pressure victims into making hasty decisions."
    }
  ],
  identificationQuestion: {
    options: [
      {
        id: "legitimate",
        text: "This is a legitimate job offer from Amazon",
        isCorrect: false,
        feedback: "This is a job scam email, not a legitimate offer from Amazon. Legitimate companies don't ask for money upfront, use official domains (amazon.com, not amazon-careers-intl.com), and don't use excessive capitalization or urgency tactics."
      },
      {
        id: "scam",
        text: "This is a job scam email",
        isCorrect: true,
        feedback: "Correct! This is a job scam. Red flags include the suspicious email domain, request for money ('security deposit'), request for banking information upfront, urgency tactics, excessive capitalization, and a too-good-to-be-true salary offer."
      }
    ]
  },
  actionQuestion: {
    options: [
      {
        id: "complete-registration",
        text: "Click the link to complete the registration",
        isCorrect: false,
        safetyImpact: -10,
        feedback: "This would be dangerous. The link likely leads to a fake website designed to steal your personal information."
      },
      {
        id: "pay-deposit",
        text: "Pay the refundable security deposit to secure the position",
        isCorrect: false,
        safetyImpact: -10,
        feedback: "Never pay money to get a job. Legitimate employers will never ask for payment during the hiring process."
      },
      {
        id: "verify-with-company",
        text: "Verify the offer by contacting Amazon's official HR department",
        isCorrect: true,
        safetyImpact: 8,
        feedback: "Good approach. Contacting the company through their official website can help verify if a job offer is legitimate."
      },
      {
        id: "ignore-report",
        text: "Ignore the email, mark as spam, and report it",
        isCorrect: true,
        safetyImpact: 10,
        feedback: "Excellent choice! This is clearly a scam, and the best response is to ignore it, mark it as spam, and report it to help protect others."
      }
    ]
  }
};

// Export all scenarios
export const mockEmailScenarios = [
  phishingEmailScenario,
  legitimateEmailScenario,
  jobScamEmailScenario
];

// Default export for simple importing
export default mockEmailScenarios;