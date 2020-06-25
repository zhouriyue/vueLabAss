<template>
    <div class="fillcontain">
        <div>
            <template v-if="this.sysUser.roles[0].roleId !='sysUser'">
                <template class="tem_add">
                    <el-button
                        type="Success"
                        class="tem_add"
                        @click="openAddEnrInfoView()"><i class="el-icon-plus"></i>&nbsp;添加报名信息</el-button>
                </template>
            </template>
        </div>
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                    type="index">
                </el-table-column>
                <el-table-column
                    property="recPlanId"
                    label="招聘编号"
                    width="150">
                </el-table-column>
                <el-table-column
                    property="recPlanName"
                    label="招聘标题"
                    width="180">
                </el-table-column>
                <el-table-column
                    property="postName"
                    label="岗位">
                </el-table-column>
                <el-table-column
                    property="recNumber"
                    label="招聘人数">
                </el-table-column>
                <el-table-column
                    property="department"
                    label="部门"
                    width="150">
                </el-table-column>
                <el-table-column
                    property="labTechName"
                    label="实验室技术员">
                </el-table-column>
                <el-table-column
                    property="surplusNumber"
                    label="剩余人数">
                </el-table-column>
                <el-table-column
                    property="audis"
                    label="是否通过">
                </el-table-column>
                <template v-if="this.sysUser.roles[0].roleId=='deaOff'">
                    <el-table-column label="操作" width="160">
                        <template slot-scope="scope">
                            <el-button
                                size="small"
                                @click="through(scope.row,scope.$index)"
                                class="through">通过</el-button>
                            <el-button
                                size="small"
                                type="danger"
                                @click="rebut(scope.row,scope.$index)">驳回</el-button>
                        </template>
                    </el-table-column>
                </template>
                <template v-if="this.sysUser.roles[0].roleId =='labTech'">
                    <el-table-column label="操作" width="160">
                        <template slot-scope="scope">
                            <el-button
                                size="small"
                                @click="openEnrollView(scope.row,scope.$index)"
                                class="through">查看报名人员</el-button>
                        </template>
                    </el-table-column>
                </template>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="20"
                    layout="total, prev, pager, next"
                    :total="count">
                </el-pagination>
            </div>
        </div>

        <el-dialog title="报名信息" v-model="enrollListView" customClass="customWidth" >
            <el-form :model="rerollList">
                <el-table
                    :data="rerollList"
                    highlight-current-row
                    style="width: 100%">
                    <el-table-column
                        type="index">
                    </el-table-column>
                    <el-table-column
                        property="enInfoTime"
                        label="报名时间"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        property="technica"
                        label="技能描述">
                    </el-table-column>
                    <el-table-column
                        property="labId"
                        label="实验室">
                    </el-table-column>
                    <el-table-column
                        property="sysUser.stuId"
                        label="学号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        property="sysUser.stuName"
                        label="姓名">
                    </el-table-column>
                    <el-table-column
                        property="sysUser.classId"
                        label="班级">
                    </el-table-column>
                    <el-table-column
                        property="sysUser.instId"
                        label="学院"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        property="sysUser.majorId"
                        label="专业">
                    </el-table-column>
                    <el-table-column
                        property="sysUser.grade"
                        label="年级">
                    </el-table-column>
                    <template v-if="this.sysUser.roles[0].roleId=='deaOff'">
                        <el-table-column label="操作" width="160">
                            <template slot-scope="scope">
                                <el-button
                                    size="small"
                                    @click="through(scope.row,scope.$index)"
                                    class="through">通过</el-button>
                                <el-button
                                    size="small"
                                    type="danger"
                                    @click="rebut(scope.row,scope.$index)">驳回</el-button>
                            </template>
                        </el-table-column>
                    </template>
                    <template v-if="this.sysUser.roles[0].roleId =='labTech'">
                        <el-table-column label="操作" width="160">
                            <template slot-scope="scope">
                                <el-button
                                    size="small"
                                    @click="openEnrollDetailView(scope.row,scope.$index)"
                                    class="through">录用</el-button>
                            </template>
                        </el-table-column>
                    </template>
                </el-table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="enrollListView = false">取 消</el-button>
                <el-button type="primary" @click="enroll()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="报名信息" v-model="enrollInfoDetailView">
            <el-form :model="enrollInfoDetail">
                <el-form-item label="学号" label-width="100px">
                    <el-input :disabled="true" style="width: 150px;" v-model="enrollInfoDetail.stuId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px;" label="姓名" label-width="100px">
                    <el-input  style="width: 150px;" v-model="enrollInfoDetail.stuName"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px;" label="招聘标题" label-width="100px">
                    <el-input :disabled="true" style="width: 150px;" v-model="enrollInfoDetail.recPlanName"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px;" label="岗位" label-width="100px">
                    <el-input :disabled="true" style="width: 150px;" v-model="enrollInfoDetail.postName"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px;" label="实验室" label-width="100px">
                    <el-input :disabled="true" style="width: 150px;" v-model="enrollInfoDetail.labId"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px;" label="技能" label-width="100px">
                    <el-input  style="width: 150px;" v-model="enrollInfoDetail.technica"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px;" label="用户编号" label-width="100px">
                    <el-input :disabled="true" style="width: 150px;" v-model="enrollInfoDetail.userId"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px;" label="专业" label-width="100px">
                    <el-input :disabled="true" style="width: 150px;" v-model="enrollInfoDetail.majorId"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px;" label="学院" label-width="100px">
                    <el-input :disabled="true" style="width: 150px;" v-model="enrollInfoDetail.instId"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px;" label="班级" label-width="100px">
                    <el-input :disabled="true" style="width: 150px;" v-model="enrollInfoDetail.classId"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px;" label="年级" label-width="100px">
                    <el-input :disabled="true" style="width: 150px;" v-model="enrollInfoDetail.grade"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px;" label="电话" label-width="100px">
                    <el-input  style="width: 150px;" v-model="enrollInfoDetail.phone"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px;" label="邮箱" label-width="100px">
                    <el-input  style="width: 150px;" v-model="enrollInfoDetail.email"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px;" label="头像" label-width="100px">
                    <el-input  style="width: 150px;" v-model="enrollInfoDetail.perPic"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="enrollInfoDetailView = false">取 消</el-button>
                <el-button type="primary" @click="employ()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="报名信息" v-model="addEnrInfoView">
            <el-form :model="addEnrInfo">
                <el-form-item label="学号" label-width="100px">
                    <el-input style="width: 150px;" v-model="addEnrInfo.stuId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px;" label="姓名" label-width="100px">
                    <el-input  style="width: 300px;" v-model="addEnrInfo.stuName"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px;" label="招聘标题" label-width="100px">
                    <el-input style="width: 150px;" v-model="addEnrInfo.recPlanName"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px;" label="岗位" label-width="100px">
                    <el-input style="width: 150px;" v-model="addEnrInfo.postName"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px;" label="实验室" label-width="100px">
                    <el-input style="width: 150px;" v-model="addEnrInfo.labId"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px;" label="用户编号" label-width="100px">
                    <el-input style="width: 300px;" v-model="addEnrInfo.userId"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px;" label="专业" label-width="100px">
                    <el-input style="width: 300px;" v-model="addEnrInfo.majorId"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px;" label="学院" label-width="100px">
                    <el-input style="width: 300px;" v-model="addEnrInfo.instId"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px;" label="班级" label-width="100px">
                    <el-input style="width: 300px;" v-model="addEnrInfo.classId"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px;" label="年级" label-width="100px">
                    <el-input style="width: 150px;" v-model="addEnrInfo.grade"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px;" label="电话" label-width="100px">
                    <el-input  style="width: 150px;" v-model="addEnrInfo.phone"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px;" label="邮箱" label-width="100px">
                    <el-input  style="width: 150px;" v-model="addEnrInfo.email"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px;" label="头像" label-width="100px">
                    <el-input  style="width: 150px;" v-model="addEnrInfo.perPic"></el-input>
                </el-form-item>
                <el-form-item label="技能" label-width="100px" label-height="300px">
                    <el-input type="textarea" v-model="addEnrInfo.technica"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addEnrInfoView = false">取 消</el-button>
                <el-button type="primary" @click="employ()">确 定</el-button>
            </div>
        </el-dialog>


    </div>
</template>
<script>
    import headTop from '../../components/headTop'
    import {baseUrl, baseImgPath} from '../../config/env'
    import {getFoods, getFoodsCount, getMenu, updateFood, deleteFood, getResturantDetail, getMenuById} from '../../api/getData'
    export default {
        data(){
            return {
                tableData: [{
                    recPlanId: '',
                    recPlanName: '',
                    postName: '',
                    recNumber: '',
                    department: '',
                    labTechName: '',
                    surplusNumber: '',
                    audis: '',
                }],
                rerollList:'',
                enrollInfoDetail:{},
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                recruitmentPlan: {},
                dialogFormVisible: false,
                enrollListView: false,
                enrollInfoDetailView:false,
                addEnrInfoView:false,
                depOptions: [{
                    value:'大数据',
                    index:'1',
                    label:'大数据'
                },{
                    value:'教务处',
                    index:'2',
                    label:'教务处'
                }],
                labOptions:[{
                    value:'第一实验室',
                    index:'1',
                    label:'第一实验室'
                },{
                    value:'第二实验室',
                    index:'2',
                    label:'第二实验室'
                },{
                    value:'微软IT实验室',
                    index:'3',
                    label:'微软IT实验室'
                }],
                selectMenu: {},
                selectIndex: null,
                specsForm: {
                    specs: '',
                    packing_fee: 0,
                    price: 20,
                },
                specsFormrules: {
                    specs: [
                        { required: true, message: '请输入规格', trigger: 'blur' },
                    ],
                },
                specsFormVisible: false,
                expendRow: [],
                sysUser:'',
                cruentRP:'',
                addEnrInfo:{}
            }
        },
        created(){
            this.initData();
        },
        methods: {
            async initData(){
                this.sysUser = JSON.parse(this.$sysUser)
                if(this.sysUser.roles[0].roleId =='deaOff'){
                    this.$http.post('recruitmentPlan/findAllNot',this.$qs.stringify({
                        userId: this.sysUser.userId
                    })).then(resp=>{
                        this.tableData = resp.data
                    })
                } else if(this.sysUser.roles[0].roleId =='sysUser') {
                    this.$http.post('recruitmentPlan/findThrough',this.$qs.stringify({
                        userId: this.sysUser.userId
                    })).then(resp=>{
                        this.tableData = resp.data
                    })
                } else if(this.sysUser.roles[0].roleId =='admin') {
                    this.$http.post('recruitmentPlan/findAll',this.$qs.stringify({
                        userId: this.sysUser.userId
                    })).then(resp=>{
                        this.tableData = resp.data
                    })
                } else if(this.sysUser.roles[0].roleId =='labTech') {
                    this.$http.post('recruitmentPlan/findMySelf',this.$qs.stringify({
                        userId: this.sysUser.userId
                    })).then(resp=>{
                        this.tableData = resp.data
                    })
                }
            },
            async openEnrollView(row,index){
                this.$http.post('recruitmentPlan/findRPEnroll',this.$qs.stringify({
                    recPlanId: row.recPlanId,
                })).then(resp=>{
                    this.rerollList = resp.data.enrollInfos
                    this.recruitmentPlan = resp.data
                })
                this.enrollListView = true;
            },
            async openEnrollDetailView(row,index){
                var user = this.rerollList[index].sysUser
                this.enrollInfoDetail.recPlanId = this.recruitmentPlan.recPlanId
                this.enrollInfoDetail.recPlanName = this.recruitmentPlan.recPlanName
                this.enrollInfoDetail.postName = this.recruitmentPlan.postName
                this.enrollInfoDetail.labId = row.labId
                this.enrollInfoDetail.labName = row.labId
                this.enrollInfoDetail.technica = row.technica
                this.enrollInfoDetail.userId = user.userId
                this.enrollInfoDetail.stuId = user.stuId
                this.enrollInfoDetail.stuName = user.stuName
                this.enrollInfoDetail.majorId = user.majorId
                this.enrollInfoDetail.instId = user.instId
                this.enrollInfoDetail.classId = user.classId
                this.enrollInfoDetail.grade = user.grade
                this.enrollInfoDetail.phone = user.phone
                this.enrollInfoDetail.email = user.email
                this.enrollInfoDetail.perPic = user.perPic
                this.enrollInfoDetailView = true;
            },
            async openAddEnrInfoView(){
                this.addEnrInfoView = true
            },
            async enroll(){
                this.dialogFormVisible = false;
                this.$http.post('enrollInfo/enroll',this.$qs.stringify({
                    technica: this.enrollInfo.technica,
                    labId: this.enrollInfo.labId,
                    labName: this.enrollInfo.labName,
                    recPlanId: this.recruitmentPlan.recPlanId,
                    userId: this.sysUser.userId
                })).then(resp=>{

                })
            },
            async employ(){
                this.$message({
                    type: 'success',
                    message: '录入档案中'
                });
                this.$http.post('employ/employMess',this.$qs.stringify({
                    recPlanId: this.enrollInfoDetail.recPlanId,
                    recPlanName: this.enrollInfoDetail.recPlanName,
                    postName: this.enrollInfoDetail.postName,
                    labId: this.enrollInfoDetail.labId,
                    labName: this.enrollInfoDetail.labName,
                    technica: this.enrollInfoDetail.technica,
                    userId: this.enrollInfoDetail.userId,
                    stuId: this.enrollInfoDetail.stuId,
                    stuName: this.enrollInfoDetail.stuName,
                    majorId: this.enrollInfoDetail.majorId,
                    instId: this.enrollInfoDetail.instId,
                    classId: this.enrollInfoDetail.classId,
                    grade: this.enrollInfoDetail.grade,
                    phone: this.enrollInfoDetail.phone,
                    email: this.enrollInfoDetail.email,
                    perPic: this.enrollInfoDetail.perPic
                })).then(resp=>{
                    if(resp.data=='success'){
                        this.$message({
                            type: 'success',
                            message: '录入成功'
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: '已经录用'
                        });
                    }
                })
                this.enrollInfoDetailView = false
            }
        },
    }
</script>
<style lang="less">
    @import '../../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
<style lang="less">
    @import '../../style/mixin';
    .tem_add{
        margin: 20px 10px 0px 20px;
        background-color: #4db3ff;
        color: #fff;
    }
    .tem_add:hover{
        color: #12FF2A;
    }
    .through{
        background-color: #1d90e6;
        color: #fff;
    }
    .through:hover{
        background-color: #4db3ff;
        color: #fff;
    }
    .through:focus{
        background-color: #4db3ff;
        color: #fff;
    }
    .through:link{
        background-color: #4db3ff;
        color: #fff;
    }
    .through:active{
        background-color: #4db3ff;
        color: #fff;
    }
    .through:visited{
        background-color: #4db3ff;
        color: #fff;
    }
    .customWidth{
        width: 95%;
    }

</style>
