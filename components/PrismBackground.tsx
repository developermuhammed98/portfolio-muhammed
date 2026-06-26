'use client';

import dynamic from 'next/dynamic';

const Prism = dynamic(() => import('./Prism'), { ssr: false });

export default function PrismBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Prism
        animationType="rotate"
        glow={0.9}
        noise={0.08}
        transparent={true}
        scale={3.8}
        colorFrequency={1.0}
        hueShift={0}
        bloom={1.1}
        timeScale={0.4}
        suspendWhenOffscreen={false}
      />
    </div>
  );
}
