<template>
  <div class="encrypt-page">

    <div class="encrypt-page-fields">
      <component
        v-for="(component, index) in fields"
        :key="index"
        :mode="mode"
        :field="component.field"
        :label="component.label"
        v-model="component.value"
        :shared="component.shared"
        :is="component.name"
      />
        <!--
        -->
    </div>

    <div class="encrypt-page-action">
    </div>

    <div class="encrypt-page-table">
    </div>

  </div>
</template>

<script src="./encrypt.js" lang="js"></script>
<style src="./encrypt.css" lang="css" scoped></style>
