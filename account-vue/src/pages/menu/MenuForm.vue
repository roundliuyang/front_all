<template>
  <el-dialog :title="$t('menu.menuForm.title')" :visible="showMenuForm" width="45%" @close="close">
    <!-- <el-form> 组件用于创建表单，并且可以使用 :rules 属性来定义表单项的验证规则。这些验证规则会在用户对表单项进行操作（如输入、失焦等）时被触发，用于验证用户输入的数据是否符合要求。-->
    <el-form
        ref="form"
        label-width="150px"
        :model="formData"
        :label-position="labelPosition"
        :rules="rules"
    >
      <el-form-item :label="$t(`menu.mk`)">
        <el-select v-model="formData.parentId">
          <el-option label="请选择" :value="0"></el-option>
          <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
     <!--
       这里是一个 <el-form-item> 组件，它表示一个表单项。:label="$t('menu.name')" 属性用于设置表单项的标签，其中 $t('menu.name') 
       表示从国际化资源中获取名为 "menu.name" 的文本，并将其作为标签显示在表单项前面。:prop="name" 属性用于设置表单项的字段名，它与表单的验证规则相关联，
       以便在表单验证时能够根据字段名查找对应的验证规则。
     -->
      <el-form-item :label="$t('menu.name')" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('menu.lang')">
        <el-input v-model="formData.lang"></el-input>
      </el-form-item>
      <el-form-item :label="$t('menu.menuForm.type')" prop="type">
        <el-select v-model="formData.type" :placeholder="$t('common.pleasechoose')">
          <el-option :label="$t('menu.menuForm.type1')" :value="1"></el-option>
          <el-option :label="$t('menu.menuForm.type2')" :value="2"></el-option>
          <el-option :label="$t('menu.menuForm.type3')" :value="3"></el-option>
          <el-option :label="$t('menu.menuForm.type4')" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="URL" prop="url">
        <el-input v-model="formData.url"></el-input>
      </el-form-item>
      <!-- <el-form-item label="排序">
        <el-input v-model="formData.sort"></el-input>
      </el-form-item> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">{{ $t("common.return") }}</el-button>
      <el-button type="primary" @click="submit">{{ $t("common.ok") }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import MenuApi from "@/api/MenuApi";
export default {
  name: "MenuForm",
  data() {
    return {
      labelPosition: "right",
      // formData: JSON.parse(JSON.stringify(this.value)),
      formData: this.value,
      rules: {
        name: [{ required: true, message: this.$t("menu.menuForm.nameV"), trigger: "blur" }],
        type: [{ required: true, message: this.$t("menu.menuForm.typeV"), trigger: "change" }],
        url: [{ required: true, message: this.$t("menu.menuForm.urlV"), trigger: "blur" }]
      },
      module: ""
    };
  },
  watch: {
    value(val) {
      this.formData = val;
    }
  },
  // props 是用于接收父组件传递给子组件的数据的一个选项。通过定义 props，子组件可以接收来自父组件的数据，并在自身内部使用这些数据。
  props: {
    showMenuForm: Boolean,
    value: Object,
    parentId: Number,
    menuList: Array
  },
  methods: {
    async submit() {
      // 使用 await 关键字等待表单的验证。this.$refs.form 表示获取了表单组件的引用，然后调用 validate() 方法对表单进行验证。await 关键字会等待验证完成后再执行后续的代码。
      await this.$refs.form.validate();
      // 判断表单数据中的 id 属性是否小于 1，如果小于 1，则表示当前操作是创建新菜单。
      if (this.formData.id < 1) {
        // create
        // this.formData.parentId = this.parentId;
        //id和mennuId有后端进行创建返回
        // 如果是创建新菜单，准备菜单的多语言数据。根据表单数据中的名称和语言创建两条语言数据，分别是中文和英文。
        let list = [
          { name: this.formData.name, menuId: this.formData.id, langId: 0 },
          { name: this.formData.lang || "", menuId: this.formData.id, langId: 1 }
        ];
        // 将准备好的多语言数据赋值给表单数据中的 langs 属性。
        this.formData.langs = list;
        // console.log(this.formData)
        try {
          // 删除表单数据中的 lang 属性，因为它已经被包含在多语言数据中。
          delete this.formData.lang;
          let list = this.formData;
          // 调用接口的方法 MenuApi.addMenu() 来添加新的菜单数据。
          await MenuApi.addMenu(list);
          await this.$info(this.$t("common.addSuccess"));
          parent.postMessage(
              {
                type: "menu",
                menuMsg: Math.random()
              },
              parent.origin
          );
          //   console.log(parent.origin);
          // 触发父组件传入的 change 事件，并传递 this.formData.parentId 作为参数。
          this.$emit("change", this.formData.parentId);
          // 关闭表单。
          this.close();
        } catch (error) {
          this.$error(this.$t("common.addFail"));
        }
      } else {
        // update 更新
        try {
          // 检查多语言数据是否已经包含了两条数据，如果没有，则表示需要创建两条新的多语言数据。
          if (this.formData.langs.length < 2) {
            // 根据表单数据中的名称和语言创建两条语言数据，分别是中文和英文，并将它们赋值给表单数据的 langs 属性。
            let list = [
              { name: this.formData.name, menuId: this.formData.id, langId: 0 },
              { name: this.formData.lang || "", menuId: this.formData.id, langId: 1 }
            ];
            this.formData.langs = list;
          // 如果多语言数据已经包含了两条数据，则更新已有的数据。  
          } else {
            let ch = this.formData.langs.find(lang => lang.langId == 0);
            ch.name = this.formData.name;
            ch.menuId = this.formData.id;
            let en = this.formData.langs.find(lang => lang.langId == 1);
            en.name = this.formData.lang;
            en.menuId = this.formData.id;
          }
          //删除表单数据中的 lang 属性，因为它已经被包含在多语言数据中。
          delete this.formData.lang
          //调用接口的方法 MenuApi.updateById() 来更新菜单数据。
          await MenuApi.updateById(this.formData);
          await this.$info(this.$t("common.editsuccess"));
          parent.postMessage(
              {
                type: "menu",
                menuMsg: Math.random()
              },
              parent.origin
          );
          // console.log(this.formData)
          // 触发父组件传入的 change 事件，并传递 this.formData.parentId 作为参数。
          this.$emit("change", this.formData.parentId);
          // 关闭表单。
          this.close();
        } catch (error) {
          this.$error(this.$t("common.editfail"));
          await MenuApi.list(this.formData);
        }
      }
    },
    // 定义了一个名为 close() 的方法，用于关闭表单。
    close() {
      // 触发父组件传入的 update:showMenuForm 事件，并传递 false 作为参数，以隐藏菜单表单。
      this.$emit("update:showMenuForm", false);
      // 重置表单，清空表单中的数据和验证状态。
      this.$refs.form.resetFields();
    }
  },
  mounted() {
    // console.log(this.formData);
    // if (this.formData.parentId == 0) this.formData.parentId = this.parentId;
  }
};
</script>
<style lang="scss" scoped>
/deep/ .el-input {
  width: 80% !important;
}
/deep/ .el-select {
  width: 100%;
}
</style>
