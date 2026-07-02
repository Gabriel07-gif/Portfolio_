'use client';

import { useLang } from '@/contexts/LangContext';

export default function SkipLink() {
  const { t } = useLang();
  return (
    <a href="#main-content" className="skip-to-content">
      {t('skip.content')}
    </a>
  );
}
