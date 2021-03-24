<template>
  <article class="story-details-contributers">
    <h3>Contributors</h3>
    <el-table
      :data="contributors"
      style="width: 100%"
      height="340"
      id="contributors"
    >
      <el-table-column prop="email" label="Email" width="240">
      </el-table-column>
    </el-table>
  </article>
</template>

<script>
export default {
  props: {
    contributors: Array
  },
};
</script>

<style>
</style>