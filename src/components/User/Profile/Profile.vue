<template>
  <section class="profile">
    <ImageName
      :userEmail="userEmail"
      :userImage="userImage"
      :userUsername="userUsername"
      @addNameAndImage="addNameAndImage"
    />

    <Stories :myStories="myStories" />

    <Inspirations :myInspirations="myInspirations" />

    <Proposals :myProposals="myProposals" />
  </section>
</template>

<script>
import ImageName from "./ImageName.vue";
import Stories from './Stories.vue';
import Inspirations from './Inspirations.vue';
import Proposals from './Proposals.vue';

import { updateUserInfo, getCurrentAuthUser } from "../../../services/user.js";

export default {
  components: {
    ImageName,
    Stories,
    Inspirations,
    Proposals
  },
  data() {
    return {
      myInspirations: [
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
      myProposals: [
        {
          storyTitle: "Three little pigs",
          storyImage:
            "https://assets-2.placeit.net/smart_templates/e639b9513adc63d37ee4f577433b787b/assets/wn5u193mcjesm2ycxacaltq8jdu68kmu.jpg",
        },
        {
          storyTitle: "Three little pigs",
          storyImage:
            "https://assets-2.placeit.net/smart_templates/e639b9513adc63d37ee4f577433b787b/assets/wn5u193mcjesm2ycxacaltq8jdu68kmu.jpg",
        },
        {
          storyTitle: "Three little pigs",
          storyImage:
            "https://assets-2.placeit.net/smart_templates/e639b9513adc63d37ee4f577433b787b/assets/wn5u193mcjesm2ycxacaltq8jdu68kmu.jpg",
        },
        {
          storyTitle: "Three little pigs",
          storyImage:
            "https://assets-2.placeit.net/smart_templates/e639b9513adc63d37ee4f577433b787b/assets/wn5u193mcjesm2ycxacaltq8jdu68kmu.jpg",
        },
        {
          storyTitle: "Three little pigs",
          storyImage:
            "https://assets-2.placeit.net/smart_templates/e639b9513adc63d37ee4f577433b787b/assets/wn5u193mcjesm2ycxacaltq8jdu68kmu.jpg",
        },
        {
          storyTitle: "Three little pigs",
          storyImage:
            "https://assets-2.placeit.net/smart_templates/e639b9513adc63d37ee4f577433b787b/assets/wn5u193mcjesm2ycxacaltq8jdu68kmu.jpg",
        },
        {
          storyTitle: "Three little pigs",
          storyImage:
            "https://assets-2.placeit.net/smart_templates/e639b9513adc63d37ee4f577433b787b/assets/wn5u193mcjesm2ycxacaltq8jdu68kmu.jpg",
        },
        {
          storyTitle: "Three little pigs",
          storyImage:
            "https://assets-2.placeit.net/smart_templates/e639b9513adc63d37ee4f577433b787b/assets/wn5u193mcjesm2ycxacaltq8jdu68kmu.jpg",
        },
      ],
    };
  },
  methods: {
    async addNameAndImage({ username, imageURL }) {
      try {
        await updateUserInfo(username, imageURL);
        const user = getCurrentAuthUser();
        const currUser = { ...user.providerData[0], uid: user.uid };
        this.$store.commit("setUser", currUser);
      } catch (e) {
        console.log(e);
        alert(e.message);
      }
    },
   
  },

  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    userUsername() {
      if (this.user) {
        return this.user.displayName;
      }
      return "";
    },
    userImage() {
      if (this.user) {
        return this.user.photoURL;
      }
      return "";
    },
    userEmail() {
      if (this.user) {
        return this.user.email;
      }
      return "";
    },
  },
};
</script>

<style>
</style>