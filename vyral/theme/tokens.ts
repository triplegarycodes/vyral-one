export type ThemeId = "default" | "nebula" | "cyber" | "aurora";

export type ThemeDefinition = {
  id: ThemeId;
  label: string;
  description: string;
  colors: {
    background: {
      start: string;
      end: string;
    };
    neon: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    glass: string;
    text: {
      primary: string;
      secondary: string;
    };
  };
  moduleAccents: Record<string, string>;
};

export const defaultThemeId: ThemeId = "default";

export const themeDefinitions: Record<ThemeId, ThemeDefinition> = {
  default: {
    id: "default",
    label: "Prime Flux",
    description: "Balanced midnight gradient with teal and violet glows.",
    colors: {
      background: {
        start: "#000000",
        end: "#0a0f1e"
      },
      neon: {
        primary: "#00f7ff",
        secondary: "#a020f0",
        tertiary: "#00ffd1"
      },
      glass: "rgba(255,255,255,0.08)",
      text: {
        primary: "#f8fbff",
        secondary: "rgba(248, 251, 255, 0.7)"
      }
    },
    moduleAccents: {
      kor: "#00f7ff",
      stryke: "#a020f0",
      skrybe: "#00ffd1",
      zone: "#ff4ecd",
      lyfe: "#7cffb8",
      tree: "#8a5cff",
      board: "#00d4ff",
      shop: "#ffad42",
      vyra: "#ff6ff2"
    }
  },
  nebula: {
    id: "nebula",
    label: "Nebula Trail",
    description: "Cosmic purples with ethereal cyan haze.",
    colors: {
      background: {
        start: "#140029",
        end: "#04000f"
      },
      neon: {
        primary: "#c084fc",
        secondary: "#f472b6",
        tertiary: "#38f8ff"
      },
      glass: "rgba(255,255,255,0.12)",
      text: {
        primary: "#fdf8ff",
        secondary: "rgba(253, 248, 255, 0.7)"
      }
    },
    moduleAccents: {
      kor: "#b57bff",
      stryke: "#ff6fba",
      skrybe: "#4de0ff",
      zone: "#ff8ed1",
      lyfe: "#ffd166",
      tree: "#d8b4fe",
      board: "#60a5fa",
      shop: "#fda4af",
      vyra: "#f472d0"
    }
  },
  cyber: {
    id: "cyber",
    label: "Cyber Bloom",
    description: "Electric blues with synthwave magenta pulses.",
    colors: {
      background: {
        start: "#001427",
        end: "#00060f"
      },
      neon: {
        primary: "#0ef4ff",
        secondary: "#7c3aed",
        tertiary: "#16f5b3"
      },
      glass: "rgba(255,255,255,0.1)",
      text: {
        primary: "#f1fbff",
        secondary: "rgba(241, 251, 255, 0.72)"
      }
    },
    moduleAccents: {
      kor: "#38bdf8",
      stryke: "#a855f7",
      skrybe: "#22d3ee",
      zone: "#f472b6",
      lyfe: "#34d399",
      tree: "#818cf8",
      board: "#0ea5e9",
      shop: "#f59e0b",
      vyra: "#fb7185"
    }
  },
  aurora: {
    id: "aurora",
    label: "Aurora Drift",
    description: "Glacial teals blending into polar lights.",
    colors: {
      background: {
        start: "#001b1c",
        end: "#002f3f"
      },
      neon: {
        primary: "#2dd4bf",
        secondary: "#38bdf8",
        tertiary: "#a855f7"
      },
      glass: "rgba(255,255,255,0.09)",
      text: {
        primary: "#f6fffe",
        secondary: "rgba(246, 255, 254, 0.68)"
      }
    },
    moduleAccents: {
      kor: "#2dd4bf",
      stryke: "#a855f7",
      skrybe: "#38bdf8",
      zone: "#f472b6",
      lyfe: "#bef264",
      tree: "#60a5fa",
      board: "#0ea5e9",
      shop: "#fb923c",
      vyra: "#f472d0"
    }
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

export const themeOptions = Object.values(themeDefinitions);
