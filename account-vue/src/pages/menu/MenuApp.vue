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
    <MenuSysForm
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
    <!-- 这段代码是一个使用了 <CoolEleTable> 组件的 Vue 模板，
     <CoolEleTable>: 这是一个自定义的组件，可能是一个封装了 Element UI 表格的组件，用于显示数据表格。它接收一些属性和事件来配置和处理表格的行为和展示。 
        :tableList="sysMenu": 这里使用了 Vue 的属性绑定语法 : 将 sysMenu 数据绑定到了 <CoolEleTable> 组件的 tableList 属性上。这表明 sysMenu 数据将被展示在表格中。
        :columns="columns": 类似地，这里也是将 columns 对象绑定到了 <CoolEleTable> 组件的 columns 属性上，用于配置表格的列信息。
        :currentPage="currentPage": 这里将 currentPage 属性绑定到了 <CoolEleTable> 组件的 currentPage 属性上，用于管理当前所在的页码。
        <el-table-column>: 这是 Element UI 表格组件中的列定义。在这里定义了两个自定义列，一个用于显示排序图标，一个用于显示操作按钮。
            •slot="sort": 这里使用了 Vue 的插槽功能，将这个 <el-table-column> 定义为一个名为 sort 的插槽。这个插槽可以在 <CoolEleTable> 组件中被引用。
            •slot="btn": 同样，这个 <el-table-column> 定义了一个名为 btn 的插槽，用于显示操作按钮。
        <template #default="{row}">: 这里是插槽的具体内容，使用了 Vue 的模板语法。#default 是插槽的默认名称，{row} 则是插槽的参数，表示当前行的数据。在这个模板中，定义了两个按钮，一个用于编辑操作，一个用于删除操作。
            •<el-button type="text" @click="edit(row.id)">: 这是一个 Element UI 的按钮组件，用于触发编辑操作。通过 @click 监听按钮的点击事件，并调用 edit 方法，传递当前行的 id 值作为参数。
        <el-button type="text" @click="delMenu(row.id)">: 类似地，这是另一个 Element UI 的按钮组件，用于触发删除操作。同样通过 @click 监听按钮的点击事件，并调用 delMenu 方法，传递当前行的 id 值作为参数。
        
        总结：
        综上所述，这段代码是一个包含了数据表格和操作按钮的 Vue 模板，用于展示和操作表格中的数据。    
     -->
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

    <!--
      @change="refresh" 是一个事件监听器。在 Vue.js 中，@change 表示监听一个名为 "change" 的事件，当该事件被触发时，会执行相关的处理函数。
      在这种情况下，当 <MenuForm> 组件中的某些内容发生改变时（例如用户进行了某种操作导致菜单表单发生了变化），就会触发 "change" 事件。一旦这个事件被触发，
      Vue.js 将会调用名为 "refresh" 的方法或函数。
      因此，@change="refresh" 表示当 <MenuForm> 组件内部发生变化时，会调用父组件中的 "refresh" 方法来进行刷新或更新。
    -->
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
import MenuSysForm from "./MenuSysForm.vue";
import {mapState} from "vuex";
import {Menu, Sys} from "./menu";
import MenuForm from "./MenuForm.vue";
// import Sortable from "sortablejs";
// import  VueI18n  from "@/i18n/index";
import CoolEleTable from "@/components/CoolEmTable.vue";

export default {
  components: {MenuForm, CoolEleTable, MenuSysForm},
  name: "MenuApp",
  // 在Vue.js中，data()是组件定义中的一个关键选项。它用于定义组件数据属性的初始状态。data()函数应该返回一个对象，其中每个键代表一个数据属性，其值表示该属性的初始状态。
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
  computed: {
    /*
        使用 Vuex 的 mapState 辅助函数来映射 menus 状态到组件的计算属性中。
        ...mapState({: 这里使用了 JavaScript 中的展开运算符（...）来展开 mapState 辅助函数返回的对象。
        定义了一个名为 menus 的计算属性，它接收一个参数 state，该参数代表 Vuex store 中的状态。在这个计算属性中，通过 JSON.stringify(state.menus) 
        先将 state.menus 对象转换为字符串，再通过 JSON.parse() 方法将其解析回一个新的 JavaScript 对象。这样做的目的是为了创建 menus 的深拷贝，
        以确保在组件中对 menus 进行修改时不会直接影响 Vuex store 中的状态。
     */
    ...mapState({
      menus: state => JSON.parse(JSON.stringify(state.menus))
    }),
    // 表格绑定的数据，切换tab时，对应的子菜单数据
    sysMenu() {
      // 在这里，首先创建了一个正则表达式对象 reg，用于根据用户输入的搜索关键字动态过滤数据。
      let reg = RegExp(this.searchKey, "i");
      return this.menus
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
  // 在 Vue.js 组件的生命周期中，mounted 钩子函数表示 Vue 实例被挂载到 DOM 后执行的函数
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
      // console.log(tab);
      this.activeSysIdx = Number(tab.name);
    },
    addSys() {
      this.showMenuForm = true;
      this.menuName = "";
      let menu = new Menu()
      menu.parentId = this.activeSysIdx
      this.activeMenu = {...menu, lang: this.menuName};
      // console.log(this.activeMenu);
    },
    edit(_id) {
      this.showMenuForm = true;
      let currData = this.activeSys.children.find(i => i.id === _id);
      let str = currData.langs.find(lang => lang.langId == 1);
      this.menuName = str ? str.name : "";
      this.activeMenu = {...currData, lang: this.menuName};
      // console.log("当前数据", this.activeMenu);
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
    // 子菜单拖拽排序
    // sortRow() {
    //   const Rbody = document.querySelector(".el-table tbody");
    //   // console.log(Rbody);
    //   // console.log('指向vue', this);
    //   const _this = this;
    //   Sortable.create(Rbody, {
    //     draggable: "tr", // 允许拖拽的项目类名
    //     handle: "td",
    //     async onEnd({ newIndex, oldIndex }) {
    //       // console.log(_this.sysMenu[oldIndex]);
    //       // console.log(_this.sysMenu[newIndex]);
    //       let data, ids, first;
    //       if (oldIndex < newIndex) {
    //         //自下而上
    //         data = _this.sysMenu.slice(oldIndex, newIndex + 1);
    //         ids = data.map((i) => i.id);
    //         first = ids.splice(0, 1)[0];
    //         ids.push(first);
    //       } else {
    //         //自上而下
    //         data = _this.sysMenu.slice(newIndex, oldIndex + 1);
    //         ids = data.map((i) => i.id);
    //         first = ids.splice(data.length - 1, 1)[0];
    //         ids.unshift(first);
    //       }
    //       let sortArr = data.map((i, j) => {
    //         return {
    //           id: ids[j],
    //           seq: i.seq
    //         };
    //       });
    //       // console.log('拖拽数据',sortArr);
    //       await MenuApi.sortApi(sortArr);
    //       await _this.getAllList();
    //       _this.$message({
    //         message: _this.$t("menu.confirm.sortS"),
    //         type: "success",
    //         duration: 2000
    //       });
    //       _this.sortRow();
    //       parent.postMessage(
    //           {
    //             type: "menu",
    //             menuMsg: Math.random()
    //           },
    //           parent.origin
    //       );
    //     }
    //   });
    // },
    // sortMenu() {
    //   // 要找拖拽的父元素！！！
    //   const Rbody = document.querySelector(".el-tabs__nav-scroll .el-tabs__nav");
    //   // console.log(Rbody);
    //   const _this = this;
    //   Sortable.create(Rbody, {
    //     // ghostClass: "blue-background-class", // drop placeholder的css类名
    //     handle: ".el-tabs__item",
    //     async onEnd({ newIndex, oldIndex }) {
    //       // console.log(newIndex, oldIndex);
    //       let data, ids, first;
    //       if (oldIndex < newIndex) {
    //         //自上而下
    //         // console.log(
    //         //   "排序前id",
    //         //   _this.menuList.map(i => i.id)
    //         // );
    //         // console.log(
    //         //   "seq",
    //         //   _this.menuList.map(i => i.seq)
    //         // );
    //         data = _this.menuList.slice(oldIndex, newIndex + 1);
    //         ids = data.map(i => i.id);
    //         // console.log(ids, data.map(i => i.seq), '排序前');
    //         first = ids.splice(0, 1)[0];
    //         ids.push(first);
    //       } else {
    //         //自下而上
    //         // console.log(
    //         //   "排序前id",
    //         //   _this.menuList.map(i => i.id)
    //         // );
    //         // console.log(
    //         //   "seq",
    //         //   _this.menuList.map(i => i.seq)
    //         // );
    //         data = _this.menuList.slice(newIndex, oldIndex + 1);
    //         ids = data.map(i => i.id);
    //         // console.log(ids, data.map(i => i.seq), '排序前');
    //         first = ids.splice(data.length - 1, 1)[0];
    //         ids.unshift(first);
    //       }
    //       let sortArr = data.map((i, j) => {
    //         return {
    //           id: ids[j],
    //           seq: i.seq
    //         };
    //       });
    //       // console.log("排序后", sortArr);
    //       // console.log('tabs拖拽数据',sortArr);
    //       await MenuApi.sortApi(sortArr).then(_this.getAllList());
    //       _this.$message({
    //         message: "排序成功",
    //         type: "success",
    //         duration: 1000
    //       });
    //       parent.postMessage(
    //           {
    //             type: "menu",
    //             menuMsg: Math.random()
    //           },
    //           parent.origin
    //       );
    //       _this.sortMenu();
    //     }
    //   });
    // },
    delMenu(_id) {
      this.$confirm(this.$t("common.delTitle"), this.$t("common.prompt"), {
        type: "warning"
      })
          .then(async () => {
            try {
              await MenuApi.delById(_id);
              this.$info(this.$t("common.delSuccess")).then(() => this.getAllList());
              parent.postMessage(
                  {
                    type: "menu",
                    menuMsg: Math.random()
                  },
                  parent.origin
              );
            } catch (error) {
              this.$error(this.$t("common.delFail"));
            }
          })
          .catch(e => e);
    },
    delAll() {
      // console.log(this.selected);
      if (this.selected.length == 0) return;
      this.$confirm(this.$t("common.delTitle"), this.$t("common.prompt"), {
        type: "warning"
      })
          .then(async () => {
            try {
              await MenuApi.delete(this.selected.map(sel => sel.id));
              this.$info(this.$t("common.delSuccess")).then(() => this.getAllList());
              parent.postMessage(
                  {
                    type: "menu",
                    menuMsg: Math.random()
                  },
                  parent.origin
              );
            } catch (error) {
              console.log(error)
              // this.$error(this.$t("common.delFail"));
            }
          })
          .catch(e => e);
    }
  }
};
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
