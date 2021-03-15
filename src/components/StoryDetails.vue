<template>
  <article class="story-details">
    <article class="story-details-header">
      <h1>{{ story.title }}</h1>
      <article class="story-details-header-likes">
        <i class="fas fa-heart"></i>
        <p class="story-details-header-likes-count">{{ story.likes }}</p>
      </article>
      <p class="story-details-header-initiator">Initiator: {{ story.initiator }}</p>
    </article>

    <article class="story-details-content">
      <img :src="story.image" alt="" />
      <textarea name="" id="" cols="30" rows="10" readonly v-model="story.content">
      </textarea>
      
      <article class="story-details-contributers">
        <h3>Contributers</h3>
        <el-table :data="contributors" style="width: 100%" height="340">
          <el-table-column prop="name" label="Name" width="120">
          </el-table-column>
          <el-table-column
            prop="contributions"
            label="Contributions"
            width="120"
          >
          </el-table-column>
        </el-table>
      </article>
    </article>

    <article class="story-details-proposals">
        <h2>Proposals to review</h2>
      <el-table :data="proposals" style="width: 100%" max-height="400">
        <el-table-column label="Name" prop="owner" width="150"> </el-table-column>
       
        <el-table-column label="Likes">
            <template slot-scope="props">
                <div class="table-likes">
            <i class="fas fa-heart"></i>
            <p> {{ props.row.likes }} </p>
                </div>
            </template>
          </el-table-column>

           <el-table-column type="expand" label="Review Content" width="150">
          <template slot-scope="props">
            <textarea readonly v-model="props.row.content" class="proposials-table-textarea">
            </textarea>
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
          </template>
        </el-table-column>
      </el-table>
    </article>
  </article>
</template>

<script>
import {storiesCollection} from '../firebase';

export default {
  data() {
    return {
      story: {},
      contributors: [
        {
          name: "Ivan Georgiev Petrov",
          contributions: 3,
        },
        {
          name: "Peter",
          contributions: 2,
        },
        {
          name: "Stamat",
          contributions: 6,
        },
        {
          name: "Stefan",
          contributions: 7,
        },
        {
          name: "Mincho",
          contributions: 1,
        },
        {
          name: "George",
          contributions: 4,
        },
        {
          name: "Ivan",
          contributions: 3,
        },
        {
          name: "Peter",
          contributions: 2,
        },
        {
          name: "Stamat",
          contributions: 6,
        },
        {
          name: "Stefan",
          contributions: 7,
        },
        {
          name: "Mincho",
          contributions: 1,
        },
        {
          name: "George",
          contributions: 4,
        },
      ],
      proposals: [
        {
          owner: "Misho",
          content:
            "When the row content is too long and you do not want to display the horizontal scroll bar, you can use the expandable row feature.When the row content is too long and you do not want to display the horizontal scroll bar, you can use the expandable row feature.When the row content is too long and you do not want to display the horizontal scroll bar, you can use the expandable row feature.When the row content is too long and you do not want to display the horizontal scroll bar, you can use the expandable row feature.When the row content is too long and you do not want to display the horizontal scroll bar, you can use the expandable row feature.When the row content is too long and you do not want to display the horizontal scroll bar, you can use the expandable row feature.When the row content is too long and you do not want to display the horizontal scroll bar, you can use the expandable row feature.When the row content is too long and you do not want to display the horizontal scroll bar, you can use the expandable row feature.When the row content is too long and you do not want to display the horizontal scroll bar, you can use the expandable row feature.When the row content is too long and you do not want to display the horizontal scroll bar, you can use the expandable row feature.",
          likes: 1,
        },
        {
          owner: "Gena",
          content:
            "For table of numbers, you can add an extra row at the table footer displaying each column's sum.",
          likes: 2,
        },
        {
          owner: "Daniel",
          content: "Configuring rowspan and colspan allows you to merge cells",
          likes: 3,
        },
        {
          owner: "Simo",
          content:
            "key of row data, used for optimizing rendering. Required if reserve-selection is on or display tree data. When its type is String, multi-level access is supported, e.g. user.info.id, but user.info[0].id is not supported, in which case Function should be used.",
          likes: 4,
        },
        {
          owner: "Dimo",
          content:
            "Displayed text when data is empty. You can customize this area with slot",
          likes: 5,
        },
        {
          owner: "Misho",
          content:
            "When the row content is too long and you do not want to display the horizontal scroll bar, you can use the expandable row feature.",
          likes: 1,
        },
        {
          owner: "Gena",
          content:
            "For table of numbers, you can add an extra row at the table footer displaying each column's sum.",
          likes: 2,
        },
        {
          owner: "Daniel",
          content: "Configuring rowspan and colspan allows you to merge cells",
          likes: 3,
        },
      ],
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log("Index: ", index);
      console.log("Row: ", row);
    },
  },
  mounted() {
    const storyId = this.$route.params.id;
    storiesCollection.doc(storyId).get()
    .then((doc) => {
      this.story = doc.data();
    })
    .catch((e) => {
      console.log(e);
      alert(e.message);
    })
  }
};
</script>

<style>
</style>