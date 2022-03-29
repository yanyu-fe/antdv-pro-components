<script setup lang="ts">
// import Field, { FieldStatus } from '@yanyu-fe/pro-field'
import { shallowRef, watchEffect } from 'vue'
import { Rate } from 'ant-design-vue'
const value = shallowRef('read')
const rateValue = shallowRef(2)
watchEffect(() => {
  // console.log(value1.value)
})
</script>

<template>
  <div class="container">
    <a-space>
      <a-radio-group v-model:value="value">
        <a-radio value="read">
          只读
        </a-radio>
        <a-radio value="edit">
          编辑
        </a-radio>
      </a-radio-group>
    </a-space>
    <br>
    <br>
    <a-space direction="vertical">
      <pro-field text="这是一段文本" :mode="value" />
      <pro-field value-type="textarea" text="这是一段文本" :mode="value" />
      <pro-field value-type="second" :text="20" :mode="value" />
      <pro-field value-type="switch" :field-props="{checked:false}" :text="true" :mode="value" />
      <pro-field v-model="rateValue" value-type="rate" :text="3.5" :mode="value" />
      <div> <pro-field-status-success /> 测试</div>
      <pro-field-status-error />
      <pro-field-status-warning />
      <pro-field-status-processing />
      <pro-field-status-default />
    </a-space>
  </div>
</template>

<style>
.container{
  padding:20px
}
</style>
