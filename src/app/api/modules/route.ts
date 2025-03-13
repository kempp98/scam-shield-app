import { NextResponse } from 'next/server';
import { getAllModules, getModuleById, getModuleSummaries } from '@/lib/education';

/**
 * GET /api/modules
 * Get all module summaries
 */
export async function GET(request: Request) {
  try {
    // Get the module ID from the query parameters if provided
    const { searchParams } = new URL(request.url);
    const moduleId = searchParams.get('id');
    
    if (moduleId) {
      // If a specific module ID is requested
      const module = await getModuleById(moduleId);
      
      if (!module) {
        return NextResponse.json(
          { error: 'Module not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(module);
    }
    
    // Otherwise return all module summaries
    const modules = await getModuleSummaries();
    return NextResponse.json(modules);
  } catch (error) {
    console.error('Error in modules API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}