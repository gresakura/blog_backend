// 辅助函数：构建嵌套菜单
export function buildNestedMenu(flatMenu) {

  if (flatMenu.length === 1) {
    return flatMenu;
  }

  // 创建一个映射，用于快速查找菜单项
  const menuMap = flatMenu.reduce((map, item) => {
    map[item.id] = item;
    return map;
  }, {});

  // 构建嵌套结构
  const nestedMenu = flatMenu
    .filter(item => item.parent_id === null) // 找出所有根菜单项
    .map(item => {

      // 递归构建子菜单
      const children = flatMenu
        .filter(child => child.parent_id === item.id)
        .map(child => ({
          ...child,
          children: buildNestedMenu(flatMenu.filter(subChild => subChild.parent_id === child.id))
        }));

      return {
        ...item,
        children: children.length > 0 ? children : undefined
      };
    });

  return nestedMenu;
}