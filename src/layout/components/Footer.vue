<template>
  <div class="home_footer">
    <div class="w-rem home_footer_l">
      <div v-for="item in FOOTER_COLLAPSE_LIST" :key="item.key" class="home-footer-box">
        <h1>
          {{ item.name }}
        </h1>
        <a
          v-for="it in item.children"
          :key="it.key"
          class="home-footer-box-list"
          :href="(it.href  as string)"
        >
          {{ it.name }}
        </a>
      </div>
      <div class="home_footer_item phone">
        <h1>联系我们</h1>
        <p>
          <span class="desc1">全国统一服务热线</span>
          <span class="desc2">周一至周六 9:00-18:00</span>
        </p>
        <p>400-8899-560</p>
        <p>联系客服 service@hicustom.com</p>
      </div>
      <div class="home_footer_item concat">
        <div v-if="list?.img_url" class="concat_user">
          <div>
            <img :src="list?.img_url" alt="" />
          </div>
          <p class="tc" v-html="list?.title"></p>
        </div>
        <div class="concat_user">
          <div>
            <img src="@/assets/images/ooficial_account.png" alt="" />
          </div>
          <p class="tc">扫码关注公众号<br />了解最新资讯</p>
        </div>
      </div>
    </div>
    <div class="home_footer_bottom">
      <div class="w-rem wrap">
        <div class="wrap_l"
          >© 2013-2021 指纹科技 版权所有 | 增值业务许可证：闽B2-20191001 |
          <a
            class="zch"
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=35020302034658"
            target="_blank"
            >闽公网安备35020302034658号</a
          >
          |
          <a class="zch" href="https://beian.miit.gov.cn/#/Integrated/recordQuery" target="_blank"
            >闽ICP备15019889号-1</a
          >
        </div>
        <div class="wrap_r">
          <a target="_blank" href="http://www.cyberpolice.cn/wfjb/" class="wrap_r_item"></a>
          <a target="_blank" href="https://www.12377.cn/" class="wrap_r_item"></a>
          <a target="_blank" href="https://www.12377.cn/node_548446.htm" class="wrap_r_item"></a>
          <a
            target="_blank"
            href="http://www.shdf.gov.cn/shdf/channels/740.html"
            class="wrap_r_item"
          ></a>
          <a
            target="_blank"
            href="https://xmwj.scjg.xm.gov.cn:8081/ei/Ei!certificate.action?id=40288a327955d939017968fff5c20017"
            class="wrap_r_item"
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { FOOTER_COLLAPSE_LIST } from '../constants';
  interface ZWListProps {
    list: {
      img_url?: string;
      title?: string;
    };
  }
  defineProps<ZWListProps>();
</script>

<style scoped lang="scss">
  .home-footer-box {
    h1 {
      color: #fff;
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 20px;
    }
    .home-footer-box-list {
      @include flex(space-between, center);
      color: $desc-color;
      font-size: 12px;
      line-height: 24px;
      &:hover {
        color: #fff;
        text-decoration: underline;
      }
    }
  }
  .w-rem {
    height: 100%;
    width: 100%;
    padding: 0 202px;
  }
  .home_footer {
    width: 100%;
    height: 322px;
    background: #161931;
    display: flex;
    flex-direction: column;
  }

  .home_footer .home_footer_l {
    display: flex;
    justify-content: space-between;
    padding-top: 34px;
  }

  .home_footer .home_footer_l .home_footer_item {
    display: flex;
    flex-direction: column;
  }

  .home_footer .home_footer_l .home_footer_item.phone p:nth-child(2) .desc1 {
    font-size: 12px;
    font-weight: 300;
    color: #ffffff;
    line-height: 16px;
    margin-right: 20px;
  }

  .home_footer .home_footer_l .home_footer_item.phone p:nth-child(2) .desc2 {
    font-size: 12px;
    font-weight: 300;
    color: $desc-color;
    line-height: 16px;
  }
  .home_footer .home_footer_l .home_footer_item.phone p:nth-child(2) {
    font-size: 20px;
    margin-top: 8px;
    margin-bottom: 16px;
    font-weight: 400;
    color: #ffffff;
    line-height: 26px;
  }
  .home_footer .home_footer_l .home_footer_item.phone p:nth-child(3) {
    font-size: 20px;
    margin-top: 8px;
    margin-bottom: 16px;
    font-weight: 400;
    color: #ffffff;
    line-height: 26px;
  }

  .home_footer .home_footer_l .home_footer_item.phone p:nth-child(4) {
    font-size: 12px;
    font-weight: 300;
    color: #ffffff;
    line-height: 16px;
  }

  .home_footer .home_footer_l .home_footer_item .link_text {
    font-size: 12px;
    font-weight: 300;
    color: $desc-color;
    line-height: 24px;
  }

  .home_footer .home_footer_l .home_footer_item .icon_l {
    display: flex;
  }

  .home_footer .home_footer_l .home_footer_item .icon_l i {
    color: #fff;
    margin-right: 16px;
  }

  .home_footer .home_footer_l .home_footer_item .icon_l > .weixin {
    position: relative;
  }

  .home_footer .home_footer_l .home_footer_item .icon_l > .weixin > .qrcode_pop {
    position: absolute;
    display: none;
    width: 110px;
    height: 110px;
    padding: 7px;
    background: #fff;
    top: 128px;
    left: 50%;
    transform: translateX(-50%);
  }

  .home_footer .home_footer_l .home_footer_item .icon_l > .weixin:hover > .qrcode_pop {
    display: block;
  }

  .home_footer .home_footer_l .home_footer_item .icon_l > .weixin > .qrcode_pop::after {
    content: '';
    position: absolute;
    bottom: -7px;
    left: 50%;
    display: block;
    width: 0;
    height: 0;
    border-radius: 4px;
    border: 0.08rem solid transparent;
    border-right-color: #fff;
    border-bottom-color: #fff;
    transform: translateX(-50%) scaleX(0.8) rotate(45deg);
  }

  .home_footer .home_footer_l .home_footer_item .icon_l > .weixin > .qrcode_pop > img {
    width: 100%;
    height: 100%;
  }

  .home_footer .home_footer_l .home_footer_item .icon_l div:last-child i {
    margin-right: 0;
  }

  .home_footer .home_footer_l .home_footer_item .link_text:hover {
    color: #fff;
    text-decoration: underline;
  }

  .home_footer .home_footer_l .home_footer_item h1 {
    font-size: 14px;
    font-weight: 300;
    color: #ffffff;
    margin-bottom: 20px;
  }

  .home_footer .home_footer_l .home_footer_item h1 a {
    color: #ffffff;
  }

  .home_footer .home_footer_l .home_footer_item .customer {
    width: 152px;
    height: 40px;
    background: rgba(50, 51, 56, 0);
    border-radius: 0.05rem;
    border: 1px solid #666666;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #e4e4e4;
    font-size: 14px;
    margin-top: 50px;
    cursor: pointer;
  }

  .home_footer .home_footer_l .home_footer_item .customer i {
    font-size: 24px;
    margin-right: 8px;
  }

  .home_footer .home_footer_l .home_footer_item .customer:hover {
    background: #ffffff;
    color: #161931;
  }

  .home_footer_bottom {
    border-top: 1px solid #2d3045;
    height: 50px;
  }

  .home_footer_bottom .wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .home_footer_bottom .wrap .wrap_l {
    font-size: 12px;
    font-weight: 400;
    color: #ffffff;
    line-height: 20px;
  }

  .home_footer_bottom .wrap .wrap_l > a {
    color: #ffffff;
  }

  .home_footer_bottom .wrap .wrap_r {
    display: flex;
  }

  .home_footer_bottom .wrap .wrap_r .wrap_r_item {
    width: 100px;
    height: 34px;
    margin-right: 30px;
  }

  .home_footer_bottom .wrap .wrap_r .wrap_r_item:nth-child(1) {
    background: url('@/assets/images/img-network-security.png') no-repeat;
    background-size: 200px 170px;
    background-position: 0 0;
  }

  .home_footer_bottom .wrap .wrap_r .wrap_r_item:nth-child(2) {
    background: url('@/assets/images/img-network-security.png') no-repeat;
    background-size: 200px 170px;
    background-position: 0 -34px;
  }

  .home_footer_bottom .wrap .wrap_r .wrap_r_item:nth-child(3) {
    background: url('@/assets/images/img-network-security.png') no-repeat;
    background-size: 200px 170px;
    background-position: 0 -68px;
  }

  .home_footer_bottom .wrap .wrap_r .wrap_r_item:nth-child(4) {
    background: url('@/assets/images/img-network-security.png') no-repeat;
    background-size: 200px 170px;
    background-position: 0 -102px;
  }
  .home_footer_bottom .wrap .wrap_r .wrap_r_item:nth-child(5) {
    background: url('@/assets/images/img-network-security.png') no-repeat;
    background-size: 200px 170px;
    background-position: 0 -136px;
  }
  .home_footer_bottom .wrap .wrap_r .wrap_r_item:nth-child(1):hover {
    background: url('@/assets/images/img-network-security.png') no-repeat;
    background-size: 200px 170px;
    background-position: -100px 0;
  }

  .home_footer_bottom .wrap .wrap_r .wrap_r_item:nth-child(2):hover {
    background: url('@/assets/images/img-network-security.png') no-repeat;
    background-size: 200px 170px;
    background-position: -100px -34px;
  }

  .home_footer_bottom .wrap .wrap_r .wrap_r_item:nth-child(3):hover {
    background: url('@/assets/images/img-network-security.png') no-repeat;
    background-size: 200px 170px;
    background-position: -100px -68px;
  }

  .home_footer_bottom .wrap .wrap_r .wrap_r_item:nth-child(4):hover {
    background: url('@/assets/images/img-network-security.png') no-repeat;
    background-size: 200px 170px;
    background-position: -100px -102px;
  }
  .home_footer_bottom .wrap .wrap_r .wrap_r_item:nth-child(5):hover {
    background: url('@/assets/images/img-network-security.png') no-repeat;
    background-size: 200px 170px;
    background-position: -100px -136px;
  }
  .home_footer .home_footer_l .home_footer_item.concat {
    flex-basis: 240px;
    flex-direction: row;
  }
  .home_footer_item.concat > .concat_user > div {
    display: inline-block;
    width: 130px;
    height: 130px;

    box-sizing: border-box;
    background-color: #fff;
    font-size: 12px;
    padding: 6px;
  }
  .home_footer_item.concat > .concat_user {
    color: #fff;
    font-size: 12px;
    text-align: center;
    &:not(:last-of-type) {
      margin-right: 60px;
    }
  }
  .home_footer_item.concat > .concat_user .tc {
    margin-top: 8px;
    width: 146px;
    text-align: center;
  }
  .home_footer_item.concat > div img {
    display: block;
    width: 100%;
    margin: 0 auto;
  }
</style>
