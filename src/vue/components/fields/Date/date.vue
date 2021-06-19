<template>
  <div class="field-form">
    <div class="label-field">
      <label>{{ label }}</label>
    </div>

    <div class="input-field" v-if="mode == 'form'">
      <div class="date-picker">
        
        <div @click="calendarClick" class="date-picker-input">
          <div class="date-picker-view">{{ dateString }}</div>
          <div class="date-picker-img">
            <img
              class="date-picker-img-element"
              :src="__ico__.calendar.src" 
              :alt="__ico__.calendar.name"
            >
          </div>
        </div>

        <div 
          id="body-modal-picker-date" 
          @click="cancel"
          class="date-picker-modal"
          v-if="__getter__('controller:picker')"
        >
          
          <!--  -->
          <div class="date-picker-modal-content">
            <!--  -->
            <div class="date-picker-modal-content-header">
              <div class="date-picker-modal-content-header-title noselect">
                {{ label }}
              </div>
              <div class="date-picker-modal-content-header-view noselect">
                {{ dateStringInput }}
              </div>
            </div>

            <!--  -->
            <div class="date-picker-modal-content-controller">
              <!--  -->
              <div class="date-picker-modal-content-controller-controls">
                <div class="date-picker-modal-content-controller-controls-input" @click="unchange">
                  <div class="noselect">{{ controller_control }}</div>
                  <div class="arrow-down b5"></div>
                </div>

                <div class="date-picker-modal-content-controller-controls-prev_next">
                  <div 
                    class="previous" 
                    @click="(event) => changeIndex(event, 'previous', __getter__('controller:type'))"
                  ><img class="noselect" :src="__ico__.back.src" alt="" srcset=""></div>
                  <div 
                    class="next" 
                    @click="(event) => changeIndex(event, 'next', __getter__('controller:type'))"
                  ><img class="noselect" :src="__ico__.next.src" alt="" srcset=""></div>
                </div>
              </div>

              <div class="view" v-if="__getter__('controller:type') == 'year'">
                <button 
                  v-for="(value, index) in __getter__('controller:year:current:value')" 
                  :key="index"
                  :class="yearClass(value)"
                  @click="event => change(event, 'year', value)"
                >{{ value }}</button>
              </div>

              <div class="view-month" v-else-if="__getter__('controller:type') == 'month'">
                <div class="view">
                  <button 
                    v-for="(month, index) in __getter__('controller:month:current:value')" 
                    :key="index"
                    :class="monthClass(month.value)"
                    @click="event => change(event, 'month', month)"
                  >{{ month.view }}</button>
                </div>
              </div>

              <div class="view-day" v-else-if="__getter__('controller:type') == 'day'">
                <div 
                  class="day" 
                  v-for="(dayGMT, indexY) in getDaysGMT" 
                  :key="indexY"
                > <div class="title noselect">
                    {{ dayGMT }}
                  </div>
                  <div
                    v-for="(day, indexX) in currentDayArray[dayGMT].values"
                    :class="dayClass(day)"
                    @click="event => change(event, 'day', day)"
                    :key="`${indexY}.${indexX}`">{{ day }}</div>
                </div>
              </div>

              <div class="footer">
                <button
                  id="date-picker-cancel"
                      class="noselect"
                  @click="(event) => cancel(event)"
                >{{ __getter__('label:cancel') }}</button>
                <button
                  class="noselect"
                  @click="(event) => submit(event)"
                >{{ __getter__('label:confirm') }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- -->
      </div>
    </div>

    <div class="input-field" v-else>
      <div>{{ value ? dateView: '' }}</div>
    </div>
  </div>
</template>

<script lang="js" src="./date.js"></script>
<style lang="css" src="./date.css" scoped></style>
