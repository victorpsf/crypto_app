<template>
  <div class="config-page">
    <div></div>
    <div class="config-fields">
      <component
        v-for="(component, index) in components"
        :key="index"
        :mode="mode"
        :field="component.field"
        :label="component.label"
        v-model="component.value"
        :shared="component.shared"
        :is="component.name"
      />
    </div>
    <div class="page-actions">
      <button
        v-for="(button, index) in buttons"
        :key="index"
        @click="(event) => _listen_(event, button.type)"
      >{{ button.label }}</button>
    </div>
  </div>
</template>

<script src="./configuration.js" lang="js"></script>
<style lang="css">
.config-page {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.config-page > .config-fields {
  max-width: calc(95% - 40px);
  width: calc(95% - 40px);
  padding: 10px 20px;
  min-width: 400px;
  max-height: 90%;

  border-radius: var(--app-border);
  overflow-y: auto;
}

.config-page > .config-fields > div {
  margin: 10px auto;
  padding: 0px 5px;

  border-bottom: 1px solid var(--bg-ligth-color);
  border-right: 1px solid var(--bg-ligth-color);

  border-bottom-right-radius: var(--app-border);
  border-top-right-radius: var(--app-border);
}

.config-page > .page-actions {
  width: 95%;
  height: 40px;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  padding: 5px;
}

.config-page > .page-actions > button {
  margin: 0px 20px;

  padding: 10px 15px;
  border: none;
  outline: 0;
  cursor: pointer;
  background-color: var(--bg-ligth-color);
  color: #ffffff;
  border-radius: var(--app-border);
}
.config-page > .page-actions > button:hover {
  opacity: 0.6;
}
</style>
