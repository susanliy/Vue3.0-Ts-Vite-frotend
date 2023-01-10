import viteSvgIcons from 'vite-plugin-svg-icons';
import { resolve } from 'path';

const path = require('path');
export default function () {
  return viteSvgIcons({
    // Specify the icon folder to be cached
    iconDirs: [path.resolve(process.cwd(), 'src/icons', resolve('src/icons/svg'))],
    // Specify symbolId format
    symbolId: 'icon-[dir]-[name]',
  });
}
