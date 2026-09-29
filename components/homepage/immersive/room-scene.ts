import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export type RoomController = {
  setLayer: (layer: number) => void;
  setExploded: (value: boolean) => void;
  setPaused: (value: boolean) => void;
  dispose: () => void;
};
/** A small, original procedural room. No remote models, textures or continuous offscreen rendering. */
export function createRoom(
  canvas: HTMLCanvasElement,
  onReady: () => void,
  onLost: () => void,
): RoomController {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-5, 5, 4, -4, 0.1, 80);
  camera.position.set(8, 7, 10);
  camera.lookAt(0, 0.8, 0);
  const room = new THREE.Group();
  scene.add(room);
  const layers = [new THREE.Group(), new THREE.Group(), new THREE.Group()];
  layers.forEach((g) => room.add(g));
  const textures: THREE.Texture[] = [];
  const mat = (color: string, roughness = 0.9) =>
    new THREE.MeshStandardMaterial({ color, roughness });
  const cream = mat("#e9dfc6"),
    stone = mat("#cfbaa0"),
    wood = mat("#ac7950"),
    darkWood = mat("#795438"),
    olive = mat("#6c784a"),
    paleOlive = mat("#a4ae74"),
    white = mat("#f5eedf"),
    charcoal = mat("#343e2c");
  function fabric(base: string) {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, 256, 256);
    let seed = 37;
    for (let i = 0; i < 18000; i++) {
      seed = (seed * 16807) % 2147483647;
      const x = seed % 256;
      seed = (seed * 16807) % 2147483647;
      const y = seed % 256;
      ctx.fillStyle = i % 2 ? "#ffffff20" : "#00000020";
      ctx.fillRect(x, y, 1, 2);
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(3, 3);
    t.colorSpace = THREE.SRGBColorSpace;
    textures.push(t);
    return new THREE.MeshStandardMaterial({
      map: t,
      roughness: 1,
      bumpMap: t,
      bumpScale: 0.025,
    });
  }
  const upholstery = fabric("#e3d9be"),
    carpet = fabric("#b9b095");
  function box(
    group: THREE.Group,
    size: number[],
    pos: number[],
    material: THREE.Material,
    radius = 0.06,
  ) {
    const mesh = new THREE.Mesh(
      new RoundedBoxGeometry(size[0], size[1], size[2], 3, radius),
      material,
    );
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  }
  function cylinder(
    group: THREE.Group,
    radiusTop: number,
    radiusBottom: number,
    height: number,
    pos: number[],
    material: THREE.Material,
  ) {
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 48),
      material,
    );
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  }
  // Floating architectural plinth, herringbone-like timber strips and rounded carpet insert.
  box(room, [6.3, 0.28, 5.4], [0, -0.2, 0], cream, 0.13);
  box(room, [6.1, 0.08, 5.2], [0, -0.02, 0], wood, 0.04);
  for (let i = 0; i < 18; i++)
    box(
      room,
      [0.011, 0.004, 5.1],
      [-2.88 + i * 0.34, 0.024, 0],
      darkWood,
      0.001,
    );
  const rug = box(layers[0], [4.8, 0.09, 3.6], [0, 0.06, 0.4], carpet, 0.04);
  for (let i = 0; i < 28; i++)
    box(
      layers[0],
      [0.028, 0.009, 3.32],
      [-2.22 + i * 0.164, 0.109, 0.4],
      i % 3 === 0 ? stone : cream,
      0.003,
    );
  // An open back wall creates a framing arch, without hiding the furniture.
  box(room, [0.19, 2.8, 1.25], [-3.0, 1.4, -1.95], cream, 0.025);
  box(room, [6.1, 0.17, 0.15], [0, 2.7, -2.55], cream, 0.025);
  box(room, [0.15, 2.8, 0.15], [3, 1.4, -2.55], cream, 0.025);
  box(room, [6.1, 0.45, 0.14], [0, 0.22, -2.55], cream, 0.025);
  for (let i = 0; i < 9; i++)
    box(room, [0.035, 2.15, 0.08], [-2.5 + i * 0.63, 1.55, -2.55], wood, 0.01);
  // Modular sofa with loose seat cushions, seams, legs and two olive pillows.
  const sofa = new THREE.Group();
  layers[1].add(sofa);
  sofa.position.set(-0.3, 0, -1.25);
  box(sofa, [3.4, 0.38, 1.16], [0, 0.5, 0], upholstery, 0.16);
  box(sofa, [3.4, 0.83, 0.27], [0, 1.04, -0.5], upholstery, 0.13);
  for (const x of [-1.57, 1.57])
    box(sofa, [0.3, 0.58, 1.21], [x, 0.8, 0.015], upholstery, 0.14);
  for (const x of [-1.38, 1.38])
    for (const z of [-0.4, 0.4])
      cylinder(sofa, 0.055, 0.045, 0.29, [x, 0.18, z], darkWood);
  for (let i = 0; i < 3; i++)
    box(
      sofa,
      [0.96, 0.2, 0.9],
      [-1.02 + i * 1.02, 0.77, 0.07],
      upholstery,
      0.095,
    );
  const p1 = box(sofa, [0.57, 0.56, 0.18], [-1.02, 1.1, -0.29], olive, 0.12);
  p1.rotation.z = 0.18;
  p1.rotation.x = -0.14;
  const p2 = box(sofa, [0.58, 0.55, 0.18], [1.02, 1.1, -0.3], paleOlive, 0.12);
  p2.rotation.z = -0.22;
  // Sculptural occasional chair.
  const chair = new THREE.Group();
  layers[1].add(chair);
  chair.position.set(2.0, 0, 0.8);
  chair.rotation.y = -0.42;
  box(chair, [0.95, 0.26, 1], [0, 0.48, 0], olive, 0.13);
  box(chair, [0.96, 0.7, 0.23], [0, 0.89, -0.45], olive, 0.1);
  for (const x of [-0.42, 0.42]) {
    box(chair, [0.1, 0.1, 1.08], [x, 0.7, 0], wood, 0.04);
    for (const z of [-0.4, 0.4])
      box(chair, [0.08, 0.5, 0.08], [x, 0.25, z], wood, 0.02);
  }
  // Fluted circular table, ceramic vase, a book and cup.
  const table = new THREE.Group();
  layers[2].add(table);
  table.position.set(-0.2, 0, 0.65);
  cylinder(table, 0.58, 0.66, 0.5, [0, 0.34, 0], wood);
  for (let i = 0; i < 32; i++) {
    const a = (i / 32) * Math.PI * 2;
    cylinder(
      table,
      0.027,
      0.027,
      0.49,
      [Math.cos(a) * 0.6, 0.34, Math.sin(a) * 0.6],
      stone,
    );
  }
  cylinder(table, 0.89, 0.89, 0.11, [0, 0.65, 0], cream);
  const book = box(
    table,
    [0.48, 0.04, 0.36],
    [-0.26, 0.73, 0.13],
    olive,
    0.012,
  );
  book.rotation.y = 0.25;
  cylinder(table, 0.1, 0.16, 0.3, [0.27, 0.87, -0.12], white);
  cylinder(table, 0.09, 0.065, 0.1, [-0.08, 0.75, -0.36], wood);
  // Olive tree with individually arranged leaves.
  const plant = new THREE.Group();
  layers[2].add(plant);
  plant.position.set(-2.28, 0, -1.65);
  cylinder(plant, 0.28, 0.2, 0.48, [0, 0.25, 0], stone);
  cylinder(plant, 0.025, 0.038, 1.7, [0, 1.17, 0], darkWood);
  for (let i = 0; i < 32; i++) {
    const a = i * 2.399,
      y = 0.95 + (i % 9) * 0.13,
      r = 0.21 + (i % 4) * 0.075;
    const leaf = new THREE.Mesh(
      new THREE.SphereGeometry(1, 8, 6),
      i % 3 ? olive : paleOlive,
    );
    leaf.position.set(Math.cos(a) * r, y, Math.sin(a) * r);
    leaf.scale.set(0.19, 0.045, 0.095);
    leaf.rotation.z = Math.sin(a) * 0.7;
    leaf.rotation.y = a;
    leaf.castShadow = true;
    plant.add(leaf);
  }
  // Floor lamp, luminous shade and small stack of reading material.
  cylinder(layers[2], 0.22, 0.25, 0.06, [2.2, 0.1, -1.65], charcoal);
  cylinder(layers[2], 0.018, 0.018, 1.9, [2.2, 1.04, -1.65], charcoal);
  cylinder(layers[2], 0.21, 0.4, 0.44, [2.2, 2.05, -1.65], white);
  const glow = new THREE.PointLight("#ffe5b2", 1.5, 3);
  glow.position.set(2.2, 1.85, -1.65);
  room.add(glow);
  // A thin brand orbit gives the room a recognisable contour.
  const orbit = new THREE.Mesh(
    new THREE.TorusGeometry(3.6, 0.017, 6, 120),
    paleOlive,
  );
  orbit.rotation.x = Math.PI / 2;
  orbit.position.y = -0.12;
  room.add(orbit);
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.ShadowMaterial({ opacity: 0.13 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.55;
  ground.receiveShadow = true;
  scene.add(ground);
  scene.add(new THREE.HemisphereLight("#fff8e7", "#9da582", 3));
  const sun = new THREE.DirectionalLight("#fff2d4", 4.3);
  sun.position.set(-4, 8, 5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -7;
  sun.shadow.camera.right = 7;
  sun.shadow.camera.top = 7;
  sun.shadow.camera.bottom = -7;
  sun.shadow.normalBias = 0.03;
  sun.shadow.bias = -0.0003;
  scene.add(sun);
  const fill = new THREE.DirectionalLight("#d7e3c4", 1);
  fill.position.set(5, 3, -4);
  scene.add(fill);
  let targetX = 0,
    targetY = 0,
    layer = -1,
    exploded = false,
    frame = 0,
    visible = true,
    disposed = false,
    paused = false,
    elapsed = 0,
    last = 0;
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const resize = () => {
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    const aspect = width / height;
    const size = width < 600 ? 5.2 : aspect < 0.9 ? 5.15 : 4.5;
    camera.left = -size * aspect;
    camera.right = size * aspect;
    camera.top = size;
    camera.bottom = -size;
    camera.updateProjectionMatrix();
    render();
  };
  function render() {
    renderer.render(scene, camera);
  }
  function tick(now: number) {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    elapsed += dt;
    room.rotation.y = THREE.MathUtils.damp(
      room.rotation.y,
      targetX * 0.19 + (layer === 1 ? 0.19 : layer === 2 ? -0.15 : 0),
      5,
      dt,
    );
    room.rotation.x = THREE.MathUtils.damp(
      room.rotation.x,
      targetY * 0.025,
      5,
      dt,
    );
    room.position.y =
      motion.matches || paused ? 0 : Math.sin(elapsed * 0.65) * 0.055;
    layers.forEach((group, i) => {
      group.position.y = THREE.MathUtils.damp(
        group.position.y,
        exploded ? [0.2, 0.95, 1.9][i] : layer === i ? 0.13 : 0,
        4,
        dt,
      );
    });
    rug.material = carpet;
    render();
    if (!motion.matches && !paused) frame = requestAnimationFrame(tick);
  }
  const start = () => {
    if (!frame && !disposed && visible && !document.hidden) {
      last = performance.now();
      frame = requestAnimationFrame(tick);
    }
  };
  const pointer = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    targetX = ((e.clientX - r.left) / r.width) * 2 - 1;
    targetY = ((e.clientY - r.top) / r.height) * 2 - 1;
    start();
  };
  const reset = () => {
    targetX = targetY = 0;
  };
  const visibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else start();
  };
  const observer = new IntersectionObserver(
    ([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    },
    { rootMargin: "60px" },
  );
  observer.observe(canvas);
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  canvas.addEventListener("pointermove", pointer);
  canvas.addEventListener("pointerleave", reset);
  document.addEventListener("visibilitychange", visibility);
  motion.addEventListener("change", start);
  const lost = (e: Event) => {
    e.preventDefault();
    canvas.dataset.lost = "true";
    onLost();
    cancelAnimationFrame(frame);
    frame = 0;
  };
  canvas.addEventListener("webglcontextlost", lost);
  resize();
  start();
  onReady();
  return {
    setPaused: (value) => {
      paused = value;
      if (value) {
        cancelAnimationFrame(frame);
        frame = 0;
        render();
      } else start();
    },
    setLayer: (value) => {
      layer = value;
      if (paused || motion.matches) {
        layers.forEach(
          (g, i) =>
            (g.position.y = exploded
              ? [0.2, 0.95, 1.9][i]
              : layer === i
                ? 0.13
                : 0),
        );
        render();
      } else start();
    },
    setExploded: (value) => {
      exploded = value;
      if (paused || motion.matches) {
        layers.forEach(
          (g, i) =>
            (g.position.y = exploded
              ? [0.2, 0.95, 1.9][i]
              : layer === i
                ? 0.13
                : 0),
        );
        render();
      } else start();
    },
    dispose: () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointermove", pointer);
      canvas.removeEventListener("pointerleave", reset);
      canvas.removeEventListener("webglcontextlost", lost);
      document.removeEventListener("visibilitychange", visibility);
      motion.removeEventListener("change", start);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          const ms = Array.isArray(o.material) ? o.material : [o.material];
          ms.forEach((m) => m.dispose());
        }
      });
      textures.forEach((t) => t.dispose());
      renderer.dispose();
    },
  };
}
