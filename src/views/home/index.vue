<template>
  <div class="home__container">
    <img :src="DefaultBanner" class="home-banner mb-114px" />

    <HomeHeader :title="'业务场景'" />
    <BusinessScene />

    <div ref="partOne" :class="{ 'before-scrolling': true, 'after-scrolling': partOneShow }">
      <HomeHeader
        :title="'设计器SDK'"
        :desc="'专业版设计器、简版设计器、自有设计器多个版本 免费对接'"
        :buttonText="'查看文档'"
        :url="'http://xiaoyaoji.cn/project/1jPL8Hr5Xf7/1maLWJa2GYq'"
      />
      <CustomSdk />
    </div>

    <div ref="partTwo" :class="{ 'before-scrolling': true, 'after-scrolling': partTwoShow }">
      <HomeHeader
        :title="'API开放能力'"
        :desc="'清晰的接口分类，让开发伙伴对于平台基础接口一目了然'"
        :buttonText="'查看文档'"
        :url="'http://xiaoyaoji.cn/project/1jPL8Hr5Xf7/1jUCjXS9TCC'"
      />
      <ApiOpenness />
    </div>

    <div ref="partThree" :class="{ 'before-scrolling': true, 'after-scrolling': partThreeShow }">
      <HomeHeader :title="'为什么选择指纹按需定制?'" class="mt-124px" />
      <WhyToChange />
    </div>

    <div
      ref="partFour"
      :class="{ 'before-scrolling': true, 'after-scrolling': partFourShow }"
      class="settled-platform"
    >
      <HomeHeader :title="'合作流程'" :desc="'简单四步，轻松入驻HICUSTOM开放平台'" />
      <SettledPlatform
    /></div>

    <div ref="partFive" :class="{ 'before-scrolling': true, 'after-scrolling': partFiveShow }">
      <HomeHeader :title="'常见问题'" class="mt-127px" />
      <QuestionAndAnswer
    /></div>
  </div>
</template>

<script setup lang="ts">
  import DefaultBanner from '@/assets/images/home/banner.png';
  import useKeepalive from '@/hooks/useKeepalive';
  import { ref } from 'vue';
  import useEventListener from '@/hooks/common/useEventListener';
  useKeepalive();

  /***** 滑动向上的动画---TODO优化 *****/
  const partOne = ref();
  const partTwo = ref();
  const partThree = ref();
  const partFour = ref();
  const partFive = ref();
  let partOneShow = ref(false);
  let partTwoShow = ref(false);
  let partThreeShow = ref(false);
  let partFourShow = ref(false);
  let partFiveShow = ref(false);

  const handleScroll = () => {
    let $app: any = document.querySelector('#app');
    const currentScroll = $app.scrollTop;

    //表示当前滚动的位置
    if (currentScroll >= partOne.value.offsetTop - 700) {
      partOneShow.value = true;
    }
    if (currentScroll >= partTwo.value.offsetTop - 700) {
      partTwoShow.value = true;
    }
    if (currentScroll >= partThree.value.offsetTop - 700) {
      partThreeShow.value = true;
    }
    if (currentScroll >= partFour.value.offsetTop - 700) {
      partFourShow.value = true;
    }
    if (currentScroll >= partFive.value.offsetTop - 700) {
      partFiveShow.value = true;
    }
  };

  useEventListener('scroll', handleScroll, window, true);
</script>

<style scoped lang="scss">
  .home-banner {
    height: 700px;
    width: 100%;
    border-bottom: 2px solid #fff;
  }
  .after-scrolling {
    transform: translateY(0%) !important; //滚动后的位置
    opacity: 1 !important; //滚动后显现
    transition: all 0.5s ease;
  }
  .before-scrolling {
    transform: translateY(10%); //滚动前的位置
    opacity: 0; //滚动前设置透明隐藏
  }
  .home__container {
    background-image: url('@/assets/images/home/body_ bg.png');
    background-repeat: no-repeat;
    background-attachment: fixed;
    position: relative;
    text-align: center;
    background-color: rgba(239, 245, 255, 1);
    overflow: hidden;
  }
  .settled-platform {
    margin: 0px 210px;
    padding: 50px 110px;
    background: #ffffff;
    box-shadow: 0px 69px 84px 0px rgba(0, 0, 0, 0.04);
    border-radius: 20px;
  }
</style>
