import fs from 'fs';
import path from 'path';

// Define types for educational content
export interface RedFlag {
  id: string;
  text: string;
  explanation: string;
}

export interface KeyPoint {
  id: string;
  title: string;
  description: string;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface ContentSection {
  id: string;
  title: string;
  body: string;
  redFlags?: RedFlag[];
  keyPoints?: KeyPoint[];
  examples?: string[];
  actionSteps?: string[];
}

export interface ModuleContent {
  sections: ContentSection[];
}

export interface EducationalModule {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  estimatedTime: string;
  content: ModuleContent;
  quiz: QuizQuestion[];
}

/**
 * Get all educational modules
 */
export async function getAllModules(): Promise<EducationalModule[]> {
  try {
    const dataDirectory = path.join(process.cwd(), 'src/data/educational');
    const filenames = fs.readdirSync(dataDirectory);
    
    const allModules = filenames
      .filter(filename => filename.endsWith('.json'))
      .map(filename => {
        // Read the JSON file
        const filePath = path.join(dataDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        
        // Parse the JSON content
        const module: EducationalModule = JSON.parse(fileContents);
        
        return module;
      });
    
    // Sort modules by title or any other criteria
    return allModules.sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error('Error loading educational modules:', error);
    return [];
  }
}

/**
 * Get a specific module by ID
 */
export async function getModuleById(id: string): Promise<EducationalModule | null> {
  try {
    const modules = await getAllModules();
    const module = modules.find(m => m.id === id);
    
    if (!module) {
      return null;
    }
    
    return module;
  } catch (error) {
    console.error(`Error loading module with ID ${id}:`, error);
    return null;
  }
}

/**
 * Get a list of module summaries (without full content) for the module list page
 */
export async function getModuleSummaries(): Promise<Array<Omit<EducationalModule, 'content' | 'quiz'>>> {
  try {
    const modules = await getAllModules();
    
    // Return only the summary information, excluding full content and quiz
    return modules.map(({id, title, description, coverImage, estimatedTime}) => ({
      id,
      title,
      description,
      coverImage,
      estimatedTime
    }));
  } catch (error) {
    console.error('Error loading module summaries:', error);
    return [];
  }
}

/**
 * Get only the quiz questions for a specific module
 */
export async function getModuleQuiz(moduleId: string): Promise<QuizQuestion[] | null> {
  try {
    const module = await getModuleById(moduleId);
    
    if (!module) {
      return null;
    }
    
    return module.quiz;
  } catch (error) {
    console.error(`Error loading quiz for module ${moduleId}:`, error);
    return null;
  }
}

/**
 * Helper function to save user progress (to be implemented with actual storage)
 * This is a placeholder that would be replaced with actual storage implementation
 */
export async function saveUserProgress(
  userId: string,
  moduleId: string,
  progress: { 
    completedSections: string[],
    quizResults?: { 
      score: number,
      answers: Record<string, string>
    }
  }
): Promise<boolean> {
  try {
    // This would be replaced with actual storage logic (e.g., to a database)
    console.log(`Saving progress for user ${userId} on module ${moduleId}:`, progress);
    
    // For now, just return success
    return true;
  } catch (error) {
    console.error('Error saving user progress:', error);
    return false;
  }
}

/**
 * Helper function to get user progress (to be implemented with actual storage)
 * This is a placeholder that would be replaced with actual storage implementation
 */
export async function getUserProgress(
  userId: string,
  moduleId: string
): Promise<{
  completedSections: string[],
  quizResults?: {
    score: number,
    answers: Record<string, string>
  }
} | null> {
  try {
    // This would be replaced with actual storage logic
    // For now, just return null to indicate no saved progress
    return null;
  } catch (error) {
    console.error('Error getting user progress:', error);
    return null;
  }
}