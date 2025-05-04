<template>
  <div>
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%">
      <template v-for="column in columns">
        <el-table-column
          :key="column.id"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :align="column.align"
          :formatter="column.formatter">
          <template v-slot="scope">
            <slot :name="column.slotName" :scope="scope">
              {{ scope.row[column.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'CustomTable',
  props: {
    tableData: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
/* 可选的样式 */
</style>