<template>
    <div class="manage_page fillcontain">
        <el-row style="height: 100%;">
            <el-col :span="4" style="min-height: 100%; background-color: #324057;">
                <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
                    <el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
                    <li v-for="menu in menus">
                        <el-submenu v-bind:index="menu.url">
                            <template slot="title"><i v-bind:class="menu.icon"></i>{{menu.menuName}}</template>
                            <el-menu-item v-bind:index="menu.url">{{menu.menuName}}</el-menu-item>
                        </el-submenu>
                    </li>
                </el-menu>
            </el-col>
            <el-col :span="20" style="height: 100%;overflow: auto;">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    export default {
        data() {
            return {
                menus: [],
            }
        },
        created(){
            window.addEventListener("beforeunload", () => {
                localStorage.setItem("sysUser", JSON.stringify(this.$store.state));
            });
            if (localStorage.getItem("sysUser")) {
                this.$store.replaceState(
                    Object.assign(
                        {},
                        this.$store.state,
                        JSON.parse(localStorage.getItem("sysUser"))
                    )
                );
            }
            localStorage.removeItem("sysUser")
            this.menus = this.$store.state.menus
        },
        methods: {
        },
        components:{
            headTop
        }
    }
</script>


<style lang="less" scoped>
    @import '../style/mixin';

    .manage_page {

    }
</style>
