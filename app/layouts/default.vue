<template>
  <div>
    <header role="banner">
      <div class="top-bar">
        <div class="container">
          <div class="row">
            <div class="col-9 social">
              <a href="/"><span class="fa fa-twitter"></span></a>
              <a href="/"><span class="fa fa-facebook"></span></a>
              <a href="/"><span class="fa fa-instagram"></span></a>
              <a href="/"><span class="fa fa-youtube-play"></span></a>
              <a href="/"><span class="fa fa-vimeo"></span></a>
              <a href="/"><span class="fa fa-snapchat"></span></a>
            </div>
            <div class="col-3 search-top">
              <!-- <a href="#"><span class="fa fa-search"></span></a> -->
              <form action="#" class="search-top-form">
                <span class="icon fa fa-search"></span>
                <input
                  id="s"
                  class="tanha"
                  type="text"
                  placeholder="جستجو ..."
                />
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="container logo-wrap">
        <div class="row pt-5">
          <div class="col-12 text-center">
            <a
              class="absolute-toggle d-block d-md-none"
              data-toggle="collapse"
              href="#navbarMenu"
              role="button"
              aria-expanded="false"
              aria-controls="navbarMenu"
              ><span class="burger-lines"></span
            ></a>
            <nuxt-link to="/">
              <h1 dir="ltr" class="site-logo">
                <img
                  width="60"
                  height="60"
                  src="/logo.png"
                  alt="Open Scrips"
                />pen scripts
              </h1>
            </nuxt-link>
          </div>
        </div>
      </div>

      <div class="navbar navbar-expand-md  navbar-light bg-light">
        <div class="container">
          <div id="navbarMenu" class="collapse navbar-collapse">
            <ul class="navbar-nav mx-auto">
              <li class="nav-item">
                <nuxt-link to="/">
                  <a class="nav-link">خانه</a>
                </nuxt-link>
              </li>
              <li class="nav-item dropdown">
                <a
                  id="dropdown04"
                  class="nav-link dropdown-toggle"
                  href="category.html"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  >آموزش ها</a
                >
                <div class="dropdown-menu" aria-labelledby="dropdown04">
                  <a class="dropdown-item" href="category.html">Asia</a>
                  <a class="dropdown-item" href="category.html">Europe</a>
                  <a class="dropdown-item" href="category.html">Dubai</a>
                  <a class="dropdown-item" href="category.html">Africa</a>
                  <a class="dropdown-item" href="category.html"
                    >South America</a
                  >
                </div>
              </li>

              <li class="nav-item dropdown">
                <a
                  id="dropdown05"
                  class="nav-link dropdown-toggle"
                  href="category.html"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  >دسته بندی ها</a
                >
                <div class="dropdown-menu" aria-labelledby="dropdown05">
                  <a class="dropdown-item" href="category.html">Lifestyle</a>
                  <a class="dropdown-item" href="category.html">Food</a>
                  <a class="dropdown-item" href="category.html">Adventure</a>
                  <a class="dropdown-item" href="category.html">Travel</a>
                  <a class="dropdown-item" href="category.html">Business</a>
                </div>
              </li>

              <li class="nav-item">
                <a class="nav-link active" href="about.html">درباره ما</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="contact.html">تماس با ما</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>

    <section class="site-section py-sm">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <b-breadcrumb class="mb-4 mt-2" :items="items"></b-breadcrumb>
          </div>
        </div>
        <div class="row blog-entries">
          <nuxt />
          <!-- END main-content -->

          <div class="col-md-12 col-lg-4 sidebar">
            <div class="sidebar-box search-form-wrap">
              <form action="#" class="search-form">
                <div class="form-group">
                  <span class="icon fa fa-search"></span>
                  <input
                    id="s"
                    type="text"
                    class="form-control"
                    placeholder="Type a keyword and hit enter"
                  />
                </div>
              </form>
            </div>
            <!-- END sidebar-box -->
            <!-- <div class="sidebar-box">
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
                    Exercitationem facilis sunt repellendus excepturi beatae
                    porro debitis voluptate nulla quo veniam fuga sit molestias
                    minus.
                  </p>
                  <p>
                    <a href="#" class="btn btn-primary btn-sm">Read my bio</a>
                  </p>
                  <p class="social">
                    <a href="#" class="p-2"
                      ><span class="fa fa-facebook"></span
                    ></a>
                    <a href="#" class="p-2"
                      ><span class="fa fa-twitter"></span
                    ></a>
                    <a href="#" class="p-2"
                      ><span class="fa fa-instagram"></span
                    ></a>
                    <a href="#" class="p-2"
                      ><span class="fa fa-youtube-play"></span
                    ></a>
                  </p>
                </div>
              </div>
            </div> -->
            <!-- END sidebar-box -->
            <div class="sidebar-box">
              <h3 class="heading">Popular Posts</h3>
              <div class="post-entry-sidebar">
                <ul>
                  <li>
                    <a href="">
                      <img
                        src="/images/img_2.jpg"
                        alt="Image placeholder"
                        class="mr-4"
                      />
                      <div class="text">
                        <h4>
                          There’s a Cool New Way for Men to Wear Socks and
                          Sandals
                        </h4>
                        <div class="post-meta">
                          <span class="mr-2">March 15, 2018 </span> &bull;
                          <span class="ml-2"
                            ><span class="fa fa-comments"></span> 3</span
                          >
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <img
                        src="/images/img_4.jpg"
                        alt="Image placeholder"
                        class="mr-4"
                      />
                      <div class="text">
                        <h4>
                          There’s a Cool New Way for Men to Wear Socks and
                          Sandals
                        </h4>
                        <div class="post-meta">
                          <span class="mr-2">March 15, 2018 </span> &bull;
                          <span class="ml-2"
                            ><span class="fa fa-comments"></span> 3</span
                          >
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
                          There’s a Cool New Way for Men to Wear Socks and
                          Sandals
                        </h4>
                        <div class="post-meta">
                          <span class="mr-2">March 15, 2018 </span> &bull;
                          <span class="ml-2"
                            ><span class="fa fa-comments"></span> 3</span
                          >
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
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
          </div>
          <!-- END sidebar -->
        </div>
      </div>
    </section>

    <footer class="site-footer">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md-4">
            <h3>Paragraph</h3>
            <p>
              <img
                src="/images/img_1.jpg"
                alt="Image placeholder"
                class="img-fluid"
              />
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi,
              accusantium optio unde perferendis eum illum voluptatibus dolore
              tempora, consequatur minus asperiores temporibus reprehenderit.
            </p>
          </div>
          <div class="col-md-6 ml-auto">
            <div class="row">
              <div class="col-md-7">
                <h3>Latest Post</h3>
                <div class="post-entry-sidebar">
                  <ul>
                    <li>
                      <a href="">
                        <img
                          src="/images/img_6.jpg"
                          alt="Image placeholder"
                          class="mr-4"
                        />
                        <div class="text">
                          <h4>
                            There’s a Cool New Way for Men to Wear Socks and
                            Sandals
                          </h4>
                          <div class="post-meta">
                            <span class="mr-2">March 15, 2018 </span> &bull;
                            <span class="ml-2"
                              ><span class="fa fa-comments"></span> 3</span
                            >
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <img
                          src="/images/img_3.jpg"
                          alt="Image placeholder"
                          class="mr-4"
                        />
                        <div class="text">
                          <h4>
                            There’s a Cool New Way for Men to Wear Socks and
                            Sandals
                          </h4>
                          <div class="post-meta">
                            <span class="mr-2">March 15, 2018 </span> &bull;
                            <span class="ml-2"
                              ><span class="fa fa-comments"></span> 3</span
                            >
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <img
                          src="/images/img_4.jpg"
                          alt="Image placeholder"
                          class="mr-4"
                        />
                        <div class="text">
                          <h4>
                            There’s a Cool New Way for Men to Wear Socks and
                            Sandals
                          </h4>
                          <div class="post-meta">
                            <span class="mr-2">March 15, 2018 </span> &bull;
                            <span class="ml-2"
                              ><span class="fa fa-comments"></span> 3</span
                            >
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-1"></div>

              <div class="col-md-4">
                <div class="mb-5">
                  <h3>Quick Links</h3>
                  <ul class="list-unstyled">
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Travel</a></li>
                    <li><a href="#">Adventure</a></li>
                    <li><a href="#">Courses</a></li>
                    <li><a href="#">Categories</a></li>
                  </ul>
                </div>

                <div class="mb-5">
                  <h3>Social</h3>
                  <ul class="list-unstyled footer-social">
                    <li>
                      <a href="#"
                        ><span class="fa fa-twitter"></span> Twitter</a
                      >
                    </li>
                    <li>
                      <a href="#"
                        ><span class="fa fa-facebook"></span> Facebook</a
                      >
                    </li>
                    <li>
                      <a href="#"
                        ><span class="fa fa-instagram"></span> Instagram</a
                      >
                    </li>
                    <li>
                      <a href="#"><span class="fa fa-vimeo"></span> Vimeo</a>
                    </li>
                    <li>
                      <a href="#"
                        ><span class="fa fa-youtube-play"></span> Youtube</a
                      >
                    </li>
                    <li>
                      <a href="#"
                        ><span class="fa fa-snapchat"></span> Snapshot</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row" dir="ltr">
          <div class="col-md-12">
            <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
            Copyright &copy;{{ years }} All rights reserved | This website is
            made with <i class="fa fa-heart-o" aria-hidden="true"></i> by
            <a href="https://github.com/miladbonakdar/milawd" target="_blank"
              >Milad Bonakdar</a
            >
            <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          text: 'خانه',
          href: '#'
        },
        {
          text: 'جاوااسکریدت',
          href: '#'
        },
        {
          text: 'آموزش جاوااسکریدت',
          href: '#'
        },
        {
          text: 'چگونه می شه اینجوری میشه؟',
          active: true
        }
      ],
      years: '2019 - ' + new Date().getFullYear()
    }
  }
}
</script>
<style></style>
