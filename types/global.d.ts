import type { VNodeChild, PropType as VuePropType } from 'vue';

declare global {
  const __APP_INFO__: {
    pkg: {
      name: string;
      version: string;
      dependencies: Recordable<string>;
      devDependencies: Recordable<string>;
    };
    lastBuildTime: string;
  };
  // declare interface Window {
  //   // Global vue app instance
  //   __APP__: App<Element>;
  // }

  // vue
  declare type PropType<T> = VuePropType<T>;
  declare type VueNode = VNodeChild | JSX.Element;

  export type Writable<T> = {
    -readonly [P in keyof T]: T[P];
  };

  declare type Nullable<T> = T | null;
  declare type NonNullable<T> = T extends null | undefined ? never : T;
  declare type Recordable<T = any> = Record<string, T>;
  declare type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T;
  };
  declare type Indexable<T = any> = {
    [key: string]: T;
  };
  declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  };
  declare type TimeoutHandle = ReturnType<typeof setTimeout>;
  declare type IntervalHandle = ReturnType<typeof setInterval>;

  declare interface ChangeEvent extends Event {
    target: HTMLInputElement;
  }

  declare interface WheelEvent {
    path?: EventTarget[];
  }
  interface ImportMetaEnv extends ViteEnv {
    __: unknown;
  }

  declare interface ViteEnv {
    VITE_PORT: number;
    VITE_USE_MOCK: boolean;
    VITE_USE_PWA: boolean;
    VITE_PUBLIC_PATH: string;
    VITE_PROXY: [string, string][];
    VITE_GLOB_APP_TITLE: string;
    VITE_GLOB_APP_SHORT_NAME: string;
    VITE_USE_CDN: boolean;
    VITE_DROP_CONSOLE: boolean;
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
    VITE_LEGACY: boolean;
    VITE_USE_IMAGEMIN: boolean;
    VITE_GENERATE_UI: string;
    VITE_TOP_DOMAIN: string;
    VITE_BASE_URL: string;
  }

  declare interface PageData<T> {
    data: Array<T>;
    total: number;
  }
  declare function parseInt(s: string | number, radix?: number): number;

  declare function parseFloat(string: string | number): number;

  declare interface TableColumn {
    prop: string;
    label: string;
    customVal?: string;
    width?: number | string;
    minWidth?: number | string;
    fixed?: string | boolean;
    isCustom?: boolean;
    type?: string;
    sortable?: boolean | string;
    filters?: Array<any>;
    filterPlacement?: string;
    columnKey?: string;
    showOverflowTooltip?: boolean;
    align?: string;
  }
  declare type TableColumnConfig = Array<TableColumn>;

  declare interface Window {
    KF5SupportBoxAPI: {
      ready: any;
      removeButton: any;
      identify: any;
      open: any;
      config: any;
    } | null;
    ZW_KF5_API: {
      ready: any;
      removeButton: any;
      identify: any;
      open: any;
      config: any;
    } | null;
    rem: any;
    dpr: any;
  }
}
