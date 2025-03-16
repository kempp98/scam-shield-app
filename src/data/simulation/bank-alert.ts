// src/data/simulation/bank-alert.ts
import { SimulationScenario } from "@/types/simulation";

const bankAlertScenario: SimulationScenario = {
  id: "bank-alert",
  title: "Urgent Bank Security Alert",
  description: "You receive a text message about suspicious activity on your bank account.",
  category: "financial",
  difficulty: "beginner",
  isScam: true,
  sender: {
    name: "SecureBank",
    phoneNumber: "+1 (555) 123-4567",
    avatarUrl: "/images/simulation/bank-icon.png"
  },
  initialNodeId: "initial",
  nodes: {
    "initial": {
      id: "initial",
      messages: [
        {
          id: "msg1",
          text: "ALERT: Your SECUREBANK account has been temporarily limited due to suspicious login activity. Verify your identity now to restore full access: https://secbnk-verify.co/login",
          isUserMessage: false,
          redFlags: [
            {
              id: "urgent-action",
              text: "Creates false urgency",
              explanation: "Scammers create a sense of urgency to make you act without thinking."
            },
            {
              id: "suspicious-url",
              text: "Suspicious URL",
              explanation: "The URL is not the official bank domain. Banks use their official domains for all communications."
            },
            {
              id: "impersonation",
              text: "Impersonating a bank",
              explanation: "The message claims to be from 'SECUREBANK' but lacks official verification."
            }
          ],
          timestamp: "10:24 AM"
        }
      ],
      responseOptions: [
        {
          id: "response1",
          text: "Click the link and log in to verify your account",
          nextNodeId: "click_link",
          safetyLevel: "risky",
          explanation: "Never click on links from text messages claiming to be from your bank. These links typically lead to fake websites designed to steal your login credentials."
        },
        {
          id: "response2",
          text: "Reply 'STOP' to opt out of these messages",
          nextNodeId: "reply_stop",
          safetyLevel: "risky",
          explanation: "Replying to potential scam messages confirms your number is active and monitored, which can lead to more scam attempts."
        },
        {
          id: "response3",
          text: "Ignore the message and delete it",
          nextNodeId: "ignore_delete",
          safetyLevel: "safe",
          explanation: "Ignoring and deleting suspicious messages is often a good first step if you're certain it's a scam."
        },
        {
          id: "response4",
          text: "Call your bank using the number on the back of your card",
          nextNodeId: "call_bank",
          safetyLevel: "safe",
          explanation: "Contacting your bank through official channels (like the number on your card) is the safest way to verify if there's a real issue with your account."
        }
      ],
      isEndNode: false
    },
    "click_link": {
      id: "click_link",
      messages: [
        {
          id: "click_msg1",
          text: "You click the link and are taken to a website that looks like your bank's login page, but the URL is different from the official bank website.",
          isUserMessage: false,
          timestamp: "10:25 AM"
        },
        {
          id: "click_msg2",
          text: "The page asks for your username, password, full card number, expiration date, and security code.",
          isUserMessage: false,
          timestamp: "10:25 AM"
        }
      ],
      responseOptions: [
        {
          id: "click_response1",
          text: "Enter all your information to verify your account",
          nextNodeId: "enter_info",
          safetyLevel: "risky",
          explanation: "Entering your account information on suspicious websites puts you at high risk of identity theft and financial fraud."
        },
        {
          id: "click_response2",
          text: "Close the page immediately and call your bank",
          nextNodeId: "close_and_call",
          safetyLevel: "safe",
          explanation: "This is a good recovery action if you've already clicked a suspicious link."
        }
      ],
      isEndNode: false
    },
    "enter_info": {
      id: "enter_info",
      messages: [
        {
          id: "enter_info_msg1",
          text: "You enter your sensitive banking information on the fake website.",
          isUserMessage: false,
          timestamp: "10:26 AM"
        }
      ],
      isEndNode: true,
      safetyRating: "dangerous",
      feedback: {
        title: "High Risk of Identity Theft",
        description: "You've provided your sensitive banking information to scammers. They now have everything they need to access your account and potentially steal your money or identity.",
        whatToDoNext: "Immediately contact your bank through official channels (the number on the back of your card) to report the incident and change your password. Monitor your accounts closely for unauthorized transactions and consider placing a freeze on your credit."
      }
    },
    "close_and_call": {
      id: "close_and_call",
      messages: [
        {
          id: "close_call_msg1",
          text: "You close the suspicious website without entering any information and call your bank using the official number on the back of your card.",
          isUserMessage: false,
          timestamp: "10:26 AM"
        },
        {
          id: "close_call_msg2",
          text: "The bank representative confirms there is no issue with your account and that the text message was a scam attempt.",
          isUserMessage: false,
          timestamp: "10:32 AM"
        }
      ],
      isEndNode: true,
      safetyRating: "partially_safe",
      feedback: {
        title: "Good Recovery from a Mistake",
        description: "While clicking the link was risky, you recovered well by not entering information and verifying with your bank through official channels. Clicking suspicious links can sometimes install malware, even without entering information.",
        whatToDoNext: "Consider scanning your device for malware. In the future, avoid clicking links in unexpected text messages claiming to be from your bank. Always verify directly through the bank's official app or website by typing the URL yourself."
      }
    },
    "reply_stop": {
      id: "reply_stop",
      messages: [
        {
          id: "reply_stop_msg1",
          text: "STOP",
          isUserMessage: true,
          timestamp: "10:25 AM"
        },
        {
          id: "reply_stop_msg2",
          text: "Thank you for confirming this active number. For account security, please verify your identity at: https://secbnk-verify.co/confirm",
          isUserMessage: false,
          timestamp: "10:25 AM"
        }
      ],
      responseOptions: [
        {
          id: "stop_response1",
          text: "Click the new link to verify your identity",
          nextNodeId: "click_link", // Reuse the previous node
          safetyLevel: "risky",
          explanation: "The scammer now knows your number is active and monitored. Clicking on their links is still risky."
        },
        {
          id: "stop_response2",
          text: "Block the number and call your bank directly",
          nextNodeId: "block_and_call",
          safetyLevel: "safe",
          explanation: "Blocking the number prevents further messages, and calling your bank directly is the safest way to verify any concerns."
        }
      ],
      isEndNode: false
    },
    "block_and_call": {
      id: "block_and_call",
      messages: [
        {
          id: "block_call_msg1",
          text: "You block the number and call your bank using the official number. The representative confirms this was a scam attempt and no action is needed on your account.",
          isUserMessage: false,
          timestamp: "10:32 AM"
        }
      ],
      isEndNode: true,
      safetyRating: "partially_safe",
      feedback: {
        title: "Good Recovery, But Avoid Replying",
        description: "While you ultimately protected your account, replying to the scam message confirmed your phone number is active, which may lead to more scam attempts in the future.",
        whatToDoNext: "In the future, avoid replying to suspicious messages entirely. Simply delete them or report them to your carrier (by forwarding to 7726) without engaging with the sender."
      }
    },
    "ignore_delete": {
      id: "ignore_delete",
      messages: [
        {
          id: "ignore_msg1",
          text: "You ignore the suspicious message and delete it from your phone.",
          isUserMessage: false,
          timestamp: "10:25 AM"
        }
      ],
      responseOptions: [
        {
          id: "ignore_response1",
          text: "Call your bank just to make sure everything is okay",
          nextNodeId: "call_bank",
          safetyLevel: "safe",
          explanation: "While ignoring the message was good, verifying with your bank through official channels provides extra peace of mind."
        },
        {
          id: "ignore_response2",
          text: "Report the number to your mobile carrier by forwarding to 7726 (SPAM)",
          nextNodeId: "report_number",
          safetyLevel: "safe",
          explanation: "Reporting scam messages helps carriers block these numbers and protect other users."
        }
      ],
      isEndNode: false
    },
    "report_number": {
      id: "report_number",
      messages: [
        {
          id: "report_msg1",
          text: "You forward the suspicious message to 7726 (SPAM) to report it to your mobile carrier.",
          isUserMessage: false,
          timestamp: "10:26 AM"
        },
        {
          id: "report_msg2",
          text: "Your carrier sends an automated reply thanking you for reporting and confirming they'll investigate.",
          isUserMessage: false,
          timestamp: "10:26 AM"
        }
      ],
      isEndNode: true,
      safetyRating: "safe",
      feedback: {
        title: "Excellent Response!",
        description: "You correctly identified the message as suspicious, ignored it, and took the extra step of reporting it to help protect others. You didn't engage with the potential scammer at all.",
        whatToDoNext: "Continue this practice with any suspicious messages. Remember that legitimate banks never ask for sensitive information via text message and won't send links for you to verify your account."
      }
    },
    "call_bank": {
      id: "call_bank",
      messages: [
        {
          id: "call_bank_msg1",
          text: "You call your bank using the official number on the back of your card. The representative confirms there are no issues with your account and that the text message was a scam attempt.",
          isUserMessage: false,
          timestamp: "10:32 AM"
        }
      ],
      isEndNode: true,
      safetyRating: "safe",
      feedback: {
        title: "Perfect Response!",
        description: "You took the safest approach by contacting your bank through official channels. This ensures you're speaking with the actual bank and not scammers.",
        whatToDoNext: "Continue this practice whenever you receive suspicious communications claiming to be from your bank or other financial institutions. Remember to always use official contact methods that you can verify independently."
      }
    }
  }
};

export default bankAlertScenario;