// Generic interface for all interaction results
export interface BaseInteractionResult {
    correct: boolean;
    type: string; // Discriminator field
  }
  
  // Multiple choice specific result
  export interface MultipleChoiceResult extends BaseInteractionResult {
    type: 'multipleChoice';
    selectedOption: string;
  }
  
  // Drag and drop specific result
  export interface DragDropResult extends BaseInteractionResult {
    type: 'dragDrop';
    matches: Record<string, string>;
  }
  
  // Union type for all possible results
  export type InteractionResult = MultipleChoiceResult | DragDropResult;