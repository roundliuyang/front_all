<template>
  <el-dialog :title="$t('menu.menuForm.title')" :visible="showMenuForm" width="45%" @close="close">
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
  props: {
    showMenuForm: Boolean,
    value: Object,
    parentId: Number,
    menuList: Array
  },
  methods: {
    async submit() {
      await this.$refs.form.validate();
      if (this.formData.id < 1) {
        //修改
        // create
        // this.formData.parentId = this.parentId;
        //id和mennuId有后端进行创建返回
        let list = [
          { name: this.formData.name, menuId: this.formData.id, langId: 0 },
          { name: this.formData.lang || "", menuId: this.formData.id, langId: 1 }
        ];
        this.formData.langs = list;
        // console.log(this.formData)
        try {
          delete this.formData.lang;
          let list = this.formData;
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
          this.$emit("change", this.formData.parentId);
          this.close();
        } catch (error) {
          this.$error(this.$t("common.addFail"));
        }
      } else {
        // update 更新
        try {
          if (this.formData.langs.length < 2) {
            let list = [
              { name: this.formData.name, menuId: this.formData.id, langId: 0 },
              { name: this.formData.lang || "", menuId: this.formData.id, langId: 1 }
            ];
            this.formData.langs = list;
          } else {
            let ch = this.formData.langs.find(lang => lang.langId == 0);
            ch.name = this.formData.name;
            ch.menuId = this.formData.id;
            let en = this.formData.langs.find(lang => lang.langId == 1);
            en.name = this.formData.lang;
            en.menuId = this.formData.id;
          }
          delete this.formData.lang;
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
          this.$emit("change", this.formData.parentId);
          this.close();
        } catch (error) {
          this.$error(this.$t("common.editfail"));
          await MenuApi.list(this.formData);
        }
      }
    },
    close() {
      this.$emit("update:showMenuForm", false);
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

