<template>
  <div class="field-form">
    <div class="label-field">
      <label>{{ label }}</label>
    </div>
    <div class="input-field">
      <div class="input">
        <div class="files">
          <div 
            class="file" 
            v-for="(file, index) in __getter__('input:value')"
            :key="index"
          >
            <div class="name">{{ file.name }}</div>
            <div class="percent">{{ file.percent ? file.percent.text : '' }}</div>
            <img 
              v-if="mode == 'form'"
              class="close" 
              :src="__ico__.close.src"
              :alt="__ico__.close.src.name"
              @click="(event) => removeFile(event, index)"
            >
          </div>
        </div>
        
        <input
          type="file"
          v-this:input="setElement"
          v-show="false"
          @input="inputFileChange"
          :disabled="__getter__('input:progress')"
          multiple="true"
        >

        <img 
          :class="__getter__('prop:class:union')"
          v-if="mode == 'form'"
          @click="inputFilesClick"
          :src="__ico__.upload.src"
          :alt="__ico__.upload.name"
        >
      </div>
    </div>
  </div>
</template>

<script lang="js" src="./file.js"></script>
<style lang="css" src="./file.css" scoped></style>
