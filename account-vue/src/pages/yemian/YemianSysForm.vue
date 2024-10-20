<template>
  <div>
    <el-form
      ref="form"
      label-width="100px"
      :model="formData"
      :label-position="labelPosition"
      :rules="rules"
    >
      <el-form-item :label="$t('menu.name')" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('menu.lang')">
        <el-input v-model="formData.lang"></el-input>
      </el-form-item>
      <el-form-item :label="$t('menu.menuForm.type')" prop="type">
        <el-select
          v-model="formData.type"
          :placeholder="$t('common.pleasechoose')"
        >
          <el-option :label="$t('menu.menuForm.type1')" :value="1"></el-option>
          <el-option :label="$t('menu.menuForm.type2')" :value="2"></el-option>
          <el-option :label="$t('menu.menuForm.type3')" :value="3"></el-option>
          <el-option :label="$t('menu.menuForm.type4')" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="URL" prop="url">
        <el-input v-model="formData.url" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="add" @click="submit">{{ $t("common.ok") }}</el-button>
        <el-button @click="delSys" class="del">{{
          $t("common.delete")
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import MenuApi from "@/api/MenuApi";

export default {
  name: "YemianSysForm",
  data() {
    return {
      labelPosition: "top",
      // formData: { ...this.value, lang: this.sysName },
      formData: JSON.parse(JSON.stringify(this.value)),
      // lang: this.sysName,
      rules: {
        name: [
          {
            required: true,
            message: this.$t("menu.menuForm.nameV"),
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: this.$t("menu.menuForm.typeV"),
            trigger: "change",
          },
        ],
        url: [
          {
            required: true,
            message: this.$t("menu.menuForm.urlV"),
            trigger: "blur",
          },
        ],
      },
    };
  },
  props: {
    value: Object,
    // sysName: String,
  },
  methods: {
    async submit() {
      this.formData.parentId = -1;
      await this.$refs.form.validate();

      if (this.formData.id === 0) {
        try {
          let list = [
            { name: this.formData.name, menuId: this.formData.id, langId: 0 },
            { name: this.formData.lang, menuId: this.formData.id, langId: 1 },
          ];
          this.formData.langs = list;
          const data = await MenuApi.addMenu(this.formData);
          // console.log(this.formData);
          this.$info(this.$t("menu.confirm.addSysS")).then(() =>
            this.$emit("change", data.id)
          );
          parent.postMessage(
            {
              type: "menu",
              menuMsg: Math.random(),
            },
            parent.origin
          );
        } catch (error) {
          this.$error(this.$t("menu.confirm.addSysF"));
        }
      } else {
        // 修改系统
        try {
          // console.log(this.formData);
          //   let list = [{ name: this.formData.name, menuId: this.formData.id, langId: 0 }, { name: this.lang, menuId: this.formData.id, langId: 1 }]
          //   this.formData.langs = list
          if (this.formData.langs.length < 2) {
            // alert("要创建一下langs")
            let list = [
              { name: this.formData.name, menuId: this.formData.id, langId: 0 },
              { name: this.formData.lang, menuId: this.formData.id, langId: 1 },
            ];
            this.formData.langs = list;
          } else {
            this.formData.langs.find(
              (lang) => lang.langId == 1
            ).name = this.formData.lang;
            this.formData.langs.find(
              (lang) => lang.langId == 0
            ).name = this.formData.name;
          }

          await MenuApi.updateById(this.formData);
          this.$info(this.$t("menu.confirm.editSysS")).then(() => {
            this.$emit("change", this.formData.id);
          });
        } catch (error) {
          // console.log(error, data, 1);
          this.$error(this.$t("menu.confirm.editSysF"));
        }
      }
    },
    delSys() {
      this.$confirm(
        this.$t("menu.confirm.delSysMsg"),
        this.$t("common.prompt"),
        {
          type: "warning",
        }
      )
        .then(async () => {
          try {
            await MenuApi.delById(this.formData.id);
            await this.$info(this.$t("menu.confirm.delSysS"));
            this.$emit("change", 1);
          } catch (error) {
            this.$error(this.$t("menu.confirm.delSysF"));
          }
        })
        .catch((e) => e);
    },
    close() {
      this.$emit("close");
    },
  },
};
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
