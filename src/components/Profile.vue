<template>
  <section class="profile">
    <article class="profile-img-name">
      <img
        :src="formData.imageURL"
        alt=""
      />
      <h4>{{ formData.username }}</h4>
      <article class="profile-img-name-inputs" v-if="true">
        <form>
          <label for="username" v-if="true">
            Username:
            <input
              type="text"
              v-model="$v.formData.username.$model"
              name="username"
              :class="{ error: this.$v.formData.username.$error }"
            />
          </label>

          <div class="err-msg-wrapper" v-if="this.$v.formData.username.$error">
            <i class="fas fa-exclamation-triangle"></i>
            <p
              class="err-msg err-mini"
              v-if="!this.$v.formData.username.required"
            >
              Username is required!
            </p>
            <p
              class="err-msg err-mini"
              v-if="!this.$v.formData.username.minLength"
            >
              Username should contain at least
              {{ this.$v.formData.username.$params.minLength.min }} symbols!
            </p>
            <p
              class="err-msg err-mini"
              v-if="!this.$v.formData.username.maxLength"
            >
              Username should contain maximum
              {{ this.$v.formData.username.$params.maxLength.max }} symbols!
            </p>
          </div>

          <label for="image-url">
            Image URL:
            <input
              type="text"
              v-model="$v.formData.imageURL.$model"
              name="image-url"
              :class="{ error: this.$v.formData.imageURL.$error }"
            />
          </label>

          <div class="err-msg-wrapper" v-if="this.$v.formData.imageURL.$error">
            <i class="fas fa-exclamation-triangle"></i>
            <p
              class="err-msg err-mini"
              v-if="!this.$v.formData.imageURL.required"
            >
              ImageURL is required!
            </p>
            <p class="err-msg err-mini" v-if="!this.$v.formData.imageURL.url">
              Username should be a valid URL!
            </p>
          </div>
        </form>
      </article>
      <p>isaax0866@abv.bg</p>
          <el-button type="success" class="image-username-add-btn">ADD</el-button>
    </article>
    <article class="profile-stories">
      <h2>My stories</h2>
      <el-carousel :interval="4000" height="300px" indicator-position="outside">
        <el-carousel-item v-for="(story, i) in myStories" :key="i">
          <img :src="story.image" alt="" class="carousel-image" />
        </el-carousel-item>
      </el-carousel>
    </article>

    <article class="profile-inspirations">
      <h2>My inspirations</h2>
      <el-carousel :interval="4000" height="300px" indicator-position="outside">
        <el-carousel-item v-for="(img, i) in inspirations" :key="i">
          <img :src="img" alt="" class="carousel-image" />
        </el-carousel-item>
      </el-carousel>
    </article>

    <article class="profile-purposes">
      <h2>My last suggestions</h2>
      <ul>
        <li v-for="(purpose, i) in myPurposes" :key="i">
          <a href="">
            <article class="profile-purposes-item">
              <img :src="purpose.storyImage" alt="" />
              <p>{{ purpose.storyTitle }}</p>
            </article>
          </a>
        </li>
      </ul>
    </article>
  </section>
</template>

<script>
import { required, minLength, maxLength, url } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      inspirations: [
        "https://images.penguinrandomhouse.com/cover/9780553288100",
        "https://images.penguinrandomhouse.com/cover/9780553299496",
        "https://d3525k1ryd2155.cloudfront.net/h/263/094/1112094263.0.x.jpg",
        "https://i2.wp.com/literariness.org/wp-content/uploads/2018/04/85cf7828a2f454a9dc0875f28b8e005e.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVtnRyu1LHAFt62zIi8O5_teStTT-7hyrFeA&usqp=CAU",
        "https://i1.wp.com/literariness.org/wp-content/uploads/2018/04/thestarslikedust.jpg",
        "https://images.penguinrandomhouse.com/cover/9780553288100",
        "https://images.penguinrandomhouse.com/cover/9780553299496",
        "https://d3525k1ryd2155.cloudfront.net/h/263/094/1112094263.0.x.jpg",
        "https://i2.wp.com/literariness.org/wp-content/uploads/2018/04/85cf7828a2f454a9dc0875f28b8e005e.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVtnRyu1LHAFt62zIi8O5_teStTT-7hyrFeA&usqp=CAU",
        "https://i1.wp.com/literariness.org/wp-content/uploads/2018/04/thestarslikedust.jpg",
      ],
      myStories: [
        {
          image:
            "https://assets-2.placeit.net/smart_templates/e639b9513adc63d37ee4f577433b787b/assets/wn5u193mcjesm2ycxacaltq8jdu68kmu.jpg",
          title: "Beautiful story",
          id: 1,
        },
        {
          image:
            "https://assets-2.placeit.net/smart_templates/e639b9513adc63d37ee4f577433b787b/assets/wn5u193mcjesm2ycxacaltq8jdu68kmu.jpg",
          title: "Beautiful story",
          id: 1,
        },
        {
          image:
            "https://assets-2.placeit.net/smart_templates/e639b9513adc63d37ee4f577433b787b/assets/wn5u193mcjesm2ycxacaltq8jdu68kmu.jpg",
          title: "Beautiful story",
          id: 1,
        },
        {
          image:
            "https://c1.staticsfly.com/asset/fetch/prec_you-can-be-anything-storybook_preview-01/style.preview/v2",
          title: "Beautiful story",
          id: 1,
        },
        {
          image:
            "https://c1.staticsfly.com/asset/fetch/prec_you-can-be-anything-storybook_preview-01/style.preview/v2",
          title: "Beautiful story",
          id: 1,
        },
        {
          image:
            "https://c1.staticsfly.com/asset/fetch/prec_you-can-be-anything-storybook_preview-01/style.preview/v2",
          title: "Beautiful story",
          id: 1,
        },
        {
          image:
            "https://c1.staticsfly.com/asset/fetch/prec_you-can-be-anything-storybook_preview-01/style.preview/v2",
          title: "Beautiful story",
          id: 1,
        },
        {
          image:
            "https://c1.staticsfly.com/asset/fetch/prec_you-can-be-anything-storybook_preview-01/style.preview/v2",
          title: "Beautiful story",
          id: 1,
        },
        {
          image:
            "https://c1.staticsfly.com/asset/fetch/prec_you-can-be-anything-storybook_preview-01/style.preview/v2",
          title: "Beautiful story",
          id: 1,
        },
        {
          image:
            "https://c1.staticsfly.com/asset/fetch/prec_you-can-be-anything-storybook_preview-01/style.preview/v2",
          title: "Beautiful story",
          id: 1,
        },
        {
          image:
            "https://c1.staticsfly.com/asset/fetch/prec_you-can-be-anything-storybook_preview-01/style.preview/v2",
          title: "Beautiful story",
          id: 1,
        },
        {
          image:
            "https://c1.staticsfly.com/asset/fetch/prec_you-can-be-anything-storybook_preview-01/style.preview/v2",
          title: "Beautiful story",
          id: 1,
        },
      ],
      myPurposes: [
        {
          storyTitle:
            "The red hornet maybe yellow.The red hornet maybe yellow.",
          storyImage:
            "https://assets-2.placeit.net/smart_templates/e639b9513adc63d37ee4f577433b787b/assets/wn5u193mcjesm2ycxacaltq8jdu68kmu.jpg",
        },
        {
          storyTitle: "The red hornet maybe yellow.",
          storyImage:
            "https://assets-2.placeit.net/smart_templates/e639b9513adc63d37ee4f577433b787b/assets/wn5u193mcjesm2ycxacaltq8jdu68kmu.jpg",
        },
        {
          storyTitle: "The red hornet maybe yellow.",
          storyImage:
            "https://assets-2.placeit.net/smart_templates/e639b9513adc63d37ee4f577433b787b/assets/wn5u193mcjesm2ycxacaltq8jdu68kmu.jpg",
        },
        {
          storyTitle: "The red hornet maybe yellow.",
          storyImage:
            "https://assets-2.placeit.net/smart_templates/e639b9513adc63d37ee4f577433b787b/assets/wn5u193mcjesm2ycxacaltq8jdu68kmu.jpg",
        },
        {
          storyTitle: "The red hornet maybe yellow.",
          storyImage:
            "https://assets-2.placeit.net/smart_templates/e639b9513adc63d37ee4f577433b787b/assets/wn5u193mcjesm2ycxacaltq8jdu68kmu.jpg",
        },
        {
          storyTitle: "The red hornet maybe yellow.",
          storyImage:
            "https://assets-2.placeit.net/smart_templates/e639b9513adc63d37ee4f577433b787b/assets/wn5u193mcjesm2ycxacaltq8jdu68kmu.jpg",
        },
        {
          storyTitle: "The red hornet maybe yellow.",
          storyImage:
            "https://assets-2.placeit.net/smart_templates/e639b9513adc63d37ee4f577433b787b/assets/wn5u193mcjesm2ycxacaltq8jdu68kmu.jpg",
        },
        {
          storyTitle: "The red hornet maybe yellow.",
          storyImage:
            "https://assets-2.placeit.net/smart_templates/e639b9513adc63d37ee4f577433b787b/assets/wn5u193mcjesm2ycxacaltq8jdu68kmu.jpg",
        },
      ],
      formData: {
        username: "",
        imageURL: "",
      },
    };
  },
  validations: {
    formData: {
      username: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(25),
      },
      imageURL: {
        required,
        url,
      },
    },
  },
};
</script>

<style>
</style>