<template>
  <input
    :id="id"
    type="text"
    :value="modelValue"
    onfocus="(this.type='date')"
    @input="updateInput"
    :placeholder="placeholder"
    class="p-3 w-full rounded-md"
    :class="{ 'border-red-600 border': hasError }"
  />
</template>
<script>
import { defineComponent, defineEmits } from "vue";

export default defineComponent({
  props: {
    id: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    hasError: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const updateInput = (event) =>
      emit("update:modelValue", event.target.value);

    return { updateInput };
  },
});
</script>
