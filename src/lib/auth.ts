// Clerk authentication utilities for React
// Uses @clerk/clerk-react hooks

import { useUser, useAuth } from "@clerk/clerk-react";

// Re-export Clerk hooks for convenience
export { useUser, useAuth } from "@clerk/clerk-react";

// Get current user (for non-hook contexts)
export function getCurrentUser() {
  // This is a helper that can be used in non-React contexts
  // For React components, use useUser() hook instead
  if (typeof window !== 'undefined' && (window as any).__clerk) {
    return (window as any).__clerk.user || null;
  }
  return null;
}

// Check if user is authenticated (for non-hook contexts)
export function isAuthenticated(): boolean {
  if (typeof window !== 'undefined' && (window as any).__clerk) {
    return !!(window as any).__clerk.user;
  }
  return false;
}

// Get user ID (for non-hook contexts)
export function getUserId(): string | null {
  const user = getCurrentUser();
  return user?.id || null;
}
