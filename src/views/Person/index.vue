<template>
    <div
        :style="{
            height: initHeight,
            backgroundSize: `${bgWidth} ${initHeight}`,
        }"
        id="person"
        ref="person"
    >
        <div class="person_info">
            <div class="image">
                <van-image round width="8rem" height="8rem" :src="imgSrc" />
            </div>
            <div class="person_id">{{personId}}</div>
        </div>
    </div>
</template>

<script>
import { reqGetUserInfo } from "@/api";
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
    name: "Person",
    data() {
        return {
            initHeight: 0,
            bgWidth: 0,
            imgSrc: "https://img01.yzcdn.cn/vant/cat.jpeg",
            personId: "葫芦丝",
        };
    },
    beforeMount() {
        this.init();
        this.getUserInfo();
    },
    methods: {
        init() {
            this.initHeight = window.innerHeight - 50 + "px";
            this.bgWidth = window.innerWidth - 30 + "px";
        },
        async getUserInfo() {
            const res = await reqGetUserInfo();
            if (res.data.code === "0") {
                const data = res.data.data;
                this.imgSrc = data.headImg;
                this.personId = data.nickname;
            } else if (res.data.code === "907_001") {
                Toast.fail("身份信息过期，请重新登录！");
                setTimeout(() => {
                    window.location.href = "http://kaoyan.since88.cn/wechat/authorize?returnUrl=jasmine";
                }, 1000);
            }
        },
    },
};
</script>

<style>
#person {
    background-image: url("../../assets/bg.jpeg");
    padding-top: 50px;
}
.person_info {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.person_id {
    font-size: 20px;
    margin-top: 10px;
}
</style>