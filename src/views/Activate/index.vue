<template>
    <div :style="{ height: initHeight }">
        <header>
            <van-nav-bar title="兑换激活码" />
        </header>
        <main>
            <div class="input_body">
                <input
                    type="text"
                    placeholder="请输入激活码"
                    class="input"
                    autofocus
                    v-model="value"
                />
            </div>
            <div class="activate_body">
                <van-button
                    type="info"
                    class="activate_button"
                    @click="activateUser"
                    >确认激活
                </van-button>
            </div>
            <div class="activate_instruction">
                <h3 class="activate_instruction_title">激活说明</h3>
                <ol>
                    <li>1.激活码为一串字母与数字的组合</li>
                    <li>2.输入正确激活码后即可使用本软件</li>
                    <li>
                        3.激活码存在有效期，逾期自动失效，不补发不延期，请在有效期内及时激活
                    </li>
                    <li>4.激活码仅限激活本软件，不可兑换现金/找零</li>
                    <li>
                        5.同一个激活码仅限激活一次，成功激活后激活码失效，不可重复使用
                    </li>
                </ol>
            </div>
        </main>
    </div>
</template>

<script>
import { reqActivateUser } from "@/api/index.js";
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
    name: "Activate",
    data() {
        return {
            value: "",
            initHeight: "",
        };
    },
    mounted() {
        const token = this.$route.query.token;
        localStorage.setItem("TOKEN", token);
        this.init();
    },
    methods: {
        init() {
            this.initHeight = window.innerHeight + "px";
        },
        async activateUser() {
            const res = await reqActivateUser(this.value);
            if (res.data.code === "0") {
                Toast.success("激活成功");
                setTimeout(() => {
                    this.$router.push({ path: "/layout" });
                }, 500);
            } else {
                Toast.fail("激活失败，请重试！");
            }
        },
    },
};
</script>

<style scoped>
.van-field {
    border-radius: 15px;
}
main {
    background-color: #fff;
    /* height: 100vh; */
}
.input_body {
    display: flex;
    justify-content: center;
    padding: 20px 0 10px 0;
}
.input {
    display: block;
    height: 40px;
    width: 280px;
    border: 2px solid #ccc;
    border-radius: 20px;
    padding: 0 10px;
    /* outline: 0; */
}
.activate_body {
    display: flex;
    justify-content: center;
}
.activate_button {
    width: 300px;
    height: 30px;
    border-radius: 15px;
}
.activate_instruction {
    padding: 20px 20px;
}
.activate_instruction_title {
    margin: 20px 0;
    font-weight: 700;
    font-size: 17px;
}
.activate_instruction ol li {
    margin-bottom: 4px;
    color: #8e8e8e;
}
</style>