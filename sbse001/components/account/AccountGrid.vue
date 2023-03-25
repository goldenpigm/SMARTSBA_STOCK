<template>
  <div>
    <Grid 
      :style="{ height: '500px', margin: '0.75rem 2rem' }"
      :sortable="true"
      :reorderable="true"
      :filter="filter"
      :skip="skip" 
      :take="take" 
      :total="total" 
      :pageable="pageable"
      :page-size="20" 
      :selected-field="'selected'" 
      @pagechange="pageChangeHandler" 
      @rowclick="onRowClick"
      :data-items="getGridData" 
      :columns="columns" 
      :loader="loader"
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
  
<script>
import { process } from '@progress/kendo-data-query';
import { Grid, GridToolbar } from '@progress/kendo-vue-grid';
import { Input } from '@progress/kendo-vue-inputs';

export default {
  name: 'AccountGrid',
  components: {
    Grid,
    GridToolbar,
    Input
  },
  props: {
    gridData: {
      type: Object
    },
    columns: {
      type: Object
    }
  },
  data() {
    return {
      dataItems: [],
      loader: false,
      skip: 0,
      take: 20,
      pageSizeValue: 20,
      pagerSizes: true,

      searchWord: '',
      filter: null,
    }
  },
  computed: {
    getGridData() {
      return this.dataItems = this.getData(this.gridData);
    },
    pageable() {
      return {
        buttonCount: 5,
        info: true,
        pageSizes: this.pagerSizes ? ['All', 5, 10, 20] : undefined,
        previousNext: true,
        pageSizeValue: this.pageSizeValue,
        type: 'numeric',
      };
    },
    total() {
      return this.dataItems ? this.dataItems.length : 0;
    },
  },
  methods: {
    pageChangeHandler(event) {
      this.loader = true;
      setTimeout(() => {
        this.loader = false;
        this.skip = event.page.skip;
        this.take = event.event.value === 'All' ? this.dataItems.length : event.page.take;
        this.pageSizeValue = event.event.value;
      }, 200);
    },
    onRowClick(event) {
      this.$emit('selectedValue', event.dataItem);
      this.$emit('closeDialog');
    },
    getData(data) {
      return process(data, {
        take: this.take,
        skip: this.skip,
        filter: this.filter,
      });
    },
    onFilter(e) {
      let inputValue = e.value;
      this.searchWord = inputValue;
      if (inputValue !== '') {
        let filters = []
        for (let col of this.columns) {
          let filterDetail = {
              field: col.field,
              operator: 'contains',
              value: inputValue,
            };
          filters.push(filterDetail);
        }
        this.filter = {
          logic: 'or',
          filters: filters
        };
      } else this.filter = null;
      this.dataItems = this.getData(this.gridData);
    },
  },
}
</script>

<style scoped>
.searchbar {
  margin-left: auto;
  margin-right: 0;
}
</style>