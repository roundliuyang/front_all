<template>
  <div>
    <el-table
      :data="tableData"
      border
      @selection-change="selected"
      @row-click="clickRow"
      ref="elementtable"
      :row-key="rowKey"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
        v-if="checkbox"
      >
      </el-table-column>
       <slot name="sort"> </slot>
      <el-table-column
        v-for="(col, idx) in columns"
        :prop="col.prop"
        :key="idx"
        :label="col.label"
        :align="col.align"
        :width="col.width"
      >
      </el-table-column>
      <slot name="btn"> </slot>
    </el-table>
    <div class="pagination" v-if="total > 0">
      <div class="info">
        {{ info }}
      </div>
      <!-- @current-page="currentPageFn" -->
      <el-pagination
        :background="true"
        @size-change="handleSizeChange"
        @selection-change="$emit('pageData', this.target.value)"
        @current-change="handleCurrentChange"
        :current-page.sync="currentpage"
        :page-sizes="PageSizes"
        :page-size="pageCur.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
let opt = {
  sidePagination: "client", //分页方式：client客户端分页，server服务端分页（*）
};
export default {
  props: {
    tableList: {
      type: Array,
      default: () => [],
      required: true,
    },
    columns: {
      type: Array,
      required: true,
      default: () => [],
    },
    opt: {
      type: Object,
      default: () => {},
    },
    totalLength: {
      type: Number,
      default: 0,
    },
    PageSizes: {
      type: Array,
      default: () => [2, 5, 10, 15, 30, 100, 200],
    },
    checkbox: {
      type: Boolean,
      default: true,
    },
    pageModel: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      page: {
        currentPage: 1, //当前页
        limit: 10, //每页数据
      },
      currentpage: 1,
      selection: [],
    };
  },
  computed: {
    pageCur() {
      return {
        ...this.page,
        ...this.pageModel,
      };
    },
    info() {
      let str = this.$t("common.page");
      str = str
        .replace(
          "#",
          this.pageCur.currentPage * this.pageCur.limit - this.pageCur.limit + 1
        )
        .replace("*", this.total)
        .replace(
          "+",
          this.pageCur.currentPage * this.pageCur.limit > this.total
            ? this.total
            : this.pageCur.currentPage * this.pageCur.limit
        );
      return str;
    },
    option() {
      return {
        ...opt,
        ...this.opt,
      };
    },
    total() {
      if (this.option.sidePagination == "client") {
        return this.tableList.length;
      } else {
        return this.totalLength;
      }
    },
    tableData() {
      if (this.option.sidePagination == "client") {
        return this.tableList.slice(
          (this.pageCur.currentPage - 1) * this.pageCur.limit,
          this.pageCur.currentPage * this.pageCur.limit
        );
      } else {
        return this.tableList;
      }
    },
  },
  watch: {
    tableData(val) {
      if (val.length == 0) {
        this.handleCurrentChange(1);
      }
    },
  },
  methods: {
    rowKey () {
      return 'l' + Math.random()
    },
    clickRow(row) {
      console.log(row)
      // this.$refs.elementtable.toggleRowSelection(row)
    },
    //用户的选择的每页多少数据
    handleSizeChange(value) {
      if (this.option.sidePagination == "client") {
        this.page.limit = value;
      } else {
        this.currentpage = 1;
        // this.page.currentPage = value;
        // console.log("执行了");
        this.$emit("pageData", {
          currentPage: 1,
          offset: 0,
          limit: value,
        });
      }
    },
    selected(value) {
      this.$emit('SelectionChange', value)
      this.selection = value
    },
    //用户点击的哪一页
    handleCurrentChange(value) {
      if (this.option.sidePagination == "client") {
        this.page.currentPage = value;
      } else {
        this.currentpage = value;
        this.$emit("pageData", {
          limit: this.pageCur.limit,
          offset: (value - 1) * this.pageCur.limit,
          currentPage: value,
        });
      }
    },
  },
};
</script>
<style>
.pagination {
  display: flex;
  min-width: 1030px;
  max-width: 100%;
  margin-top: 10px;
  align-items: center;
}
.pagination .info {
  flex: 1;
  font-size: 13px;
  min-width: 35.5px;
  height: 28px;
  line-height: 28px;
  vertical-align: top;
  box-sizing: border-box;
}
.pagination >>> .el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  background-color: #026cd2;
  color: #ffffff;
  border: 1px solid #026cd2;
  border-radius: 50% !important;
}
.pagination >>> .el-pagination {
  flex: 1;
  text-align: right;
}
</style>
