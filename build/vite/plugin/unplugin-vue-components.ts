import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export default function () {
  return Components({
    resolvers: [AntDesignVueResolver()],
    dirs: ['src/components', 'src/**/components'],
    dts: 'types/components.d.ts',
  });
}
