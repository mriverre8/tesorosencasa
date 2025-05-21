'use server';

export async function trackEvent(component: string, details: string) {
  console.log(`[EVENT] ${component}: `, details); // Esto aparece en Vercel Logs
}
