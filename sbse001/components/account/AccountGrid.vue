<template>
  <div>
    <Grid 
      :data-items="dataResult" 
      :sortable="true"
      :reorderable="true" 
      :pageable="pageable"
      :filter="filter"
      :total="total"
      :take="take" 
      :skip="skip" 
      :columns="columns"
      :style="{ height: '500px', margin: '0.75rem 2rem' }" 
      :selected-field="'selected'" 
      @rowclick="onRowClick" 
      @pagechange="onPageChange"
    >
    <GridToolbar>
        <span class='k-textbox k-grid-search k-display-flex searchbar'>
          <Input
            :style="{ width: '230px', height: 'auto', border: 'none' }"
            :placeholder="'Search'"
            :value="searchWord"
            @input="onFilter"
          ></Input>
          <span class='k-input-icon'><span class='k-icon k-i-search'></span></span>
        </span>
      </GridToolbar>
    </Grid>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { process, DataResult } from '@progress/kendo-data-query';
import { Grid, GridToolbar, GridPageChangeEvent, GridRowClickEvent } from '@progress/kendo-vue-grid';
import { Input } from '@progress/kendo-vue-inputs';

interface AccountLookupProps {
  gridData: Array<object>,
  columns: Array<object>
}
const props = defineProps<AccountLookupProps>();
const emit = defineEmits(['grid-selected', 'close-dialog']);

var loader = ref(false);
var pageable = ref();
var total = ref<number | undefined>(0);
var skip = ref<number | undefined>(0);
var take = ref<number | undefined>(20);
var pageSizeValue = ref<number | undefined>(20);
var pagerSizes = ref(true);
var searchWord = ref('');
var filter = ref<any>(null);
var dataResult = ref<DataResult>({ data: [] as any, total: 0 });

onMounted(() => {
  total.value = totalGrid();
  pageable.value = pageableSetting();
  dataResult.value = processData(props.gridData);
});

const processData = (data: Array<object>): any => {
  return process(data, {
    take: take.value,
    skip: skip.value,
    filter: filter.value
  });
}

const totalGrid = (): number => {
  return dataResult ? dataResult.value.total : 0;
}

const pageableSetting = () => {
  return {
    buttonCount: 5,
    info: true,
    pageSizes: pagerSizes ? ['All', 5, 10, 20] : undefined,
    previousNext: true,
    pageSizeValue: pageSizeValue,
    type: 'numeric'
  }
}

const onPageChange = (event : GridPageChangeEvent) =>  {
  skip.value = event.page.skip;
  take.value = event.event.value === 'All' ? dataResult.value.total : event.page.take;
  pageSizeValue = event.event.value;
  pageable.value = pageableSetting();
  dataResult.value = processData(props.gridData);
}

const onRowClick = (event: GridRowClickEvent) => {
  emit('grid-selected', event.dataItem);
  emit('close-dialog');
}

const onFilter = (event: any) => {
      let inputValue = event.value;
      searchWord.value = inputValue;
      if (inputValue !== '') {
        let filters = []
        let col: any = {}
        for (col of props.columns) {
          let filterDetail = {
              field: col.field,
              operator: 'contains',
              value: inputValue,
            };
          filters.push(filterDetail);
        }
        filter.value = {
          logic: 'or',
          filters: filters
        };
      } else filter.value = null;
      dataResult.value = processData(props.gridData);
    }
</script>

<style scoped>
.searchbar {
  margin-left: auto;
  margin-right: 0;
}
</style>