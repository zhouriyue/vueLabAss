<template>
    <div>
        <el-card class="box-card">
            <div class="text">个人信息</div>
            <div class="mid-mess">
                <div>
                    <img src="../../static/perPic.png" alt class="imgTop">
                </div>
                <div style="margin-top: 20px;">
                    <span>用户名：</span><span>admin</span>
                </div>
            </div>
            <div>
                <div class="usermess-item">
                    <span class="title">学号：</span><span class="data">{{sysUser.stuId}}</span>
                </div>
                <div class="usermess-item">
                    <span class="title">姓名：</span><span class="data">{{sysUser.stuName}}</span>
                </div>
                <div class="usermess-item">
                    <span class="title">专业：</span><span class="data">{{sysUser.majorId}}</span>
                </div>
                <div class="usermess-item">
                    <span class="title">学院：</span><span class="data">{{sysUser.instId}}</span>
                </div>
                <div class="usermess-item">
                    <span class="title">班级：</span><span class="data">{{sysUser.classId}}</span>
                </div>
                <div class="usermess-item">
                    <span class="title">年级：</span><span class="data">{{sysUser.grade}}</span>
                </div>
                <div class="usermess-item">
                    <span class="title">电话：</span><span class="data">{{sysUser.phone}}</span>
                </div>
                <div class="usermess-item">
                    <span class="title">邮箱：</span><span class="data">{{sysUser.email}}</span>
                </div>
            </div>
        </el-card>
        <el-card class="box-card1">
            <div slot="header" class="clearfix">
                <span class="comm-text">拥有菜单</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="m in sysUser.menus" :key="o" class="text item">
                {{m.menuName }}
            </div>
        </el-card>
        <el-card class="box-card2">
            <div slot="header" class="clearfix">
                <span class="comm-text">角色信息</span>
            </div>
            <div class="comm-text">当前权限为：<span style="color: #000000">{{role.roleName}}</span></div><br>
            <div class="comm-text">{{message}}</div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "systemSet",
        data() {
            return {
                sysUser: {
                    userId: 'admin',
                    stuId: 'zhouriyue'
                },
                message: '',
                role: {}
            }
        },
        created(){
            this.initData();
        },
        methods: {
            async initData() {
                this.sysUser = this.$store.state
                if(this.sysUser.roles[0].roleId=='labTech') {
                    this.role = this.sysUser.roles[0]
                    this.message = '实验技术员可以查看应聘本实验室助理岗位的报名信息并筛选进入面试环 节的人员名单。学生可以在线查看自己是否进入面试环节。面试结束后，实验技 术员录入面试结果并建立录用人员的档案信息，录入人员档案信息包括人员编 号、学号、密码、姓名、专业、学院、班级、年级、手机号、邮箱、个人照片， 所属实验室等';
                } else if(this.sysUser.roles[0].roleId=='labAss') {
                    this.role = this.sysUser.roles[0]
                    this.message = '（1）.实验室助理可以记录每天工作内容，工作内容包括安全卫生检查情况和设 备运行情况。工作内容信息包括周次、时间（年/月/日）、星期、人员编号、工 作内容、系统时间。实验技术员可以按日期查询实验室助理的工作内容。（2）.实验室助理可以在线填写实验教学仪器设备维修申请，申请信息包括设备 名称、设备编号、型号、故障现象描述、报修时间、报修人。实验室技术员可以 查看本实验室的设备维修申请并导出实验教学仪器设备维修申报表，样式参考 《梧州学院实验教学仪器设备维修申报表》';
                } else if(this.sysUser.roles[0].roleId=='sysUser'){
                    this.role = this.sysUser.roles[0]
                    this.message = '（1）.学生在线应聘实验助理岗位需要先注册成为系统用户，注册用户信息包括 学号、密码、姓名、专业、学院、班级、年级、手机号、邮箱、个人照片。（2）.学生注册用户成功并登录系统后，可以在线查看实验室助理招聘计划信息 和填写报名信息。报名信息包括报名编号、岗位名称、技能描述、申请人、申请 时间等。每个学生只能应聘一个岗位，如果应聘的人数超过岗位招聘人数，系统 拒绝报名请求。'
                }
            }
        }
    }
</script>

<style>
    .text {
        font-size: 14px;
        color: #8E918E;
        padding-bottom: 10px;
        border-bottom: 1px solid #C3C6C3;
    }

    .box-card {
        float: left;
        width: 400px;
        margin-left: 50px;
        margin-top: 20px;
    }

    .usermess-item {
        padding: 15px 10px;
        color: #606360;
    }
    .mid-mess{
        height: 140px;
        border-bottom: 1px solid #C3C6C3;
        text-align: center;
        padding-top: 40px;
    }
    .title {
    }
    .data {
        float: right;
    }
    .imgTop{
        display: flex;
        width: 100px;
        margin: auto;
        border-radius: 50px;
        overflow: hidden;
    }
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card1 {
        margin-left: 20px;
        margin-top: 20px;
        float: left;
        width: 760px;
    }
    .box-card2 {
        margin-left: 20px;
        margin-top: 20px;
        float: left;
        width: 760px;
    }
    .comm-text{
        color: #8E918E;
    }
</style>
