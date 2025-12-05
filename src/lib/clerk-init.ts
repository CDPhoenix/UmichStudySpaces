// Clerk initialization utility
// This ensures Clerk is properly initialized before use

export async function initializeClerk(): Promise<boolean> {
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  
  if (!publishableKey || publishableKey === 'pk_test_YOUR_CLERK_PUBLISHABLE_KEY' || publishableKey.includes('YOUR')) {
    console.error('❌ Clerk Publishable Key not configured!');
    console.error('Current value:', publishableKey || 'undefined');
    console.error('Please add VITE_CLERK_PUBLISHABLE_KEY to your .env file');
    return false;
  }

  // Wait for Clerk SDK to load
  let retries = 0;
  const maxRetries = 100;
  
  while (typeof window !== 'undefined' && !(window as any).Clerk && retries < maxRetries) {
    await new Promise(resolve => setTimeout(resolve, 100));
    retries++;
  }

  if (typeof window === 'undefined' || !(window as any).Clerk) {
    console.error('❌ Clerk SDK failed to load');
    console.error('Please check:');
    console.error('1. Network connection');
    console.error('2. index.html has Clerk SDK script tag');
    console.error('3. Browser console for script loading errors');
    return false;
  }

  try {
    const Clerk = (window as any).Clerk;
    
    // Check if already initialized
    if ((window as any).clerk) {
      console.log('✅ Clerk already initialized');
      return true;
    }

    const clerk = new Clerk(publishableKey);
    await clerk.load();
    (window as any).clerk = clerk;
    
    console.log('✅ Clerk initialized successfully!');
    return true;
  } catch (error: any) {
    console.error('❌ Error initializing Clerk:', error);
    console.error('Error details:', error.message);
    return false;
  }
}

// Get Clerk instance
export function getClerk() {
  return (window as any).clerk || null;
}

// Check if Clerk is ready
export function isClerkReady(): boolean {
  return !!(window as any).clerk;
}

