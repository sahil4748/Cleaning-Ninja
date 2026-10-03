"use client";
import { useEffect, useRef, useState } from "react";

/**
 * One locked-off room in two states. A noise-edged front of light moves through it
 * (from the window on desktop, from the floor upward on mobile), so haze, grime and
 * clutter resolve into the same room, clean. Progress is 0 → 1, supplied by the page.
 */
const VERT = `attribute vec2 p;varying vec2 vUv;void main(){vUv=p*.5+.5;gl_Position=vec4(p,0.,1.);}`;
const FRAG = `precision highp float;
uniform sampler2D uA,uB;uniform vec2 uRes,uImg,uDir;uniform float uP,uT;varying vec2 vUv;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p*=2.03;a*=.5;}return v;}
vec2 cover(vec2 uv,float z){float rs=uRes.x/uRes.y,ri=uImg.x/uImg.y;vec2 s=rs>ri?vec2(1.,ri/rs):vec2(rs/ri,1.);return (uv-.5)*s/z+.5;}
void main(){
  float z=1.07-.07*uP;
  vec2 uv=cover(vUv,z);
  vec2 asp=vec2(uRes.x/uRes.y,1.);
  float f=dot(vUv,uDir)/(uDir.x+uDir.y);
  float ns=fbm(vUv*asp*2.6+vec2(0.,uT*.015));
  float thr=mix(-.3,1.3,uP);
  float e=f+(ns-.5)*.42;
  float m=1.-smoothstep(thr-.11,thr+.11,e);
  float soft=(1.-uP)*.0032;
  vec3 a=texture2D(uA,uv).rgb*.4;
  a+=texture2D(uA,uv+vec2(soft,0.)).rgb*.15+texture2D(uA,uv-vec2(soft,0.)).rgb*.15;
  a+=texture2D(uA,uv+vec2(0.,soft)).rgb*.15+texture2D(uA,uv-vec2(0.,soft)).rgb*.15;
  float lum=dot(a,vec3(.3,.59,.11));
  a=mix(vec3(lum),a,.88);
  a=mix(a,vec3(.36,.35,.34),.1*(1.-uP)*(.6+ns*.8));
  vec3 b=texture2D(uB,uv).rgb;
  vec3 c=mix(a,b,m);
  float rim=exp(-pow((e-thr)/.05,2.));
  c+=vec3(1.,.97,.9)*rim*.1*step(.001,uP)*step(uP,.999);
  vec2 q=vUv-.5;
  c*=1.-(.42*(1.-.65*uP))*dot(q,q)*1.9;
  c+=(h(vUv*uRes+uT)-.5)*.04;
  gl_FragColor=vec4(c,1.);
}`;

type Props = {
  progressRef: React.MutableRefObject<number>;
  sources: { wide: [string, string]; tall: [string, string] };
  /** Optional locked-off films [disorder, order], same framing as the wide stills. Desktop only. */
  videos?: [string, string];
};

export default function RoomStage({ progressRef, sources, videos }: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const gl = el.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (name: string) => gl.getUniformLocation(prog, name);
    const uA = u("uA"), uB = u("uB"), uRes = u("uRes"), uImg = u("uImg"), uDir = u("uDir"), uP = u("uP"), uT = u("uT");
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    let alive = true;
    let imgSize: [number, number] = [16, 9];
    let tall = false;
    let shown = -1;
    let raf = 0;
    let visible = true;
    let painted = false;
    let texA: WebGLTexture | null = null;
    let texB: WebGLTexture | null = null;
    let texAv: WebGLTexture | null = null;
    let texBv: WebGLTexture | null = null;
    let loaded: "none" | "wide" | "tall" = "none";
    let vidA: HTMLVideoElement | null = null;
    let vidB: HTMLVideoElement | null = null;
    let useVideo = false;
    const t0 = performance.now();

    const mkTex = (img: HTMLImageElement | HTMLVideoElement) => {
      const t = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      return t;
    };
    const load = (src: string) =>
      new Promise<HTMLImageElement>((res, rej) => {
        const i = new Image();
        i.decoding = "async";
        i.onload = () => res(i);
        i.onerror = rej;
        i.src = src;
      });

    const startVideos = () => {
      if (!videos || vidA || useVideo) return;
      const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches || conn?.saveData || /2g|3g/.test(conn?.effectiveType ?? "")) return;
      const mk = (src: string) => {
        const v = document.createElement("video");
        v.muted = true;
        v.loop = true;
        v.playsInline = true;
        v.preload = "auto";
        v.src = src;
        return v;
      };
      const a = mk(videos[0]);
      const b = mk(videos[1]);
      let ready = 0;
      const ok = () => {
        if (++ready < 2 || !alive) return;
        void Promise.all([a.play(), b.play()])
          .then(() => {
            if (!alive) return;
            vidA = a;
            vidB = b;
            imgSize = [a.videoWidth, a.videoHeight];
            texAv = mkTex(a);
            texBv = mkTex(b);
            useVideo = true;
            el.dataset.film = "ready";
            schedule();
          })
          .catch(() => {
            a.removeAttribute("src");
            b.removeAttribute("src");
          });
      };
      a.addEventListener("canplaythrough", ok, { once: true });
      b.addEventListener("canplaythrough", ok, { once: true });
      a.load();
      b.load();
    };

    const wantTall = () => el.clientHeight > el.clientWidth;
    const loadSet = async () => {
      const t = wantTall();
      const [a, b] = t ? sources.tall : sources.wide;
      try {
        const [ia, ib] = await Promise.all([load(a), load(b)]);
        if (!alive) return;
        texA = mkTex(ia);
        texB = mkTex(ib);
        imgSize = [ia.naturalWidth, ia.naturalHeight];
        tall = t;
        loaded = t ? "tall" : "wide";
        shown = -1;
        schedule();
        if (!t) startVideos();
      } catch {
        /* the static photograph beneath remains */
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, el.clientWidth < 700 ? 1.5 : 1.6);
      const w = Math.round(el.clientWidth * dpr), h = Math.round(el.clientHeight * dpr);
      if (el.width !== w || el.height !== h) {
        el.width = w;
        el.height = h;
        gl.viewport(0, 0, w, h);
        shown = -1;
      }
      if (loaded !== "none" && (wantTall() ? "tall" : "wide") !== loaded) void loadSet();
    };

    const draw = () => {
      raf = 0;
      if (!alive || !texA || !texB) return;
      const p = progressRef.current;
      if (p === shown && !(p > 0 && p < 1) && !useVideo) return;
      shown = p;
      const live = useVideo && vidA && vidB && vidA.readyState >= 2 && vidB.readyState >= 2;
      if (live) el.dataset.film = "on";
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, live ? texAv : texA);
      if (live) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, vidA!);
      gl.uniform1i(uA, 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, live ? texBv : texB);
      if (live) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, vidB!);
      gl.uniform1i(uB, 1);
      gl.uniform2f(uRes, el.width, el.height);
      gl.uniform2f(uImg, imgSize[0], imgSize[1]);
      if (tall) gl.uniform2f(uDir, 0.12, 1.0);
      else gl.uniform2f(uDir, 1.0, 0.28);
      gl.uniform1f(uP, p);
      gl.uniform1f(uT, (performance.now() - t0) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!painted) {
        painted = true;
        setReady(true);
      }
    };
    const schedule = () => {
      if (!raf && visible) raf = requestAnimationFrame(draw);
    };

    const tick = () => {
      if (!alive) return;
      if (visible && (progressRef.current !== shown || useVideo)) schedule();
      loop = requestAnimationFrame(tick);
    };
    let loop = requestAnimationFrame(tick);
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible) {
        schedule();
        void vidA?.play().catch(() => {});
        void vidB?.play().catch(() => {});
      } else {
        vidA?.pause();
        vidB?.pause();
      }
    });
    io.observe(el);
    const ro = new ResizeObserver(() => {
      resize();
      schedule();
    });
    ro.observe(el);
    resize();
    void loadSet();
    return () => {
      alive = false;
      for (const v of [vidA, vidB]) {
        v?.pause();
        v?.removeAttribute("src");
        v?.load();
      }
      cancelAnimationFrame(raf);
      cancelAnimationFrame(loop);
      io.disconnect();
      ro.disconnect();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [progressRef, sources, videos]);

  return <canvas ref={canvas} className={`rs-canvas${ready ? " is-ready" : ""}`} aria-hidden="true" />;
}
