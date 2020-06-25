<template>
    <div class="fillcontain">
        <div>
            <template v-if="isLab">
                <template class="tem_add">
                    <el-button
                        type="Success"
                        class="tem_add"
                        @click="workContentView=true"><i class="el-icon-plus"></i>&nbsp;添加工作内容</el-button>
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
                    property="workId"
                    label="工作编号"
                    width="150">
                </el-table-column>
                <el-table-column
                    property="weekNumber"
                    label="周次"
                    width="180">
                </el-table-column>
                <el-table-column
                    property="workDate"
                    label="工作时间">
                </el-table-column>
                <el-table-column
                    property="week"
                    label="星期">
                </el-table-column>
                <el-table-column
                    property="content"
                    label="内容"
                    width="150">
                </el-table-column>
                <el-table-column
                    property="systemDate"
                    label="系统时间">
                </el-table-column>
                <template v-if="this.isLab">
                    <el-table-column label="操作" width="160">
                        <template slot-scope="scope">
                            <el-button
                                size="small"
                                @click="through(scope.row,scope.$index)"
                                class="through">编辑</el-button>
                        </template>
                    </el-table-column>
                </template>
                <template v-if="this.sysUser.roles[0].roleId=='普通用户'">
                    <el-table-column label="操作" width="160">
                        <template slot-scope="scope">
                            <el-button
                                size="small"
                                @click="openEnrollView(scope.row,scope.$index)"
                                class="through">报名</el-button>
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

        <el-dialog title="维修申请信息" v-model="workContentView">
            <el-form :model="workContent">
                <el-form-item label="周次" label-width="100px">
                    <el-input style="width: 150px;" v-model="workContent.weekNumber" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="星期" label-width="100px">
                    <el-select v-model="workContent.week" placeholder="请选择星期">
                        <el-option label="星期一" value="星期一"></el-option>
                        <el-option label="星期二" value="星期二"></el-option>
                        <el-option label="星期三" value="星期三"></el-option>
                        <el-option label="星期四" value="星期四"></el-option>
                        <el-option label="星期五" value="星期五"></el-option>
                        <el-option label="星期六" value="星期六"></el-option>
                        <el-option label="星期日" value="星期日"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="工作时间" label-width="100px">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="workContent.workDate" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="工作内容" label-width="100px">
                    <el-input type="textarea" style="width: 288px;" v-model="workContent.content" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户" label-width="100px">
                    <el-input :disabled="true" style="width: 150px;" v-model="sysUser.userId" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="repairApplyView = false">取 消</el-button>
                <el-button type="primary" @click="add()">确 定</el-button>
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
                }],
                enrollInfo:{
                    enInfoId: '',
                    enInfoTime: '',
                    technica: '',
                    labId: '',
                    labName: ''
                },
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                workContent: {},
                dialogFormVisible: false,
                workContentView: false,
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
                isLab: false
            }
        },
        created(){
            this.initData();
        },
        methods: {
            async initData(){
                this.sysUser = this.$store.state
                for(var i = 0;i < this.sysUser.roles.length;i++) {
                    if(this.sysUser.roles[i].roleId == "实验室助理") {
                        this.isLab = true;
                        break;
                    }
                }
                if(this.isLab) {
                    this.$http.post('workContent/findAllMySelf',this.$qs.stringify({
                        userId: this.sysUser.userId
                    })).then(resp=>{
                        this.tableData = resp.data
                    })
                }
            },
            async add(){
                this.dialogFormVisible = false;
                this.$http.post('workContent/add',this.$qs.stringify({
                    weekNumber: this.workContent.weekNumber,
                    week: this.workContent.week,
                    content: this.workContent.content,
                    userId: this.sysUser.userId,
                    workDate: this.workContent.workDate
                })).then(resp=>{

                })
            },
            async openEnrollView(row,index){
                this.enrollInfo.labId=row.labId
                this.enrollInfo.labName=row.labId
                this.recruitmentPlan = row
                this.enrollView = true;
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

</style>
