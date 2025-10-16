import { useEffect, useState } from 'react';

export function useAppBoot() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setReady(true), 1200);
    return () => clearTimeout(timeout);
  }, []);

  return { ready };
}
