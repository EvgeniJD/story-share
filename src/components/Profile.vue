<template>
  <section class="profile">
    <article class="profile-img-name">
      <img
        :src="formData.imageURL || userImage"
        alt=""
      />
      <h4>{{ formData.username || userUsername }}</h4>

      <article class="profile-img-name-inputs" v-if="isUpdateUserData">
        <form>
          <label for="username" >
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
      <p>{{ userEmail }}</p>
          <el-button v-if="isUpdateUserData" type="success" class="image-username-add-btn" @click="addNameAndImage">ADD</el-button>
          <el-button v-else type="success" class="image-username-add-btn" @click="toUpdateMode">Update Profile info</el-button>
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
import { updateUserInfo, getCurrentUser } from '../services/user.js';

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
      isUpdateUserData: false,
    };
  },
  methods: {
    async addNameAndImage() {
      let res = null;
      try {
        await updateUserInfo(this.formData.username, this.formData.imageURL);
        res = getCurrentUser();
        const currUser = {...res.providerData[0], uid: res.uid }
        this.$store.commit('setUser', currUser);
        this.isUpdateUserData = false;
      } catch (e) {
        console.log(e);
        alert(e.message);
      }
    },
    toUpdateMode() {
      this.isUpdateUserData = true;
    }
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
  computed: {
    user() {
      const user = this.$store.getters.getUser;
      console.log("FROM profile COMPUTED:", user);
      return user;
    },
    userUsername() {
      if(this.user) {
        return this.user.displayName;
      }
      return null;
    },
    userImage() {
      if(this.user) {
        return this.user.photoURL;
      }
      return null
    },
    userEmail() {
      if(this.user) {
        return this.user.email;
      }
      return null
    },
    isUserDONTHaveUsernameAndImage() {
      if(this.user) {
        return !this.user.displayName && !this.user.photoURL;
      }
      return false;
    }
  },
};
</script>

<style>
</style>