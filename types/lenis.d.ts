declare module "lenis" {
  type EasingFunction = (t: number) => number;

  export interface LenisOptions {
    duration?: number;
    easing?: EasingFunction;
    smooth?: boolean;
    direction?: "vertical" | "horizontal";
    gesture?: "wheel" | "touch" | "both";
    infinite?: boolean;
  }

  export default class Lenis {
    constructor(options?: LenisOptions);
    raf(time: number): void;
    destroy(): void;
    on(event: string, callback: Function): void;
  }
}