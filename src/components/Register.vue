<template>
    <div>
    <el-card class="box-card">
        <div class="login_page fillcontain">
            <div class="register-top">注册页面</div>
            <transition name="form-fade" mode="in-out">
                <div class="myre">
                    <section class="form_contianer" v-show="showLogin">
                        <el-form :model="sysUser" :rules="rules">
                            <el-form-item label="用户名:" label-width="100px" class="redItem">
                                <el-input v-model="sysUser.userId" auto-complete="new-password"></el-input>
                            </el-form-item>
                            <el-form-item label="学号:" label-width="100px" class="redItem">
                                <el-input  v-model="sysUser.stuId" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="姓名:" label-width="100px" class="redItem">
                                <el-input v-model="sysUser.stuName" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="密码:" prop="userPwd" label-width="100px" class="redItem">
                                <el-input type="password" v-model="sysUser.userPwd" auto-complete="new-password"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码:" prop="checkPwd" label-width="100px" class="redItem">
                                <el-input  type="password" v-model="sysUser.checkPwd" auto-complete="new-password"></el-input>
                            </el-form-item>
                            <el-form-item label="专业:" label-width="100px" class="redItem">
                                <el-select v-model="sysUser.majorId" placeholder="请选择专业">
                                    <el-option label="软件工程" value="大数据与软件工程学院"></el-option>
                                    <el-option label="数学" value="数学"></el-option>
                                    <el-option label="数字与媒体" value="数字与媒体"></el-option>
                                    <el-option label="电子信息工程" value="电子信息工程"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="学院:" label-width="100px" class="redItem">
                                <el-select v-model="sysUser.instId" placeholder="请选择学院">
                                    <el-option label="大数据与软件工程学院" value="大数据与软件工程学院"></el-option>
                                    <el-option label="工商管理学院" value="工商管理学院"></el-option>
                                    <el-option label="师范学院" value="师范学院"></el-option>
                                    <el-option label="机化学院" value="机化学院"></el-option>
                                    <el-option label="电子信息工程学院" value="电子信息工程学院"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item  label="班级:" label-width="100px" class="redItem">
                                <el-input  v-model="sysUser.classId" ></el-input>
                            </el-form-item>
                            <el-form-item label="年级:" label-width="100px" class="redItem">
                                <el-input v-model="sysUser.grade"></el-input>
                            </el-form-item>
                            <el-form-item  label="电话:" label-width="100px" class="redItem">
                                <el-input v-model="sysUser.phone"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱:" label-width="100px" class="redItem">
                                <el-input type="textarea" v-model="sysUser.email"></el-input>
                            </el-form-item>
                            <el-form-item style="display: none;" label="头像:" label-width="100px" class="redItem">
                                <el-input v-model="sysUser.perPic"></el-input>
                            </el-form-item>
                            <el-form-item label="头像:" label-width="100px" class="redItem-img">
                                <el-upload
                                    action="http://127.0.0.1:8081/sysUser/uploadPerPic"
                                    list-type="picture-card"
                                    :limit='1'
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove"
                                    :on-success="uploadSuccess">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </el-form-item>
                            <el-form-item label-width="100px" class="redItem">
                                <el-button type="danger" @click="returnPage('loginForm')" class="submit_btn">返回</el-button>
                                <el-button type="primary" @click="addSysUser()" class="submit_btn">注册</el-button>
                            </el-form-item>
                        </el-form>
                    </section>
                </div>
            </transition>
        </div>
    </el-card>
    </div>
</template>

<script>
    import {login, getAdminInfo} from '@/api/getData'
    import Vue from 'vue'
    import {mapActions, mapState} from 'vuex'

    export default {
        data(){
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (this.sysUser.checkPwd !== this.sysUser.userPwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                sysUser: {},
                dialogImageUrl: '',
                dialogVisible: false,
                index: 0,
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    userPwd: [{required: true, message: '请输入密码', trigger: 'blur' }],
                    checkPwd: [{validator: validatePass2, trigger: 'blur' }]
                },
                showLogin: false,
            }
        },
        mounted(){
            this.showLogin = true;
            if (!this.adminInfo.id) {
                this.getAdminData()
            }
        },
        computed: {
            ...mapState(['adminInfo']),
        },
        methods: {
            ...mapActions(['getAdminData']),
            async addSysUser() {
                    this.$http.post('sysUser/add',this.$qs.stringify({
                        userId: this.sysUser.userId,
                        stuId: this.sysUser.stuId,
                        stuName: this.sysUser.stuName,
                        userPwd: this.sysUser.userPwd,
                        majorId: this.sysUser.majorId,
                        instId: this.sysUser.instId,
                        classId: this.sysUser.classId,
                        grade: this.sysUser.grade,
                        phone: this.sysUser.phone,
                        email: this.sysUser.email,
                        perPic: this.sysUser.perPic,
                    })).then(resp=>{
                        if(resp.data==='success') {
                            this.$message({
                                type: 'success',
                                message: '注册成功！'
                            });
                            this.$router.push('/')
                        } else {
                            this.$message({
                                type: 'success',
                                message: '注册失败！'
                            });
                        }
                    }).catch(function (error) {
                        alert(error)
                    });
            },
            async forward(view) {
                this.$router.push('/Register');
            },
            async handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            async handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
                this.show = false;
            },
            async uploadSuccess(response, file, fileList){
                this.$message({
                    type: 'success',
                    message: '上传成功！'
                });
                this.sysUser.perPic= response
            },
            async returnPage() {
                this.$router.push('/')
            }
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';
    .login_page{
        background-color: #fff;
    }
    .manage_tip{
        position: absolute;
        width: 100%;
        top: -100px;
        left: 0;
        p{
            font-size: 34px;
        }
    }
    .tip{
        font-size: 12px;
        color: red;
    }
    .form-fade-enter-active, .form-fade-leave-active {
        transition: all 1s;
    }
    .form-fade-enter, .form-fade-leave-active {
        transform: translate3d(0, -50px, 0);
        opacity: 0;
    }
    .myre{
        width: 500px;
        margin: auto;
    }
    .redItem {
        .el-form-item__label{
        }

        width: 400px;
    }
    .redItem-img{
        width: 600px;
    }
    .register-top{
        text-align: center;
        font-size: 30px;
        padding-top: 20px;
        margin-bottom: 50px;
        color: #5097FF;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .bi{
        clear: both;
        color: #12FF2A;
    }
    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .box-card {
        width: 600px;
        margin: 20px auto auto 40px;
    }
</style>
