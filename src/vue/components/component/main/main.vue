<template>
  <div class="main" :style="style">
    <div
      class="nav"
      v-if="values.length"
    > <div
        v-for="(value, index) in values"
        :key="index"
        :class="getClass({ value, index })"
      ><div @click="(event) => page(event, { index, value })">{{ value.label }}</div>
       <div>
         <img :src="image.close.src" alt="" @click="(event) => close(event, { index, value })">
       </div>
      </div>
    </div>
    <div 
      class="page"
    > 
      <component
        v-for="(component, index) in components"
        :key="index"
        :label="component.label"
        :value="component.value"
        :shared="component.shared"
        :mode="'form'"
        :getter="() => {}"
        :is="component.name"
      />
      <!-- v-if="values.length" -->
      <!-- <component
        v-for="(value, index) in values"
        :key="index"
        :class="getClass({ value, index })"
        :is="value.name"
        v-show="openView({ value, index })"
      /> -->
    </div>
  </div>
</template>

<script src="./main.js"></script>
<style lang="css" scoped>
.main { } 
.main > .nav {
  background-color: var(--bg-ligth-color);
  width: 100%;
  height: 50px;
  display: flex;
  overflow-y: hidden;
} .main > .nav > div {
  min-width: 140px;
  display: flex;
  border-right: 1px solid #000;
  line-height: 50px;
} .main > .nav > div.selected {
  background-color: var(--bg-color);
} .main > .nav > div > div:nth-child(1) {
  width: calc(100% - 30px);
  padding: 0px 0px 0px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
} .main > .nav > div > div:nth-child(2) {
  width: 20px;
  padding: 0px;
} .main > .nav > div > div:nth-child(2) > img {
  cursor: pointer;
  width: 10px;
  filter: invert(100%) sepia(79%) saturate(276%) hue-rotate(86deg) brightness(118%) contrast(119%);
} .main > .nav > div > div:nth-child(2) > img:hover {
  filter: invert(100%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%);
} .main > .page {
  width: 100%;
  height: calc(100% - 50px);
  overflow: auto;
}
</style>