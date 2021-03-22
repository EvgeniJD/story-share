<template>
  <article class="story-details-proposals" v-if="story.proposals">
      <article class="story-details-proposals-heading">
        <h2>Proposals</h2>
        <router-link :to="`/stories/add-proposal/${this.$route.params.id}`">
          <el-button type="success">+</el-button>
        </router-link>
      </article>
      <el-table
        :data="story.proposals"
        style="width: 100%"
        max-height="400"
        id="proposals"
      >
        <el-table-column label="Author email" prop="authorEmail" width="150">
        </el-table-column>

        <el-table-column label="Likes">
          <template slot-scope="props">
            <div class="table-likes">
              <i class="fas fa-heart"></i>
              <p>{{ props.row.likes }}</p>
            </div>
          </template>
        </el-table-column>

        <el-table-column type="expand" label="Review Content" width="150">
          <template slot-scope="props">
            <p v-html="props.row.content" class="proposials-table-textarea"></p>

            <article class="buttons-cta">
              <article class="proposials-table-not-user-cta" v-if="!isAuthor">
                <el-button type="success" size="mini" v-if="!isLiked">
                  Like
                </el-button>
                <el-button type="danger" size="mini" v-else> Unlike </el-button>
              </article>

              <article class="proposials-table-user-cta" v-if="isAuthor">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >Edit</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >Delete</el-button
                >
              </article>

              <article
                class="proposials-table-initiator-cta"
                v-if="isInitiator"
              >
                <el-button
                  size="mini"
                  type="success"
                  @click="handleMergeProposal(scope.$index, scope.row)"
                  >Merge</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDeleteProposal(scope.$index, scope.row)"
                  >Delete</el-button
                >
              </article>
            </article>
          </template>
        </el-table-column>
      </el-table>
    </article>
</template>

<script>
export default {

}
</script>

<style>

</style>