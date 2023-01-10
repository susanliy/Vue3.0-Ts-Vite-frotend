export default function useTryCatch<T>(
  promiseInstance: Promise<T>
): Promise<[T | undefined, Error | undefined]> {
  return new Promise((resolve) => {
    promiseInstance
      .then((res) => {
        resolve([res, undefined]);
      })
      .catch((err) => {
        resolve([undefined, err]);
      });
  });
}
