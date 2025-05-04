<template>
  <div class="notification-example">
    <h3>Notification 示例</h3>
    <el-button type="success" @click="showSuccessNotify">成功通知</el-button>
    <el-button type="warning" @click="showWarningNotify">警告通知</el-button>
    <el-button type="info" @click="showInfoNotify">信息通知</el-button>
    <el-button type="danger" @click="showErrorNotify">错误通知</el-button>
    <el-button @click="showCustomNotify">自定义通知</el-button>
    <el-button @click="showHTMLNotify">HTML 内容通知</el-button>
  </div>
</template>

<script>
export default {
  name: 'NotificationExample',
  methods: {
    // 成功通知
    showSuccessNotify() {
      this.$notify({
        title: '成功',
        message: '这是一条成功的提示消息',
        type: 'success',
        duration: 2000
      });
    },
    
    // 警告通知
    showWarningNotify() {
      this.$notify({
        title: '警告',
        message: '这是一条警告的提示消息',
        type: 'warning'
      });
    },
    
    // 信息通知
    showInfoNotify() {
      this.$notify.info({
        title: '消息',
        message: '这是一条普通的提示消息'
      });
    },
    
    // 错误通知
    showErrorNotify() {
      this.$notify.error({
        title: '错误',
        message: '这是一条错误的提示消息',
        duration: 0 // 不会自动关闭
      });
    },
    
    // 自定义位置
    showCustomNotify() {
      this.$notify({
        title: '自定义位置',
        message: '右下角弹出的消息',
        position: 'bottom-right'
      });
    },
    
    // HTML 内容
    showHTMLNotify() {
      this.$notify({
        title: 'HTML 片段',
        dangerouslyUseHTMLString: true,
        message: '<strong>这是 <i>HTML</i> 片段</strong>',
        type: 'info'
      });
    }
  }
}
</script>

<style scoped>
.notification-example {
  padding: 20px;
}
.notification-example .el-button {
  margin: 5px;
}
</style>