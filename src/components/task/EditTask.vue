<template>
  <div class="border-opacity-25 flex flex-col space-y-2">
    <input
      type="text"
      class="p-3 bg-black w-full rounded-md"
      placeholder="Task Title"
    />
    <textarea
      type="text"
      class="p-3 bg-black w-full rounded-md"
      placeholder="Task Description"
    ></textarea>
    <input type="date" class="bg-black rounded-md p-2" />
    <div class="flex space-x-2 my-4">
      <button
        class="bg-light-blue hover:bg-opacity-90 text-black font-semibold px-2 py-1.5 rounded-md"
      >
        Save
      </button>
      <button
        class="bg-red-200 hover:bg-opacity-90 text-black font-semibold px-2 py-1.5 rounded-md"
      >
        Cancel
      </button>
    </div>
  </div>
</template>
