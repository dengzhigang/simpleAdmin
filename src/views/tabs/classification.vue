<template>
    <div class="classification">
        <el-row>
            <el-col :span="4">
                <div class="tian">
                    <el-button type="primary" size="small" icon="el-icon-edit" @click="openDialog('add')">添加</el-button>
                </div>
            </el-col>
        </el-row>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号" width="50"> </el-table-column>
            <el-table-column prop="title" label="名称"> </el-table-column>
            <el-table-column prop="content" label="简介"> </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
                    <el-button @click="openDialog('edit', scope.row)" type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="size"
            layout="total, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
        <!-- 添加、编辑 -->
        <el-dialog :title="addOrEdit === 'add' ? '添加分类' : '编辑分类'" :visible.sync="dialogVisible" width="500px" @close="handleCloseDialog">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="名称" prop="title">
                    <el-input v-model="form.title" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="content">
                    <el-input type="textarea" v-model="form.content" placeholder="请输入简介"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">确定</el-button>
                    <el-button @click="dialogVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 添加弹窗
            dialogVisible: false,
            name: '',
            brief: '',
            tableData: [],
            total: 0,
            size: 5,
            currentPage: 1,
            form: {
                title: '',
                content: '',
            },
            addOrEdit: '',
            rules: {
                title: [{ required: true, message: '请输入名称', trigger: 'blur' }],
                content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
            },
        };
    },
    mounted() {
        this.getlist();
    },
    methods: {
        // 获取数据
        getlist() {
            let params = {
                size: this.size,
                page: this.currentPage,
            };
            this.axios
                .get('/api/index/course/getClassList', { params })
                .then((res) => {
                    let { code, data, total } = res.data;
                    if (code == 0) {
                        this.tableData = data;
                        this.total = total;
                    } else {
                        this.$message.warning('获取失败！');
                    }
                })
                .catch((error) => {
                    this.$message.warning('获取失败！');
                });
        },
        // 分页
        handleCurrentChange(page) {
            this.currentPage = page;
            this.getlist();
        },
        // 删除
        handleDelete(row) {
            let { id } = row;
            this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    this.axios.get('/api/index/course/delete', { params: { id } }).then((res) => {
                        let { code } = res.data;
                        if (code === 0) {
                            this.getlist();
                            this.$message.success('删除成功');
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                    });
                });
        },
        // 表单提交
        onSubmit() {
            if (this.addOrEdit === 'add') {
                // 新增
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.axios.post('/api/index/course/save', { ...this.form }).then((res) => {
                            let { code } = res.data;
                            if (code === 0) {
                                this.$message.success('添加成功');
                                this.dialogVisible = false;
                                this.getlist();
                            }
                        });
                    }
                });
            } else if (this.addOrEdit === 'edit') {
                //编辑  多了一个id
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.axios.post('/api/index/course/save', { title: this.form.title, content: this.form.content }).then((res) => {
                            let { code } = res.data;
                            if (code === 0) {
                                this.$message.success('添加成功');
                                this.dialogVisible = false;
                                this.getlist();
                            }
                        });
                    }
                });
            }
        },
        // 打开弹窗
        openDialog(type, row) {
            this.dialogVisible = true;
            this.addOrEdit = type;
            // 编辑的时候获取到数据
            row ? (this.form = JSON.parse(JSON.stringify(row))) : '';
            this.$nextTick(() => {
                this.$refs.form.clearValidate();
            });
        },
        handleCloseDialog() {
            for (const key in this.form) {
                if (Object.hasOwnProperty.call(this.form, key)) {
                    this.form[key] = '';
                }
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.classification {
    width: 100%;
    overflow-x: hidden;
    padding: 20px;
    box-sizing: border-box;
    color: #59595a;

    .tian {
        font-size: 18px;
        line-height: 24px;
        padding: 5px;
        margin-bottom: 10px;
        text-align: left;
    }
    .content {
        width: 100%;
        padding: 5px;
        min-height: 600px;
        background: #ffffff;
        border-radius: 4px;
        .list {
            width: 100%;
            font-size: 16px;

            line-height: 18px;
            margin-bottom: 5px;
            border-bottom: 1px solid #d7d8d9;
            display: flex;
            .name {
                width: 30%;
            }
            .caozuo {
                width: 20%;
            }
            .brief {
                width: 50%;
                white-space: normal;
                word-break: break-all;
                text-align: left;
            }
        }
        .list:hover {
            background: #eeeeee;
        }
    }
}

.el-button--mini,
.el-button--mini.is-round {
    padding: 4px 5px;
}
.el-pagination {
    margin-top: 15px;
}
</style>
