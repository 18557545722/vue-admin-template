<template>
    <div class="permission-settings-page">
        <div class="sel-user-box">
            <span>用户</span>
            <el-select size="small" v-model="selUser" placeholder="请选择">
                <el-option
                    v-for="item in userOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
        <el-tree class="permission-tree" ref="tree" :props="props" :data="nodeData" show-checkbox node-key="id" :check-on-click-node="true" :default-expand-all="true"></el-tree>
        <el-button type="primary" size="small" @click="getNode">保 存</el-button>
    </div>
</template>

<script>
export default {
    name: 'PermissionSettings',
    data() {
        return {
            userOptions: [{
                value: '1',
                label: '张三'
            }, {
                value: '2',
                label: '李四'
            }, {
                value: '3',
                label: '王五'
            }],
            selUser: '',
            props: {
                label: 'title',
                children: 'children'
            },
            nodeData: [],
        };
    },
    created() {
        console.log('this.$route.params-----', this.$route.params)
        this.selUser = this.$route.params.id ? this.$route.params.id : this.userOptions[0].value
        console.log('router---111', this.$router.options.routes)
        this.nodeData = this.$router.options.routes.filter(item => {return item.name && item.children})
        console.log('this.nodeData---', this.nodeData)
    },
    mounted() {
        
    },
    methods: {
        getNode() {
            const node = this.$refs.tree.getCheckedNodes(true, false)//(leafOnly, includeHalfChecked) //接收两个 boolean 类型的参数，1. 是否只是叶子节点，默认值为 false 2. 是否包含半选节点，默认值为 false
            console.log('node---',node)
            const keys = this.$refs.tree.getCheckedKeys(true)   //(leafOnly) 接收一个 boolean 类型的参数，若为 true 则仅返回被选中的叶子节点的 keys，默认值为 false
            console.log('keys---',keys)
        },
    }
};
</script>
<style lang="scss" scoped>
    .permission-settings-page {
        .sel-user-box{
            font-size: 14px;
            margin-bottom: 12px;
            span{
                margin-right: 10px;
            }
        }
        .permission-tree{
            margin-bottom: 12px;
        }
    }
</style>