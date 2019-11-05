<template
  ><div class="col-md-12 col-lg-4 sidebar">
    <div class="sidebar-box">
      <NanoPostViewer title="پست های برتر"></NanoPostViewer>
    </div>
    <!-- END sidebar-box -->

    <div class="sidebar-box">
      <h3 class="heading">Categories</h3>
      <ul class="categories">
        <li>
          <a href="#">Courses <span>(12)</span></a>
        </li>
        <li>
          <a href="#">News <span>(22)</span></a>
        </li>
        <li>
          <a href="#">Design <span>(37)</span></a>
        </li>
        <li>
          <a href="#">HTML <span>(42)</span></a>
        </li>
        <li>
          <a href="#">Web Development <span>(14)</span></a>
        </li>
      </ul>
    </div>
    <!-- END sidebar-box -->

    <div class="sidebar-box">
      <h3 class="heading">Tags</h3>
      <ul class="tags">
        <li><a href="#">Travel</a></li>
        <li><a href="#">Adventure</a></li>
        <li><a href="#">Food</a></li>
        <li><a href="#">Lifestyle</a></li>
        <li><a href="#">Business</a></li>
        <li><a href="#">Freelancing</a></li>
        <li><a href="#">Travel</a></li>
        <li><a href="#">Adventure</a></li>
        <li><a href="#">Food</a></li>
        <li><a href="#">Lifestyle</a></li>
        <li><a href="#">Business</a></li>
        <li><a href="#">Freelancing</a></li>
      </ul>
    </div>

    <div class="sidebar-box">
      <h3 class="heading">Courses</h3>
      <ul class="categories">
        <li>
          <a href="#">Courses <span>(12)</span></a>
        </li>
        <li>
          <a href="#">News <span>(22)</span></a>
        </li>
        <li>
          <a href="#">Design <span>(37)</span></a>
        </li>
        <li>
          <a href="#">HTML <span>(42)</span></a>
        </li>
        <li>
          <a href="#">Web Development <span>(14)</span></a>
        </li>
        <li>
          <a href="#">Design <span>(37)</span></a>
        </li>
        <li>
          <a href="#">HTML <span>(42)</span></a>
        </li>
        <li>
          <a href="#">Web Development <span>(14)</span></a>
        </li>
        <li>
          <a href="#">Design <span>(37)</span></a>
        </li>
        <li>
          <a href="#">HTML <span>(42)</span></a>
        </li>
        <li>
          <a href="#">Web Development <span>(14)</span></a>
        </li>
      </ul>
    </div>

    <!-- END sidebar-box -->
    <div class="sidebar-box mt-5">
      <div class="bio text-center">
        <img
          src="/images/person_1.jpg"
          alt="Image Placeholder"
          class="img-fluid"
        />
        <div class="bio-body">
          <h2>Meagan Smith</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Exercitationem facilis sunt repellendus excepturi beatae porro
            debitis voluptate nulla quo veniam fuga sit molestias minus.
          </p>
          <p>
            <a href="#" class="btn btn-primary btn-sm">Read my bio</a>
          </p>
          <p class="social">
            <a href="#" class="p-2"><span class="fa fa-facebook"></span></a>
            <a href="#" class="p-2"><span class="fa fa-twitter"></span></a>
            <a href="#" class="p-2"><span class="fa fa-instagram"></span></a>
            <a href="#" class="p-2"><span class="fa fa-youtube-play"></span></a>
          </p>
        </div>
      </div>
    </div>
    <!-- END sidebar-box -->
  </div>
</template>
<script>
import NanoPostViewer from './post/NanoPostViewer'
export default {
  components: { NanoPostViewer },
  data() {
    return {}
  }
}
</script>
<style></style>
