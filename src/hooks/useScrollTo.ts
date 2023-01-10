import { isFunction, isUnDef } from '@/utils/is';
import { ref, unref, Ref } from 'vue';

export interface ScrollToParams {
  el: Ref<HTMLElement>;
  to: number;
  duration?: number;
  callback?: () => any;
}

const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
  t /= d / 2;
  if (t < 1) {
    return (c / 2) * t * t + b;
  }
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};
const move = (el: HTMLElement, amount: number) => {
  el.scrollTop = amount;
};

const position = (el: HTMLElement) => {
  return el?.scrollTop || 0;
};
export function useScrollTo({ el, to, duration = 500, callback }: ScrollToParams) {
  const isActiveRef = ref(false);
  duration = isUnDef(duration) ? 500 : duration;
  let start = position(el.value);
  let change = to - start;
  let increment = 20;
  let currentTime = 0;
  let isLock = false;

  const animateScroll = function () {
    if (!unref(isActiveRef)) {
      return;
    }
    currentTime += increment;
    const val = easeInOutQuad(currentTime, start, change, duration);
    move(el.value, val);
    if (currentTime < duration && unref(isActiveRef)) {
      requestAnimationFrame(animateScroll);
    } else {
      isLock = false;
      if (callback && isFunction(callback)) {
        callback();
      }
    }
  };

  const run = () => {
    if (isLock) return;
    isLock = true;
    isActiveRef.value = true;
    start = position(el.value);
    change = to - start;
    increment = 20;
    currentTime = 0;
    animateScroll();
  };

  const stop = () => {
    isActiveRef.value = false;
    isLock = false;
  };

  return { start: run, stop };
}
