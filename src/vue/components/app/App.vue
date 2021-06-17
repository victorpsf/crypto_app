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

  --file-bg: #ecf0f1;
  --border-bg: #34495e;
  --app-border: 5px;
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

.arrow-up {
  width: 0;
  height: 0;
  border-style: solid;
  border-color: transparent transparent rgba(255,255,255,1) transparent;
} .arrow-up.b5 {
  border-width: 0 5px 5px 5px;
} .arrow-up.b10 {
  border-width: 0 10px 10px 10px;
} .arrow-up:hover {
  border-color: transparent transparent rgba(255,255,255,0.6) transparent;
} .arrow-left {
  width: 0;
  height: 0;
  border-style: solid;
  border-color: transparent rgba(255,255,255,1) transparent transparent;
  cursor: pointer;
} .arrow-left.b5 {
  border-width: 5px 5px 5px 0px;
} .arrow-left.b10 {
  border-width: 10px 10px 10px 0px;
} .arrow-left:hover {
  border-color: transparent rgba(255,255,255,0.6) transparent transparent;
} .arrow-right {
  width: 0;
  height: 0;
  border-style: solid;
  border-color: transparent transparent transparent rgba(255,255,255,1);
  cursor: pointer;
} .arrow-right.b5 {
  border-width: 5px 0px 5px 5px;
} .arrow-right.b10 {
  border-width: 10px 0px 10px 10px;
} .arrow-right:hover {
  border-color: transparent transparent transparent rgba(255,255,255,0.6);
} .arrow-down {
  width: 0;
  height: 0;
  border-style: solid;
  border-color: rgba(255,255,255,1) transparent transparent transparent;
} .arrow-down.b5 {
  border-width: 5px 5px 0 5px;
} .arrow-down.b10 {
  border-width: 10px 10px 0 10px;
} .arrow-down:hover {
  border-color: rgba(255,255,255,0.6) transparent transparent transparent;
}
</style>
