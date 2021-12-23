import { GaMonsterFactory } from "./models/gaMonster";

let idx = 0;

chrome.runtime.onMessage.addListener(
  (ga, sender, response) => {
    const monster = GaMonsterFactory.generate(ga, idx);
    if (!monster) {
      return;
    }

    monster.build();
    idx++;
  }
);
