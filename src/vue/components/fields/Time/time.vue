<template>
  <div class="field-form">

    <!-- label field -->
    <div class="label-field noselect">
      <label>{{ label }}</label>
    </div>

    <!-- input field -->
    <div
      class="input-field"
      v-if="mode == 'form'"
    >
      <!-- input form picker -->
      <div
        class="time-picker"
        @click="(event) => picker(event)"
      > <div>{{ __time__ }}</div>
        <div>
          <img 
            @click="timeClick"
            :src="__ico__.clock.src"
            :alt="__ico__.clock.name"
          >
        </div>
      </div>

      <!-- input form change value -->
      <div class="modal-picker" v-if="__controller__.picker">
        <div class="modal-content-picker">
          <div class="modal-content-header">
            <div class="modal-content-header-title">
              <!-- set text in here -->
              <span>{{ label }}</span>
            </div>
            <div class="modal-content-header-text">
              <!-- set text in here -->
              <span>{{ __time_picker__ }}</span>
            </div>
          </div>

          <div class="modal-content-body">
            <div 
              class="modal-content-body-input" 
              v-for="(constant, key) in __input__"
              :key="key"
            >
              <!-- 
                line value 
                
                @label view
                @body  content input
              -->
              <div class="modal-content-body-input-label">{{ constant.label }}</div>
              <div class="modal-content-body-input-body">
                <div 
                  class="modal-content-body-input-body-arrow" 
                  @click="(event) => scrollTo(event, 'up', key)"
                  @wheel="(event) => scrollTo(event, 'up-wheel', key)"
                > <div class="arrow-up b5"></div>
                </div>
                <div 
                  class="modal-content-body-input-body-scroll" 
                  v-this:[key]="setElement"
                > <div 
                    v-for="(option, index) in constant.options"
                    :key="`${key}:${index}`"
                    :class="getClass(key, option)"
                  >{{ option }}</div>
                </div>
                <div
                  class="modal-content-body-input-body-arrow"
                  @click="(event) => scrollTo(event, 'down', key)"
                  @wheel="(event) => scrollTo(event, 'down-wheel', key)"
                > <div class="arrow-down b5"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-content-footer">
            <button 
              v-for="(button, index) in __labels__.buttons"
              :key="index"
              @click="(event) => pickerTimeController(event, button)"
            >{{ button }}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- input view data -->
    <div class="input-field" v-else>
      <div class="input-value">{{ __time__ }}</div>
    </div>
  </div>
</template>

<script lang="js" src="./time.js"></script>
<style lang="css" src="./time.css"></style>
