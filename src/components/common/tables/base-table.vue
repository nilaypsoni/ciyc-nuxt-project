<template>
  <div class="flex flex-col">
    <div>
<!--      class="overflow-x-auto"-->
      <div class="w-full inline-block align-middle">
        <div>
<!--          class="overflow-x-auto"-->
<!--          overflow-hidden-->
          <table class="min-w-full divide-y ">
<!--            divide-[#ECECEC]-->
            <thead class="bg-site__blue">
            <tr class="p-10">
              <th
                  v-for="(header,index) in headers"
                  :key="header"
                  scope="col"
                  class="p-4 font-normal text-white text-lg text-left"
              >
                {{ header }}
              </th>
            </tr>
            </thead>
            <slot/>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<!--:class="header.length - 1 === index ? '' : 'border-r border-color-[#ECECEC]'"-->

<script>
export default {
  name: "base-table",
  props:{
    headers:{
      type:Array,
      default:[]
    }
  }
}
</script>

<style scoped>

</style>
