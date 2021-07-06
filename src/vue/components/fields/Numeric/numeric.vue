<template>
  <div class="field-form">
    <div class="label-field noselect">
      <label>{{ label }}</label>
    </div>

    <div class="input-field" v-if="mode == 'form'">
      <div class="number-picker">
        <div>
          <input
            v-this:input="setElement"
            :type="__getter__('input:type')"
            :value="convertNumber()"
            @input="changedValue"
          >
        </div>
      </div>
    </div>

    <div class="input-field" v-else>
      <div class="input-value">{{ value }}</div>
    </div>
  </div>
</template>

<script lang="js" src="./numeric.js"></script>
<style lang="css" src="./numeric.css" scoped></style>
