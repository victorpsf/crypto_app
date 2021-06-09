<template>
  <div class="app">
    <menu-page v-on:selected="menuSelected" :props="propsMenu" />
    <main-page v-on:close="menuUnselected" v-on:focus="showFocus" :props="propsMain" />
  </div>
</template>

<script src="./App.js" lang="js"></script>

<style>
:root {
  --bg-color: #383838;
  --bg-ligth-color: #262626;
} html, body, #app {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
} #app {
  overflow: hidden;
  position: absolute;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
  background-color: var(--bg-color);
} .app {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
} *::-webkit-scrollbar-track {
} *::-webkit-scrollbar {
  width: 2px;
  height: 2px;
  background-color: #ffffff;
} *::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px #aaaaaa;
  background-color: #aaaaaa;
}
</style>
