import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

export function useActiveSection(): [string, Dispatch<SetStateAction<string>>] {
  const [active, setActive] = useState('#inicio');

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]');

    /* rootMargin creates a narrow active zone in the upper portion of the viewport.
       A section is "active" when any part of it sits in the band between 20% and 30%
       from the top — independent of scroll speed, no false fires with fast scroll. */
    const obs = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return [active, setActive];
}
