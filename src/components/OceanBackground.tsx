"use client";
import { useEffect, useRef } from "react";

const vertexShader = `
attribute vec2 a;
void main() {
  gl_Position = vec4(a, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform vec2  uR;
uniform float uT, uS, uSc, uBl;

#define PI 3.14159265359
#define TAU 6.28318530718
#define MARCH_STEPS 22
#define REFINE_STEPS 5

float sat(float x) { return clamp(x, 0.0, 1.0); }

float smoother(float x) {
  x = sat(x);
  return x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
}

vec3 sCol(vec3 c0, vec3 c1, vec3 c2, vec3 c3, vec3 c4) {
  int si = int(uSc);
  vec3 a = c0, b = c1;
  if (si == 1) { a = c1; b = c2; }
  else if (si == 2) { a = c2; b = c3; }
  else if (si == 3) { a = c3; b = c4; }
  return mix(a, b, uBl);
}

float sF(float c0, float c1, float c2, float c3, float c4) {
  int si = int(uSc);
  float a = c0, b = c1;
  if (si == 1) { a = c1; b = c2; }
  else if (si == 2) { a = c2; b = c3; }
  else if (si == 3) { a = c3; b = c4; }
  return mix(a, b, uBl);
}

mat2 rot(float a) {
  float c = cos(a), s = sin(a);
  return mat2(c, -s, s, c);
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float waveH(vec2 p, float t, float amp, float storm) {
  float h = 0.0;
  vec2 swell1 = normalize(vec2(1.0, 0.28));
  vec2 swell2 = normalize(vec2(-0.48, 0.88));
  vec2 swell3 = normalize(vec2(0.82, -0.16));
  swell2 = rot(storm * 0.18) * swell2;
  swell3 = rot(-storm * 0.14) * swell3;
  float d1 = dot(p, swell1), d2 = dot(p, swell2), d3 = dot(p, swell3);
  h += amp * 0.66 * sin(d1 * 0.42 + t * 0.38);
  h += amp * 0.22 * sin(d1 * 0.94 - t * 0.62);
  h += amp * 0.14 * sin(d2 * 1.18 - t * 0.82);
  h += amp * 0.09 * sin(d3 * 1.82 + t * 1.04);
  h += amp * (0.11 + storm * 0.07) * sin(p.x * 1.45 - t * 0.76 + p.y * 0.66);
  h += amp * (0.07 + storm * 0.05) * sin(p.x * 2.85 + t * 1.06 - p.y * 0.52);
  h += amp * (0.04 + storm * 0.03) * sin(p.x * 4.60 - t * 1.50 + p.y * 1.02);
  float micro = noise(p * 14.0 + vec2(t * 0.18, t * 0.06)) - 0.5;
  h += micro * amp * (0.010 + storm * 0.008);
  return h;
}

vec3 waveNorm(vec2 p, float t, float amp, float storm) {
  float e = 0.018;
  float hL = waveH(p - vec2(e, 0.0), t, amp, storm);
  float hR = waveH(p + vec2(e, 0.0), t, amp, storm);
  float hD = waveH(p - vec2(0.0, e), t, amp, storm);
  float hU = waveH(p + vec2(0.0, e), t, amp, storm);
  return normalize(vec3(-(hR - hL) / (2.0 * e), 1.0, -(hU - hD) / (2.0 * e)));
}

float starField(vec2 uv) {
  vec2 gv = floor(uv), lv = fract(uv) - 0.5;
  float h = hash(gv);
  float size = mix(0.012, 0.0025, h);
  float d = length(lv + vec2(hash(gv + 3.1) - 0.5, hash(gv + 7.3) - 0.5) * 0.25);
  float star = smoothstep(size, 0.0, d);
  star *= smoothstep(0.82, 1.0, h);
  return star;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - uR * 0.5) / uR.y;
  float s = smoother(uS);

  float camY = mix(1.14, 1.03, s);
  camY += sin(s * PI * 1.4) * 0.028;
  float camZ = mix(0.08, -0.18, s);
  float pitch = mix(0.115, 0.088, s);

  vec3 ro = vec3(0.0, camY, camZ);
  vec3 rd = normalize(vec3(uv.x, uv.y - pitch, -1.4));

  float storm = smoothstep(0.80, 1.0, s);
  float night = smoothstep(0.56, 0.84, s);

  vec3 skyTop = sCol(
    vec3(0.18, 0.06, 0.24), vec3(0.05, 0.24, 0.68),
    vec3(0.26, 0.06, 0.04), vec3(0.01, 0.01, 0.05), vec3(0.04, 0.05, 0.09));
  vec3 skyHori = sCol(
    vec3(0.92, 0.48, 0.18), vec3(0.42, 0.62, 0.90),
    vec3(0.88, 0.32, 0.04), vec3(0.03, 0.05, 0.14), vec3(0.15, 0.17, 0.23));
  vec3 sunCol = sCol(
    vec3(1.0, 0.62, 0.22), vec3(1.0, 0.96, 0.80),
    vec3(1.0, 0.38, 0.05), vec3(0.70, 0.75, 0.94), vec3(0.26, 0.28, 0.34));
  vec3 seaDeep = sCol(
    vec3(0.08, 0.05, 0.12), vec3(0.03, 0.14, 0.34),
    vec3(0.10, 0.06, 0.04), vec3(0.00, 0.01, 0.03), vec3(0.03, 0.04, 0.07));
  vec3 seaShlo = sCol(
    vec3(0.28, 0.17, 0.24), vec3(0.09, 0.38, 0.60),
    vec3(0.24, 0.13, 0.06), vec3(0.04, 0.06, 0.16), vec3(0.07, 0.10, 0.14));
  vec3 fogCol = sCol(
    vec3(0.80, 0.50, 0.30), vec3(0.58, 0.72, 0.90),
    vec3(0.70, 0.28, 0.05), vec3(0.02, 0.03, 0.08), vec3(0.12, 0.14, 0.18));

  float sunProgress = clamp(s / 0.58, 0.0, 1.0);
  float sunAngle = sunProgress * PI;
  float sunArcX = cos(sunAngle) * -0.75;
  float sunArcY = sin(sunAngle) * 0.38 - 0.08;
  vec3 sunDir = normalize(vec3(sunArcX, sunArcY, -1.0));
  vec3 moonDir = normalize(vec3(-0.35, 0.25, -1.0));

  float waveAmp = sF(0.082, 0.070, 0.100, 0.054, 0.30);
  waveAmp += storm * 0.020;
  float fogDen = sF(0.020, 0.010, 0.022, 0.034, 0.046);
  float moonAmt = sF(0.0, 0.0, 0.0, 0.6, 1.0);
  float sunAbove = step(0.0, sunDir.y);
  float sunGlow = smoothstep(-0.10, 0.06, sunDir.y);

  vec3 col;

  if (rd.y < 0.0) {
    float tFlat = ro.y / (-rd.y);
    float stepSize = tFlat / float(MARCH_STEPS);
    float t = stepSize;
    for (int i = 0; i < MARCH_STEPS; i++) {
      vec2 wpTest = ro.xz + rd.xz * t;
      float wy = ro.y + rd.y * t;
      if (wy < waveH(wpTest, uT, waveAmp, storm)) break;
      t += stepSize;
    }
    float ta = t - stepSize, tb = t;
    for (int i = 0; i < REFINE_STEPS; i++) {
      float tm = (ta + tb) * 0.5;
      vec2 wpm = ro.xz + rd.xz * tm;
      if (ro.y + rd.y * tm < waveH(wpm, uT, waveAmp, storm)) tb = tm;
      else ta = tm;
    }
    t = (ta + tb) * 0.5;
    vec2 wp = ro.xz + rd.xz * t;
    vec3 n = waveNorm(wp, uT, waveAmp, storm);
    vec3 vDir = -rd;
    float fres = pow(1.0 - clamp(dot(n, vDir), 0.0, 1.0), 4.0);
    vec3 refl = reflect(rd, n);
    float rh = clamp(refl.y, 0.0, 1.0);
    vec3 reflSky = mix(skyHori, skyTop, pow(rh, 0.42));
    reflSky = mix(reflSky, skyHori, 0.12);
    float rSun = max(dot(refl, sunDir), 0.0);
    reflSky += sunCol * pow(rSun, 120.0) * 2.0 * sunGlow;
    reflSky += sunCol * pow(rSun, 18.0) * 0.07 * sunGlow;
    if (moonAmt > 0.04) {
      float rMoon = max(dot(refl, moonDir), 0.0);
      reflSky += vec3(0.72, 0.80, 0.95) * pow(rMoon, 120.0) * 0.78 * moonAmt;
    }
    float depth = exp(-t * 0.40);
    vec3 waterC = mix(seaDeep, seaShlo, depth * 0.5);
    vec3 absorb = vec3(0.85, 0.92, 1.0);
    waterC *= mix(vec3(1.0), absorb, clamp(t * 0.25, 0.0, 1.0));
    col = mix(waterC, reflSky, 0.15 + fres * 0.34);
    float spec = pow(max(dot(reflect(-sunDir, n), vDir), 0.0), 200.0);
    col += sunCol * spec * 1.10 * sunAbove;
    float broadSpec = pow(max(dot(reflect(-sunDir, n), vDir), 0.0), 32.0);
    col += sunCol * broadSpec * 0.12 * sunGlow;
    float sunLine = pow(max(dot(reflect(rd, n), sunDir), 0.0), 8.0);
    col += sunCol * sunLine * 0.48 * smoothstep(0.0, 0.35, -rd.y) * sunGlow;
    float sparkle = noise(wp * 18.0 + vec2(uT * 0.55, uT * 0.22));
    sparkle = smoothstep(0.94, 1.0, sparkle);
    col += sunCol * sparkle * 0.08 * sunGlow * sunAbove;
    if (moonAmt > 0.04) {
      float mSpec = pow(max(dot(reflect(-moonDir, n), vDir), 0.0), 520.0);
      col += vec3(0.72, 0.80, 0.95) * mSpec * 0.09 * moonAmt;
    }
    float hC = waveH(wp, uT, waveAmp, storm);
    float hL = waveH(wp - vec2(0.025, 0.0), uT, waveAmp, storm);
    float hR2 = waveH(wp + vec2(0.025, 0.0), uT, waveAmp, storm);
    float hD = waveH(wp - vec2(0.0, 0.025), uT, waveAmp, storm);
    float hU = waveH(wp + vec2(0.0, 0.025), uT, waveAmp, storm);
    float curvature = hR2 + hL + hU + hD - 4.0 * hC;
    float foam = clamp(curvature * (24.0 + storm * 10.0), 0.0, 1.0);
    col += foam * vec3(1.0) * (0.03 + storm * 0.10);
    float fog = 1.0 - exp(-t * fogDen * 1.65);
    col = mix(col, fogCol, fog);
  } else {
    float h = clamp(rd.y, 0.0, 1.0);
    col = mix(skyHori, skyTop, pow(h, 0.38));
  }

  float horizonW = 0.008;
  float skyMix = smoothstep(-horizonW, horizonW, rd.y);
  vec3 skyCol;
  {
    float h = clamp(rd.y, 0.0, 1.0);
    skyCol = mix(skyHori, skyTop, pow(h, 0.38));
    float cloudBand = noise(rd.x * 5.5 + vec2(rd.y * 3.0, uT * 0.015));
    float cloudBand2 = noise(rd.x * 8.0 - vec2(rd.y * 4.0, uT * 0.010));
    float clouds = smoothstep(0.62, 0.86, cloudBand * 0.65 + cloudBand2 * 0.35);
    clouds *= smoothstep(-0.02, 0.24, rd.y);
    clouds *= 0.08 + storm * 0.18;
    vec3 cloudCol = mix(vec3(1.0, 0.82, 0.65), vec3(0.42, 0.48, 0.56), storm);
    skyCol = mix(skyCol, mix(skyCol * 0.97, cloudCol, 0.35), clouds);
    float sd = max(dot(rd, sunDir), 0.0);
    skyCol += sunCol * pow(sd, 380.0) * 6.8 * sunGlow;
    skyCol += sunCol * pow(sd, 22.0) * 0.20 * sunGlow;
    skyCol += sunCol * pow(sd, 5.0) * 0.09 * sunGlow;
    float sunDisk = smoothstep(0.99925, 0.99995, dot(rd, sunDir));
    skyCol += sunCol * sunDisk * 2.6 * sunGlow;
    float horizonBand = exp(-abs(rd.y) * 24.0);
    skyCol += sunCol * horizonBand * 0.11 * sunGlow;
    float viewSun = max(dot(rd, sunDir), 0.0);
    skyCol += sunCol * pow(viewSun, 3.0) * 0.035 * sunGlow;
    if (moonAmt > 0.04) {
      float md = max(dot(rd, moonDir), 0.0);
      float moonDisk = smoothstep(0.9992, 0.9998, md);
      skyCol += vec3(0.9, 0.95, 1.0) * moonDisk * 2.0 * moonAmt;
      skyCol += vec3(0.88, 0.92, 1.0) * pow(md, 300.0) * 4.0 * moonAmt;
      skyCol += vec3(0.88, 0.92, 1.0) * pow(md, 12.0) * 0.1 * moonAmt;
    }
    if (night > 0.02) {
      vec2 starUv = rd.xy / max(0.12, rd.z + 1.6);
      starUv *= 140.0;
      float stars = starField(starUv) + starField(starUv * 0.55 + 11.7) * 0.65;
      stars *= smoothstep(0.02, 0.26, rd.y);
      stars *= (1.0 - storm * 0.85);
      skyCol += vec3(0.80, 0.88, 1.0) * stars * night * 0.82;
    }
    float horizonMist = exp(-abs(rd.y) * mix(38.0, 22.0, storm));
    skyCol += fogCol * horizonMist * (0.09 + storm * 0.10);
    skyCol = mix(skyCol, skyCol * vec3(0.91, 0.94, 0.98), storm * 0.22);
  }
  col = mix(col, skyCol, skyMix);
  float hEdge = smoothstep(-0.008, 0.018, rd.y);
  col = mix(fogCol, col, hEdge * 0.25 + 0.75);

  // Dark overlay tint to keep text readable
  col *= 0.45;
  col = mix(col, vec3(0.043, 0.039, 0.051), 0.35);

  float grain = hash(gl_FragCoord.xy * 0.5 + floor(uT * 12.0)) - 0.5;
  col += grain * 0.006;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

export default function OceanBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl: WebGLRenderingContext | null = null;
    let disposed = false;

    function init() {
      if (disposed || !canvas) return;

      gl = canvas.getContext("webgl", {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        preserveDrawingBuffer: false,
        powerPreference: "high-performance",
      });

      if (!gl) {
        canvas.style.background = "#0B0A0D";
        return;
      }

      // Compile shaders
      const mkShader = (type: number, src: string) => {
        const s = gl!.createShader(type);
        if (!s) return null;
        gl!.shaderSource(s, src);
        gl!.compileShader(s);
        if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
          gl!.deleteShader(s);
          return null;
        }
        return s;
      };

      const vert = mkShader(gl.VERTEX_SHADER, vertexShader);
      const frag = mkShader(gl.FRAGMENT_SHADER, fragmentShader);
      if (!vert || !frag) return;

      const prog = gl.createProgram()!;
      gl.attachShader(prog, vert);
      gl.attachShader(prog, frag);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(prog));
        return;
      }

      gl.useProgram(prog);
      gl.disable(gl.DEPTH_TEST);
      gl.disable(gl.CULL_FACE);
      gl.disable(gl.BLEND);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW
      );

      const ap = gl.getAttribLocation(prog, "a");
      gl.enableVertexAttribArray(ap);
      gl.vertexAttribPointer(ap, 2, gl.FLOAT, false, 0, 0);

      const uR = gl.getUniformLocation(prog, "uR");
      const uTi = gl.getUniformLocation(prog, "uT");
      const uScroll = gl.getUniformLocation(prog, "uS");
      const uScene = gl.getUniformLocation(prog, "uSc");
      const uBlend = gl.getUniformLocation(prog, "uBl");

      const N = 5;
      let smooth = 0;

      const resize = () => {
        if (!gl || gl.isContextLost()) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const w = Math.round(window.innerWidth * dpr);
        const h = Math.round(window.innerHeight * dpr);
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          gl.viewport(0, 0, w, h);
          gl.uniform2f(uR, w, h);
        }
      };

      resize();
      window.addEventListener("resize", resize, { passive: true });

      const t0 = performance.now();
      let lastNow = t0;

      const frame = (now: number) => {
        if (disposed || !gl || gl.isContextLost()) return;
        rafRef.current = requestAnimationFrame(frame);
        const dt = Math.min((now - lastNow) / 1000, 0.05);
        lastNow = now;

        const maxScroll = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight
        );
        const tgt = window.scrollY / maxScroll;
        smooth += (tgt - smooth) * (1 - Math.exp(-dt * 8));

        const raw = smooth * (N - 1);
        const flr = Math.floor(raw);
        const si = Math.min(flr, N - 2);
        const bl = flr >= N - 1 ? 1.0 : raw - flr;

        gl.uniform1f(uTi, (now - t0) / 1000);
        gl.uniform1f(uScroll, smooth);
        gl.uniform1f(uScene, si);
        gl.uniform1f(uBlend, bl);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      };

      rafRef.current = requestAnimationFrame(frame);

      // Store cleanup for this init cycle
      const currentResize = resize;
      return () => {
        cancelAnimationFrame(rafRef.current);
        window.removeEventListener("resize", currentResize);
        if (gl && !gl.isContextLost()) {
          gl.deleteBuffer(buf);
          gl.deleteProgram(prog);
          gl.deleteShader(vert);
          gl.deleteShader(frag);
        }
      };
    }

    // Handle WebGL context loss (browser can drop it during navigation)
    let cleanupInit: (() => void) | undefined;

    const handleContextLost = (e: Event) => {
      e.preventDefault(); // Allow context to be restored
      cancelAnimationFrame(rafRef.current);
    };

    const handleContextRestored = () => {
      // Reinitialize everything from scratch
      cleanupInit?.();
      cleanupInit = init() || undefined;
    };

    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);

    // Initial setup
    cleanupInit = init() || undefined;

    return () => {
      disposed = true;
      cleanupInit?.();
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      if (gl && !gl.isContextLost()) {
        const ext = gl.getExtension("WEBGL_lose_context");
        if (ext) ext.loseContext();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="ocean-bg"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        background: "#0B0A0D",
      }}
    />
  );
}
