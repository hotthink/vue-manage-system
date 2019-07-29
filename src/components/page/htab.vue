<template>
  <div id="hot-preview">
    <HotTable :root="root" :settings="hotSettings"></HotTable>
  </div>
</template>

<script>
  import HotTable from 'vue-handsontable-official';
  export default {
    data: function() {
      return {
        root: 'test-hot',
        hotSettings: {
          data: [['sample', 'data']],
          colHeaders: true
        }
      };
    },
    components: {
      HotTable
    }
  }
</script>