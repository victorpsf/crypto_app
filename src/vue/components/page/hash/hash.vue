<template>
  <div class="page-component">
    <div class="page-fields">
      <component
        v-for="(component, index) in __getter__('page:fields')"
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
        class="noselect"
        @click="(event) => __listen__(event, button)"
      >{{ button.label }}</button>
    </div>

    <div class="page-table">
      <table>

        <tr>
          <th
            v-for="(key,x) in __getter__('page:table:keys')"
            :key="x"
            class="noselect"
          >{{ key }}</th>
          <th class="noselect"></th>
        </tr>

        <tr
          v-if="__value__"
          v-for="(value,y) in __getter__('page:table:values')"
          :key="y"
          class="hash-table-value"
        >
          <td 
            v-for="(key,x) in __getter__('page:table:keys')"
            :key="x"
            class="hash-table-value-line"
            @click="(event) => copy(event, { value, key, target: value[key] })"
          >{{ value[key] }}</td>
          <td class="option">
            <img
              @click="(event) => __remove__(event, { value, index: y })"
              :src="__icon__.excluir.src"
              :alt="__icon__.excluir.name"
            >
          </td>
        </tr>

        <tr
          v-else
          class="hash-table-value"
        >
          <td
            v-for="(key,x) in __getter__('page:table:keys')"
            :key="x"
            class="noselect"
          >----</td>
          <td class="noselect">----</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script src="./hash.js" lang="js"></script>
<style src="./hash.css" lang="css" scoped></style>
