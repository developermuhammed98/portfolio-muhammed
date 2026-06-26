'use client';

import dynamic from 'next/dynamic';

const DotField = dynamic(() => import('./DotField'), { ssr: false });

export default function DotFieldBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <DotField
        dotRadius={1.5}
        dotSpacing={14}
        cursorRadius={500}
        cursorForce={0.1}
        bulgeOnly={true}
        bulgeStrength={67}
        glowRadius={160}
        sparkle={false}
        waveAmplitude={0}
        gradientFrom='rgba(98, 224, 249, 0.83)'
        gradientTo='rgba(180, 151, 207, 0.25)'
        glowColor="#8eccf8ff"
      />

    </div>
  );
}
