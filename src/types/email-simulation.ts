// Types for email simulation
import { DifficultyLevel } from './simulation-v2';


export interface EmailRedFlag {
  id: string;
  text: string;
  explanation: string;
  highlightText?: string;
  highlightPosition?: 'subject' | 'sender' | 'body';
}
export interface EmailMessage {
  id: string;
  subject: string;
  from: {
    name: string;
    email: string;
  };
  to: {
    name: string;
    email: string;
  };
  cc?: Array<{
    name: string;
    email: string;
  }>;
  bcc?: Array<{
    name: string;
    email: string;
  }>;
  date: string;
  body: string;
  hasAttachments?: boolean;
  attachments?: EmailAttachment[];
  isRead?: boolean;
  isStarred?: boolean;
  isImportant?: boolean;
  folder?: string;
  redFlags: EmailRedFlag[];
}

export interface EmailAttachment {
  id: string;
  name: string;
  type: string;
  size: string;
  isMalicious?: boolean;
}

// Email scenario data structure
export interface EmailScenarioData {
  id: string;
  type: "email";
  category: string;
  isScam: boolean;
  difficulty: DifficultyLevel;
  sender: {
    name: string;
    email: string;
  };
  emails: EmailMessage[];
  redFlags?: EmailRedFlag[];
  identificationQuestion: {
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
      feedback: string;
    }[];
  };
  actionQuestion: {
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
      safetyImpact: number;
      feedback: string;
    }[];
  };
}

// Interface for the user's email inbox state
export interface EmailInboxState {
  emails: EmailMessage[];
  selectedEmailId: string | null;
  activeFolder: string;
  step: 'inbox' | 'reading' | 'identification' | 'feedback' | 'action' | 'complete';
}


// Email sequence state
export interface EmailSequenceState {
  sequenceId: string | null;
  currentScenarioIndex: number;
  currentScenarioId: string | null;
  completedScenarios: {
    [scenarioId: string]: {
      identificationCorrect: boolean;
      actionCorrect: boolean;
      safetyImpact: number;
    };
  };
  totalScenarios: number;
  completed: boolean;
  overallScore?: number;
}

// Email sequence summary
export interface EmailSequenceSummary {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  category: string;
  completedCount: number;
  totalCount: number;
  learnMoreUrl?: string;
  thumbnailImage?: string;
}