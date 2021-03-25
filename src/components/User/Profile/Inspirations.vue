<template>
  <article class="profile-inspirations">
    <article class="profile-data-heading">
      <h2>My inspirations</h2>

      <el-button
        type="success"
        size="mini"
        v-if="!isInUpdateInspirationMode"
        @click="onCreateInspiration"
      >
        +
      </el-button>

      <el-button
        type="danger"
        size="mini"
        v-if="isInUpdateInspirationMode"
        @click="onCancelCreateInspiration"
      >
        -
      </el-button>
    </article>

    <div
      class="profile-inspirations-input-wrapper"
      v-if="isInUpdateInspirationMode"
    >
      <article class="profile-inspirations-input">
        <label>
          Your Inspiration Image:
          <input
            type="text"
            :class="{ error: this.$v.inspirationURL.$error }"
            v-model="$v.inspirationURL.$model"
          />
        </label>
      </article>

      <div class="err-msg-wrapper" v-if="this.$v.inspirationURL.$error">
        <i class="fas fa-exclamation-triangle"></i>
        <p class="err-msg" v-if="!this.$v.inspirationURL.required">
          Inspiration image URL is required!
        </p>
        <p class="err-msg" v-if="!this.$v.inspirationURL.url">Invalid URL!</p>
      </div>
    </div>

    <el-button
      type="success"
      :disabled="this.$v.inspirationURL.$invalid"
      v-if="isInUpdateInspirationMode"
      class="profile-inspirations-add-btn"
      @click="onAddInspiration"
      >ADD
    </el-button>

    <el-carousel
      :interval="4000"
      height="300px"
      indicator-position="outside"
      v-if="!isInUpdateInspirationMode"
    >
      <el-carousel-item v-for="(img, i) in myInspirations" :key="i">
        <img :src="img" alt="" class="carousel-image" />
      </el-carousel-item>
    </el-carousel>
  </article>
</template>

<script>
import { required, url } from "vuelidate/lib/validators";

export default {
  props: {
    myInspirations: Array,
  },
  data() {
    return {
      isInUpdateInspirationMode: false,
      inspirationURL: "",
    };
  },
  validations: {
    inspirationURL: {
      required,
      url,
    },
  },
  methods: {
    onCreateInspiration() {
      this.isInUpdateInspirationMode = true;
    },
    onCancelCreateInspiration() {
      this.isInUpdateInspirationMode = false;
    },
    onAddInspiration() {
      const user = this.$store.getters.getUser;
      this.$emit('addInspiration', user.uid, this.inspirationURL);
      this.isInUpdateInspirationMode = false;
    }
  },
};
</script>

<style>
</style>