/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';

export interface PixelBlastProps {
  variant?: 'circle' | 'square' | 'diamond';
  pixelSize?: number;
  color?: string;
  secondaryColor?: string;
  patternScale?: number;
  patternDensity?: number;
  pixelSizeJitter?: number;
  enableRipples?: boolean;
  rippleSpeed?: number;
  rippleThickness?: number;
  rippleIntensityScale?: number;
  liquid?: boolean;
  liquidStrength?: number;
  liquidRadius?: number;
  liquidWobbleSpeed?: number;
  speed?: number;
  edgeFade?: number;
  transparent?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /**
   * Normalized center of the quiet zone [0..1, 0..1], default [0.5, 0.45]
   */
  quietZoneCenter?: { x: number; y: number };
  /**
   * Normalized radius of the quiet zone { rx, ry }, default { rx: 0.18, ry: 0.15 }
   */
  quietZoneRadius?: { rx: number; ry: number };
  /**
   * Feather softness factor [0.1 .. 1.0], default 0.65
   */
  quietZoneFeather?: number;
  /**
   * Global intensity / opacity multiplier (e.g. 0.25 for refined light theme)
   */
  intensity?: number;
  /**
   * Enable scroll reactive parallax and fluid displacement
   */
  scrollReactive?: boolean;
  scrollParallax?: number;
  /**
   * Enable cursor reactive localized displacement and excitation
   */
  cursorReactive?: boolean;
  cursorInfluence?: number;
  cursorRadius?: number;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16) / 255;
    const g = parseInt(clean[1] + clean[1], 16) / 255;
    const b = parseInt(clean[2] + clean[2], 16) / 255;
    return [r, g, b];
  }
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;
  return [isNaN(r) ? 0.937 : r, isNaN(g) ? 0.353 : g, isNaN(b) ? 0.165 : b];
}

const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = (a_position + 1.0) * 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;
varying vec2 v_uv;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_pixelSize;
uniform float u_patternScale;
uniform float u_patternDensity;
uniform float u_pixelSizeJitter;
uniform float u_enableRipples;
uniform float u_rippleSpeed;
uniform float u_rippleThickness;
uniform float u_rippleIntensity;
uniform float u_liquid;
uniform float u_liquidStrength;
uniform float u_liquidRadius;
uniform float u_liquidWobbleSpeed;
uniform float u_speed;
uniform float u_edgeFade;
uniform float u_transparent;
uniform float u_intensity;
uniform int u_variant; // 0: circle, 1: square, 2: diamond

// Scroll & Cursor Reactivity uniforms
uniform float u_scrollProgress;
uniform float u_scrollVelocity;
uniform float u_scrollParallax;
uniform float u_cursorInfluence;
uniform float u_cursorRadius;

uniform vec3 u_color;
uniform vec3 u_secondaryColor;

// Quiet zone uniforms
uniform vec2 u_quietCenter;
uniform vec2 u_quietRadius;
uniform float u_quietFeather;

// Ripple wave uniform states (up to 3 concurrent disturbances)
uniform vec4 u_ripple0; // xy: pos, z: startTime, w: amplitude
uniform vec4 u_ripple1;
uniform vec4 u_ripple2;

// Pseudo-random hash
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec2 hash22(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}

// 2D Perlin-style noise
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash12(i + vec2(0.0, 0.0)), hash12(i + vec2(1.0, 0.0)), u.x),
    mix(hash12(i + vec2(0.0, 1.0)), hash12(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

// Fractional Brownian Motion
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 3; ++i) {
    v += a * noise(p);
    p = rot * p * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  vec2 uv = v_uv;
  
  // Aspect ratio normalized coordinate
  float minRes = min(u_resolution.x, u_resolution.y);
  vec2 st = (fragCoord - 0.5 * u_resolution) / minRes;

  float t = u_time * u_speed;

  // 1. CALCULATE SOFT CENTRAL X QUIET ZONE
  vec2 quietOffset = (uv - u_quietCenter) / max(vec2(0.01), u_quietRadius);
  float distToQuietCenter = length(quietOffset);

  // Soft progressive feather: 0.0 inside core, smoothly climbs to 1.0 outside
  float quietMask = smoothstep(0.85, 0.85 + u_quietFeather, distToQuietCenter);
  float innerCore = smoothstep(0.4, 0.85, distToQuietCenter);
  float finalQuietZoneFactor = quietMask * innerCore;

  // If we are strictly in the deep inner core of the central X, discard immediately for zero artifact
  if (distToQuietCenter < 0.45) {
    gl_FragColor = vec4(0.0);
    return;
  }

  vec2 warpedUv = uv;

  // 2. SCROLL REACTIVITY: PARALLAX & VERTICAL FLUID DRIFT
  vec2 scrollDisplacement = vec2(
    sin(uv.y * 3.14 + t) * u_scrollVelocity * 0.015,
    -u_scrollProgress * u_scrollParallax * 0.25 + u_scrollVelocity * 0.04
  );
  warpedUv += scrollDisplacement * finalQuietZoneFactor;

  // 3. CURSOR REACTIVITY: LOCALIZED TACTILE DISPLACEMENT & PRESSURE FIELD
  float distMouse = length((uv - u_mouse) * vec2(u_resolution.x / minRes, u_resolution.y / minRes));
  float cursorProximity = smoothstep(u_cursorRadius, 0.0, distMouse);
  float cursorExcitation = 0.0;

  if (u_cursorInfluence > 0.01) {
    vec2 cursorDelta = (uv - u_mouse);
    vec2 cursorDir = normalize(cursorDelta + vec2(0.0001));
    
    // Soft elastic repulsion wave around the cursor
    float pushFactor = sin(cursorProximity * 3.14159) * 0.035 * u_cursorInfluence;
    warpedUv += cursorDir * pushFactor * finalQuietZoneFactor;
    
    cursorExcitation = cursorProximity * u_cursorInfluence * finalQuietZoneFactor;
  }

  // 4. LIQUID DOMAIN WARPING
  if (u_liquid > 0.5) {
    float mouseInfluence = smoothstep(u_liquidRadius, 0.0, distMouse);

    vec2 liquidOffset = vec2(
      sin(uv.y * 6.28 * u_patternScale * 0.3 + t * u_liquidWobbleSpeed),
      cos(uv.x * 6.28 * u_patternScale * 0.3 + t * u_liquidWobbleSpeed * 0.9)
    ) * u_liquidStrength * 0.02;

    float n = fbm(uv * u_patternScale + vec2(t * 0.2, -t * 0.15));
    liquidOffset += (vec2(n) - 0.5) * u_liquidStrength * 0.03;
    liquidOffset += (uv - u_mouse) * mouseInfluence * u_liquidStrength * 0.04;

    // Suppress liquid warping in the quiet zone
    warpedUv += liquidOffset * finalQuietZoneFactor;
  }

  // 5. RIPPLE PROPAGATION WAVES
  float rippleDisplacement = 0.0;
  float ripplePulse = 0.0;
  if (u_enableRipples > 0.5) {
    vec4 ripples[3];
    ripples[0] = u_ripple0;
    ripples[1] = u_ripple1;
    ripples[2] = u_ripple2;

    for (int i = 0; i < 3; i++) {
      vec4 rip = ripples[i];
      if (rip.z > 0.0) {
        float age = u_time - rip.z;
        if (age >= 0.0 && age < 3.0) {
          float radius = age * u_rippleSpeed;
          vec2 ripPos = rip.xy;
          float d = length(uv - ripPos);
          float ring = abs(d - radius);
          float ringIntensity = smoothstep(u_rippleThickness, 0.0, ring);
          float decay = exp(-age * 1.8) * rip.w * u_rippleIntensity;
          rippleDisplacement += sin(ring * 40.0 - age * 8.0) * ringIntensity * decay * 0.015;
          ripplePulse += ringIntensity * decay;
        }
      }
    }
    // Damp ripples as they approach the quiet zone
    rippleDisplacement *= finalQuietZoneFactor;
    ripplePulse *= finalQuietZoneFactor;
    warpedUv += vec2(rippleDisplacement);
  }

  // 6. PIXEL DISCRETIZATION
  float effectivePixelSize = max(2.0, u_pixelSize);
  vec2 pixelGrid = u_resolution / effectivePixelSize;
  vec2 pixelCell = floor(warpedUv * pixelGrid);
  vec2 cellUv = fract(warpedUv * pixelGrid) - 0.5;

  // Cell randomized properties
  vec2 cellRnd = hash22(pixelCell);
  float cellDensityNoise = fbm(pixelCell * 0.06 / u_patternScale + vec2(t * 0.08, -t * 0.06));

  // Density thresholding with gentle scroll dispersion
  float scrollDensityDamping = 1.0 - u_scrollProgress * 0.22;
  float targetDensity = u_patternDensity * 0.8 * scrollDensityDamping;
  
  // Spatial hierarchy: denser at outer edges, sparser in the middle
  vec2 centerDistNorm = abs(uv - vec2(0.5, 0.5)) * 2.0;
  float edgeBoost = smoothstep(0.2, 0.9, max(centerDistNorm.x, centerDistNorm.y)) * 0.35;
  
  // Vertical column text readability suppression (soft halo around central column)
  float centerColumnDist = abs(uv.x - 0.5) * 2.0;
  float textReadabilityFactor = smoothstep(0.15, 0.6, centerColumnDist) * 0.4 + 0.6;

  float cellThreshold = (1.0 - targetDensity) - edgeBoost * 0.2;
  float densityCheck = (cellDensityNoise * 0.7 + cellRnd.x * 0.3) * textReadabilityFactor * finalQuietZoneFactor;

  // Cursor proximity slightly increases visibility of nearby pixels
  densityCheck += cursorExcitation * 0.12;

  if (densityCheck < cellThreshold) {
    gl_FragColor = vec4(0.0);
    return;
  }

  // Dynamic pixel radius with jitter, cursor excitation & ripple excitation
  float jitter = (cellRnd.y - 0.5) * u_pixelSizeJitter;
  float baseRadius = 0.32 + jitter * 0.25;
  baseRadius += ripplePulse * 0.15;
  baseRadius += cursorExcitation * 0.14;
  baseRadius = clamp(baseRadius, 0.1, 0.49);

  // 7. PIXEL SHAPE RENDERING
  float shapeDist = 0.0;
  if (u_variant == 1) {
    // Square
    vec2 d = abs(cellUv);
    shapeDist = max(d.x, d.y);
  } else if (u_variant == 2) {
    // Diamond
    vec2 d = abs(cellUv);
    shapeDist = d.x + d.y;
  } else {
    // Circle (default)
    shapeDist = length(cellUv);
  }

  float pixelMask = 1.0 - smoothstep(baseRadius - 0.08, baseRadius + 0.04, shapeDist);

  if (pixelMask <= 0.01) {
    gl_FragColor = vec4(0.0);
    return;
  }

  // 8. COLOR & ALPHA COMPOSITION
  float colorMix = cellRnd.x * 0.4 + cellDensityNoise * 0.3 + ripplePulse * 0.3 + cursorExcitation * 0.35;
  vec3 pixelColor = mix(u_color, u_secondaryColor, clamp(colorMix, 0.0, 1.0));

  // Edge fade (soft vignetting around canvas boundaries)
  vec2 edgeDist = abs(uv - 0.5) * 2.0;
  float maxEdge = max(edgeDist.x, edgeDist.y);
  float edgeAlpha = 1.0 - smoothstep(1.0 - u_edgeFade, 1.0, maxEdge);

  // Final Alpha: combines pixel mask, quiet zone falloff, intensity, scroll fade, and edge fade
  float scrollAlphaFade = 1.0 - smoothstep(0.7, 1.0, u_scrollProgress) * 0.5;
  float finalAlpha = pixelMask * u_intensity * edgeAlpha * finalQuietZoneFactor * scrollAlphaFade;
  
  // Extra subtle brightness lift for pixels near active cursor
  finalAlpha += cursorExcitation * 0.15 * finalQuietZoneFactor;

  // Apply transparent mode blending
  if (u_transparent > 0.5) {
    gl_FragColor = vec4(pixelColor, clamp(finalAlpha, 0.0, 1.0));
  } else {
    gl_FragColor = vec4(pixelColor * finalAlpha, 1.0);
  }
}
`;

export const PixelBlast: React.FC<PixelBlastProps> = ({
  variant = 'circle',
  pixelSize = 5,
  color = '#EF5A2A',
  secondaryColor = '#D94A1F',
  patternScale = 3.2,
  patternDensity = 0.78,
  pixelSizeJitter = 0.3,
  enableRipples = true,
  rippleSpeed = 0.32,
  rippleThickness = 0.1,
  rippleIntensityScale = 0.8,
  liquid = true,
  liquidStrength = 0.07,
  liquidRadius = 1.0,
  liquidWobbleSpeed = 3.2,
  speed = 0.35,
  edgeFade = 0.35,
  transparent = true,
  className = '',
  style = {},
  quietZoneCenter = { x: 0.5, y: 0.46 },
  quietZoneRadius = { rx: 0.22, ry: 0.18 },
  quietZoneFeather = 0.55,
  intensity = 0.45,
  scrollReactive = true,
  scrollParallax = 1.0,
  cursorReactive = true,
  cursorInfluence = 0.8,
  cursorRadius = 0.28,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const rafRef = useRef<number | null>(null);

  const [isVisible, setIsVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Pointer state & gentle inertia
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0.5,
    y: 0.5,
    targetX: 0.5,
    targetY: 0.5,
  });

  // Scroll state & smooth velocity tracking
  const scrollRef = useRef<{
    progress: number;
    targetProgress: number;
    lastY: number;
    velocity: number;
  }>({
    progress: 0,
    targetProgress: 0,
    lastY: typeof window !== 'undefined' ? window.scrollY : 0,
    velocity: 0,
  });

  // Ripple state tracking (stores up to 3 ripples: [x, y, startTime, amplitude])
  const ripplesRef = useRef<Array<[number, number, number, number]>>([
    [0.5, 0.5, -100, 0],
    [0.5, 0.5, -100, 0],
    [0.5, 0.5, -100, 0],
  ]);
  const nextRippleIdxRef = useRef(0);
  const lastMoveTimeRef = useRef(0);

  // Reduced motion preference check
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mq.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    }
  }, []);

  // IntersectionObserver to suspend animation when out of view
  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Window-level Pointer and Scroll tracking for seamless responsiveness
  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === 'undefined') return;

    const handleGlobalPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      // Track pointer if within or reasonably near the hero boundaries
      if (
        e.clientY >= rect.top - 80 &&
        e.clientY <= rect.bottom + 80 &&
        e.clientX >= rect.left - 40 &&
        e.clientX <= rect.right + 40
      ) {
        const nx = (e.clientX - rect.left) / rect.width;
        const ny = 1.0 - (e.clientY - rect.top) / rect.height; // WebGL UV coordinate
        mouseRef.current.targetX = Math.max(0.0, Math.min(1.0, nx));
        mouseRef.current.targetY = Math.max(0.0, Math.min(1.0, ny));

        // Check if pointer is outside the quiet zone before creating a subtle ripple
        const qNormX = (nx - quietZoneCenter.x) / Math.max(0.01, quietZoneRadius.rx);
        const qNormY = ((1.0 - ny) - quietZoneCenter.y) / Math.max(0.01, quietZoneRadius.ry);
        const distToQuiet = Math.sqrt(qNormX * qNormX + qNormY * qNormY);

        const now = performance.now() * 0.001;
        if (distToQuiet > 0.88 && enableRipples && now - lastMoveTimeRef.current > 0.38) {
          lastMoveTimeRef.current = now;
          const idx = nextRippleIdxRef.current;
          ripplesRef.current[idx] = [nx, 1.0 - ny, now, 0.65];
          nextRippleIdxRef.current = (idx + 1) % 3;
        }
      }
    };

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const heroHeight = rect.height || window.innerHeight;
      const progress = Math.max(0.0, Math.min(1.0, -rect.top / heroHeight));
      scrollRef.current.targetProgress = progress;
    };

    window.addEventListener('pointermove', handleGlobalPointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('pointermove', handleGlobalPointerMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [enableRipples, quietZoneCenter.x, quietZoneCenter.y, quietZoneRadius.rx, quietZoneRadius.ry]);

  // Pointer down handler for localized tactile pulse
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!enableRipples) return;
      const rect = e.currentTarget.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;

      const qNormX = (nx - quietZoneCenter.x) / Math.max(0.01, quietZoneRadius.rx);
      const qNormY = (ny - quietZoneCenter.y) / Math.max(0.01, quietZoneRadius.ry);
      const distToQuiet = Math.sqrt(qNormX * qNormX + qNormY * qNormY);

      if (distToQuiet > 0.85) {
        const now = performance.now() * 0.001;
        const idx = nextRippleIdxRef.current;
        ripplesRef.current[idx] = [nx, 1.0 - ny, now, 1.1];
        nextRippleIdxRef.current = (idx + 1) % 3;
      }
    },
    [enableRipples, quietZoneCenter.x, quietZoneCenter.y, quietZoneRadius.rx, quietZoneRadius.ry]
  );

  // WebGL Pipeline Lifecycle
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
    });

    if (!gl) return;
    glRef.current = gl;

    function createShader(type: number, source: string): WebGLShader | null {
      if (!gl) return null;
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('PixelBlast Shader error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('PixelBlast Program link error:', gl.getProgramInfoLog(program));
      return;
    }
    programRef.current = program;
    gl.useProgram(program);

    // Full screen quad geometry
    const quadVertices = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // Locate uniforms
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uPixelSize = gl.getUniformLocation(program, 'u_pixelSize');
    const uPatternScale = gl.getUniformLocation(program, 'u_patternScale');
    const uPatternDensity = gl.getUniformLocation(program, 'u_patternDensity');
    const uPixelSizeJitter = gl.getUniformLocation(program, 'u_pixelSizeJitter');
    const uEnableRipples = gl.getUniformLocation(program, 'u_enableRipples');
    const uRippleSpeed = gl.getUniformLocation(program, 'u_rippleSpeed');
    const uRippleThickness = gl.getUniformLocation(program, 'u_rippleThickness');
    const uRippleIntensity = gl.getUniformLocation(program, 'u_rippleIntensity');
    const uLiquid = gl.getUniformLocation(program, 'u_liquid');
    const uLiquidStrength = gl.getUniformLocation(program, 'u_liquidStrength');
    const uLiquidRadius = gl.getUniformLocation(program, 'u_liquidRadius');
    const uLiquidWobbleSpeed = gl.getUniformLocation(program, 'u_liquidWobbleSpeed');
    const uSpeed = gl.getUniformLocation(program, 'u_speed');
    const uEdgeFade = gl.getUniformLocation(program, 'u_edgeFade');
    const uTransparent = gl.getUniformLocation(program, 'u_transparent');
    const uIntensity = gl.getUniformLocation(program, 'u_intensity');
    const uVariant = gl.getUniformLocation(program, 'u_variant');

    const uScrollProgress = gl.getUniformLocation(program, 'u_scrollProgress');
    const uScrollVelocity = gl.getUniformLocation(program, 'u_scrollVelocity');
    const uScrollParallax = gl.getUniformLocation(program, 'u_scrollParallax');
    const uCursorInfluence = gl.getUniformLocation(program, 'u_cursorInfluence');
    const uCursorRadius = gl.getUniformLocation(program, 'u_cursorRadius');

    const uColor = gl.getUniformLocation(program, 'u_color');
    const uSecondaryColor = gl.getUniformLocation(program, 'u_secondaryColor');

    const uQuietCenter = gl.getUniformLocation(program, 'u_quietCenter');
    const uQuietRadius = gl.getUniformLocation(program, 'u_quietRadius');
    const uQuietFeather = gl.getUniformLocation(program, 'u_quietFeather');

    const uRipple0 = gl.getUniformLocation(program, 'u_ripple0');
    const uRipple1 = gl.getUniformLocation(program, 'u_ripple1');
    const uRipple2 = gl.getUniformLocation(program, 'u_ripple2');

    const rgbPrimary = hexToRgb(color);
    const rgbSecondary = hexToRgb(secondaryColor);

    const variantId = variant === 'square' ? 1 : variant === 'diamond' ? 2 : 0;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 600;

    function resize() {
      if (!canvas || !container || !gl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    resize();
    window.addEventListener('resize', resize);

    const startTime = performance.now();

    function render(now: number) {
      if (!gl || !program) return;

      const elapsed = (now - startTime) * 0.001;
      const effectiveSpeed = prefersReducedMotion ? 0.0 : speed;

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Smooth scroll progress & velocity calculation
      const currentY = typeof window !== 'undefined' ? window.scrollY : 0;
      const scrollDelta = (currentY - scrollRef.current.lastY) * 0.003;
      scrollRef.current.lastY = currentY;
      scrollRef.current.velocity += (scrollDelta - scrollRef.current.velocity) * 0.12;

      scrollRef.current.progress += (scrollRef.current.targetProgress - scrollRef.current.progress) * 0.08;

      gl.useProgram(program);

      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(uTime, elapsed);
      gl.uniform1f(uPixelSize, pixelSize * (canvas.width / width));
      gl.uniform1f(uPatternScale, patternScale);
      gl.uniform1f(uPatternDensity, patternDensity);
      gl.uniform1f(uPixelSizeJitter, pixelSizeJitter);
      gl.uniform1f(uEnableRipples, enableRipples && !prefersReducedMotion ? 1.0 : 0.0);
      gl.uniform1f(uRippleSpeed, rippleSpeed);
      gl.uniform1f(uRippleThickness, rippleThickness);
      gl.uniform1f(uRippleIntensity, rippleIntensityScale);
      gl.uniform1f(uLiquid, liquid && !prefersReducedMotion ? 1.0 : 0.0);
      gl.uniform1f(uLiquidStrength, liquidStrength);
      gl.uniform1f(uLiquidRadius, liquidRadius);
      gl.uniform1f(uLiquidWobbleSpeed, liquidWobbleSpeed);
      gl.uniform1f(uSpeed, effectiveSpeed);
      gl.uniform1f(uEdgeFade, edgeFade);
      gl.uniform1f(uTransparent, transparent ? 1.0 : 0.0);
      gl.uniform1f(uIntensity, intensity);
      gl.uniform1i(uVariant, variantId);

      // Scroll & Cursor Reactivity
      gl.uniform1f(uScrollProgress, scrollReactive && !prefersReducedMotion ? scrollRef.current.progress : 0.0);
      gl.uniform1f(uScrollVelocity, scrollReactive && !prefersReducedMotion ? scrollRef.current.velocity : 0.0);
      gl.uniform1f(uScrollParallax, scrollParallax);
      gl.uniform1f(uCursorInfluence, cursorReactive && !prefersReducedMotion ? cursorInfluence : 0.0);
      gl.uniform1f(uCursorRadius, cursorRadius);

      gl.uniform3f(uColor, rgbPrimary[0], rgbPrimary[1], rgbPrimary[2]);
      gl.uniform3f(uSecondaryColor, rgbSecondary[0], rgbSecondary[1], rgbSecondary[2]);

      // Quiet Zone Uniforms (in WebGL UV space: 0 at bottom, 1 at top)
      gl.uniform2f(uQuietCenter, quietZoneCenter.x, 1.0 - quietZoneCenter.y);
      gl.uniform2f(uQuietRadius, quietZoneRadius.rx, quietZoneRadius.ry);
      gl.uniform1f(uQuietFeather, quietZoneFeather);

      // Ripple Uniforms
      const r0 = ripplesRef.current[0];
      const r1 = ripplesRef.current[1];
      const r2 = ripplesRef.current[2];
      gl.uniform4f(uRipple0, r0[0], r0[1], r0[2], r0[3]);
      gl.uniform4f(uRipple1, r1[0], r1[1], r1[2], r1[3]);
      gl.uniform4f(uRipple2, r2[0], r2[1], r2[2], r2[3]);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (isVisible) {
        rafRef.current = requestAnimationFrame(render);
      }
    }

    if (isVisible) {
      rafRef.current = requestAnimationFrame(render);
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (gl) {
        if (vertexBuffer) gl.deleteBuffer(vertexBuffer);
        if (vs) gl.deleteShader(vs);
        if (fs) gl.deleteShader(fs);
        if (program) gl.deleteProgram(program);
      }
    };
  }, [
    variant,
    pixelSize,
    color,
    secondaryColor,
    patternScale,
    patternDensity,
    pixelSizeJitter,
    enableRipples,
    rippleSpeed,
    rippleThickness,
    rippleIntensityScale,
    liquid,
    liquidStrength,
    liquidRadius,
    liquidWobbleSpeed,
    speed,
    edgeFade,
    transparent,
    intensity,
    scrollReactive,
    scrollParallax,
    cursorReactive,
    cursorInfluence,
    cursorRadius,
    quietZoneCenter.x,
    quietZoneCenter.y,
    quietZoneRadius.rx,
    quietZoneRadius.ry,
    quietZoneFeather,
    isVisible,
    prefersReducedMotion,
  ]);

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
      style={style}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none block"
      />
    </div>
  );
};

export default PixelBlast;
