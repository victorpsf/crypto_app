<template>
  <div class="field-form">
    <div class="label-field">
      <label>{{ label }}</label>
    </div>

    <div class="input-field" v-if="mode == 'form'">
      <div class="select-picker" @click="selectMouse" @mouseleave="selectLeaveMouse">
        <div class="input">
          <div>{{ internalData.value }}</div>
          <div>
            <img v-if="!controller.picker" :src="__ico__.settings.src" :alt="__ico__.settings.name">
          </div>
        </div>
        <div v-if="controller.picker" class="select">
          <div 
            class="option"
            v-for="(option, key) in internalOptions"
            :key="key"
            @click="setOption(key, option)"
          >{{ option }}
          </div>
        </div>
      </div>
    </div>

    <div class="input-field" v-else>
      <div class="input-value">{{ value }}</div>
    </div>
  </div>
</template>

<script src="./select.js"  lang="js"></script>
<style  src="./select.css" lang="css"></style>
