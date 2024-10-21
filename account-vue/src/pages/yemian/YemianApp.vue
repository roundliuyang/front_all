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
        @click="activeName = 'last';activeSysIdx = 0;">
      {{ $t("menu.addSys") }}
    </el-button>

    <YemianSysForm
        v-if="activeSys.menu"
        :key="activeSys.menu.id"
        :value="sysForm"
        @change="refresh"
    />

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
    <CoolEleTable
        :tableList="sysMenu"
        :columns="columns"
        :currentPage="currentPage"
        @SelectionChange="value => (selected = value)"
    >
      <el-table-column slot="sort" align="center" width="130" :label="$t('menu.sort')" prop="sort">
        <i class="el-icon-rank"></i>
      </el-table-column>
      <el-table-column slot="btn" align="center" :label="$t('common.operate')" prop="id">
        <template #default="{row}">
          <el-button type="text" @click="edit(row.id)">
            {{ $t("common.modification") }}
          </el-button>
          <el-button type="text" @click="delMenu(row.id)">
            {{ $t("common.delete") }}
          </el-button>
        </template>
      </el-table-column>
    </CoolEleTable>
  </div>
</template>

<script>

import {mapState} from "vuex";
import CoolEleTable from "@/components/CoolEmTable.vue";
import {Sys} from "./menu"
import MenuApi from "@/api/MenuApi";
import YemianSysForm from "./YemianSysForm"


export default {
  components: {CoolEleTable, YemianSysForm},
  name: "YemianApp",
  data() {
    return {
      activeName: "1", // 当前点击的tabs
      activeSysIdx: 1, // 当前显示的tab标签的id值
      searchKey: "", // 搜索关键字
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
    }
  },

  computed: {
    ...mapState({
      menus: state => JSON.parse(JSON.stringify(state.menus))
    }),
    // 表格绑定的数据，切换tab时，对应的子菜单数据
    sysMenu() {
      // 在这里，首先创建了一个正则表达式对象 reg，用于根据用户输入的搜索关键字动态过滤数据。
      let reg = RegExp(this.searchKey, "i");
      var res = this.menus
          // 通过 map 方法遍历 menus 数组，根据当前活动的系统标签 activeSysIdx 来筛选出对应的子菜单数据。如果某个菜单的 id 与 activeSysIdx 匹配，则返回该菜单的子菜单数组，否则返回空数组。
          .map(i => {
            return i["menu"].id == this.activeSysIdx ? i["children"] : [];
          })
          // 使用 flat() 方法将多维数组扁平化，将所有子菜单数据放在一个数组中。
          .flat()
          // 对每个子菜单对象进行映射，创建一个新的对象 curr，将子菜单对象中的部分属性提取出来，包括 name、id、url、seq 以及根据语言ID（假设为1）匹配找到对应语言名称 lang。
          .map(item => {
            let curr = {};
            curr.name = item.name;
            curr.id = item.id;
            curr.url = item.url;
            curr.seq = item.seq;
            let str = item.langs.find(lang => lang.langId == 1);
            curr.lang = str ? str.name : "";
            return curr;
          })
          // 使用 filter 方法根据用户输入的搜索关键字进行过滤，只返回包含搜索关键字的子菜单数据。如果子菜单的名称、语言或URL中有任何一个与搜索关键字匹配，则保留该子菜单数据。
          .filter(s => {
            if (reg.test(s.name) || reg.test(s.lang) || reg.test(s.url)) {
              return s;
            }
          });
      console.log("--------------------------------------sysMenu start")
      console.log(res)
      console.log("--------------------------------------sysMenu after")
      return res;
    },
    // 当前展示的所有数据
    activeSys() {
      let obj;
      if (this.activeName == "last") {
        obj = new Sys();
      } else {
        // 这里的 this.allList.filter() 方法根据条件筛选出符合条件的数据，并返回一个新的数组
        let arr = this.allList.filter(i => (i["menu"].id == this.activeSysIdx ? i : i[0]));
        // 过 [0] 取得筛选后数组的第一个元素，即符合条件的数据对象。... 操作符用于将这个对象的属性解构出来，从而创建一个新的对象 obj。
        obj = {...arr[0]};
      }
      return obj;
      // return {...this.allList.filter(i => i["menu"].id == this.activeSysIdx ? i : i[0])}
      // return Object.assign({},{...this.allList.filter(i => i["menu"].id == this.activeSysIdx ? i : i[0])})
    },
    // 当前展示的父菜单的英文名
    sysName() {
      let res = "";
      this.menuList.filter(i => {
        if (i.id == this.activeSysIdx) {
          let flat = i.langs.find(lang => lang.langId == 1)
          res = flat ? flat.name : ''
          // res = i.langs.find((lang) => lang.langId == 1)?.name;
        }
      });
      // console.log(res, 11);
      return res;
    },
    /*
        这里使用了对象的展开语法 {...}，这个语法可以将对象的属性和值展开到一个新的对象中。this.activeSys.menu 包含了当前活动系统的菜单对象，
        通过 {...this.activeSys.menu} 将其属性和值复制到新的对象中。然后，通过 , 将一个新的属性 lang 和其对应的值 this.sysName 添加到了新对象中。
     */
    sysForm() {
      return {...this.activeSys.menu, lang: this.sysName};
    }
  },
  mounted() {
    this.getAllList();
    // this.sortRow();
    // this.sortMenu();
    // console.log("表单数据mounted", this.sysMenu);
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
      // .catch(err => this.$error(this.$t("menu.confirm.getMenuF")));
    },
    handleClick(tab) {
      console.log("---------------handleClick start");
      console.log(tab);
      console.log("---------------handleClick after");
      this.activeSysIdx = Number(tab.name);
    },
    addSys() {

    },
    delAll() {

    },
    async refresh(sysId) {
      try {
        this.activeSysIdx = sysId;
        this.activeName = String(sysId);
        await this.getAllList();
      } catch (error) {
        // console.log(error);
        this.$error(this.$t("menu.confirm.updateMenuF"));
      }
    },
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-form-item {
  display: inline-block;
}

/deep/ .el-input {
  width: 250px;
}

/deep/ .el-form-item__label {
  padding: 0;
}

/deep/ .el-form-item {
  margin-right: 40px;
}
</style>