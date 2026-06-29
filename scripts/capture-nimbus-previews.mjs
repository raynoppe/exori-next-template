import { chromium, devices } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(
  __dirname,
  "../../../exori/be/templates/website-registry/packs/nimbus/previews"
);
const BASE = process.env.PREVIEW_BASE_URL || "http://localhost:3000";

async function main() {
  const browser = await chromium.launch();
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const mobile = await browser.newContext({ ...devices["iPhone 13"] });
  const mobilePage = await mobile.newPage();

  await desktop.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await desktop.screenshot({
    path: path.join(OUT, "home-desktop.png"),
    fullPage: true,
  });
  await desktop.screenshot({
    path: path.join(OUT, "card.png"),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });

  await mobilePage.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await mobilePage.screenshot({
    path: path.join(OUT, "home-mobile.png"),
    fullPage: true,
  });

  await desktop.goto(`${BASE}/pricing`, { waitUntil: "networkidle" });
  await desktop.screenshot({
    path: path.join(OUT, "pricing-desktop.png"),
    fullPage: true,
  });

  await desktop.goto(`${BASE}/shop`, { waitUntil: "networkidle" });
  await desktop.screenshot({
    path: path.join(OUT, "shop-desktop.png"),
    fullPage: true,
  });

  await browser.close();
  console.log("Preview PNGs written to", OUT);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
