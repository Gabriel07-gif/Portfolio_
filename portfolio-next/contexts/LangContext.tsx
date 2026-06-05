'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { type Lang, LANG_META, detectLang, translate } from '@/lib/i18n';

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  meta: typeof LANG_META;
}

const LangContext = createContext<LangContextValue>({
  lang: 'pt',
  setLang: () => {},
  t: (k) => k,
  meta: LANG_META,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('pt');

  useEffect(() => {
    setLangState(detectLang());
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem('g-lang', l);
    document.documentElement.lang = l === 'pt' ? 'pt-BR' : l;
    document.title = translate(l, 'page.title');
  }, []);

  const t = useCallback((key: string) => translate(lang, key), [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t, meta: LANG_META }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
