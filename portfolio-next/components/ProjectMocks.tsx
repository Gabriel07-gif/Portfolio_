import React from 'react';

export function MockVenezamotos() {
  return (
    <svg
      width="100%" height="100%"
      viewBox="0 0 320 166"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="320" height="166" fill="#071510"/>
      <rect width="320" height="22" fill="rgba(0,0,0,0.4)"/>
      <rect x="12" y="8" width="36" height="6" rx="2" fill="rgba(0,255,136,0.7)"/>
      <rect x="200" y="9" width="18" height="4" rx="2" fill="rgba(255,255,255,0.15)"/>
      <rect x="224" y="9" width="22" height="4" rx="2" fill="rgba(255,255,255,0.15)"/>
      <rect x="252" y="9" width="18" height="4" rx="2" fill="rgba(255,255,255,0.15)"/>
      <rect x="278" y="7" width="30" height="8" rx="3" fill="rgba(0,255,136,0.4)"/>
      <rect x="12" y="30" width="200" height="12" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
      <rect x="16" y="34" width="60" height="4" rx="2" fill="rgba(255,255,255,0.1)"/>
      <rect x="218" y="30" width="46" height="12" rx="3" fill="rgba(0,255,136,0.2)" stroke="rgba(0,255,136,0.3)" strokeWidth="1"/>
      <rect x="224" y="34" width="34" height="4" rx="2" fill="rgba(0,255,136,0.6)"/>
      <rect x="12" y="50" width="138" height="100" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
      <rect x="12" y="50" width="138" height="56" rx="6" fill="rgba(0,255,136,0.05)"/>
      <ellipse cx="52" cy="78" rx="18" ry="10" fill="rgba(0,255,136,0.25)"/>
      <ellipse cx="52" cy="78" rx="12" ry="7" fill="rgba(0,255,136,0.4)"/>
      <rect x="76" y="72" width="28" height="3" rx="1" fill="rgba(255,255,255,0.3)"/>
      <rect x="76" y="79" width="20" height="3" rx="1" fill="rgba(255,255,255,0.15)"/>
      <rect x="76" y="86" width="24" height="3" rx="1" fill="rgba(0,255,136,0.4)"/>
      <rect x="20" y="114" width="70" height="5" rx="2" fill="rgba(255,255,255,0.18)"/>
      <rect x="20" y="124" width="50" height="4" rx="2" fill="rgba(255,255,255,0.08)"/>
      <rect x="20" y="133" width="55" height="11" rx="4" fill="rgba(0,255,136,0.35)"/>
      <rect x="80" y="133" width="58" height="11" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(0,255,136,0.2)" strokeWidth="1"/>
      <rect x="158" y="50" width="150" height="100" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
      <rect x="158" y="50" width="150" height="56" rx="6" fill="rgba(0,170,255,0.05)"/>
      <ellipse cx="198" cy="78" rx="18" ry="10" fill="rgba(0,170,255,0.25)"/>
      <ellipse cx="198" cy="78" rx="12" ry="7" fill="rgba(0,170,255,0.4)"/>
      <rect x="222" y="72" width="28" height="3" rx="1" fill="rgba(255,255,255,0.3)"/>
      <rect x="222" y="79" width="20" height="3" rx="1" fill="rgba(255,255,255,0.15)"/>
      <rect x="222" y="86" width="24" height="3" rx="1" fill="rgba(0,170,255,0.4)"/>
      <rect x="166" y="114" width="70" height="5" rx="2" fill="rgba(255,255,255,0.18)"/>
      <rect x="166" y="124" width="50" height="4" rx="2" fill="rgba(255,255,255,0.08)"/>
      <rect x="166" y="133" width="60" height="11" rx="4" fill="rgba(0,255,136,0.35)"/>
      <rect x="232" y="133" width="60" height="11" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(0,255,136,0.2)" strokeWidth="1"/>
    </svg>
  );
}

export function MockJuriVox() {
  return (
    <svg
      width="100%" height="100%"
      viewBox="0 0 320 166"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="320" height="166" fill="#080f1c"/>
      <rect width="52" height="166" fill="rgba(0,100,200,0.06)" />
      <rect x="1" y="0" width="51" height="166" fill="none" stroke="rgba(0,170,255,0.08)" strokeWidth="1"/>
      <rect x="14" y="16" width="24" height="6" rx="3" fill="rgba(0,170,255,0.7)"/>
      {[38, 55, 72, 89, 106].map((y, i) => (
        <rect key={y} x="14" y={y} width={i === 1 ? 24 : 18} height="4" rx="2"
          fill={i === 1 ? 'rgba(0,170,255,0.8)' : 'rgba(255,255,255,0.12)'} />
      ))}
      <rect x="10" y="50" width="32" height="14" rx="4" fill="rgba(0,170,255,0.12)" stroke="rgba(0,170,255,0.25)" strokeWidth="1"/>
      <rect x="52" y="0" width="268" height="24" fill="rgba(0,0,0,0.3)"/>
      <rect x="64" y="8" width="60" height="6" rx="2" fill="rgba(255,255,255,0.18)"/>
      <rect x="248" y="7" width="60" height="10" rx="4" fill="rgba(0,170,255,0.4)"/>
      {[64, 160, 232].map((x, i) => (
        <rect key={x} x={x} y="32" width={i === 1 ? 82 : 72} height="22" rx="4"
          fill="rgba(255,255,255,0.03)" stroke="rgba(0,170,255,0.1)" strokeWidth="1"/>
      ))}
      <rect x="70" y="37" width="30" height="5" rx="2" fill="rgba(0,170,255,0.5)"/>
      <rect x="70" y="45" width="20" height="4" rx="2" fill="rgba(255,255,255,0.1)"/>
      <rect x="166" y="37" width="30" height="5" rx="2" fill="rgba(0,255,136,0.5)"/>
      <rect x="166" y="45" width="20" height="4" rx="2" fill="rgba(255,255,255,0.1)"/>
      <rect x="238" y="37" width="30" height="5" rx="2" fill="rgba(255,170,0,0.5)"/>
      <rect x="238" y="45" width="20" height="4" rx="2" fill="rgba(255,255,255,0.1)"/>
      <rect x="64" y="62" width="248" height="14" rx="3" fill="rgba(0,170,255,0.06)"/>
      <rect x="72" y="66" width="35" height="4" rx="2" fill="rgba(255,255,255,0.2)"/>
      <rect x="140" y="66" width="40" height="4" rx="2" fill="rgba(255,255,255,0.2)"/>
      <rect x="220" y="66" width="30" height="4" rx="2" fill="rgba(255,255,255,0.2)"/>
      <rect x="272" y="66" width="28" height="4" rx="2" fill="rgba(255,255,255,0.2)"/>
      {[82, 100, 118, 136, 154].map((y, i) => (
        <g key={y}>
          <rect x="64" y={y} width="248" height="14" rx="2"
            fill={i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent'}/>
          <rect x="72" y={y + 5} width={28 + (i * 4) % 20} height="4" rx="2" fill="rgba(255,255,255,0.14)"/>
          <rect x="140" y={y + 5} width="35" height="4" rx="2" fill="rgba(0,170,255,0.3)"/>
          <rect x="220" y={y + 5} width="22" height="4" rx="2" fill="rgba(255,255,255,0.1)"/>
          <rect x="272" y={y + 3} width="44" height="8" rx="3"
            fill={i === 0 ? 'rgba(0,255,136,0.2)' : i === 2 ? 'rgba(255,170,0,0.2)' : 'rgba(0,170,255,0.2)'}
            stroke={i === 0 ? 'rgba(0,255,136,0.3)' : i === 2 ? 'rgba(255,170,0,0.3)' : 'rgba(0,170,255,0.3)'}
            strokeWidth="1"/>
        </g>
      ))}
    </svg>
  );
}

export function MockPortfolio() {
  return (
    <svg
      width="100%" height="100%"
      viewBox="0 0 320 166"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="320" height="166" fill="#05050f"/>
      {[28, 56, 84, 112, 140, 168, 196, 224, 252, 280, 308].map(x =>
        [14, 42, 70, 98, 126, 154].map(y => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="0.8" fill="rgba(255,255,255,0.04)"/>
        ))
      )}
      <rect width="320" height="20" fill="rgba(0,0,0,0.5)"/>
      <text x="14" y="14" fill="#00ff88" fontSize="10" fontWeight="800" fontFamily="monospace">GR.</text>
      {[160, 188, 214, 238, 262].map((x, i) => (
        <rect key={x} x={x} y="7" width={i === 2 ? 18 : 22} height="5" rx="2" fill="rgba(255,255,255,0.12)"/>
      ))}
      <rect x="285" y="6" width="22" height="7" rx="3" fill="rgba(0,255,136,0.15)" stroke="rgba(0,255,136,0.3)" strokeWidth="1"/>
      <text x="24" y="56" fill="white" fontSize="22" fontWeight="900" fontFamily="sans-serif" letterSpacing="-0.5">Gabriel</text>
      <circle cx="114" cy="49" r="3.5" fill="#00ff88"/>
      <rect x="24" y="62" width="6" height="4" rx="1" fill="rgba(0,255,136,0.5)"/>
      <rect x="33" y="63" width="55" height="3" rx="1" fill="rgba(0,255,136,0.35)"/>
      <rect x="24" y="74" width="130" height="4" rx="2" fill="rgba(255,255,255,0.14)"/>
      <rect x="24" y="82" width="110" height="4" rx="2" fill="rgba(255,255,255,0.09)"/>
      <rect x="24" y="90" width="90" height="4" rx="2" fill="rgba(255,255,255,0.06)"/>
      <rect x="24" y="104" width="58" height="14" rx="5" fill="rgba(0,255,136,0.8)"/>
      <rect x="88" y="104" width="56" height="14" rx="5" fill="transparent" stroke="rgba(0,255,136,0.4)" strokeWidth="1"/>
      <rect x="200" y="30" width="106" height="120" rx="8" fill="#13131f" stroke="rgba(0,255,136,0.12)" strokeWidth="1"/>
      <rect x="200" y="30" width="106" height="18" rx="8" fill="rgba(255,255,255,0.03)"/>
      <circle cx="210" cy="39" r="3" fill="rgba(255,95,87,0.8)"/>
      <circle cx="221" cy="39" r="3" fill="rgba(254,188,46,0.8)"/>
      <circle cx="232" cy="39" r="3" fill="rgba(40,200,64,0.8)"/>
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <rect key={i} x={210 + (i % 2) * 4} y={56 + i * 13} width={[45, 38, 52, 35, 48, 30, 42][i]} height="4" rx="2"
          fill={i % 3 === 0 ? 'rgba(203,166,247,0.5)' : i % 3 === 1 ? 'rgba(166,227,161,0.4)' : 'rgba(137,220,235,0.4)'}/>
      ))}
      <ellipse cx="160" cy="83" rx="120" ry="60" fill="rgba(0,255,136,0.025)"/>
    </svg>
  );
}
