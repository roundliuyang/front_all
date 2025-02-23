<script setup>
// defineProps 是 Vue 3 提供的一个 API，用来声明组件的 props。通过 defineProps 可以在组件中声明它接受的外部属性（props），并且可以设置类型、默认值等。
defineProps({
  goods: {
    // 这行代码指定了 goods 属性的数据类型是 Object。这意味着传递给 goods 的值应该是一个对象
    tppe: Object,
    // default 是 props 的默认值设置。
    // () => {} 表示如果父组件没有传递 goods 属性，那么 goods 默认值将是一个空对象 {}
    // 这里使用了一个箭头函数，确保返回一个空对象。
    default: () => { }
  }
})
</script>


<template>
  <RouterLink to="/" class="goods-item">
    <img v-img-lazy="goods.picture" alt="" />
    <p class="name ellipsis">{{ goods.name }}</p>
    <p class="desc ellipsis">{{ goods.desc }}</p>
    <p class="price">&yen;{{ goods.price }}</p>
  </RouterLink>
</template>

<style lang="scss" scoped>
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  transition: all .5s;

  &:hover {
    transform: translate3d(0, -3px, 0);
    box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
  }

  img {
    width: 160px;
    height: 160px;
  }

  p {
    padding-top: 10px;
  }

  .name {
    font-size: 16px;
  }

  .desc {
    color: #999;
    height: 29px;
  }

  .price {
    color: $priceColor;
    font-size: 20px;
  }
}
</style>