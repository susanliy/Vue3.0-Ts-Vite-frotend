import { nextTick, onMounted, onUnmounted, ref, Ref } from 'vue';

export default function useEventListener(
  type: any,
  listener: (this: Window, ev: any) => any,
  target: Element | Window | string = window,
  options?: boolean | AddEventListenerOptions | undefined
) {
  const targetEl = ref(target) as Ref<Element | Window>;
  onMounted(() => {
    nextTick(() => {
      if (typeof target === 'string') {
        targetEl.value = document.querySelector(target) || window;
      }
      targetEl.value.addEventListener(type, listener, options);
    });
  });

  onUnmounted(() => {
    targetEl.value.removeEventListener(type, listener, options);
  });
}
