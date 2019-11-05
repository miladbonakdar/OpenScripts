<template>
  <div>
    <h3 class="heading">{{ title }}</h3>
    <div class="post-entry-sidebar">
      <ul>
        <li>
          <a href="">
            <img src="/images/img_2.jpg" alt="Image placeholder" class="mr-4" />
            <div class="text">
              <h4>
                There’s a Cool New Way for Men to Wear Socks and Sandals
              </h4>
              <div class="post-meta">
                <span class="mr-2">March 15, 2018 </span> &bull;
                <span class="ml-2"><span class="fa fa-comments"></span> 3</span>
              </div>
            </div>
          </a>
        </li>
        <li>
          <a href="">
            <img src="/images/img_4.jpg" alt="Image placeholder" class="mr-4" />
            <div class="text">
              <h4>
                There’s a Cool New Way for Men to Wear Socks and Sandals
              </h4>
              <div class="post-meta">
                <span class="mr-2">March 15, 2018 </span> &bull;
                <span class="ml-2"><span class="fa fa-comments"></span> 3</span>
              </div>
            </div>
          </a>
        </li>
        <li>
          <a href="">
            <img
              src="/images/img_12.jpg"
              alt="Image placeholder"
              class="mr-4"
            />
            <div class="text">
              <h4>
                There’s a Cool New Way for Men to Wear Socks and Sandals
              </h4>
              <div class="post-meta">
                <span class="mr-2">March 15, 2018 </span> &bull;
                <span class="ml-2"><span class="fa fa-comments"></span> 3</span>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      required: true
    }
  }
}
</script>

<style></style>
