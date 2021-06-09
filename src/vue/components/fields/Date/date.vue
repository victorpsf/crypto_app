<template>
  <div class="field-form">
    <component 
      v-if="controller.picker" 
      :is="controller.component" 
      :label="label" 
      :value="get()"
      @listen="pickerListen" 
    />

    <div class="label-field">
      <label>{{ label }}</label>
    </div>

    <div class="input-field" v-if="mode == 'form'">
      <div class="date-picker">
        <div>{{ dateView }}</div>
        <div>
          <img 
            :src="__ico__.calendar.src" 
            :alt="__ico__.calendar.name"
            @click="calendarClick"
          >
        </div>
      </div>
    </div>

    <div class="input-field" v-else>
      <div>{{ value ? dateView: '' }}</div>
    </div>
  </div>
</template>

<script lang="js" src="./date.js"></script>
<style lang="css" src="./date.css" scoped></style>
