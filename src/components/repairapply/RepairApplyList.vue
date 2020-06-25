<template>
    <div class="fillcontain">
        <div>
            <template v-if="isLab">
                <template class="tem_add">
                    <el-button
                        type="Success"
                        class="tem_add"
                        @click="repairApplyView=true"><i class="el-icon-plus"></i>&nbsp;添加维修申请</el-button>
                    <el-button
                        type="Success"
                        class="tem_add"
                        @click="repairApplyView=true"><i class="el-icon-plus"></i>&nbsp;导出维修申请</el-button>
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
                    property="deviceId"
                    label="设备编号"
                    width="180">
                </el-table-column>
                <el-table-column
                    property="deviceName"
                    label="设备名称">
                </el-table-column>
                <el-table-column
                    property="modelNumber"
                    label="型号">
                </el-table-column>
                <el-table-column
                    property="hitchDepict"
                    label="故障描述"
                    width="150">
                </el-table-column>
                <el-table-column
                    property="repairDate"
                    label="维修时间">
                </el-table-column>
                <el-table-column
                    property="repairName"
                    label="维修人">
                </el-table-column>
                <template v-if="this.sysUser.roles[0].roleId=='labAss'">
                    <el-table-column label="操作" width="160">
                        <template slot-scope="scope">
                            <el-button
                                size="small"
                                @click="through(scope.row,scope.$index)"
                                class="through">编辑</el-button>
                            <el-button
                                size="small"
                                type="danger"
                                @click="rebut(scope.row,scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </template>
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

        <el-dialog title="维修申请信息" v-model="repairApplyView">
            <el-form :model="repairApply">
                <el-form-item label="设备编号" label-width="100px">
                    <el-input style="width: 150px;" v-model="repairApply.deviceId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备名称" label-width="100px">
                    <el-input style="width: 150px;" v-model="repairApply.deviceName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="型号" label-width="100px">
                    <el-input style="width: 150px;" v-model="repairApply.modelNumber" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="故障描述" label-width="100px">
                    <el-input style="width: 150px;" v-model="repairApply.hitchDepict" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户" label-width="100px">
                    <el-input :disabled="true" style="width: 150px;" v-model="sysUser.userId" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="repairApplyView = false">取 消</el-button>
                <el-button type="primary" @click="addRepairApply()">确 定</el-button>
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
                tableData: [],
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
                repairApply: {},
                dialogFormVisible: false,
                repairApplyView: false,
                isLab: false,
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
            async addRepairApply(){
                this.$http.post('repairApply/add',this.$qs.stringify({
                    userId: this.sysUser.userId,
                    repAppId: this.repairApply.repairApply,
                    deviceId: this.repairApply.deviceId,
                    deviceName: this.repairApply.deviceName,
                    modelNumber: this.repairApply.modelNumber,
                    hitchDepict: this.repairApply.hitchDepict,
                    repairDate: this.repairApply.repairDate,
                    repairName: this.repairApply.repairName,
                })).then(resp=>{

                })
            },
            async initData(){
                this.sysUser = this.$store.state
                this.isLab = false;
                for(var i = 0;i < this.sysUser.roles.length;i++) {
                    if(this.sysUser.roles[i].roleId == "labAss") {
                        this.isLab = true;
                        break;
                    }
                }
                if(this.isLab){
                    this.$http.post('repairApply/findAllMySelf',this.$qs.stringify({
                        userId: this.sysUser.userId
                    })).then(resp=>{
                        this.tableData = resp.data
                    })
                }
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
