// Mock Facebook Pixel implementation
type FacebookPixelParameters = Record<string, string | number | boolean>;

interface WindowWithFbq extends Window {
  fbq?: (action: string, eventName: string, parameters?: FacebookPixelParameters) => void;
}

export class FacebookPixel {
  private static pixelId = 'YOUR_PIXEL_ID'; // Replace with actual pixel ID
  private static initialized = false;

  static init() {
    if (typeof window === 'undefined' || this.initialized) return;

    // Mock Facebook Pixel initialization
    console.log('🔵 Facebook Pixel initialized with ID:', this.pixelId);
    
    // In production, you would load the actual Facebook Pixel script here
    // This is a mock implementation for demonstration
    (window as WindowWithFbq).fbq = this.mockFbq;
    
    this.initialized = true;
  }

  static trackEvent(eventName: string, parameters?: FacebookPixelParameters) {
    if (typeof window === 'undefined') return;

    console.log('📊 Facebook Pixel Event:', eventName, parameters);
    
    // Mock tracking - in production this would use the real fbq function
    const windowWithFbq = window as WindowWithFbq;
    if (windowWithFbq.fbq) {
      windowWithFbq.fbq('track', eventName, parameters);
    }
  }

  static trackLead(parameters?: FacebookPixelParameters) {
    this.trackEvent('Lead', {
      content_name: 'Hero Button Click',
      content_category: 'Landing Page',
      ...parameters
    });
  }

  static trackPageView(pageName?: string) {
    this.trackEvent('PageView', pageName ? { page_name: pageName } : undefined);
  }

  // Mock fbq function for demonstration
  private static mockFbq(action: string, eventName: string, parameters?: FacebookPixelParameters) {
    const timestamp = new Date().toISOString();
    console.log(`🎯 [${timestamp}] FB Pixel - ${action}: ${eventName}`, parameters || '');
    
    // Show a visual notification in development
    if (action === 'track' && eventName === 'Lead') {
      const notification = document.createElement('div');
      notification.innerHTML = `
        <div style="
          position: fixed;
          top: 20px;
          right: 20px;
          background: #1877f2;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 10000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 14px;
          animation: slideIn 0.3s ease-out;
        ">
          🎯 Facebook Pixel: Lead Event Tracked!
        </div>
        <style>
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        </style>
      `;
      
      document.body.appendChild(notification);
      
      // Remove notification after 3 seconds
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 3000);
    }
  }
}

// Auto-initialize on import
if (typeof window !== 'undefined') {
  FacebookPixel.init();
}