<template>
  <div class="menu">
    <div 
      class="content"
      :style="style"
    > <div
        v-show="show"
        v-for="(value, index) in values"
        :key="index"
        :class="getClass({ value, index })"
        @click="(event) => setMenu(event, { value, index })"
      >{{ value.label }}</div>
    </div>

    <div
      :class="border.cl"
      draggable="true"
      @dragstart="(event) => drag({ event, type: 'start' })"
      @drag="(event) => drag({ event, type: 'drag' })"
      @dragend="(event) => drag({ event, type: 'end' })"
    ></div>
  </div>
</template>

<script src="./menu.js" lang="js"></script>
<style lang="css" scoped>
.menu {
  height: 100%;
  display: flex;
  flex-direction: row;
  background-color: var(--bg-ligth-color);
} .menu > .content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-right: 1px solid var(--bg-ligth-color);
} .menu > .content > div {
  font-size: 15px;
  width: calc(100% - 10px);
  padding: 10px 5px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
} .menu > .content > div.selected {
  background-color: rgba(56,56,56, 0.4);
} .menu > .content > div:hover {
  background-color: rgba(56,56,56, 0.4);
} .menu > .border {
  width: 3px;

  height: 100%;
  cursor: w-resize;
} .menu > .border.hide {
  opacity: 0;
}
</style>
