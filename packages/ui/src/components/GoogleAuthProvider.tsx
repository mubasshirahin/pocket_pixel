'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          renderButton: (
            element: HTMLElement,
            options: {
              theme?: 'outline' | 'filled_blue' | 'filled_black';
              size?: 'large' | 'medium' | 'small';
              shape?: 'rectangular' | 'pill' | 'circle' | 'square';
              text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
              logo_alignment?: 'left' | 'center';
              width?: number;
            },
          ) => void;
          prompt: () => void;
        };
      };
    };
  }
}

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '';

let gisReady = false;
const readyListeners: Array<() => void> = [];

function onGisReady(cb: () => void) {
  if (gisReady) {
    cb();
    return;
  }
  readyListeners.push(cb);
}

export function useGoogleClientId() {
  return GOOGLE_CLIENT_ID;
}

export function useGisReady() {
  const [ready, setReady] = useState(gisReady);
  useEffect(() => {
    if (gisReady) {
      setReady(true);
      return;
    }
    onGisReady(() => setReady(true));
  }, []);
  return ready;
}

export default function GoogleAuthProvider({ children }: { children: React.ReactNode }) {
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current || gisReady) return;
    loaded.current = true;

    if (typeof window !== 'undefined' && window.google?.accounts?.id) {
      gisReady = true;
      readyListeners.splice(0).forEach((fn) => fn());
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      gisReady = true;
      readyListeners.splice(0).forEach((fn) => fn());
    };
    document.head.appendChild(script);
  }, []);

  return <>{children}</>;
}
