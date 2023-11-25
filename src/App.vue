<script setup lang="ts">
import { useLists } from '@/composables'

const {
  lists,
  active_list,
  getLists,
  toggleSelectionList,
  selectListItem,
  shuffleListItems,
  sortOrShuffle
} = useLists()

getLists()
</script>

<template>
  <section class="flex wrap justify-between">
    <article>
      <ul v-if="lists.length" class="lists">
        <li v-for="(list, i) in lists" :key="i" class="list">
          <div class="flex items-center">
            <button
              @click="active_list = active_list == i ? undefined : i"
            >
              <span
                class="arrow__right"
                :class="{ active: active_list == i }"
              ></span>
            </button>
            <span
              class="block rounded relative"
              :class="list.selected"
              @click="toggleSelectionList(i)"
            ></span>
            {{ list.title }}
          </div>
          <ul
            class="list__items"
            :style="{
              'max-height':
                active_list == i ? `${$el.scrollHeight}px` : '0px'
            }"
          >
            <li
              v-for="(item, j) in list.items"
              :key="j"
              class="flex justify-between item"
            >
              <aside class="flex items-center">
                <span
                  class="block rounded relative"
                  :class="{ selected: item.is_selected }"
                  @click="selectListItem(i, j)"
                ></span>
                {{ item.title }}
              </aside>
              <aside class="flex items-center">
                <input type="number" min="0" v-model="item.length" />
                <input type="color" v-model="item.color" />
              </aside>
            </li>
          </ul>
        </li>
      </ul>
      <template v-else>
        <center>No Data</center>
      </template>
    </article>
    <article>
      <div
        v-for="(list, l) in lists"
        :key="list.title"
        class="list__view"
      >
        <div
          class="flex justify-between items-center list__view--header"
        >
          <p>{{ list.title }}</p>
          <button
            v-if="list.selected != 'none'"
            class="list__event"
            @click="sortOrShuffle(l)"
          >
            {{ !list.is_sorted ? 'Sorted' : 'Shuffle' }}
          </button>
        </div>

        <div v-if="list.selected != 'none'" class="list__view--body">
          <br />
          <template v-if="list.is_sorted">
            <template
              v-for="(item, idx) in list.items"
              :key="`item_${idx}`"
            >
              <template v-if="item.is_selected && item.length">
                <span
                  v-for="b in item.length"
                  :key="b"
                  class="inline-block list__view--block"
                  :style="{ background: item.color }"
                ></span>
                <br />
              </template>
            </template>
          </template>

          <template v-else>
            <div v-html="shuffleListItems(list)"></div>
          </template>
        </div>
      </div>
    </article>
  </section>
</template>

<style scoped>
.not__all::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 5px;
  height: 5px;
  background: #000;
}

.active {
  transform: rotate(45deg) translate(-4px, -4px);
}

section {
  padding: 20px;
  gap: 20px;
}

article {
  flex: 1 1 450px;
  padding: 24px;
  border: 1px solid #000;
}

button {
  border: none;
  background: none;
  cursor: pointer;
}

input[type='number'] {
  border: none;
  width: 50px;
}

input[type='color'] {
  border: none;
  width: 20px;
  height: 20px;
  padding: 0;
  margin: 0 0 0 8px;
  cursor: pointer;
}

.lists {
  list-style: none;
}

.list {
  overflow: hidden;
}

.list__view {
  padding: 8px;
  border: 1px solid #000;
  margin-bottom: 16px;
}

.list__view--block {
  width: 14px;
  height: 14px;
  margin: 2px;
}

.list__event {
  border-radius: 8px;
  color: #fff;
  background: rgb(19, 170, 230);
  padding: 4px 12px;
}
</style>
