<template>
    <div class="fillcontain">
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
                    property="userId"
                    label="用户编号">
                </el-table-column>
                <el-table-column
                    property="stuId"
                    label="学号"
                    width="150">
                </el-table-column>
                <el-table-column
                    property="stuName"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    property="majorId"
                    label="专业">
                </el-table-column>
                <el-table-column
                    property="instId"
                    label="学院"
                    width="150">
                </el-table-column>
                <el-table-column
                    property="classId"
                    label="班级">
                </el-table-column>
                <el-table-column
                    property="grade"
                    label="年级">
                </el-table-column>
                <el-table-column
                    property="phone"
                    label="电话号码"
                    width="150">
                </el-table-column>
                <el-table-column
                    property="email"
                    label="邮箱"
                    width="200">
                </el-table-column>
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
    </div>
</template>
<script>
    export default {
        data(){
            return {
                tableData: [{
                    userId: '',
                    stuId: '',
                    userPwd: '',
                    majorId: '',
                    classId: '',
                    grade: '',
                    phone: '',
                    email: '',
                    perPic: '',
                }],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
            }
        },
        created(){
            this.initData();
        },
        methods: {
            async initData(){
                this.$http.post('sysUser/findAll').then(resp=>{
                    this.tableData = resp.data
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
