// Example schema
export interface RedFlag {
    id: string;
    text: string;
    explanation: string;
  }
  
  export interface QuizQuestion {
    id: string;
    question: string;
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
      feedback: string;
    }[];
  }
  
  export interface EducationalModule {
    id: string;
    title: string;
    description: string;
    content: {
      sections: {
        id: string;
        title: string;
        body: string;
        redFlags?: RedFlag[];
      }[];
    };
    quiz: QuizQuestion[];
  }