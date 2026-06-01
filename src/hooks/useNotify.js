import { useState, useCallback } from 'react';

export function useNotify() {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const notify = useCallback((msg) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), 2200);
  }, []);

  return { message, visible, notify };
}
