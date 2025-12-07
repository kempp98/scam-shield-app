/**
 * Educational Module V2 Type Definitions
 *
 * Enhanced type system for the refactored educational module experience.
 * Supports: multiple choice, drag-drop, expandable, highlight-risk, timeline, hybrid cards
 * Scoring weights: 70% module interactions, 30% final quiz
 */

// =============================================================================
// CORE MODULE TYPES
// =============================================================================

export interface EducationalModuleV2 {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  estimatedTime: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';

  /** Badge earned upon module completion */
  badge?: ModuleBadge;

  /** Module content sections */
  content: {
    sections: ContentSectionV2[];
  };

  /** Short final quiz (1-3 questions) */
  finalQuiz: FinalQuizQuestion[];

  /** Scoring configuration */
  scoring: ScoringConfig;
}

export interface ModuleBadge {
  id: string;
  name: string;
  description?: string;
  icon: string; // Emoji or icon path
  color: string; // Hex color for badge background
}

export interface ScoringConfig {
  /** Minimum score to pass (0-100) */
  passingScore: number;
  /** Weight for module interaction scores (default: 70) */
  moduleWeight: number;
  /** Weight for final quiz score (default: 30) */
  quizWeight: number;
}

// =============================================================================
// CONTENT SECTION TYPES
// =============================================================================

export interface ContentSectionV2 {
  id: string;
  title: string;
  /** Main body text (optional for purely interactive sections) */
  body?: string;

  /** Section type determines behavior */
  sectionType: 'informational' | 'interactive' | 'hybrid';

  /** Card type for rendering */
  cardType: CardType;

  /** Media attachments (images only for Phase 1) */
  media?: MediaContent[];

  /** Interaction configuration (for interactive/hybrid sections) */
  interactionData?: InteractionData;

  /** Must user attempt this section to proceed? */
  requiresCompletion: boolean;

  /** Maximum points available for this section */
  maxScore?: number;

  /** Coaching messages based on performance */
  coaching?: CoachingConfig;
}

export type CardType =
  | 'content'
  | 'multipleChoice'
  | 'dragDrop'
  | 'expandable'
  | 'highlightRisk'
  | 'timeline'
  | 'hybrid';

export interface CoachingConfig {
  onSuccess: string;
  onPartialSuccess?: string;
  onFailure: string;
  hints?: string[];
}

// =============================================================================
// MEDIA TYPES
// =============================================================================

export interface MediaContent {
  id: string;
  /** Image only for Phase 1 (video, audio, youtube deferred) */
  type: 'image';
  /** URL or path to media file */
  url: string;
  /** Caption displayed below media */
  caption?: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Enable click-to-zoom for images */
  zoomable?: boolean;
  /** Position relative to text content */
  position?: 'before' | 'after' | 'inline';
  /** Display size */
  size?: 'small' | 'medium' | 'large' | 'full';
}

// =============================================================================
// INTERACTION DATA TYPES
// =============================================================================

export type InteractionData =
  | MultipleChoiceInteraction
  | DragDropInteraction
  | ExpandableInteraction
  | HighlightRiskInteraction
  | TimelineInteraction
  | HybridInteraction;

// -----------------------------------------------------------------------------
// Multiple Choice
// -----------------------------------------------------------------------------

export interface MultipleChoiceInteraction {
  type: 'multipleChoice';
  /** The question to display */
  question: string;
  /** Allow selecting multiple options (select all that apply) */
  allowMultiple?: boolean;
  /** Shuffle options on each attempt */
  shuffleOptions?: boolean;
  /** Available options */
  options: MultipleChoiceOption[];
}

export interface MultipleChoiceOption {
  id: string;
  text: string;
  isCorrect: boolean;
  /** Feedback shown when this option is selected */
  feedback: string;
  /** Points awarded for selecting this option (for partial credit) */
  points?: number;
}

// -----------------------------------------------------------------------------
// Drag and Drop
// -----------------------------------------------------------------------------

export interface DragDropInteraction {
  type: 'dragDrop';
  /** Instructions for the user */
  instruction: string;
  /** Items to drag */
  dragItems: DragItem[];
  /** Zones to drop items into */
  dropZones: DropZone[];
  /** Show feedback immediately as items are dropped */
  showFeedbackPerItem?: boolean;
}

export interface DragItem {
  id: string;
  text: string;
  /** Category this item belongs to (matches dropZone.acceptsCategory) */
  category: string;
  /** Optional image for the item */
  image?: string;
}

export interface DropZone {
  id: string;
  title: string;
  description?: string;
  /** Category of items this zone accepts */
  acceptsCategory: string;
  /** Maximum items this zone can hold */
  maxItems?: number;
}

// -----------------------------------------------------------------------------
// Expandable
// -----------------------------------------------------------------------------

export interface ExpandableInteraction {
  type: 'expandable';
  /** Collapsible content items */
  expandableItems: ExpandableItem[];
  /** Track if user opened all items for completion */
  trackExpansions?: boolean;
}

export interface ExpandableItem {
  id: string;
  title: string;
  content: string;
  icon?: string;
}

// -----------------------------------------------------------------------------
// Highlight the Risk (Text Mode)
// -----------------------------------------------------------------------------

export interface HighlightRiskInteraction {
  type: 'highlightRisk';
  /** Instructions for the user */
  instruction: string;
  /** The scenario containing risks to identify */
  scenario: HighlightScenario;
  /** Risk elements to find */
  risks: RiskElement[];
  /** Minimum risks user must find to proceed */
  minRequiredRisks: number;
}

export interface HighlightScenario {
  /** Type of scenario */
  type: 'text' | 'message';
  /** The full text content (risks are embedded within) */
  content: string;
}

export interface RiskElement {
  id: string;
  /** Exact text to highlight (word or phrase that appears in scenario.content) */
  text: string;
  /** Explanation shown when user clicks this risk */
  explanation: string;
  /** Severity level affects visual styling */
  severity: 'low' | 'medium' | 'high' | 'critical';
}

// -----------------------------------------------------------------------------
// Timeline (Scam Lifecycle)
// -----------------------------------------------------------------------------

export interface TimelineInteraction {
  type: 'timeline';
  /** Instructions for the user */
  instruction: string;
  /** Stages on the timeline */
  timelineStages: TimelineStage[];
  /** Events to place on the timeline */
  events: TimelineEvent[];
  /** Show hints button */
  showHints?: boolean;
}

export interface TimelineStage {
  id: string;
  label: string;
  description?: string;
  /** Correct order (1, 2, 3, etc.) */
  order: number;
}

export interface TimelineEvent {
  id: string;
  text: string;
  /** ID of the stage this event belongs to */
  correctStageId: string;
  /** Feedback shown when placed correctly/incorrectly */
  feedback: string;
}

// -----------------------------------------------------------------------------
// Hybrid (Content + Interaction)
// -----------------------------------------------------------------------------

export interface HybridInteraction {
  type: 'hybrid';
  /** true = show content first, then interaction */
  contentFirst: boolean;
  /** The embedded interaction */
  interaction: MultipleChoiceInteraction | DragDropInteraction | HighlightRiskInteraction;
}

// =============================================================================
// QUIZ TYPES
// =============================================================================

export interface FinalQuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

// =============================================================================
// INTERACTION RESULT TYPES
// =============================================================================

export interface InteractionResultBase {
  sectionId: string;
  type: CardType;
  score: number;
  maxScore: number;
  passed: boolean;
  timestamp: string;
}

export interface MultipleChoiceResult extends InteractionResultBase {
  type: 'multipleChoice';
  selectedOptionIds: string[];
  correctOptionIds: string[];
}

export interface DragDropResult extends InteractionResultBase {
  type: 'dragDrop';
  placements: Record<string, string>; // itemId -> zoneId
  correctPlacements: number;
  totalItems: number;
}

export interface HighlightRiskResult extends InteractionResultBase {
  type: 'highlightRisk';
  foundRiskIds: string[];
  missedRiskIds: string[];
  totalRisks: number;
}

export interface TimelineResult extends InteractionResultBase {
  type: 'timeline';
  placements: Record<string, string>; // eventId -> stageId
  correctPlacements: number;
  totalEvents: number;
}

export interface ExpandableResult extends InteractionResultBase {
  type: 'expandable';
  expandedItemIds: string[];
  allExpanded: boolean;
}

export type InteractionResult =
  | MultipleChoiceResult
  | DragDropResult
  | HighlightRiskResult
  | TimelineResult
  | ExpandableResult;

// =============================================================================
// MODULE SUMMARY (for listing)
// =============================================================================

export type ModuleSummaryV2 = Omit<EducationalModuleV2, 'content' | 'finalQuiz'> & {
  totalSections: number;
};
