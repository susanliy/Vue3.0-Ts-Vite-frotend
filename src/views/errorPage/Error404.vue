<template>
  <div class="wrap">
    <div class="conten">
      <img class="errImg" src="@/assets/images/img_404.png" alt="" />
      <div class="textBox">
        <p class="p1">抱歉，没有找到页面</p>
        <p>您可以尝试以下操作： </p>
        <p>1、您的访问超时，请<router-link to="/home">返回首页</router-link> ，重新操作</p>
        <p>2、您访问的链接不存在，请<a @click="goBack">返回上一页</a></p>
        <!-- <p>3、您可以 <router-link to="index">尝试刷新</router-link> </p> -->
      </div>
    </div>
  </div>
</template>
<script setup>
  import { useRouter } from 'vue-router';

  const $router = useRouter();
  const goBack = () => {
    $router.back();
  };
</script>
<style lang="scss" scoped>
  .wrap {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }
  .conten {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    margin: 20px auto;
    width: 1200px;
    height: 500px;
    background: #ffffff;
    .errImg {
      display: block;
      width: 300px;
      height: 300px;
      margin-right: 80px;
    }
  }
  .textBox {
    p {
      font-size: 14px;
      font-weight: 400;
      color: #666666;
    }
    .p1 {
      font-weight: 400;
      color: $title-color;
      font-size: 24px;
      margin-bottom: 30px;
    }
  }
</style>
