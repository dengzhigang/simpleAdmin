<template>
    <div class="login">
        <el-row>
            <el-col :span="8">
                <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="8">
                <div class="formitem">
                    <h2>登录</h2>
                    <div class="kuang">
                        <el-input placeholder="用户名" v-model="username">
                            <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
                        </el-input>
                    </div>
                    <div class="kuang">
                        <el-input placeholder="密码" v-model="password" show-password>
                            <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
                        </el-input>
                    </div>
                    <el-button type="primary" style="width:80%;margin-bottom:30px;" @click="login">登录</el-button>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: 'admin',
            password: 123,
        };
    },
    mounted() {},
    methods: {
        login() {
            if (this.username != '' && this.password != '') {
                this.axios
                    .post('/api/index/admin/login', {
                        username: this.username,
                        password: this.password,
                    })
                    .then((res) => {
                        let { code } = res.data;
                        if (code == 0) {
                            localStorage.setItem('user', JSON.stringify(res.data.data));
                            this.$message({
                                message: '登录成功！',
                                type: 'success',
                            });
                            this.$router.push({ name: 'home' });
                        } else {
                            this.$message.warning('用户名或密码错误！');
                        }
                    })
                    .catch((error) => {
                        this.$message(error);
                    });
            } else {
                this.$message({
                    message: '请输入用户名或密码！',
                    type: 'warning',
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.bg-purple {
    height: 20px;
}
.login {
    box-sizing: border-box;
    padding: 50px;
    .formitem {
        position: relative;
        margin-top: 20%;
        padding: 20px;
        background: #ffffff;
        width: 100%;
        border-radius: 5px;
        z-index: 99;
    }
    .kuang {
        padding-left: 10%;
        width: 80%;
        margin: 15px 0px;
    }
}
</style>
