'use client';

import React, { useEffect, useRef, memo } from 'react';

const TWO_PI = Math.PI * 2;

interface DotFieldProps {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  cursorForce?: number;
  bulgeOnly?: boolean;
  bulgeStrength?: number;
  glowRadius?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

interface Dot {
  ax: number; ay: number;
  sx: number; sy: number;
  vx: number; vy: number;
  x: number;  y: number;
}

const DotField: React.FC<DotFieldProps> = memo(({
  dotRadius    = 1.6,
  dotSpacing   = 16,      // ← slightly wider than 14 to cut ~25% dot count
  cursorRadius = 500,
  cursorForce  = 0.1,
  bulgeOnly    = true,
  bulgeStrength = 67,
  glowRadius   = 160,
  sparkle      = false,
  waveAmplitude = 0,
  gradientFrom = 'rgba(168, 85, 247, 0.35)',
  gradientTo   = 'rgba(34, 211, 238, 0.25)',
  glowColor    = '#020617',
  style,
  className,
  ...rest
}) => {
  const canvasRef   = useRef<HTMLCanvasElement | null>(null);
  const svgRef      = useRef<SVGSVGElement | null>(null);
  const glowRef     = useRef<SVGCircleElement | null>(null);
  const dotsRef     = useRef<Dot[]>([]);
  const mouseRef    = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 });
  const rafRef      = useRef<number | null>(null);
  const sizeRef     = useRef({ w: 0, h: 0 });
  const glowOpacity = useRef(0);
  const engagement  = useRef(0);
  // ── PERF: cached gradient – recreated only on resize, not every frame ──
  const gradCacheRef = useRef<CanvasGradient | null>(null);
  // ── PERF: idle flag – rAF loop sleeps when mouse is away & dots settled ──
  const activeRef   = useRef(true);

  const propsRef = useRef({
    dotRadius, dotSpacing, cursorRadius, cursorForce,
    bulgeOnly, bulgeStrength, sparkle, waveAmplitude,
    gradientFrom, gradientTo,
  });
  propsRef.current = {
    dotRadius, dotSpacing, cursorRadius, cursorForce,
    bulgeOnly, bulgeStrength, sparkle, waveAmplitude,
    gradientFrom, gradientTo,
  };

  const rebuildRef = useRef<(() => void) | null>(null);
  const glowIdRef  = useRef(`df-glow-${Math.random().toString(36).slice(2, 9)}`);

  useEffect(() => {
    // Skip on touch / reduced-motion devices
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    const glowEl = glowRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let resizeTimer: ReturnType<typeof setTimeout>;

    /* ── Resize ─────────────────────────────────────────────────────── */
    function doResize() {
      if (!canvas || !ctx) return;
      const parent = canvas.parentElement;
      let w = parent ? parent.getBoundingClientRect().width  : 0;
      let h = parent ? parent.getBoundingClientRect().height : 0;
      if (!w) w = window.innerWidth;
      if (!h) h = window.innerHeight;

      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };

      // ── PERF: invalidate gradient cache on resize ──────────────────
      gradCacheRef.current = null;

      buildDots(w, h);
      wakeUp(); // ensure we draw at least one frame after resize
    }

    function resize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(doResize, 120);
    }

    /* ── Dots ────────────────────────────────────────────────────────── */
    function buildDots(w: number, h: number) {
      const p = propsRef.current;
      const step = p.dotRadius + p.dotSpacing;
      const cols = Math.floor(w / step);
      const rows = Math.floor(h / step);
      const padX = (w % step) / 2;
      const padY = (h % step) / 2;
      const dots = new Array<Dot>(rows * cols);
      let idx = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ax = padX + c * step + step / 2;
          const ay = padY + r * step + step / 2;
          dots[idx++] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay };
        }
      }
      dotsRef.current = dots;
    }

    /* ── Mouse ───────────────────────────────────────────────────────── */
    function onMouseMove(e: MouseEvent) {
      const wasAway = mouseRef.current.x <= -9000;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      if (wasAway) wakeUp(); // ── PERF: restart loop when mouse enters
    }

    function onMouseLeave() {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
      // loop will naturally sleep once engagement reaches 0
    }

    /* ── PERF: wake the rAF loop if it has gone to sleep ────────────── */
    function wakeUp() {
      if (!activeRef.current) {
        activeRef.current = true;
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    /* ── Render loop ─────────────────────────────────────────────────── */
    let frameCount = 0;

    function tick() {
      frameCount++;
      const dots = dotsRef.current;
      const m    = mouseRef.current;
      const { w, h } = sizeRef.current;
      const p    = propsRef.current;
      const len  = dots.length;

      /* ── PERF: speed calc merged here (no setInterval) ──────────── */
      {
        const dx = m.prevX - m.x;
        const dy = m.prevY - m.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        m.speed += (d - m.speed) * 0.5;
        if (m.speed < 0.001) m.speed = 0;
        m.prevX = m.x;
        m.prevY = m.y;
      }

      const isMouseActive   = m.x > -9000;
      const targetEngagement = isMouseActive ? 1 : 0;
      const prevEng = engagement.current;
      engagement.current += (targetEngagement - engagement.current) * 0.1;
      if (engagement.current < 0.001) engagement.current = 0;
      const eng = engagement.current;

      glowOpacity.current += (eng - glowOpacity.current) * 0.08;
      if (glowEl) {
        glowEl.setAttribute('cx', String(m.x));
        glowEl.setAttribute('cy', String(m.y));
        glowEl.style.opacity = String(glowOpacity.current);
      }

      /* ── PERF: idle detection ─────────────────────────────────────
         If engagement has been 0 for two consecutive frames and the
         glow has faded, nothing will change visually → stop the loop.  */
      const isIdle = eng === 0 && prevEng === 0 && glowOpacity.current < 0.002;
      if (isIdle) {
        activeRef.current = false;
        rafRef.current = null;
        return; // ← loop sleeps here (no requestAnimationFrame scheduled)
      }

      /* ── Draw ──────────────────────────────────────────────────────── */
      if (ctx && w > 0 && h > 0) {
        ctx.clearRect(0, 0, w, h);

        /* ── PERF: gradient cache – create once, reuse until resize ── */
        if (!gradCacheRef.current) {
          const g = ctx.createLinearGradient(0, 0, w, h);
          g.addColorStop(0, p.gradientFrom);
          g.addColorStop(1, p.gradientTo);
          gradCacheRef.current = g;
        }
        ctx.fillStyle = gradCacheRef.current;

        const cr    = p.cursorRadius;
        const crSq  = cr * cr;
        const rad   = p.dotRadius;            // original React Bits formula
        const isBulge = p.bulgeOnly;
        const t     = frameCount * 0.02;

        ctx.beginPath();

        for (let i = 0; i < len; i++) {
          const d = dots[i];
          if (!d) continue;

          const dx = m.x - d.ax;
          const dy = m.y - d.ay;
          const distSq = dx * dx + dy * dy;

          if (distSq < crSq && eng > 0.01) {
            const dist = Math.sqrt(distSq);
            if (isBulge) {
              const tPct = 1 - dist / cr;
              const push = tPct * tPct * p.bulgeStrength * eng;
              const angle = Math.atan2(dy, dx);
              d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15;
              d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15;
            } else {
              const angle = Math.atan2(dy, dx);
              const move  = (500 / dist) * (m.speed * p.cursorForce);
              d.vx += Math.cos(angle) * -move;
              d.vy += Math.sin(angle) * -move;
            }
          } else if (isBulge) {
            d.sx += (d.ax - d.sx) * 0.1;
            d.sy += (d.ay - d.sy) * 0.1;
          }

          if (!isBulge) {
            d.vx *= 0.9; d.vy *= 0.9;
            d.x = d.ax + d.vx; d.y = d.ay + d.vy;
            d.sx += (d.x - d.sx) * 0.1;
            d.sy += (d.y - d.sy) * 0.1;
          }

          let drawX = d.sx;
          let drawY = d.sy;
          if (p.waveAmplitude > 0) {
            drawY += Math.sin(d.ax * 0.03 + t) * p.waveAmplitude;
            drawX += Math.cos(d.ay * 0.03 + t * 0.7) * p.waveAmplitude * 0.5;
          }

          if (p.sparkle) {
            const hash = ((i * 2654435761) ^ (frameCount >> 3)) >>> 0;
            if ((hash % 100) < 3) {
              ctx.moveTo(drawX + rad * 1.8, drawY);
              ctx.arc(drawX, drawY, rad * 1.8, 0, TWO_PI);
            } else {
              ctx.moveTo(drawX + rad, drawY);
              ctx.arc(drawX, drawY, rad, 0, TWO_PI);
            }
          } else {
            ctx.moveTo(drawX + rad, drawY);
            ctx.arc(drawX, drawY, rad, 0, TWO_PI);
          }
        }

        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    /* ── Init ────────────────────────────────────────────────────────── */
    doResize();
    window.addEventListener('resize',     resize);
    window.addEventListener('mousemove',  onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    rafRef.current = requestAnimationFrame(tick);

    rebuildRef.current = () => {
      const { w, h } = sizeRef.current;
      if (w > 0 && h > 0) buildDots(w, h);
    };

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize',    resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { rebuildRef.current?.(); }, [dotRadius, dotSpacing]);

  return (
    <div
      className={className}
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', ...style }}
      {...rest}
    >
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
      <svg
        ref={svgRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <defs>
          <radialGradient id={glowIdRef.current}>
            <stop offset="0%"   stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle
          ref={glowRef}
          cx="-9999" cy="-9999"
          r={glowRadius}
          fill={`url(#${glowIdRef.current})`}
          style={{ opacity: 0, willChange: 'opacity' }}
        />
      </svg>
    </div>
  );
});

DotField.displayName = 'DotField';
export default DotField;
