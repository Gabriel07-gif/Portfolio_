'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { type Lang, LANG_META, detectLang, translate } from '@/lib/i18n';

const toLangAttr = (l: Lang) => l === 'pt' ? 'pt-BR' : l;

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
    const detected = detectLang();
    setLangState(detected);
    document.documentElement.lang = toLangAttr(detected);
    document.title = translate(detected, 'page.title');
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem('g-lang', l); } catch {}
    document.documentElement.lang = toLangAttr(l);
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
