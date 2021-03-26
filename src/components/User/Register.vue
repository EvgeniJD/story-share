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

      <button type="submit" :class="{ hover: !this.$v.formData.$invalid }" :disabled="this.$v.formData.$invalid">
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
import { registerUser, setUserToDB, getUserData } from "../../services/user";

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
        minLength: minLength(6),
        maxLength: maxLength(16),
      },
      repeatPassword: {
        sameAs: sameAs("password"),
      },
    },
  },
  methods: {
    async register() {
      try {
        const authRes = await registerUser(this.formData.email, this.formData.password);

        const userCredentials = authRes.user;
        const currUser = {
          ...userCredentials.providerData[0],
          uid: userCredentials.uid,
        };

        this.$store.commit("setUser", currUser);

        const { uid } = currUser;

        const newUserToDB = {
          uid,
          proposals: [],
          stories: [],
          inspirations: [],
          storiesLiked: []
        };

        await setUserToDB(newUserToDB);
        const userData = await getUserData(uid);
        this.$store.commit("setUserData", userData);

        this.$notify({
          group: "auth",
          title: "Register",
          text: `You are successfully registered!`,
          type: "success",
        });

        this.$router.push({ name: "Stories" });
        
      } catch (e) {
        console.log('REGISTER ERROR: ', e);
        this.$notify({
          group: "auth",
          title: "Error",
          text: e.message,
          type: "error",
        });
      }
    },
  },
};
</script>

<style>
</style>