/**
 * Predefined color palette for scenarios and charts
 * Using Tailwind CSS color values
 */
const SCENARIO_COLORS = [
  '#8b5cf6', // purple-500 - Base scenario
  '#3b82f6', // blue-500 - Variation 1
  '#10b981', // green-500 - Variation 2
  '#f59e0b', // orange-500 - Variation 3
  '#ec4899', // pink-500 - Variation 4
  '#06b6d4', // cyan-500 - Extra
  '#8b5cf6', // purple-500 - Extra
  '#f43f5e', // rose-500 - Extra
] as const;

/**
 * Generate distinct colors for scenarios
 * @param count - Number of colors needed
 * @returns Array of hex color codes
 */
export function generateScenarioColors(count: number): string[] {
  if (count <= 0) return [];
  if (count <= SCENARIO_COLORS.length) {
    return [...SCENARIO_COLORS.slice(0, count)];
  }

  // If more colors needed than predefined, generate more
  const colors: string[] = [...SCENARIO_COLORS];
  const hueStep = 360 / (count - SCENARIO_COLORS.length);

  for (let i = SCENARIO_COLORS.length; i < count; i++) {
    const hue = (i * hueStep) % 360;
    colors.push(hslToHex(hue, 70, 60));
  }

  return colors;
}

/**
 * Get color for a specific scenario index
 * @param index - Scenario index (0-based)
 * @returns Hex color code
 */
export function getScenarioColor(index: number): string {
  return SCENARIO_COLORS[index % SCENARIO_COLORS.length];
}

/**
 * Get color palette for charts
 * @returns Object with semantic color names
 */
export function getChartColorPalette() {
  return {
    gross: '#8b5cf6', // purple-500
    insurance: '#3b82f6', // blue-500
    tax: '#f59e0b', // orange-500
    net: '#10b981', // green-500
    deduction: '#a855f7', // purple-400
    bhxh: '#60a5fa', // blue-400
    bhyt: '#3b82f6', // blue-500
    bhtn: '#2563eb', // blue-600
  };
}

/**
 * Convert HSL to Hex color
 * @param h - Hue (0-360)
 * @param s - Saturation (0-100)
 * @param l - Lightness (0-100)
 * @returns Hex color code
 */
function hslToHex(h: number, s: number, l: number): string {
  const hDecimal = h / 360;
  const sDecimal = s / 100;
  const lDecimal = l / 100;

  let r: number, g: number, b: number;

  if (sDecimal === 0) {
    r = g = b = lDecimal;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q =
      lDecimal < 0.5
        ? lDecimal * (1 + sDecimal)
        : lDecimal + sDecimal - lDecimal * sDecimal;
    const p = 2 * lDecimal - q;

    r = hue2rgb(p, q, hDecimal + 1 / 3);
    g = hue2rgb(p, q, hDecimal);
    b = hue2rgb(p, q, hDecimal - 1 / 3);
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Generate color with opacity
 * @param hexColor - Hex color code
 * @param opacity - Opacity value (0-1)
 * @returns RGBA color string
 */
export function colorWithOpacity(hexColor: string, opacity: number): string {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
