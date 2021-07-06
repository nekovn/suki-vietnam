<template>
  <div class="lg:inline-block xl:flex xl:justify-between lg:mt-1 mt-1 block sm:flex">
    <!-- google search box -->
    <google-search-box />
    <!-- site search box  -->
    <site-search-box />
  </div>
</template>
<script>
import GoogleSearchBox from "./GoogleSearchBox";
import SiteSearchBox from "./SiteSearchBox";
export default {
  name: "search-box",
  components: { GoogleSearchBox, SiteSearchBox },
};
</script>

<style></style>
