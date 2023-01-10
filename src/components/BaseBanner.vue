<template>
  <div class="base-banner-wrapper">
    <div v-if="showBannerArrow" class="swiper-arrow swiper-arrow__left" @click="handlePrevItem">
      <slot name="left-arrow">
        <span class="swiper-arrow__svg">
          <svg
            fill="currentColor"
            width="1em"
            height="1em"
            t="1642745535813"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1988"
          >
            <path d="M960 576H196.64L128 672h832z" p-id="1989" />
            <path d="M352 352L96 672h128l256-320z" p-id="1990" />
          </svg>
        </span>
      </slot>
    </div>
    <div v-if="showBannerArrow" class="swiper-arrow swiper-arrow__right" @click="handleNextItem">
      <slot name="right-arrow">
        <span class="swiper-arrow__svg">
          <svg
            fill="currentColor"
            width="1em"
            height="1em"
            t="1642744733341"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1722"
          >
            <path d="M64 576h763.36L896 672H64z" p-id="1723" />
            <path d="M672 352l256 320h-128l-256-320z" p-id="1724" />
          </svg>
        </span>
      </slot>
    </div>
    <swiper
      v-if="list.length > 0"
      :loop="showBannerArrow"
      :pagination="paginationParams"
      :autoplay="autoplayParams"
      @init="initSwiper"
    >
      <swiper-slide
        v-for="(item, index) in list"
        :key="item.code"
        @click="$emit('click', item, index)"
      >
        <slot name="slide" :item="item">
          <img class="slide-img" :src="item.fastdfs_url" />
        </slot>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
  import { reactive, computed, ref } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import SwiperCore, { Autoplay, Pagination } from 'swiper';
  import { AutoplayOptions, PaginationOptions } from 'swiper/types';
  import 'swiper/css';
  import 'swiper/css/pagination';
  SwiperCore.use([Autoplay, Pagination]);

  interface BaseBannerProps {
    list: any[];
    showArrow?: boolean;
    allowClick?: boolean;
    autoplay?: AutoplayOptions;
    pagination?: PaginationOptions;
  }
  const props = defineProps<BaseBannerProps>();

  defineEmits<{
    (e: 'click', item: any, index: number | string): void;
  }>();

  const showBannerArrow = computed(() => {
    return props.list?.length > 1 && props.showArrow;
  });

  const sellerListSwiperRef = ref<typeof Swiper | null>(null);

  const initSwiper = (swiperEl) => {
    sellerListSwiperRef.value = swiperEl;
  };

  const handlePrevItem = () => {
    sellerListSwiperRef.value?.slidePrev?.();
  };

  const handleNextItem = () => {
    sellerListSwiperRef.value?.slideNext?.();
  };

  const paginationParams = reactive({
    clickable: true,
    renderBullet: function (index, className) {
      return `<div class='${className}'><span class='swiper-text'>${props.list[index].title}</span><p class="progress widthTransition"></p></p></div>`;
    },
    ...props.pagination,
  });

  const autoplayParams = reactive({
    pauseOnMouseEnter: true,
    disableOnInteraction: false,
    delay: 2000,
    ...props.autoplay,
  });
</script>

<style scoped lang="scss">
  .base-banner-wrapper {
    position: relative;
    min-height: 500px;
    &:hover .swiper-arrow {
      opacity: 1;
    }
    .swiper-arrow {
      .swiper-arrow__svg {
        font-size: 26px;
        color: #fff;
        display: inline-block;
        font-style: normal;
        line-height: 0;
        text-align: center;
        text-transform: none;
        text-rendering: optimizeLegibility;
        svg {
          display: inline-block;
        }
        > * {
          line-height: 1;
        }
      }
      opacity: 0;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: #333333;
      width: 69px;
      height: 69px;
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      transition: all 0.6s ease 0s;
      cursor: pointer;
    }

    .swiper-arrow__left {
      left: 90px;
    }

    .swiper-arrow__right {
      right: 90px;
    }

    :deep(.swiper-pagination-bullet) {
      width: 150px;
      height: 4px;
      margin: 0 38px;
      background: rgba(255, 255, 255, 0);
      opacity: 1 !important;
      position: relative;
      .widthTransition {
        opacity: 1 !important;
        position: absolute;
        left: 0;
        top: 0;
        display: inline-block;
        border-radius: 3px;
        height: 4px;
        background: rgba(255, 255, 255, 0);
        width: 150px;
      }
      .swiper-text {
        white-space: pre;
        position: absolute;
        top: -40px;
        left: 0px;
        font-weight: 500;
        color: #4e5969;
        line-height: 32px;
        font-size: 24px;
        text-align: center;
        opacity: 1 !important;
      }
    }

    :deep(.swiper-pagination-bullet-active) {
      width: 150px;
      height: 4px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 3px;
      .widthTransition {
        position: absolute;
        left: 0;
        top: 0;
        display: inline-block;
        border-radius: 3px;
        height: 4px;
        background: #0453f3;
        width: 150px;
        animation: 3s widthAnima;
      }
      .swiper-text {
        white-space: pre;
        color: #0453f3;
      }
    }
    :deep(.swiper-wrapper) {
      padding-top: 45px;
    }
    :deep(.swiper-horizontal
        > .swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal) {
      bottom: 93% !important;
    }
  }
  .swiper-slide {
    .slide-img {
      cursor: pointer;
      width: 100%;
    }
  }

  @keyframes widthAnima {
    0% {
      width: 10px;
    }
    100% {
      width: 150px;
    }
  }
</style>
