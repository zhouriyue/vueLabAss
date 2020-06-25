<template>
    <div class="fillcontain">
        <div>
            <template v-if="this.sysUser.roles[0].roleId !='sysUser'">
            <template class="tem_add">
                <el-button
                    type="Success"
                    class="tem_add"
                    @click="addRP(1)"><i class="el-icon-plus"></i>&nbsp;添加招聘计划</el-button>
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
                <template v-if="this.isJw">
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
                <template v-if="isSys">
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

        <el-dialog title="报名信息" v-model="enrollView">
            <el-form :model="recruitmentPlan">
                <el-form-item style="text-align: center">
                    <span>头像</span>
                    <img :src="sysUser.perPic" alt class="imgTop">
                </el-form-item>
                <el-form-item label="用户名" label-width="100px">
                    <el-input :disabled="true" style="width: 150px;" v-model="sysUser.userId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="学号" label-width="100px">
                    <el-input :disabled="true" style="width: 150px;" v-model="sysUser.stuId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" label-width="100px">
                    <el-input :disabled="true" style="width: 150px;" v-model="sysUser.stuName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户名" label-width="100px">
                    <el-input :disabled="true" style="width: 150px;" v-model="sysUser.userId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="招聘标题" label-width="100px">
                    <el-input :disabled="true" style="width: 150px;" v-model="recruitmentPlan.recPlanName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="招聘标题" label-width="100px">
                    <el-input :disabled="true" style="width: 150px;" v-model="recruitmentPlan.recPlanName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px;" label="岗位" label-width="100px">
                    <el-input :disabled="true" style="width: 150px;" v-model="recruitmentPlan.postName" ></el-input>
                </el-form-item>
                <el-form-item style="width: 400px;" label="实验室" label-width="100px">
                    <el-input :disabled="true" v-model="recruitmentPlan.labId"></el-input>
                </el-form-item>
                <el-form-item style="width: 400px;" label="技术人员" label-width="100px">
                    <el-input :disabled="true" v-model="recruitmentPlan.labTechName"></el-input>
                </el-form-item>
                <el-form-item style="width: 400px;" label="技能" label-width="100px">
                    <el-input type="textarea" v-model="enrollInfo.technica"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="enrollView = false">取 消</el-button>
                <el-button type="primary" @click="enroll()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="添加招聘计划" v-model="dialogFormVisible">
            <el-form :model="recruitmentPlan">
                <el-form-item label="招聘标题" label-width="100px">
                    <el-input style="width: 150px;" v-model="recruitmentPlan.recPlanName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item style="width: 150px;" label="岗位" label-width="100px">
                    <el-input style="width: 150px;" v-model="recruitmentPlan.postName"></el-input>
                </el-form-item>
                <el-form-item style="width: 200px;" label="招收数量" label-width="100px">
                    <el-input v-model="recruitmentPlan.recNumber"></el-input>
                </el-form-item>
                <el-form-item label="实验室" label-width="100px">
                    <el-select v-model="recruitmentPlan.labId" :placeholder="recruitmentPlan.label" @change="SelectLab">
                        <el-option
                            v-for="item in labOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门" label-width="100px">
                    <el-select v-model="recruitmentPlan.department" :placeholder="recruitmentPlan.label" @change="handleSelect">
                        <el-option
                            v-for="item in depOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="width: 400px;" label="技术人员" label-width="100px">
                    <el-input v-model="recruitmentPlan.labTechName"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
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
                recruitmentPlan: {},
                dialogFormVisible: false,
                enrollView: false,
                depOptions: [{
                    value:'大数据',
                    index:'0',
                    label:'大数据'
                },{
                    value:'教务处',
                    index:'1',
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
                currentIndex:'',
                isLab: false,
                isJw: false,
                isAdmin: false,
                isTech: false,
                isSys:false
            }
        },
        created(){
            this.initData();
        },
        methods: {
            async through(row,index){
                this.$http.post('recruitmentPlan/through',this.$qs.stringify({
                    recPlanId: row.recPlanId,
                    audis: '通过'
                })).then(resp=>{
                    if(resp.data=='success'){
                        this.tableData.splice(index, 1)
                    }
                })
            },
            async rebut(row,index){
                this.$http.post('recruitmentPlan/through',this.$qs.stringify({
                    recPlanId: row.recPlanId,
                    audis: '驳回'
                })).then(resp=>{
                    if(resp.data=='success'){
                        this.tableData.splice(index, 1)
                    }
                })
            },
            async initData(){
                this.sysUser = this.$store.state
                for(var i = 0;i < this.sysUser.roles.length;i++) {
                    if(this.sysUser.roles[i].roleId == "labAss") {
                        this.isLab = true;
                        this.isSys = false;
                        break;
                    }
                    if(this.sysUser.roles[i].roleId == "admin") {
                        this.isAdmin = true;
                        this.isSys = false;
                        break;
                    }
                    if(this.sysUser.roles[i].roleId == "labTech") {
                        this.isTech = true;
                        this.isSys = false;
                        break;
                    }
                    if(this.sysUser.roles[i].roleId == "deaOff") {
                        this.isJw = true;
                        this.isSys = false;
                        break;
                    }
                    if(this.sysUser.roles[i].roleId == "sysUser") {
                        this.isSys = true;
                        break;
                    }
                }
                if(this.isJw){
                    this.$http.post('recruitmentPlan/findAllNot',this.$qs.stringify({
                        userId: this.sysUser.userId
                    })).then(resp=>{
                        this.tableData = resp.data
                    })
                }
                if(this.isSys) {
                    this.$http.post('recruitmentPlan/findThrough',this.$qs.stringify({
                        userId: this.sysUser.userId
                    })).then(resp=>{
                        this.tableData = resp.data
                    })
                }
                if(this.isAdmin) {
                    this.$http.post('recruitmentPlan/findAll',this.$qs.stringify({
                        userId: this.sysUser.userId
                    })).then(resp=>{
                        this.tableData = resp.data
                    })
                }
                if(this.isTech) {
                    this.$http.post('recruitmentPlan/findMySelf',this.$qs.stringify({
                        userId: this.sysUser.userId
                    })).then(resp=>{
                        this.tableData = resp.data
                    })
                }
            },
            async addRP(row) {
                this.recruitmentPlan.labTechName = this.sysUser.stuName
                this.dialogFormVisible = true;
            },
            async handleSelect(index){
                this.recruitmentPlan.department = this.depOptions[index].value;
            },
            async SelectLab(index){
                this.recruitmentPlan.labId = this.labOptions[index].value;

            },
            async add(){
                this.dialogFormVisible = false;
                this.$http.post('recruitmentPlan/add',this.$qs.stringify({
                    recPlanName: this.recruitmentPlan.recPlanName,
                    postName: this.recruitmentPlan.postName,
                    recNumber: this.recruitmentPlan.recNumber,
                    department: this.recruitmentPlan.department,
                    labTechName: this.recruitmentPlan.labTechName,
                    labId: this.recruitmentPlan.labId,
                    labName: this.recruitmentPlan.labId,
                    recPlanId: this.sysUser.userId
                })).then(resp=>{
                    this.tableData.push(resp.data)
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    });
                })
            },
            async openEnrollView(row,index){
                this.enrollInfo.labId=row.labId
                this.enrollInfo.labName=row.labId
                this.recruitmentPlan = row
                this.currentIndex=index
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
                    if(resp.data == '报名成功!') {
                        this.tableData[this.currentIndex].surplusNumber=this.tableData[this.currentIndex].surplusNumber-1
                    }
                    this.$message({
                        type: 'success',
                        message: resp.data.status
                    });
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
    .imgTop{
        display: flex;
        width: 100px;
        margin: auto;
        border-radius: 50px;
        overflow: hidden;
    }

</style>
