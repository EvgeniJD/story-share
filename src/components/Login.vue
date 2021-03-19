<template>
  <section class="login">
    <h1>Login</h1>
    <form action="" method="POST" @submit.prevent="login">
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
      <button :disabled="this.$v.formData.$invalid" type="submit" :class="{hover: !this.$v.formData.$invalid}">
        Login
      </button>
    </form>
    <p class="login-question">
      You don't have an account? Please,
      <router-link to="/user/register">Register</router-link>!
    </p>
  </section>
</template>

<script>
import firebase from "firebase/app";
// import {usersCollection} from '../firebase';
import {
  required,
  email,
  alphaNum,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      formData: {
        email: "",
        password: "",
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
    },
  },
  methods: {
    login() {

      // usersCollection.get()
      // .then((querySnapshot) => {
      //   const documents = querySnapshot.docs.map((doc) => {
      //     return { id: doc.id, ...doc.data() };
      //   });

      //   console.log("LOG FROM GET STORIES: ", documents);
      // })
      // .catch((e) => {
      //   console.log(e);
      //   alert(e.message);
      // });

      
      // console.log("FormData: ", this.formData);
      // console.log("Validations: ", this.$v.formData);

      firebase
        .auth()
        .signInWithEmailAndPassword(this.formData.email, this.formData.password)
        .then((res) => {

          const currUser = {
            email: res.user.email,
            id: res.user.uid,
            username: res.user.displayName,
            avatar: res.user.photoURL
          };

          this.$store.commit('setUser', currUser);

          const newUser = this.$store.getters.getUser;
          console.log('From store function log: ', newUser.email);
          })
        .catch((e) => {
          console.log("Oops: ", e);
          alert(e.message);
        });
    },
    switchMethod() {
      this.$emit("switchMethod", "Register");
    },
  },
};
</script>

<style>
</style>