<template>
  <article class="profile-img-name">
    <img :src="formData.imageURL || userImage" alt="" />
    <h4>{{ formData.username || userUsername }}</h4>

    <article class="profile-img-name-inputs" v-if="isInUpdateUserMode">
      <form>
        <label for="username">
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
    <el-button
      v-if="isInUpdateUserMode"
      type="danger"
      class="image-username-cancel-btn"
      @click="cancelUpdateUserMode"
      >CANCEL</el-button
    >
    <el-button
      v-if="isInUpdateUserMode"
      type="success"
      class="image-username-add-btn"
      @click="addNameAndImage"
      :disabled="this.$v.formData.$invalid"
      >ADD</el-button
    >
    <el-button
      v-else
      type="success"
      class="image-username-add-btn"
      @click="toUpdateUserMode"
      >Update Profile info</el-button
    >
  </article>
</template>

<script>
import { required, minLength, maxLength, url } from "vuelidate/lib/validators";

export default {
  props: {
    userImage: String,
    userEmail: String,
    userUsername: String,
  },
  data() {
    return {
      formData: {
        username: "",
        imageURL: "",
      },
      isInUpdateUserMode: false,
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
  methods: {
    toUpdateUserMode() {
      this.isInUpdateUserMode = true;
    },
    cancelUpdateUserMode() {
      this.isInUpdateUserMode = false;
    },
    addNameAndImage() {
      this.$emit('addNameAndImage', this.formData);
      this.isInUpdateUserMode = false;
    }
  }
};
</script>

<style>
</style>