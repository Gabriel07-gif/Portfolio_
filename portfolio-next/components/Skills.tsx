'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLang } from '@/contexts/LangContext';
import { FRONTEND, BACKEND, TOOLS, type ChipData } from '@/data/skills';

function SkillChip({ chip, delay }: { chip: ChipData; delay: number }) {
  return (
    <motion.span
      className={`skill-chip${chip.featured ? ' skill-chip--featured' : ''}`}
      initial={{ opacity: 0, scale: 0.78, y: 12, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, scale: 1,    y: 0,  filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.42, delay, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <span className="skill-chip-icon" aria-hidden="true">
        {chip.icon ? chip.icon : chip.img ? (
          chip.imgLight ? (
            <>
              <Image src={chip.img}      alt={chip.name} fill loading="lazy" style={{ objectFit: 'contain' }} className="skill-img-dark" />
              <Image src={chip.imgLight} alt=""          fill loading="lazy" style={{ objectFit: 'contain' }} className="skill-img-light" aria-hidden="true" />
            </>
          ) : (
            <Image src={chip.img} alt={chip.name} fill loading="lazy" style={{ objectFit: 'contain' }} />
          )
        ) : (
          <span className="skill-chip-letter">{chip.letter}</span>
        )}
      </span>
      {chip.name}
    </motion.span>
  );
}

function Category({
  labelKey,
  chips,
  baseDelay,
}: {
  labelKey: string;
  chips: ChipData[];
  baseDelay: number;
}) {
  const { t } = useLang();
  return (
    <motion.div
      className="skills-category"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: baseDelay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="skills-cat-header">
        <span className="skills-cat-label">{t(labelKey)}</span>
        <div className="skills-cat-line" aria-hidden="true" />
      </div>
      <div className="skills-chips">
        {chips.map((chip, i) => (
          <SkillChip key={chip.name} chip={chip} delay={baseDelay + i * 0.05} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { t } = useLang();

  return (
    <section id="habilidades" className="bg-alt" aria-label={t('nav.skills')}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-num">03</span>
          <h2>
            <span>{t('section.skills.pre')}</span>
            <span className="accent-text">{t('section.skills.acc')}</span>
          </h2>
          <p className="section-sub">{t('section.skills.sub')}</p>
          <motion.div
            className="section-line"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        <div className="skills-categories">
          <Category labelKey="skills.cat.frontend" chips={FRONTEND} baseDelay={0}    />
          <Category labelKey="skills.cat.backend"  chips={BACKEND}  baseDelay={0.1}  />
          <Category labelKey="skills.cat.tools"    chips={TOOLS}    baseDelay={0.2}  />
        </div>
      </div>
    </section>
  );
}
