<template>
  <div class="hash-page">
    <div class="hash-fields">
      <component
        v-for="(component, index) in __getter__('page:component')"
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
    <div class="hash-table">
      <table>
        <tr>
          <th
            v-for="(key,x) in __getter__('page:table:keys')"
            :key="x"
          >{{ key }}</th>
        </tr>
        <tr
          v-if="valueLen"
          v-for="(value,y) in __getter__('page:table:values')"
          :key="y"
          class="hash-table-value"
        >
          <td 
            v-for="(key,x) in __getter__('page:table:keys')"
            :key="x"
          >{{ value[key] }}</td>
          <td class="option">
            <img
              @click="(event) => remove(event, { value, index: y })"
              :src="table.__icon__.excluir.src"
              :alt="table.__icon__.excluir.name"
            >
          </td>
        </tr>
        <tr
          v-else
          class="hash-table-value"
        >
          <td>----</td>
          <td>----</td>
          <td>----</td>
          <td>----</td>
          <td>----</td>
          <td>----</td>
          <td>----</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script src="./hash.js" lang="js"></script>
<style lang="css">
.hash-page {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.hash-page > .hash-fields {
  max-width: calc(95% - 40px);
  width: calc(95% - 40px);
  padding: 5px 20px;
  min-width: 450px;
  min-height: 240px;
  max-height: 35%;

  border-radius: var(--app-border);
  overflow-y: auto;
}

.hash-page > .hash-fields > div {
  margin: 10px auto;
  padding: 0px 5px;

  border-bottom: 1px solid var(--bg-ligth-color);
  border-right: 1px solid var(--bg-ligth-color);

  border-bottom-right-radius: var(--app-border);
  border-top-right-radius: var(--app-border);
}

.hash-page > .page-actions {
  width: 95%;
  height: 40px;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  padding: 5px;
}

.hash-page > .page-actions > button {
  margin: 0px 20px;

  padding: 10px 15px;
  border: none;
  outline: 0;
  cursor: pointer;
  background-color: var(--bg-ligth-color);
  color: #ffffff;
  border-radius: var(--app-border);
}

.hash-page > .page-actions > button:hover {
  opacity: 0.6;
}

.hash-table {
  max-width: calc(95% - 40px);
  width: calc(95% - 40px);
  min-width: 400px;
  min-height: 60px;
  max-height: calc(100% - 35%);
  overflow: auto;
  border: 2px solid var(--bg-ligth-color);
  background-color: var(--bg-ligth-color);
  border-radius: var(--app-border);
}

table {
  font-family: arial, sans-serif;
  width: 100%;
}

table > td, th {
  text-align: left;
  padding: 8px;
  background-color: var(--bg-ligth-color);
}

table > td {
  white-space: nowrap;
  /* word-wrap: ; */
}

table > td.option {
  max-width: 100px;
  min-width: 40px;

  text-align: center;
}

table > td.option > img {
  width: 15px;
  height: 15px;

  cursor: pointer;
}

table > td.option > img:hover {
  filter: invert(100%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%);
}

table > tr:nth-child(even) {
  background-color: var(--bg-color);
}
</style>
