import { Ga, GaHitType } from "../src/models/ga";
import { GaMonsterFactory } from "../src/models/gaMonster";

{
  "use strict";

  class DemoService {
    constructor() {}

    generateMockGa(type: string) {
      if (type === 'pv') {
        return {
          uri: 'http://dummy.example.com/?t=pageview',
          queries: [],
          hitType: GaHitType.Pageview,
        } as Ga;
      }

      return {
        uri: 'http://dummy.example.com/?t=event',
        queries: [],
        hitType: GaHitType.Event,
        eventDetail: {
          category: 'Category',
          action: 'Action',
          label: 'Label',
        }
      } as Ga;
    }
  }

  let idx = 1;
  const demoService = new DemoService();
  
  window.addEventListener('load', () => {
    document.addEventListener('click', () => {
      const ga = demoService.generateMockGa('ev');
      const monster = GaMonsterFactory.generate(ga, idx);
      if (!monster) {
        return;
      }
      monster.build();
      idx++;
    });

    setTimeout(() => {
      const ga = demoService.generateMockGa('pv');
      const monster = GaMonsterFactory.generate(ga, 0);
      if (monster) {
        monster.build();
      }
    }, 1000);
  });
};
