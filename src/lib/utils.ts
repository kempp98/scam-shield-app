import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names or class objects into a single class string,
 * while properly handling Tailwind CSS conflicting classes.
 * 
 * Uses clsx for conditional class joining and tailwind-merge to resolve
 * Tailwind class conflicts.
 * 
 * @param inputs - Class names, objects, or arrays to be combined
 * @returns A merged className string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}