<template>
    <div class="fillcontain">
        <div>
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
                    property="userId"
                    label="用户名">
                </el-table-column>
                <el-table-column
                    property="postName"
                    label="岗位">
                </el-table-column>
                <el-table-column
                    property="labId"
                    label="实验室"
                    width="150">
                </el-table-column>
                <el-table-column
                    property="stuId"
                    label="学号">
                </el-table-column>
                <el-table-column
                    property="stuName"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    property="majorId"
                    label="专业">
                </el-table-column>
                    <el-table-column label="操作" width="160">
                        <template slot-scope="scope">
                            <el-button
                                size="small"
                                @click="through(scope.row,scope.$index)"
                                class="through">编辑</el-button>
                            <el-button
                                size="small"
                                type="danger"
                                @click="rebut(scope.row,scope.$index)">查看</el-button>
                        </template>
                    </el-table-column>
                <template v-if="this.sysUser.roles[0].roleId=='sysUser'">
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
                <el-button @click="dialogFormVisible = false">取 消</el-button>
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
                    recPlanId: '',
                    recPlanName: '',
                    postName: '',
                    recNumber: '',
                    department: '',
                    labTechName: '',
                    surplusNumber: '',
                    audis: '',
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
                sysUser:''
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
                this.sysUser = JSON.parse(this.$sysUser)
                if(this.sysUser.roles[0].roleId =='labTech'){
                    this.$http.post('employ/findAllMySelf',this.$qs.stringify({
                        userId: this.sysUser.userId
                    })).then(resp=>{
                        this.tableData = resp.data
                    })
                }
            },
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
