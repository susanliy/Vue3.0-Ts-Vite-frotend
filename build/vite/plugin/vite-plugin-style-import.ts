import styleImport from 'vite-plugin-style-import';

export default function () {
  return styleImport({
    // resolves: [AndDesignVueResolve()],
    // libs: [
    //   {
    //     libraryName: 'ant-design-vue',
    //     esModule: true,
    //     resolveStyle: (name) => {
    //       return `ant-design-vue/es/${name}/style/index`;
    //     },
    //   },
    // ],
  });
}
