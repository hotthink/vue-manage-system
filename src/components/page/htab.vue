<template>
  <div id="hot-preview">
    <HotTable :root="root" :settings="hotSettings"></HotTable>
  </div>
</template>

<script>
import HotTable from "vue-handsontable-official";
export default {
  data: function() {
    return {
      root: "test-hot",
      hotSettings: {
        data: HotTable.helper.createSpreadsheetData(1000, 1000),
        width: 684,
        height: 720,
        colWidths: 100,
        rowHeights: 23,
        rowHeaders: true,
        colHeaders: true,
        fixedRowsTop: 2,
        fixedColumnsLeft: 2,
        manualColumnMove: true,
        manualRowMove: true,
        dropdownMenu: true,
        contextMenu: true,
        manualColumnResize: true,
        manualRowResize: true,
        language: "zh-CN",
        licenseKey: "non-commercial-and-evaluation"
      }
    };
  },
  components: {
    HotTable
  }
};
</script>