<template>
  <el-dialog
    :title="this.type"
    center
    :visible.sync="addMenuDialog"
    width="45%"
    :before-close="handleClose"
  >
    <el-form :model="formData" label-width="70px">
      <el-form-item label="上级菜单">
        <!--        <el-input v-model="formData.parentId" placeholder="请输入上级菜单"></el-input>-->
        <el-select
          class="main-select-tree"
          ref="selectRef"
          v-model="selectTitle"
          style="width: 100%"
          clearable
          @clear="clearSelectInput"
        >
          <el-option
            v-for="item in menuList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
            style="display: none"
          />
          <el-tree
            class="my_select_Tree"
            ref="treeRef"
            :data="menuList"
            :props="defaultProps"
            node-key="id"
            highlight-current
            @node-click="handleNodeClick"
            :expand-on-click-node="true"
            default-expand-all
          />
        </el-select>
      </el-form-item>
      <div class="inputLayout">
        <el-form-item label="菜单标题">
          <el-input v-model="formData.title" placeholder="请输入菜单标题"></el-input>
        </el-form-item>
        <el-form-item label="显示排序">
          <el-input v-model="formData.order_num" type="number" placeholder=""></el-input>
        </el-form-item>
      </div>
      <div class="inputLayout">
        <el-form-item label="菜单图标">
          <!-- <el-input v-model="formData.icon" placeholder="请输入菜单标题"></el-input> -->
          <el-popover
            width="460"
            title="选择图标"
            trigger="click"
            placement="bottom"
            v-model="popoverVisible"
          >
            <el-tabs v-model="activeKey">
              <div class="icon-list">
                <el-tooltip
                  v-for="(icon, index) in icons"
                  :key="index"
                  content="点击选择图标"
                  placement="top"
                >
                  <span @click="addIcon(icon)">
                    <i :class="icon" style="font-size: 1.3rem"></i>
                  </span>
                </el-tooltip>
              </div>
            </el-tabs>
            <div slot="reference">
              <el-input v-model="formData.icon" placeholder="选择图标">
                <template slot="prefix">
                  <i v-if="formData.icon" :class="formData.icon" style="font-size: 1.3rem"></i>
                </template>
              </el-input>
            </div>
          </el-popover>
        </el-form-item>
        <el-form-item label="控制权限">
          <el-input v-model="formData.roleId" placeholder=""></el-input>
        </el-form-item>
      </div>
      <el-form-item label="路由类型">
        <el-radio-group v-model="formData.urlType">
          <el-radio label="0">普通</el-radio>
          <el-radio label="1">目录</el-radio>
          <el-radio label="2">内嵌</el-radio>
          <el-radio label="3">外链</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="inputLayout">
        <template v-if="formData.urlType === '0'">
          <el-form-item label="访问地址">
            <el-input v-model="formData.path" placeholder="访问地址"></el-input>
          </el-form-item>
          <el-form-item label="组件地址">
            <el-input v-model="formData.component" placeholder="组件地址"></el-input>
          </el-form-item>
        </template>
        <template v-if="formData.urlType === '1'">
          <el-form-item label="访问地址">
            <el-input v-model="formData.path" placeholder="访问地址"></el-input>
          </el-form-item>
          <el-form-item label="重定向url">
            <el-input v-model="formData.redirect" placeholder="重定向地址"></el-input>
          </el-form-item>
        </template>
        <template v-if="formData.urlType === '2'">
          <el-form-item label="访问地址">
            <el-input v-model="formData.path" placeholder="访问地址"></el-input>
          </el-form-item>
          <el-form-item label="内嵌url">
            <el-input v-model="formData.EmbeddedUrl" placeholder="内嵌网页地址"></el-input>
          </el-form-item>
        </template>
        <template v-if="formData.urlType === '3'">
          <el-form-item label="跳转的url">
            <el-input v-model="formData.url" placeholder="跳转的url"></el-input>
          </el-form-item>
          <el-form-item label="跳转模式">
            <el-select v-model="formData.target">
              <el-option
                v-for="item in target"
                :key="item.id"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </template>
      </div>
      <div class="inputLayout">
        <el-form-item label="固定标签">
          <el-radio-group v-model="formData.affix">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="显示状态">
          <el-radio-group v-model="formData.hide_in_menu">
            <el-radio :label="0">显示</el-radio>
            <el-radio :label="1">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <div class="inputLayout">
        <el-form-item label="是否保活">
          <el-radio-group v-model="formData.keep_alive">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单状态">
          <el-radio-group v-model="formData.is_deleted">
            <el-radio :label="0">正常</el-radio>
            <el-radio :label="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addMenuDialog = false">取 消</el-button>
      <el-button type="primary" @click="getAddMenuInfo">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getAddMenu } from '@/api/menu'
import icons from '@/views/popUp/addMenu/icons'
export default {
  data() {
    return {
      icons,
      addMenuDialog: false,
      type: '',
      menuList: null,
      selectTitle: null,
      formData: {
        parent_id: null,
        title: null,
        roleId: null,
        order_num: 0,
        icon: null,
        routerType: 0,
        component: null,
        redirect: null,
        path: null,
        url: null,
        target: null,
        affix: 0,
        keep_alive: 0,
        hide_in_menu: 0,
        is_deleted: 0,
        urlType: '0',
        EmbeddedUrl: null
      },
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      target: [
        {
          id: 0,
          value: '_self',
          label: '_self'
        },
        {
          id: 1,
          value: '_blank',
          label: '_blank'
        },
        {
          id: 2,
          value: '_parent',
          label: '_parent'
        }
      ],
      popoverVisible: false,
      activeKey: '1'
    }
  },
  created() {
    this.init()
  },
  methods: {
    init(isPopup, type, scope = null, menuList) {
      this.addMenuDialog = isPopup
      this.type = type
      this.menuList = menuList
      this.selectTitle = null

      const defaultFormData = {
        parent_id: null,
        title: null,
        roleId: null,
        order_num: 0,
        icon: null,
        routerType: 0,
        component: null,
        redirect: null,
        path: null,
        url: null,
        target: null,
        affix: 0,
        keep_alive: 0,
        hide_in_menu: 0,
        is_deleted: 0,
        urlType: '0',
        EmbeddedUrl: null
      }

      this.formData = scope
        ? { ...defaultFormData, ...scope, title: type !== '新增' ? scope.title : null }
        : { ...defaultFormData }

      if (scope?.parent_id) {
        const parent = menuList.find(item => item.id === scope.parent_id)
        if (parent) {
          this.selectTitle = parent.title
        }
      }
    },

    handleClose() {
      this.addMenuDialog = false
    },

    // 清空事件
    clearSelectInput() {
      this.formData.parent_id = null
    },
    // 点击事件
    handleNodeClick(node) {
      console.log('node', node)
      this.selectTitle = node.title
      this.formData.parent_id = node.id
      this.$refs.selectRef.blur()
      /*this.value = node.className;

      this.$emit("clickSelectTree", node);*/
    },
    getAddMenuInfo() {
      const params = {
        ...this.formData
      }

      // 根据urlType校验必填字段
      const requiredFields = {
        0: ['title', 'component', 'path'],
        1: ['title', 'path']
      }

      const missingFields = requiredFields[params.urlType].filter(field => !params[field])
      console.log('missingFields', missingFields)

      if (missingFields.length > 0) {
        return this.$message.warning(`请填写${missingFields.join('、')}`)
      }

      console.log('params', params)
      getAddMenu(params)
        .then(res => {
          if (res.code === 200) {
            this.$notify.success({
              title: '添加成功', // 通知标题
              message: '菜单添加成功', // 通知内容
              duration: 2000, // 显示时间，单位为毫秒，默认4500
              position: 'top-right' // 位置，可选 top-right, top-left, bottom-right, bottom-left
            })
            this.addMenuDialog = false // 关闭弹出框
          }
        })
        .catch(err => {
          console.log('err', err)

          this.$message.warning(err.response.data.message)
        })
    },
    addIcon(icon) {
      this.formData.icon = icon
      this.popoverVisible = false // 关闭弹出框
    }
  }
}
</script>

<style lang="less" scoped>
.inputLayout {
  display: flex;
  justify-content: space-between;
}
</style>
