'use client';

import React from 'react';
import { useEmailSimulation } from './email-simulation-context';
import { cn } from '@/lib/utils';

const folders = [
  { id: 'inbox', name: 'Inbox', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  ) },
  { id: 'starred', name: 'Starred', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ) },
  { id: 'sent', name: 'Sent', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
  ) },
  { id: 'drafts', name: 'Drafts', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
    </svg>
  ) },
  { id: 'spam', name: 'Spam', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ) },
  { id: 'trash', name: 'Trash', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ) },
];

export function EmailSidebar() {
  const { inboxState } = useEmailSimulation();
  const { activeFolder } = inboxState;
  
  // Count unread emails (for a real application)
  const unreadCount = 1; // Placeholder
  
  return (
    <div className="w-full h-full bg-gray-100 border rounded-md overflow-hidden">
      {/* Compose button */}
      <div className="p-3">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>Compose</span>
        </button>
      </div>
      
      {/* Folders list */}
      <div className="p-2">
        <div className="space-y-1">
          {folders.map((folder) => (
            <button
              key={folder.id}
              className={cn(
                "w-full flex items-center gap-3 py-2 px-3 rounded-md text-sm transition-colors",
                activeFolder === folder.id
                  ? "bg-blue-100 text-blue-800"
                  : "hover:bg-gray-200 text-gray-700"
              )}
            >
              <span className={cn(
                "flex-shrink-0",
                activeFolder === folder.id && "text-blue-600"
              )}>
                {folder.icon}
              </span>
              <span className="flex-1 text-left">{folder.name}</span>
              {folder.id === 'inbox' && unreadCount > 0 && (
                <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Labels section */}
      <div className="p-2 border-t mt-2">
        <h3 className="text-xs font-medium text-gray-500 uppercase px-3 mb-2">Labels</h3>
        <div className="space-y-1">
          <button className="w-full flex items-center gap-3 py-2 px-3 rounded-md text-sm hover:bg-gray-200 text-gray-700">
            <span className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0"></span>
            <span className="flex-1 text-left">Important</span>
          </button>
          <button className="w-full flex items-center gap-3 py-2 px-3 rounded-md text-sm hover:bg-gray-200 text-gray-700">
            <span className="w-3 h-3 rounded-full bg-yellow-500 flex-shrink-0"></span>
            <span className="flex-1 text-left">Personal</span>
          </button>
          <button className="w-full flex items-center gap-3 py-2 px-3 rounded-md text-sm hover:bg-gray-200 text-gray-700">
            <span className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0"></span>
            <span className="flex-1 text-left">Work</span>
          </button>
        </div>
      </div>
    </div>
  );
}