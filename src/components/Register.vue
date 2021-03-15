<template>
  <section class="login">
    <h1>Register</h1>
    <form action="" method="POST" @submit.prevent="register">
      <label for="email">
        Email
        <input
          type="email"
          v-model="$v.formData.email.$model"
          name="email"
          :class="{ error: this.$v.formData.email.$error }"
        />
      </label>

      <div class="err-msg-wrapper" v-if="this.$v.formData.email.$error">
        <i class="fas fa-exclamation-triangle"></i>
        <p class="err-msg" v-if="!this.$v.formData.email.required">
          Email is required!
        </p>
        <p class="err-msg" v-if="!this.$v.formData.email.email">
          Email is incorrect!
        </p>
      </div>

      <label for="password">
        Password
        <input
          type="password"
          v-model="$v.formData.password.$model"
          :class="{ error: this.$v.formData.password.$error }"
        />
      </label>

      <div class="err-msg-wrapper" v-if="this.$v.formData.password.$error">
        <i class="fas fa-exclamation-triangle"></i>
        <p class="err-msg" v-if="!this.$v.formData.password.required">
          Password is required!
        </p>
        <p class="err-msg" v-if="!this.$v.formData.password.alphaNum">
          Password should contain only letters and digits!
        </p>
        <p class="err-msg" v-if="!this.$v.formData.password.minLength">
          Password should contain at least
          {{ this.$v.formData.password.$params.minLength.min }} symbols!
        </p>
        <p class="err-msg" v-if="!this.$v.formData.password.maxLength">
          Password should contain maximum
          {{ this.$v.formData.password.$params.maxLength.max }} symbols!
        </p>
      </div>

      <label for="repeat-password">
        Repeat Password
        <input
          type="password"
          v-model="$v.formData.repeatPassword.$model"
          :class="{ error: this.$v.formData.repeatPassword.$error }"
        />
      </label>

      <div
        class="err-msg-wrapper"
        v-if="this.$v.formData.repeatPassword.$error"
      >
        <i class="fas fa-exclamation-triangle"></i>
        <p class="err-msg" v-if="!this.$v.formData.repeatPassword.sameAs">
          Passwords do not match!
        </p>
      </div>

      <button
        :disabled="this.$v.formData.$invalid"
        type="submit"
        :class="{ hover: !this.$v.formData.$invalid }"
      >
        Register
      </button>
    </form>
    <p class="login-question">
      You already have an account? Please,
      <router-link to="/user/login">Login</router-link>!
    </p>
  </section>
</template>

<script>
import firebase from "firebase";

import {
  required,
  email,
  alphaNum,
  minLength,
  maxLength,
  sameAs,
} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      formData: {
        email: "",
        password: "",
        repeatPassword: "",
      },
    };
  },
  validations: {
    formData: {
      email: {
        required,
        email,
      },
      password: {
        required,
        alphaNum,
        minLength: minLength(3),
        maxLength: maxLength(16),
      },
      repeatPassword: {
        sameAs: sameAs("password"),
      },
    },
  },
  methods: {
    register() {
      console.log("FormData: ", this.formData);
      console.log("Validations: ", this.$v.formData);

      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        )
        .then((user) => console.log(user))
        .catch((e) => {
          console.log("Oops: ", e);
          alert(e.message);
        });
    },
    switchMethod() {
      this.$emit("switchMethod", "Login");
    },
  },
};
</script>

<style>
</style>