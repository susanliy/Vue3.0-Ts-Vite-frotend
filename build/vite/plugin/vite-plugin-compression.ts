import viteCompression from 'vite-plugin-compression';

export default function () {
  return viteCompression({
    // 是否在控制台输出压缩结果
    verbose: true,
    // 是否禁用
    disable: false,
    // 体积大于 threshold 才会被压缩,单位 b
    threshold: 10240,
    // 压缩算法
    algorithm: 'gzip',
    // 生成的压缩包后缀
    ext: '.gz',
    // 压缩后是否删除源文件
    deleteOriginFile: false,
  });
}
