import { continueRender, delayRender, staticFile } from "remotion";

export const BebasNeueFont = "BebasNeue";

let loaded = false;

export const loadFont = async (): Promise<void> => {
  if (loaded) {
    return Promise.resolve();
  }

  const waitForFont = delayRender();

  loaded = true;

  /**
   * .ttf = truetype
   * .otf = opentype
   */
  const font = new FontFace(
    BebasNeueFont,
    `url('${staticFile("bebas-neue-bold.otf")}') format('opentype')`,
  );

  await font.load();
  document.fonts.add(font);

  continueRender(waitForFont);
};
