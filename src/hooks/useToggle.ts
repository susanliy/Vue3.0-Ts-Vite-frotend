import { ref } from 'vue';

export default function useToggle() {
  const targetValue = ref(false);

  const updateTargetValue = (newValue?: boolean) => {
    targetValue.value = newValue === undefined ? !targetValue.value : newValue;
  };

  return [targetValue, updateTargetValue];
}
