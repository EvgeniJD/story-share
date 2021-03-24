<template>
  <article class="profile-proposals">
      <h2>My last proposals</h2>
      <ul>
        <li v-for="(proposal, i) in myProposals" :key="i">
          <a href="">
            <article class="profile-proposals-item">
              <img :src="proposal.storyImage" alt="" />
              <p>{{ proposal.storyTitle }}</p>
            </article>
          </a>
        </li>
      </ul>
    </article>
</template>

<script>
export default {
  props: {
    myProposals: Array
  }
}
</script>

<style>

</style>