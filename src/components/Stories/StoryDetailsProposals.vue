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
            <!-- <article class="proposials-table-not-user-cta" v-if="!isAuthor">
              <el-button type="success" size="mini" v-if="!isLiked">
                Like
              </el-button>
              <el-button type="danger" size="mini" v-else> Unlike </el-button>
            </article> -->

            <!-- <article class="proposials-table-user-cta" v-if="isAuthor">
              <el-button
                size="mini"
                @click="handleEdit(props.$index, props.row)"
                >Edit</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(props.$index, props.row)"
                >Delete</el-button
              >
            </article> -->

            <article class="proposials-table-initiator-cta" v-if="isInitiator">
              <el-button
                size="mini"
                type="success"
                @click="handlemergeProposal(props.row)"
                >Merge</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDeleteProposal(props.row)"
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
import { updateStory, removeProposalFromStory, addContributer, getStory } from "../../services/story";
import { removeProposalFromUser, getUserData } from '../../services/user';

export default {
  props: {
    story: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isAuthor: false,
      isLiked: false,
    };
  },
  computed: {
      isInitiator() {
          const user = this.$store.getters.getUser;
          return user.uid === this.story.initiator.uid;
      },
  },
  methods: {
    handleEdit(index, row) {
      console.log("INDEX", index);
      console.log("ROW", row);
    },
    handleDelete(index, row) {
      console.log("INDEX", index);
      console.log("ROW", row);
    },
    async handlemergeProposal(row) {
      const storyID = this.$route.params.id;
      const user = this.$store.getters.getUser;
      const proposal = { ...row };
      const dataToUpdate = { content: this.story.content + proposal.content };

      try {
        await updateStory(storyID, dataToUpdate);
        await removeProposalFromStory(storyID, proposal);
        await removeProposalFromUser(user.uid, proposal);
        await addContributer(storyID, proposal.authorEmail)
        const updatedStory = await getStory(storyID);
        const udpadedUserData = await getUserData(user.uid);
        this.$emit('mergeProposal', updatedStory, udpadedUserData);
      } catch (e) {
        console.log(e);
        alert(e.message);
      }
    },
    async handleDeleteProposal(row) {
      const storyID = this.$route.params.id;
      const user = this.$store.getters.getUser;
      const proposal = { ...row };

      try {
        await removeProposalFromStory(storyID, proposal);
        await removeProposalFromUser(user.uid, proposal);
        const updatedStory = await getStory(storyID);
        const udpadedUserData = await getUserData(user.uid);
        this.$emit('handleDeleteProposal', updatedStory, udpadedUserData);
      } catch (e) {
        console.log(e);
        alert(e.message);
      }
    },
  },
};
</script>

<style>
</style>