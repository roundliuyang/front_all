<template>
  <div class="padding">
    <h3 style="margin-bottom: 10px; margin-top: 0;">
      {{ $t("menu.title") }}
    </h3>
    <el-tabs type="card" ref="tab" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="sys in menus" :key="sys.menu.id" :name="String(sys.menu.id)">
        <span slot="label"
        ><i class="el-icon-rank" style="margin-right: 5px;"></i>{{ sys.menu.name }}</span
        >
      </el-tab-pane>
      <!-- <template> <el-tab-pane :label="$t('menu.addSys')" name="last"></el-tab-pane></template> -->
    </el-tabs>
    <el-button
        type="primary"
        plain
        @click="
        activeName = 'last';
        activeSysIdx = 0;
      "
    >{{ $t("menu.addSys") }}
    </el-button
    >
<!--    <MenuSysForm-->
<!--        v-if="activeSys.menu"-->
<!--        :key="activeSys.menu.id"-->
<!--        :value="sysForm"-->
<!--        @change="refresh"-->
<!--    />-->
    <div style="margin-bottom: 12px;display: flex; justify-content: space-between;">
      <div>
        <el-button class="add" @click="addSys">{{ $t("common.Added") }}</el-button>
        <el-button class="del" @click="delAll">{{ $t("common.delete") }}</el-button>
      </div>
      <el-input
          :clearable="true"
          :autofocus="true"
          :placeholder="$t('common.search')"
          prefix-icon="el-icon-search"
          v-model="searchKey"
      >
      </el-input>
    </div>
<!--    <CoolEleTable-->
<!--        :tableList="sysMenu"-->
<!--        :columns="columns"-->
<!--        :currentPage="currentPage"-->
<!--        @SelectionChange="value => (selected = value)"-->
<!--    >-->
<!--      <el-table-column slot="sort" align="center" width="130" :label="$t('menu.sort')" prop="sort">-->
<!--        <i class="el-icon-rank"></i>-->
<!--      </el-table-column>-->
<!--      <el-table-column slot="btn" align="center" :label="$t('common.operate')" prop="id">-->
<!--        <template #default="{row}">-->
<!--          <el-button type="text" @click="edit(row.id)">-->
<!--            {{ $t("common.modification") }}-->
<!--          </el-button>-->
<!--          <el-button type="text" @click="delMenu(row.id)">-->
<!--            {{ $t("common.delete") }}-->
<!--          </el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </CoolEleTable>-->

    <MenuForm
        :showMenuForm.sync="showMenuForm"
        :value="activeMenu"
        :parentId="activeSysIdx"
        @change="refresh"
        :menuList="menuList"
    />
  </div>
</template>

<script>
import MenuApi from "@/api/MenuApi";
import {Menu} from "./menu";
import MenuForm from "./MenuForm.vue";

export default {
  components: {MenuForm},
  name: "MenuApp",
  data() {
    return {
      activeName: "1", // 当前点击的tabs
      menuName: "",
      currentPage: 1, // 当前页
      columns: [

        {
          prop: "name",
          label: this.$t("menu.name"),
          align: "center",
          width: '270px'
        },
        {
          prop: "lang",
          label: this.$t("menu.lang"),
          align: "center",
          width: '300px'
        },
        {
          prop: "url",
          label: "URL",
          align: "center",
          width: '450px'
        }
      ],
      activeSysIdx: 1, // 当前显示的tab标签的id值
      menuList: [], // 所有父菜单数据
      allList: [], // 全部数据
      searchKey: "", // 搜索关键字
      showMenuForm: false, // 控制MenuForm组件显示隐藏
      selected: [], // 被选中的数据
      activeMenu: new Menu() // 当前选中的子菜单数据
    };
  },
  methods: {
    //获取页面的全部数据
    async getAllList() {
      await MenuApi.list()
          .then(data => {
            this.$store.commit("setMenus", data.list);
            this.allList = data.list;
            this.menuList = [];
            data.list.forEach(i => {
              this.menuList.push(i.menu);
            });
            // console.log("父菜单数据", this.menuList);
            // this.activeSys = data.list[0];
            // console.log('当前活动的页面',this.activeSys);
            // console.log("总数据", data.list);
          })
      // .catch(err => console.log(err));
      // .catch(err => this.$error(this.$t("menu.confirm.getMenuF")));
    },
    addSys() {
      this.showMenuForm = true;
      this.menuName = "";
      let menu = new Menu()
      menu.parentId = this.activeSysIdx
      this.activeMenu = {...menu, lang: this.menuName};
    },
    async refresh(sysId) {
      try {
        this.activeSysIdx = sysId;
        this.activeName = String(sysId);
        await this.getAllList();
      } catch (error) {
        console.log(error);
        // this.$error(this.$t("menu.confirm.updateMenuF"));
      }
    },
    delAll() {
    },
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-input {
  width: 250px;
}

::v-deep .el-tabs__nav {
  white-space: normal !important;
}

::v-deep .el-tabs__nav-wrap {
  width: 1500px;
}

/deep/ .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none;
}

/deep/ .el-tabs--card > .el-tabs__header .el-tabs__item {
  border: 1px solid #e6e9f0;
  margin-right: -1px;
}

/deep/ .el-tabs--card > .el-tabs__header .el-tabs__item:first-child {
  border-left: 1px solid #e6e9f0;
}

/deep/ .el-tabs--card > .el-tabs__header .el-tabs__item:last-child {
  border-right: 1px solid #e6e9f0;
}

/deep/ .el-tabs--card > .el-tabs__header {
  border-bottom: none;
}

/deep/ .el-tabs__item {
  font-size: 16px;
  padding: 0 13px;
  margin-bottom: 10px;
}

/deep/ .el-form--label-top .el-form-item__label {
  padding: 0;
}

/deep/ .el-tabs__nav-next {
  font-size: 18px;
  color: #000;
}

/deep/ .el-tabs__nav-prev {
  font-size: 18px;
  color: #000;
}
</style>