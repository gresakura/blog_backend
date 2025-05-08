<template>
  <div class="home">
    <el-container>
      <el-aside class="menu-left">
        <el-menu
          @select="selectMenu"
          :default-active="currentIndexLight"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          :router="startRouter"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
        >
          <template v-for="item in menuList">
            <!-- 一级菜单项 -->
            <el-menu-item v-if="!item.children?.length" :key="item.path" :index="item.path">
              <i class="el-icon-menu"></i>
              <template #title>{{ item.title }}</template>
            </el-menu-item>

            <!-- 有子菜单的情况 -->
            <el-submenu v-else :key="item.path + '_sub'" :index="item.path">
              <template #title>
                <i class="el-icon-menu"></i>
                <span>{{ item.title }}</span>
              </template>

              <!-- 二级菜单容器 增加menu嵌套 -->
              <template v-for="child in item.children">
                <el-menu-item
                  v-if="!child.children?.length"
                  :key="child.path"
                  :index="child.path"
                  class="nest-menu-item"
                >
                  <i class="el-icon-location"></i>
                  <template #title>{{ child.title }}</template>
                </el-menu-item>

                <sidebar-item v-else :key="child.path + '_sub'" :item="child" />
              </template>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div class="btn-menu" @click="isCollapse = !isCollapse">
            <i
              :class="[isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold', 'icon', 'icon-fold']"
            ></i>
          </div>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <img :src="userInfo?.imgurl || require('@/assets/images/user.jpg')" alt="用户头像" />
              <span>{{ userInfo?.name }}</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">个人信息</el-dropdown-item>
              <el-dropdown-item command="2">修改信息</el-dropdown-item>
              <el-dropdown-item command="0">退出登入</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <userInfo ref="userInfo" @refresh="handleRefresh"></userInfo>
  </div>
</template>

<script>
import { getInfo } from '@/api/user'
import { mapActions, mapState } from 'vuex'

import userInfo from '@/views/popUp/userInfo.vue'

export default {
  data() {
    return {
      isCollapse: false, // 控制菜单折叠
      userInfo: null, // 用户信息
      currentIndexLight: '', // 高亮的菜单索引
      startRouter: true, // 是否开启路由模式
      btnuserInfo: false // 控制用户信息弹窗
    }
  },
  created() {
    this.loadUserData()
    // this.getMenuList()
    this.fetchMenuData()
  },
  methods: {
    ...mapActions(['fetchMenu']),
    fetchMenuData() {
      // this.fetchMenu()
      console.log('fetchMenuData', this.$route.path)
      this.currentIndexLight = this.$route.path
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    selectMenu(key, keyPath) {
      this.currentIndexLight = key
    },
    // 获取用户信息
    loadUserData() {
      // 从localStorage获取用户数据
      const userData = JSON.parse(localStorage.getItem('user')) || {}
      let params = {
        id: userData.id
      }
      getInfo(params)
        .then(res => {
          if (res.code === 200) {            
            localStorage.setItem('user', JSON.stringify(res.data))
            this.userInfo = {
              ...userData
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 退出登入
    getLogout() {
      this.$store
        .dispatch('user/logout')
        .then(() => {
          this.$notify.success({
            title: '登出成功', // 通知标题
            message: '欢迎下次登入', // 通知内容
            duration: 2000, // 显示时间，单位为毫秒，默认4500
            position: 'top-right' // 位置，可选 top-right, top-left, bottom-right, bottom-left
          })
          this.$router.push({ name: 'login' })
        })
        .catch(error => {})
    },
    // 获取用户信息弹窗
    getPopUpuserInfo(number) {
      this.btnuserInfo = true
      this.$nextTick(() => {
        this.$refs.userInfo.init(this.btnuserInfo, number)
      })
    },

    handleRefresh() {
      console.log('222')
      this.loadUserData()
      // location.reload()
    },

    handleCommand(command) {
      switch (command) {
        case '0':
          this.getLogout()
          break
        case '1':
          this.getPopUpuserInfo(1)
          break
        case '2':
          this.getPopUpuserInfo(2)
          break
      }
    }
  },
  computed: {
    ...mapState({
      menuList: state => state.menu.menuList
    }),
    headerLeft() {
      return this.isCollapse ? 64 : 200 // 假设折叠后宽度为50px
    }
  },
  components: {
    userInfo
  }
}
</script>

<style lang="less" scoped>
.home {
  display: flex;
  height: 100vh;
  overflow: hidden;
  .menu-left {
    flex: 0 0 auto;
    height: 100vh;
    overflow-y: auto; // 添加垂直滚动
    z-index: 99;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none; /* Chrome/Safari */
    }
    .el-menu-vertical-demo {
      min-height: 100vh;

      /* 隐藏子菜单滚动条 */
      ::v-deep .el-menu {
        &::-webkit-scrollbar {
          display: none;
        }
        scrollbar-width: none;
      }
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    background: yellow;
    z-index: 99;
    .btn-menu {
      display: flex;
      height: 100%;
      font-size: 30px;

      .icon-fold {
        line-height: 50px;
      }
    }
  }
  .main {
    width: 100%;
  }
}

.el-aside {
  width: auto !important;

}

.el-dropdown {
  cursor: pointer;
  margin-right: 40px;
}

.el-dropdown-link img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.el-dropdown-link span {
  color: rgb(210, 198, 191);
  margin-left: 10px;
}

.el-menu-vertical-demo {
  min-height: 100vh; // 始终维持全屏高度
  // transition: all 0.3s;

  &:not(.el-menu--collapse) {
    width: 200px;
  }
}

// 嵌套菜单项缩进
.el-menu-vertical-demo {
  .el-menu-item.nest-menu-item {
    padding-left: 60px !important;
  }

  .el-submenu__title {
    padding-left: 20px !important;
  }

  .el-menu-item {
    padding-left: 20px !important;
    min-width: auto;
  }
}
</style>
