<template>
  <div id="hot-preview">
    <HotTable :root="root" :settings="hotSettings"></HotTable>
  </div>
</template>

<script>
import moment from "moment"; //引入handsontable依赖的插件
import numbro from "numbro";
import pikaday from "pikaday"; //日期插件
import Zeroclipboard from "zeroclipboard";
import Handsontable from "handsontable";
import cn from "handsontable/languages/zh-CN";
import HotTable from "vue-handsontable-official";

export default {
  data: function() {
    return {
      root: "test-hot",
      hotSettings: {
        data: [
          //数据，可以是数据，对象
          ["20080101", 10, 11, 12, 13, true],
          ["20090101", 20, 11, 14, 13, true],
          ["20010101", 30, 15, 12, 13, true],
          ["20010101", 32, 213, 21, 312, true],
          ["20010201", 32, 213, 21, 312, true],
          ["20010301", 32, 213, 21, 312, true],
          ["20010401", 32, 213, 21, 312, true],
          ["20010501", 32, 213, 21, 312, true],
          ["20010601", 32, 213, 21, 312, true]
        ],
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