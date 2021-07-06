<template>
<router-link  to="/">
  <img
    class="block rounded-xl object-cover object-center shadow-xl  lg:hidden h-28 w-28 m-2"
    src="/images/logo.png"
    alt="Oonavi"
  />
</router-link>
<router-link  to="/">
  <img
    class="hidden rounded object-cover object-center lg:block h-36 w-32 "
    src="/images/logo.png"
    alt="Oonavi"
  />
  </router-link>
</template>
<script>
export default {
  name: "logo-menu",
};
</script>

<style></style>
