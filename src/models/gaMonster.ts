import { ToastService } from '../services/toastService';
import { Ga, GaHitType } from './ga';

interface GaMonster {
  readonly id: number;
  readonly ga: Ga;

  container?: HTMLDivElement | null;
  readonly baseSize: { width: number, height: number };

  build(): void;
}

class GaMonsterHelper {
  readonly toastService: ToastService = new ToastService();

  idToSelector(idx: number) {
    return `gaaa-monster-${idx}`;
  }

  makeBaseContainer(id: number): HTMLDivElement {
    const container = document.createElement("div");

    container.id = this.idToSelector(id);
    container.classList.add('gaaa-baseContainer');

    return container;
  }

  getImaageUrl(path: string): string {
    const imgSrcUrl = chrome.runtime.getURL(path);
    return `${imgSrcUrl}?${Date.now()}`;
  }
}

export class GaEventMonster extends GaMonsterHelper implements GaMonster {
  id;
  ga;

  container?: HTMLDivElement | null;
  baseSize = { width: 300, height: 300 };
  imagePath = '/images/content/gaaa_evMonster.svg';

  constructor(ga: Ga, idx: number) {
    super();
    this.ga = ga;
    this.id = idx;
  }

  build(): void {
    this.container = this.makeBaseContainer(this.id);

    // Nearly 25 percent from bottom of the screen.
    const posY = window.scrollY + (document.documentElement.clientHeight / 3);
    this.container.style.top = `${posY}px`;

    const imgNode = document.createElement("img");
    imgNode.src = this.getImaageUrl(this.imagePath);
    this.container.appendChild(imgNode);

    const toPosX = document.documentElement.clientWidth + this.baseSize.width;
    this.animateMonster(toPosX);

    const toast = this.toastService.build(this.id, this.ga.eventDetail, posY);
    if (toast) {
      document.body.insertBefore(toast, document.body.lastChild);
    }
    document.body.insertBefore(this.container, document.body.lastChild);
  }

  private animateMonster(toPosX: number): void {
    if (!this.container) {
      return;
    }

    const keyFrames = [
      {
        transform: 'translateX(0) scale3d(1, 1, 1)',
        opacity: '1'
      },
      {
        transform: `translateX(${toPosX}px) scale3d(5, 5, 5)`,
        opacity: '0.6'
      },
    ];

    const timingOptions = {
      duration: 400,
      delay: 600,
      easing: "cubic-bezier(.85,.07,.65,.66)",
    };

    const anim = this.container.animate(keyFrames, timingOptions);
    anim.onfinish = () => {
      if (!this.container) {
        return;
      }
      this.container.remove();

      const toastId = `gaaa-toast-${this.id}`;
      const toast = document.getElementById(toastId);
      if (toast) {
        this.toastService.animateIn(toast);
      }
    };
  }
}

export class GaPvMonster extends GaMonsterHelper implements GaMonster {
  id;
  ga;

  container?: HTMLDivElement | null;
  baseSize = { width: 300, height: 300 };
  imagePath = '/images/content/gaaa_pvMonster.svg';

  constructor(ga: Ga, idx: number) {
    super();
    this.ga = ga;
    this.id = idx;
  }

  build(): void {
    this.container = this.makeBaseContainer(this.id);

    // Nearly vertical center of the screen.
    const posY = window.scrollY + (document.documentElement.clientHeight / 2);
    this.container.style.top = `${posY}px`;

    const imgNode = document.createElement("img");
    imgNode.src = this.getImaageUrl(this.imagePath);
    this.container.appendChild(imgNode);

    const toPosX = document.documentElement.clientWidth + this.baseSize.width;
    this.buildAnimation(toPosX);

    document.body.insertBefore(this.container, document.body.lastChild);
  }

  private buildAnimation(toPosX: number): void {
    if (!this.container) {
      return;
    }

    const keyFrames = [
      {
        transform: 'translateX(0) scale3d(1, 1, 1)',
        opacity: '1'
      },
      {
        transform: `translateX(${toPosX}px) scale3d(5, 5, 5)`,
        opacity: '0.6'
      },
    ];

    const timingOptions = {
      duration: 800,
      delay: 400,
      easing: "cubic-bezier(.85,.07,.65,.66)",
    };

    const anim = this.container.animate(keyFrames, timingOptions);
    anim.onfinish = () => {
      if (!this.container) {
        return;
      }
      this.container.remove();
    };
  }
}

export class GaMonsterFactory {
  static generate(ga: Ga, idx: number): GaMonster | null {
    if (ga.hitType === GaHitType.Pageview) {
      return new GaPvMonster(ga, idx);
    }
    if (ga.hitType === GaHitType.Event) {
      return new GaEventMonster(ga, idx);
    }

    return null;
  }
}
