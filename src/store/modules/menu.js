import { getMenu } from '@/api/menu'
import router from '@/router'

import { buildNestedMenu } from '@/utils/buildNestedMenu'

const state = {
  menuList: [], // 菜单列表
}

const mutations = {
  setMenuList(state, menuList) {
    state.menuList = menuList
  },

}

const actions = {
  async fetchMenu({ commit }) {
    try {
      const response = await getMenu()
      
      if (response.code === 200) {
        const nestedMenu = buildNestedMenu(response.data)
        commit('setMenuList', nestedMenu)

        // 动态添加路由
        const dynamicRoutes = deepList(nestedMenu || this.$store.state.menu.menuList)

        dynamicRoutes.forEach(routers => {
          router.addRoute('Layout', {
            path: routers.path,
            name: routers.name,
            component: routers.component,
            children: routers.children
          })
        });
      } else {
        // 处理错误情况，例如显示通知或记录日志
        console.error('Failed to fetch menu:', response.message)
      }
    } catch (error) {
      // 处理网络错误或其他异常
      console.error('Error fetching menu:', error)
    }
  }
}


/**
 * 动态添加路由
 *
 * @param menuPaths 菜单路径数组
 */
function deepList(list) {
  let routes = [];
  // 使用栈来模拟递归的调用栈
  const stack = [...list];

  while (stack.length) {
    const item = stack.pop();
    const route = {
      // 设置路由路径，如果路径以'/'开头则去掉
      path: item.path,
      name: item.name,
      // 动态导入组件
      component: () => import(`@/views/${item.component}`),
      meta: {
        title: item.title,
        requiresAuth: true
      },
      children: item.children ? deepList(item.children) : []
    };
    


    // 将构建好的路由对象推入routes数组中
    routes.push(route);
  }

  return routes;
}




export default {
  namespaced:true,
  state,
  actions,
  mutations,
}