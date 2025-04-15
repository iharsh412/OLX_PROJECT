import { useEffect, useContext } from 'react';
import { UNSAFE_NavigationContext } from 'react-router-dom';

interface PromptProps {
  when: boolean;
  message: string;
}

function Prompt({ when, message }: PromptProps) {
  const navigator = useContext(UNSAFE_NavigationContext).navigator;

  // Block navigation within SPA
  useEffect(() => {
    if (!when) return;

    const unblock = (navigator as any).block((tx: any) => {
      if (window.confirm(message)) {
        unblock(); // allow navigation after confirmation
        tx.retry(); // retry the transition
      }
    });

    return unblock;
  }, [when, message, navigator]);

  // Block reloads / tab closing
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (when) {
        event.preventDefault();
        event.returnValue = message;
        return message;
      }
    };

    if (when) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [when, message]);

  return null;
}

export default Prompt;
