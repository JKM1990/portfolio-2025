'use client';

/**
 * Smoothly scrolls to a target position on the page
 */
export function animateScroll(
  scrollStart: number, 
  scrollTarget: number, 
  onComplete?: () => void
) {
  const scrollDistance = scrollTarget - scrollStart;
  const animationDuration = 0.5; // in seconds
  
  const startTime = performance.now();
  const animate = (currentTime: number) => {
    const elapsedTime = (currentTime - startTime) / 1000; // in seconds
    const progress = Math.min(elapsedTime / animationDuration, 1);
    
    // Ease out cubic function for smooth deceleration
    const easeOut = 1 - Math.pow(1 - progress, 3);
    
    window.scrollTo(0, scrollStart + scrollDistance * easeOut);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // This prevents hash being added to URL
      history.pushState(null, '', window.location.pathname);
      
      if (onComplete) {
        onComplete();
      }
    }
  };
  
  requestAnimationFrame(animate);
}
