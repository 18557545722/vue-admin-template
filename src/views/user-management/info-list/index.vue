<template>
    <div class="info-list-page">
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column v-for="(item, index) in tableColumns" :prop="item.prop" :label="item.label" :width="item.width" :key="index"></el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button @click="onSetPermission(scope.row)" type="text" size="small">配置</el-button>
                    <el-button type="text" size="small" @click="onEditUserInfo(scope.row)">编辑</el-button>
                    <el-button class="del-btn" type="text" size="small" @click="onDelUserInfo(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="修改用户信息" width="500px" :visible.sync="rowFormVisible">
            <el-form ref="rowForm" :model="rowForm" label-width="80px" size="small">
                <el-form-item label="花名" prop="nickName">
                    <el-input v-model="rowForm.nickName" placeholder="请输入花名"/>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="rowForm.phone" placeholder="请输入手机号"/>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="rowForm.password" show-password placeholder="请输入密码"/>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="rowForm.remark" type="textarea" placeholder="请输入备注"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="rowFormVisible=false" size="small">取 消</el-button>
                <el-button type="primary" @click="onEditConfirm" size="small">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'InfoList',
    data() {
        return {
            loading: false,
            tableData: [
                {id: '1', nickName: '张三', phone: '12345678901', password: 'aaaa', remark: 'test'},
                {id: '2', nickName: '李四', phone: '12345678901', password: 'bbbb', remark: 'test'},
                {id: '3', nickName: '王五', phone: '12345678901', password: 'cccc', remark: 'test'},
            ],
            tableColumns: [
                {prop: 'nickName', label: '花名', width: 150},
                {prop: 'phone', label: '手机号', width: 150},
                {prop: 'password', label: '密码', width: 150},
                {prop: 'remark', label: '备注'}
            ],
            rowFormVisible: false,
            reg_tel: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, //手机号正则
            rowForm: {}
        }
    },
    created() {
        console.log('router---111', this.$router.options.routes)
    },
    mounted() {
        
    },
    methods: {
        //查询
        onSearch() {
            console.log('sssss')
        },
        //配置
        onSetPermission(row) {
            console.log('row----', row)
            this.$router.push({
                name: 'permission-settings',
                params: {
                    id: row.id
                }
            })
        },
        //编辑
        onEditUserInfo(row) {
            this.rowFormVisible = true
            this.rowForm = JSON.parse(JSON.stringify(row))
        },
        //保存修改信息
        onEditConfirm() {
            console.log('rowForm----',this.rowForm)
            if (this.rowForm.nickName === '') {
                this.$message({type: 'warning', message: '花名不能为空!'})
            } else if (this.rowForm.phone === '') {
                this.$message({type: 'warning', message: '手机号不能为空!'})
            } else if (!(this.reg_tel.test(this.rowForm.phone))) {
                this.$message({type: 'warning', message: '请输入正确的手机号!'})
            } else if (this.rowForm.password === '') {
                this.$message({type: 'warning', message: '密码不能为空!'})
            } else {
                this.rowFormVisible = false
            }
        },
        //删除
        onDelUserInfo(row) {
            this.$confirm(`确认删除用户“${row.nickName}”?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    }
}
</script>
<style scoped lang="scss">
.del-btn{
    color: red;
}
</style>
