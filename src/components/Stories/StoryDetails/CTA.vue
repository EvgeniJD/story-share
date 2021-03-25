<template>
  <article class="story-details-cta" >

    <div class="story-details-cta-container"  v-if="isInitiator">
      <router-link :to="`/stories/edit/${this.$route.params.id}`">
        <el-button>Edit</el-button>
      </router-link>
      <el-button type="danger" @click="handleInitiatorDelete">Delete</el-button>
    </div>

    <div class="story-details-cta-container" v-if="!isLiked && !isInitiator" >
      <el-button type="success" @click="onLike"
        ><i class="fas fa-thumbs-up"></i
      ></el-button>
    </div>

    <div class="story-details-cta-container" v-if="isLiked && !isInitiator" >
      <el-button type="danger" @click="onUnlike"
        ><i class="fas fa-thumbs-down"></i
      ></el-button>
    </div>

    </article>
</template>

<script>
export default {
  props: {
    isInitiator: Boolean,
    isLiked: Boolean
  },
  methods: {
    handleInitiatorDelete() {
      this.$emit('handleInitiatorDelete');
    },
    onLike() {
      this.$emit('onLike');
    },
    onUnlike() {
      this.$emit('onUnlike');
    }
  }
}
</script>

<style>

</style>