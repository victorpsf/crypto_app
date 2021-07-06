<template>
  <div class="field-form">
    <div class="label-field noselect">
      <label>{{ label }}</label>
    </div>

    <div class="input-field" v-if="mode == 'form'">
      <div class="input-field-text">
        <div :class="(__password__)? 'input-field-text-picker': ['input-field-text-picker', 'full']">
          <input 
            class="input-field-text-input"
            v-this:input="setElement"
            @input="changedValue"
            :type="__type__"
            :value="modelValue"
          >
        </div>
        <div class="input-field-text-img" v-if="__password__">
          <img
            class="input-field-text-option"
            v-if="!__getter__('visible')"
            @click="passwordVisibleChange"
            :src="__ico__.visible.src"
            :alt="__ico__.visible.name"
          >
          <img
            class="input-field-text-option"
            v-else
            @click="passwordVisibleChange"
            :src="__ico__.invisible.src"
            :alt="__ico__.invisible.name"
          >
        </div>
      </div>
    </div>

    <div class="input-field" v-else>
      <div class="input-value">{{ value }}</div>
    </div>
  </div>
</template>

<script lang="js" src="./text.js"></script>
<style lang="css" src="./text.css" scoped></style>
