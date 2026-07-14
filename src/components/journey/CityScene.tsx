"use client";

import {
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo } from "react";

/* ──────────────────────────────────────────────────────────────
   A stylized Tirana, hand-drawn in SVG.

   Everything lives in one 1000×1000 "world" coordinate space.
   The camera is a single <g> whose transform we drive from scroll:
   we translate the world so `focus` sits at the viewport centre,
   then scale around that same point. Zooming and panning therefore
   compose without fighting each other.
────────────────────────────────────────────────────────────── */

const WORLD = 1000;

/* The car's route: a lap of frustration, then a clean run to the spot. */
const LOOP_PATH =
  "M 250 760 L 250 560 L 470 560 L 470 400 L 700 400 L 700 560 L 470 560 L 470 760 L 250 760";
const ROUTE_PATH =
  "M 470 700 L 470 560 L 640 560 L 640 470 L 726 470 L 726 424";

/* The reserved spot, on Rr. Ibrahim Rugova. */
const SPOT = { x: 742, y: 418 };

type Pin = { x: number; y: number; state: "full" | "open" };

const PINS: Pin[] = [
  { x: 300, y: 560, state: "full" },
  { x: 388, y: 662, state: "full" },
  { x: 250, y: 470, state: "full" },
  { x: 470, y: 500, state: "full" },
  { x: 560, y: 400, state: "full" },
  { x: 615, y: 645, state: "full" },
  { x: 700, y: 620, state: "full" },
  { x: 812, y: 545, state: "full" },
  { x: 350, y: 330, state: "full" },
  { x: 545, y: 268, state: "full" },
  { x: 690, y: 300, state: "full" },
  { x: 830, y: 350, state: "full" },
  { x: 195, y: 640, state: "full" },
  { x: 585, y: 745, state: "full" },
  { x: 780, y: 700, state: "full" },
  { x: 862, y: 452, state: "full" },
];

interface CameraKey {
  at: number; // scroll progress 0–1
  x: number; // world point to centre on
  y: number;
  zoom: number;
}

/* The camera choreography. Each act gets its own framing.

   With `slice`, zoom ~0.75 shows the whole city on a 16:9 screen. The copy
   owns the left ~45% of the viewport, so focus points sit right-of-centre
   (higher x) to keep the action out from behind the text. */
const CAMERA: CameraKey[] = [
  { at: 0.0, x: 400, y: 640, zoom: 1.35 }, // in on the circling car
  { at: 0.2, x: 420, y: 610, zoom: 1.25 },
  { at: 0.38, x: 560, y: 520, zoom: 0.78 }, // pull back — the whole city
  { at: 0.52, x: 700, y: 460, zoom: 1.0 }, // drift toward the free spot
  { at: 0.68, x: 660, y: 520, zoom: 0.95 }, // route draws, both ends visible
  { at: 0.88, x: 760, y: 440, zoom: 1.8 }, // dive onto the spot
  { at: 1.0, x: 748, y: 425, zoom: 2.1 },
];

function keys<K extends keyof CameraKey>(k: K) {
  return CAMERA.map((c) => c[k]);
}

export function CityScene({
  progress,
  isMobile = false,
}: {
  progress: MotionValue<number>;
  isMobile?: boolean;
}) {
  const stops = CAMERA.map((c) => c.at);

  const camX = useTransform(progress, stops, keys("x"));
  const camY = useTransform(progress, stops, keys("y"));
  const zoomBase = useTransform(progress, stops, keys("zoom"));

  /* isMobile has to be a MotionValue, not a captured boolean.

     useTransform builds its closure once and only re-runs when an *input
     MotionValue* changes — a plain prop flipping false→true after mount (which
     is exactly what useIsMobile does) never retriggers it, so the mobile
     framing silently never applied. Feeding it through a MotionValue puts it
     in the reactive graph. */
  const mobile = useMotionValue(isMobile ? 1 : 0);
  useEffect(() => {
    mobile.set(isMobile ? 1 : 0);
  }, [isMobile, mobile]);

  /* Phones are tall and narrow, and the bottom ~46% is the copy card. So we
     pull the camera back and aim it at the upper part of the frame, otherwise
     the action (the free spot, the car) sits behind the text. */
  const transform = useTransform(
    [camX, camY, zoomBase, mobile] as const,
    ([x, y, z, m]: number[]) => {
      const isMobile = m === 1;
      /* Where on screen the focus point should land.

         Desktop: dead centre — the left scrim handles the copy.
         Mobile: high (copy card owns the bottom ~46%) and left of centre,
         because the phone HUD sits top-right. Without the x-shift the whole
         payoff — the green spot, the car arriving — lands under the HUD or
         off the right edge, which is exactly what made the story feel like
         nothing was happening. */
      const anchorX = isMobile ? WORLD * 0.36 : WORLD / 2;
      const anchorY = isMobile ? WORLD * 0.3 : WORLD / 2;
      const zoom = isMobile ? z * 0.6 : z;

      return `translate(${anchorX} ${anchorY}) scale(${zoom}) translate(${-x} ${-y})`;
    }
  );

  /* ── Act timings ──────────────────────────────── */

  // The frustrated lap: car crawls the loop for the first act.
  // (useTransform clamps to the output range by default, so the car
  //  simply holds at the end of the loop rather than overshooting.)
  const loopT = useTransform(progress, [0, 0.3], [0, 1]);
  const loopOpacity = useTransform(progress, [0.26, 0.36], [1, 0]);

  // City detail (streets, blocks, labels) fades up on the pull-back.
  const cityOpacity = useTransform(progress, [0.28, 0.42], [0, 1]);
  const gridOpacity = useTransform(progress, [0.3, 0.44], [0, 0.5]);

  // Pins drop in as the map "breathes".
  const pinsOpacity = useTransform(progress, [0.32, 0.46], [0, 1]);

  // The one green spot reveals itself.
  const spotReveal = useTransform(progress, [0.46, 0.56], [0, 1]);

  // Route draws.
  const routeDraw = useTransform(progress, [0.6, 0.8], [0, 1]);
  const routeOpacity = useTransform(progress, [0.58, 0.64], [0, 1]);

  // Car runs the route, then parks.
  const runT = useTransform(progress, [0.62, 0.88], [0, 1]);
  const runOpacity = useTransform(progress, [0.58, 0.63], [0, 1]);

  // Parked confirmation.
  const parkedOpacity = useTransform(progress, [0.9, 0.97], [0, 1]);

  return (
    <svg
      viewBox={`0 0 ${WORLD} ${WORLD}`}
      className="w-full h-full"
      aria-hidden="true"
      /* `slice` fills the frame edge-to-edge (with `meet` the square world
         letterboxes into a wide viewport and you see the map's edges floating
         in empty paper). It crops the square to the viewport's aspect, so the
         zoom values in CAMERA are calibrated against the *height*. */
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <SceneDefs />
      </defs>

      {/* Ground. Deliberately far larger than the world: `meet` letterboxes the
          square world in a wide viewport, and zooming out past 1 exposes even
          more, so the ground has to outrun both. */}
      <rect
        x={-WORLD}
        y={-WORLD}
        width={WORLD * 3}
        height={WORLD * 3}
        fill="#e4e1d6"
      />

      <motion.g className="journey-camera" style={{ transform } as never}>
        {/* Faint survey grid — reads as "map" without shouting */}
        <motion.g style={{ opacity: gridOpacity }}>
          <rect
            x={-500}
            y={-500}
            width={2000}
            height={2000}
            fill="url(#surveyGrid)"
          />
        </motion.g>

        {/* City blocks + park + river */}
        <motion.g style={{ opacity: cityOpacity }}>
          <CityBlocks />
        </motion.g>

        {/* The street network itself — always visible, it's the stage */}
        <Streets />

        {/* Street names appear once we're pulled back far enough */}
        <motion.g style={{ opacity: cityOpacity }}>
          <StreetLabels />
        </motion.g>

        {/* Occupied spots */}
        <motion.g style={{ opacity: pinsOpacity }}>
          {PINS.map((p, i) => (
            <SpotPin key={i} x={p.x} y={p.y} index={i} />
          ))}
        </motion.g>

        {/* The route to the reserved spot */}
        <motion.g style={{ opacity: routeOpacity }}>
          <RouteLine draw={routeDraw} />
        </motion.g>

        {/* The free spot */}
        <FreeSpot reveal={spotReveal} parked={parkedOpacity} />

        {/* The car, circling */}
        <motion.g style={{ opacity: loopOpacity }}>
          <CarOnPath path={LOOP_PATH} t={loopT} start={{ x: 250, y: 760 }} />
        </motion.g>

        {/* The car, arriving */}
        <motion.g style={{ opacity: runOpacity }}>
          <CarOnPath path={ROUTE_PATH} t={runT} start={{ x: 470, y: 700 }} />
        </motion.g>
      </motion.g>
    </svg>
  );
}

/* ──────────────────────────────────────────────
   Defs: gradients, filters, the grid pattern
────────────────────────────────────────────── */
function SceneDefs() {
  return (
    <>
      <pattern
        id="surveyGrid"
        width={50}
        height={50}
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M 50 0 L 0 0 0 50"
          fill="none"
          stroke="#0b1220"
          strokeOpacity={0.06}
          strokeWidth={1}
        />
      </pattern>

      <linearGradient id="routeGrad" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor="#4e7bb8" />
        <stop offset="100%" stopColor="#1e4d92" />
      </linearGradient>

      <radialGradient id="spotGlow">
        <stop offset="0%" stopColor="#3a9d7a" stopOpacity={0.35} />
        <stop offset="100%" stopColor="#3a9d7a" stopOpacity={0} />
      </radialGradient>

      <filter id="carShadow" x="-60%" y="-60%" width="220%" height="220%">
        <feDropShadow
          dx="0"
          dy="3"
          stdDeviation="3"
          floodColor="#0b1220"
          floodOpacity="0.28"
        />
      </filter>
    </>
  );
}

/* ──────────────────────────────────────────────
   Blocks, the park, the Lana river
────────────────────────────────────────────── */
function CityBlocks() {
  /* Deterministic building footprints — no Math.random, so SSR and
     client render identically. */
  const blocks = useMemo(
    () => [
      // top-left quadrant
      { x: 120, y: 180, w: 180, h: 110 },
      { x: 320, y: 180, w: 130, h: 110 },
      { x: 470, y: 180, w: 150, h: 60 },
      { x: 640, y: 180, w: 110, h: 110 },
      { x: 770, y: 180, w: 120, h: 110 },
      // mid band
      { x: 120, y: 320, w: 110, h: 100 },
      { x: 250, y: 320, w: 100, h: 100 },
      { x: 640, y: 320, w: 110, h: 100 },
      { x: 770, y: 320, w: 120, h: 100 },
      // around the boulevard
      { x: 120, y: 440, w: 110, h: 100 },
      { x: 300, y: 440, w: 150, h: 100 },
      { x: 570, y: 440, w: 70, h: 100 },
      { x: 770, y: 440, w: 120, h: 100 },
      // lower band
      { x: 120, y: 580, w: 110, h: 90 },
      { x: 300, y: 580, w: 150, h: 90 },
      { x: 500, y: 580, w: 130, h: 90 },
      { x: 680, y: 580, w: 90, h: 90 },
      { x: 800, y: 580, w: 90, h: 90 },
      // bottom
      { x: 120, y: 700, w: 110, h: 120 },
      { x: 300, y: 780, w: 150, h: 90 },
      { x: 500, y: 780, w: 130, h: 90 },
      { x: 680, y: 700, w: 90, h: 120 },
      { x: 800, y: 700, w: 90, h: 120 },
    ],
    []
  );

  return (
    <g>
      {/* Parku Rinia — the green lung */}
      <rect
        x={470}
        y={250}
        width={150}
        height={130}
        rx={10}
        fill="#3a9d7a"
        fillOpacity={0.14}
      />
      <rect
        x={470}
        y={250}
        width={150}
        height={130}
        rx={10}
        fill="none"
        stroke="#3a9d7a"
        strokeOpacity={0.25}
        strokeWidth={1.5}
      />

      {/* Lumi i Lanës */}
      <path
        d="M 0 880 C 180 850, 300 900, 480 870 S 800 830, 1000 860"
        fill="none"
        stroke="#4e7bb8"
        strokeOpacity={0.2}
        strokeWidth={22}
        strokeLinecap="round"
      />

      {/* Buildings. The varied fill is what stops the grid reading as graph
          paper — it gives the blocks weight and makes the streets negative
          space rather than just gaps. */}
      {blocks.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          rx={4}
          fill="#0b1220"
          fillOpacity={i % 3 === 0 ? 0.14 : i % 2 === 0 ? 0.1 : 0.07}
        />
      ))}
    </g>
  );
}

/* ──────────────────────────────────────────────
   The street network
────────────────────────────────────────────── */
function Streets() {
  const road = (d: string, w: number) => (
    <>
      <path
        d={d}
        fill="none"
        stroke="#dfdcd0"
        strokeWidth={w + 6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={d}
        fill="none"
        stroke="#fdfcf8"
        strokeWidth={w}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );

  return (
    <g>
      {/* Bulevardi Dëshmorët e Kombit — the grand north-south spine */}
      {road("M 470 60 L 470 940", 30)}
      {/* Its centre line */}
      <path
        d="M 470 60 L 470 940"
        fill="none"
        stroke="#c88a2e"
        strokeOpacity={0.35}
        strokeWidth={1.5}
        strokeDasharray="10 14"
      />

      {/* Unaza / ring road */}
      {road("M 100 140 L 900 140", 18)}
      {road("M 100 940 L 900 940", 18)}
      {road("M 100 140 L 100 940", 18)}
      {road("M 900 140 L 900 940", 18)}

      {/* Rruga e Kavajës — the loop the driver is stuck on */}
      {road("M 250 140 L 250 940", 16)}
      {road("M 100 560 L 900 560", 20)}
      {road("M 100 760 L 900 760", 16)}

      {/* Rr. Ibrahim Rugova — where the spot is */}
      {road("M 700 140 L 700 940", 16)}
      {road("M 100 400 L 900 400", 20)}

      {/* Secondary connectors */}
      {road("M 100 300 L 900 300", 12)}
      {road("M 100 660 L 900 660", 12)}
      {road("M 360 140 L 360 940", 12)}
      {road("M 590 140 L 590 940", 12)}
      {road("M 810 140 L 810 940", 12)}

      {/* Sheshi Skënderbej — the roundabout at the crossing */}
      <circle
        cx={470}
        cy={400}
        r={44}
        fill="#fdfcf8"
        stroke="#dfdcd0"
        strokeWidth={6}
      />
      <circle cx={470} cy={400} r={18} fill="#3a9d7a" fillOpacity={0.16} />
      <circle
        cx={470}
        cy={400}
        r={18}
        fill="none"
        stroke="#3a9d7a"
        strokeOpacity={0.3}
        strokeWidth={1.5}
      />
    </g>
  );
}

function StreetLabels() {
  const label = (
    x: number,
    y: number,
    text: string,
    rotate = 0,
    size = 11
  ) => (
    <text
      x={x}
      y={y}
      fill="#4a5878"
      fontSize={size}
      fontWeight={500}
      letterSpacing="0.08em"
      textAnchor="middle"
      transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
      style={{ fontFamily: "Outfit, system-ui, sans-serif" }}
    >
      {text}
    </text>
  );

  return (
    <g opacity={0.85}>
      {label(452, 220, "BULEVARDI DËSHMORËT E KOMBIT", -90, 10)}
      {label(232, 700, "RRUGA E KAVAJËS", -90, 10)}
      {label(683, 660, "RR. IBRAHIM RUGOVA", -90, 10)}
      {label(300, 388, "RR. E DURRËSIT", 0, 10)}
      {label(320, 548, "RR. E ELBASANIT", 0, 10)}
      {label(545, 322, "PARKU RINIA", 0, 10)}
      {label(470, 468, "SHESHI SKËNDERBEJ", 0, 9)}
      {label(150, 905, "LUMI I LANËS", 0, 9)}
    </g>
  );
}

/* ──────────────────────────────────────────────
   Occupied parking pins
────────────────────────────────────────────── */
function SpotPin({ x, y, index }: { x: number; y: number; index: number }) {
  return (
    <motion.g
      initial={{ opacity: 0, y: -6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: (index % 8) * 0.045,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <circle cx={x} cy={y} r={7} fill="#fdfcf8" />
      <circle cx={x} cy={y} r={5} fill="#b5483f" fillOpacity={0.85} />
    </motion.g>
  );
}

/* ──────────────────────────────────────────────
   The one free spot — pulses, then becomes "yours"
────────────────────────────────────────────── */
function FreeSpot({
  reveal,
  parked,
}: {
  reveal: MotionValue<number>;
  parked: MotionValue<number>;
}) {
  const scale = useTransform(reveal, [0, 1], [0.4, 1]);
  const glowScale = useTransform(reveal, [0, 1], [0.2, 1]);

  return (
    <motion.g style={{ opacity: reveal }}>
      {/* Soft halo */}
      <motion.circle
        cx={SPOT.x}
        cy={SPOT.y}
        r={70}
        fill="url(#spotGlow)"
        style={{ scale: glowScale, transformOrigin: `${SPOT.x}px ${SPOT.y}px` }}
      />

      {/* Radar ping */}
      <motion.circle
        cx={SPOT.x}
        cy={SPOT.y}
        r={16}
        fill="none"
        stroke="#3a9d7a"
        strokeWidth={2}
        animate={{ scale: [1, 2.6], opacity: [0.7, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        style={{ transformOrigin: `${SPOT.x}px ${SPOT.y}px` }}
      />

      {/* The bay itself */}
      <motion.g
        style={{ scale, transformOrigin: `${SPOT.x}px ${SPOT.y}px` }}
      >
        <rect
          x={SPOT.x - 13}
          y={SPOT.y - 20}
          width={26}
          height={40}
          rx={5}
          fill="#3a9d7a"
          fillOpacity={0.16}
          stroke="#3a9d7a"
          strokeWidth={2}
          strokeDasharray="5 4"
        />

        {/* Marker + tick */}
        <circle cx={SPOT.x} cy={SPOT.y} r={10} fill="#3a9d7a" />
        <motion.path
          d={`M ${SPOT.x - 4.5} ${SPOT.y} l 3 3 l 6 -6`}
          fill="none"
          stroke="#fdfcf8"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: parked }}
        />
      </motion.g>
    </motion.g>
  );
}

/* ──────────────────────────────────────────────
   Route line, drawn by scroll
────────────────────────────────────────────── */
function RouteLine({ draw }: { draw: MotionValue<number> }) {
  return (
    <g>
      {/* Casing */}
      <motion.path
        d={ROUTE_PATH}
        fill="none"
        stroke="#fdfcf8"
        strokeWidth={12}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pathLength: draw }}
      />
      {/* The line */}
      <motion.path
        d={ROUTE_PATH}
        fill="none"
        stroke="url(#routeGrad)"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pathLength: draw }}
      />
      {/* Origin dot */}
      <circle cx={470} cy={700} r={7} fill="#fdfcf8" />
      <circle cx={470} cy={700} r={4.5} fill="#1e4d92" />
    </g>
  );
}

/* ──────────────────────────────────────────────
   A car that follows an SVG path.

   CSS offset-path is the obvious tool here, but framer-motion only maps
   `offsetDistance` as a style on HTML elements — on an SVG <g> it leaks
   through as a DOM attribute and React rejects it. So we sample the path
   ourselves: getPointAtLength gives position, and the delta to a point
   just ahead gives heading, which is what makes the car bank through
   corners rather than sliding sideways.
────────────────────────────────────────────── */
function CarOnPath({
  path,
  t,
  start,
}: {
  path: string;
  t: MotionValue<number>;
  /* Where the car sits before hydration, so SSR doesn't park it at 0,0. */
  start: { x: number; y: number };
}) {
  /* One detached <path> per car, purely as a geometry oracle. */
  const geometry = useMemo(() => {
    if (typeof document === "undefined") return null;
    const el = document.createElementNS("http://www.w3.org/2000/svg", "path");
    el.setAttribute("d", path);
    return el;
  }, [path]);

  const transform = useTransform(t, (v) => {
    if (!geometry) return `translate(${start.x} ${start.y})`;

    const len = geometry.getTotalLength();
    const at = Math.max(0, Math.min(1, v)) * len;
    const p = geometry.getPointAtLength(at);

    /* Look a hair further along the path to work out which way we face.
       Near the very end, look backwards instead so heading stays stable. */
    const LOOK = 1;
    const ahead = geometry.getPointAtLength(Math.min(at + LOOK, len));
    const behind = geometry.getPointAtLength(Math.max(at - LOOK, 0));
    const angle =
      (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI;

    return `translate(${p.x} ${p.y}) rotate(${angle})`;
  });

  return (
    <motion.g style={{ transform } as never}>
      <Car />
    </motion.g>
  );
}

/* A little top-down car, nose pointing +x to match offsetRotate. */
function Car() {
  return (
    <g filter="url(#carShadow)">
      {/* body */}
      <rect x={-15} y={-8} width={30} height={16} rx={4.5} fill="#0b1220" />
      {/* roof / cabin */}
      <rect
        x={-6}
        y={-5.5}
        width={13}
        height={11}
        rx={2.5}
        fill="#1e4d92"
      />
      {/* windshield */}
      <rect x={7} y={-4.5} width={3.5} height={9} rx={1.5} fill="#7fa3d2" />
      {/* headlights */}
      <circle cx={14} cy={-4.5} r={1.6} fill="#f6f5f0" />
      <circle cx={14} cy={4.5} r={1.6} fill="#f6f5f0" />
      {/* tail */}
      <circle cx={-13.5} cy={-5} r={1.3} fill="#b5483f" />
      <circle cx={-13.5} cy={5} r={1.3} fill="#b5483f" />
    </g>
  );
}
