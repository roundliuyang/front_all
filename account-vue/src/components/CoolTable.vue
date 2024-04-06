<template>
    <div class="vue-bs-table">
        <div id="toolbar">
            <slot />
        </div>
        <div class="mc-table">
            <BootstrapTable
                ref="bsTable"
                :columns="columns"
                :data="data"
                :options="option"
                @on-post-body="onPostBody"
            />
        </div>
    </div>
</template>
<script>
import 'bootstrap-table/dist/bootstrap-table.min.css'
import 'bootstrap-table/dist/bootstrap-table.js'
import 'bootstrap-table/dist/locale/bootstrap-table-zh-CN.js'
import BootstrapTable from 'bootstrap-table/dist/bootstrap-table-vue.esm'

export default {
    name: 'CoolTable',
    components: { BootstrapTable },
    data() {
        return {
            defaultOptions: {
                striped: true,                                      //是否显示行间隔色
                cache: false,                                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true,                                   //是否显示分页（*）
                sortable: false,                                    //是否启用排序
                sortOrder: "asc",                                   //排序方式
                queryParams: null,                    //传递参数（*）是个回掉函数？
                sidePagination: 'client',                           //分页方式：client客户端分页，server服务端分页（*）
                pageNumber: 1,                                       //初始化加载第一页，默认第一页
                pageSize: this.pageSize,                                       //每页的记录行数（*）
                pageList: [5, 10, 20],                             //可供选择的每页的行数（*）
                search: true,                                     //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
                strictSearch: false,
                showColumns: true,                                  //是否显示所有的列
                // showRefresh: true,                                  //是否显示刷新按钮
                minimumCountColumns: 2,                             //最少允许的列数
                clickToSelect: true,                                //是否启用点击选中行
                //height: 712,                                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                uniqueId: "ID",                                     //每一行的唯一标识，一般为主键列
                showToggle: false,                                    //是否显示详细视图和列表视图的切换按钮
                cardView: false,                                    //是否显示详细视图
                detailView: false,                                  //是否显示父子表
                showFooter: false,                                  //是否显示页脚
            }
        };
    },
    props: {
        columns: Array,
        data: Array,
        pageSize: {
            type: Number, default: 10
        },
        options: Object
    },
    computed: {
        option() {
            return {
                ...this.defaultOptions, ...this.options
            }
        },
    },
    methods: {
        onPostBody(e) {
            const that = this;
            $(this.$refs.bsTable.$el).find('[data-emit]').on('click', function (e) {
                that.$emit($(this).data('emit'), $(this).data('val'));
            });
        },
        getSelections() {
            return this.$refs.bsTable.getSelections();
        },
    },
    mounted() {
        this.$refs.bsTable.refreshOptions({
            toolbar: $(this.$el).find('#toolbar'),        //工具按钮用哪个容器
        });
    },
    beforeDestroy() {
        this.$refs.bsTable.destroy();
    }
}
</script>
<style scoped>
/* .vue-bs-table >>> .fixed-table-body {
    max-height: 750px;
}

@media (min-height: 1440px) {
    .vue-bs-table >>> .fixed-table-body {
        max-height: 1080px;
    }
}

@media (max-height: 720px) {
    .vue-bs-table >>> .fixed-table-body {
        max-height: 450px;
    }
} */
</style>