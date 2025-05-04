<template>
  <el-dialog
    title="个人信息"
    :visible.sync="btnuserInfo"
    :before-close="popUpOK"
    :close-on-press-escape="true"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    width="30%"
    center
  >
    <template v-if="isGetPost == 1">
      <el-descriptions :column="1">
        <el-descriptions-item label="头像">
          <!-- <el-link type="primary" :underline="false">点击上传</el-link> -->
          <!-- <img :src="userInfo.imgurl || require('@/assets/images/user.jpg')" alt="" /> -->
          <el-image
            style="width: 50px; height: 50px"
            :src="userInfo?.imgurl || require('@/assets/images/user.jpg')"
            :preview-src-list="[userInfo?.imgurl || require('@/assets/images/user.jpg')]"
          >
          </el-image>
        </el-descriptions-item>
        <el-descriptions-item label="用户名">{{ userInfo?.name || '空' }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{ userInfo?.email }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{
          userInfo?.gender == 0 ? '男' : '女'
        }}</el-descriptions-item>
        <el-descriptions-item label="注册时间">{{
          userInfo?.create_time | formatDateTime
        }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{
          userInfo?.update_time | formatDateTime
        }}</el-descriptions-item>
      </el-descriptions>
    </template>
    <template v-if="isGetPost == 2">
      <el-form label-width="55px" :model="formData">
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名" v-model="formData.name" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input placeholder="请输入邮箱" v-model="formData.email" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="formData.gender">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            :action="this.updata.baseURL"
            :headers="this.updata.headers"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
    </template>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="popUpOK">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { updataUserInfo } from '@/api/user'
export default {
  data() {
    const updata = {
      baseURL: process.env.VUE_APP_BASE_API + '/upload-image',
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }
    return {
      updata,
      userInfo: null,
      formData: {
        name: null,
        email: null,
        gender: '0'
      },
      isGetPost: null, // 查看还是修改
      btnuserInfo: false, // 控制弹窗

      imageUrl: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    init(btnuserInfo, isGetPost) {
      this.isGetPost = isGetPost
      this.btnuserInfo = btnuserInfo
      this.userInfo = JSON.parse(localStorage.getItem('user'))
      this.formData = {
        name: this.userInfo.name,
        email: this.userInfo.email,
        gender: this.userInfo.gender + ''
      }
      this.imageUrl = this.userInfo.imgurl
    },
    popUpOK() {
      if (this.isGetPost === 2) {
        // 修改的请求逻辑
        const data = {
          userId: this.userInfo.id,
          name: this.formData.name,
          email: this.formData.email,
          gender: this.formData.gender,
          imgurl: this.imageUrl || ''
        }
        updataUserInfo(data.userId, data).then(res => {
          if (res.code === 200) {
            this.$emit('refresh')
          }
        }).catch(err => {
          console.log(err)
        })

        console.log('isGetPost', this.isGetPost)
        // this.$emit('refresh')
      }
      this.btnuserInfo = false
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      if (res.data.res.status === 200) {
        this.$notify.success({
                title: '成功',
                message: '图片上传成功',
                duration: 2000,
                position: 'top-right'
        })
        this.imageUrl = res.data.url
      }
    },
    beforeAvatarUpload(file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
      const isAllowedType = allowedTypes.includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isAllowedType) {
        this.$message.error('上传头像图片只能是 JPG, PNG！')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isAllowedType && isLt2M
    },
    setUserInfo() {}
  }
}
</script>

<style lang="less" scoped>
img {
  width: 40px;
  height: 40px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px solid #ccc;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
