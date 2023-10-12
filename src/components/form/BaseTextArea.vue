<template>
  <textarea
    :id="id"
    :value="modelValue"
    @input="updateInput"
    class="p-3 w-full rounded-md block"
    :class="{ 'border-red-600 border': hasError }"
    :placeholder="placeholder"
  ></textarea>
</template>
<script>
import { defineComponent } from "vue";

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
    type: {
      type: String,
      default: "text",
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
