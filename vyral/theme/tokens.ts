export const colors = {
  background: {
    start: "#000000",
    end: "#0a0f1e"
  },
  neon: {
    blue: "#00f7ff",
    purple: "#a020f0",
    teal: "#00ffd1"
  },
  glass: "rgba(255,255,255,0.08)",
  text: {
    primary: "#f8fbff",
    secondary: "rgba(248, 251, 255, 0.7)"
  }
};

export const radii = {
  glass: 24
};

export const shadows = {
  glow: {
    blue: "0 0 30px rgba(0, 247, 255, 0.3)",
    purple: "0 0 30px rgba(160, 32, 240, 0.3)",
    teal: "0 0 30px rgba(0, 255, 209, 0.3)"
  }
};

export const timing = {
  tap: 150,
  transition: 300
};

export const fonts = {
  heading: "SpaceGrotesk_700Bold",
  body: "Inter_400Regular"
};

export const moduleAccents: Record<string, string> = {
  kor: colors.neon.blue,
  stryke: colors.neon.purple,
  skrybe: colors.neon.teal,
  zone: "#ff4ecd",
  lyfe: "#7cffb8",
  tree: "#8a5cff",
  board: "#00d4ff",
  shop: "#ffad42",
  vyra: "#ff6ff2"
};
