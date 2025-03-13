import { NextResponse } from 'next/server';
import { getModuleById, getModuleSummaries } from '@/lib/education';

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
      const moduleData = await getModuleById(moduleId);
      
      if (!moduleData) {
        return NextResponse.json(
          { error: 'Module not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(moduleData);
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