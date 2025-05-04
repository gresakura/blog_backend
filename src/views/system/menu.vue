<template>
  <div class="menu-management container">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb> -->
    <el-card class="top">
      <div class="tableQuery">
        <el-form :model="formData" ref="formData" class="formData" label-width="70px">
          <el-form-item prop="title" label="菜单名称">
            <el-input v-model="formData.title" placeholder="请输入菜单名称"></el-input>
          </el-form-item>
          <el-form-item prop="is_disable" label="状态">
            <el-select v-model="formData.is_disable" placeholder="请选择状态">
              <el-option label="启用" value="0"></el-option>
              <el-option label="禁用" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="btnMargin">
            <el-button type="primary" @click="getFormData">查询</el-button>
            <el-button @click="resetForm('formData')">重置</el-button>
          </el-form-item>
        </el-form>
        <div class="addReset">
          <el-button type="primary" icon="el-icon-plus" @click="getAddMenu(true, '新增')"
            >新增</el-button
          >
          <i @click="getFormData" class="el-icon-refresh-left iconReset"></i>
        </div>
      </div>
    </el-card>
    <el-card>
      <el-table
        v-loading="loading"
        :data="currentPageData"
        row-key="id"
        type="expand"
        align="center"
      >
        <el-table-column align="center" prop="title" label="菜单名称" width="150">
        </el-table-column>
        <el-table-column align="center" prop="element_icon" label="图标" width="150">
          <template slot-scope="scope">
            <i :class="scope.row.element_icon" style="font-size: 1.3rem"></i>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="order_num" label="排序" width="130">
        </el-table-column>
        <el-table-column align="center" prop="component" label="组件路径" width="150">
        </el-table-column>
        <el-table-column align="center" prop="is_disable" label="状态" width="150">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.is_disable === 0" type="success">正常</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="create_time" label="创建时间" width="160">
          <template slot-scope="scope">
            {{ scope.row.create_time | formatDateTime }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="create_time" label="修改时间" width="160">
          <template slot-scope="scope">
            {{ scope.row.update_time | formatDateTime }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              size="mini"
              @click="getAddMenu(true, '修改', scope.row)"
              >修改</el-button
            >
            <el-button
              type="text"
              icon="el-icon-plus"
              size="mini"
              @click="getAddMenu(true, '新增', scope.row)"
              >新增</el-button
            >
            <el-button @click="delectMenu(scope.row)" type="text" icon="el-icon-delete" size="mini"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="display: flex; justify-content: flex-end; margin-top: 10px"
        small
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handlePageChange"
      >
      </el-pagination>
    </el-card>
    <addMenu ref="addMenu"></addMenu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { deleteMenu } from '@/api/menu'
import { buildNestedMenu } from '@/utils/buildNestedMenu'
import { getMenu } from '@/api/menu'
import addMenu from '@/views/popUp/addMenu/index.vue'
export default {
  data() {
    return {
      formData: {
        title: null,
        is_disable: null
      },
      menuList: [],
      loading: false,
      currentPage: 1, // 当前页码
      pageSize: 6, // 每页条数
      total: 0
    }
  },
  components: {
    addMenu
  },
  created() {
    this.getMenuList()
  },
  methods: {
    /**
     * 重置表单
     *
     * @param {string} formName - 表单引用名称
     */
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.getMenuList()
    },
    /**
     * 获取表单数据的方法
     *
     * @returns 无返回值
     */
    getFormData() {
      this.getMenuList()
    },
    /**
     * 获取菜单列表
     *
     * 通过调用getMenu函数并传入表单数据，获取菜单列表并处理返回结果
     */
    getMenuList() {
      let params = {
        ...this.formData
      }
      this.loading = true
      getMenu(params)
        .then(res => {
          if (res.code === 200) {
            this.menuList = buildNestedMenu(res.data)
            this.total = this.menuList.length // 设置总数据条数
            this.loading = false
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    getAddMenu(isPopup, type, scope) {
      this.$nextTick(() => {
        this.$refs.addMenu.init(isPopup, type, scope, this.menuList)
      })
    },
    handlePageChange(page) {
      this.currentPage = page // 更新当前页码
    },
    delectMenu(data) {
      this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log(data)
          deleteMenu(data.id).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getMenuList()
              this.$store.dispatch('menu/fetchMenu')
              
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    // 计算当前页数据
    currentPageData() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.menuList.slice(start, end)
    }
  }
}
</script>

<style lang="less" scoped>
.menu-management {
  /*   display: flex;
  flex-direction: column; */
  flex: 1;
  overflow-y: auto; /* 允许垂直滚动 */
  .tableQuery {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .formData {
      display: flex;
    }
    .addReset {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
      .iconReset {
        font-size: 20px;
        cursor: pointer;
        &:hover {
          color: red;
        }
      }
    }
  }

  .top {
    margin: 10px 0;
  }
}

/* 在<style>标签内添加 */
.container {
  overflow: auto; /* 允许内容溢出时滚动 */
}

/deep/ .btnMargin > .el-form-item__content {
  margin-left: 20px !important;
}
</style>
