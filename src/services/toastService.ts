export class ToastService {
  build(id: number, data: any, posY: number): HTMLDivElement | null {
    if (!data) {
      return null;
    }

    const container = document.createElement("div");
    container.id = `gaaa-toast-${id}`;
    container.classList.add('gaaa-toast');
    container.style.top = `${posY}px`;

    const ulElm = document.createElement("ul");
    Object.entries(data).forEach(([key, val]) => {
      const liElm = document.createElement("li")
      liElm.classList.add(`gaaa-toast__item--${key}`);
      liElm.innerHTML = `<span>${val}</span>`;
      ulElm.appendChild(liElm);
    });
    container.appendChild(ulElm);

    return container;
  }

  animateIn(toastElm: HTMLElement) {
    console.log('Animate Toast!');
    const items = toastElm.querySelectorAll('li');
    Object.entries(items).forEach(([idx, item]) => {
      item.classList.add('gaaa-toast--slideIn');
      item.style.animationDelay = `${+idx * 0.2}s`;
      item.onanimationend = () => {
        item.style.opacity = '0.8';
        if (parseInt(idx) + 1 === items.length) {
          // Dismiss toast container after last item animated
          this.animteOut(toastElm);
        }
      }
    });
  }

  animteOut(toastElm: HTMLElement) {
    const keyFrames = [
      {
        transform: 'translateX(0)',
        opacity: '0.8'
      },
      {
        transform: 'translateX(-100vw)',
        opacity: '0.6'
      },
      {
        transform: 'translateX(-100vw)',
        opacity: '0.2'
      },
    ];

    const timingOptions = {
      duration: 1800,
      easing: "ease-in",
    };

    const anim = toastElm.animate(keyFrames, timingOptions);
    anim.onfinish = () => {
      toastElm.style.display = 'none';
      toastElm.remove();
    };
  }
}
