<template>
    <div id="metronome" :style="{ height: initHeight }">
        <div class="monitor" ref="monitor">
            <Beat
                :bpm="bpm"
                :rhymePattern="rhymePattern"
                class="Beat"
                ref="Beat"
            ></Beat>
        </div>
        <div class="control-panel" :style="{ height: controlHeight }">
            <div class="control_bpm">
                <em class="btn btn-left big" @click="modifyBpm(-10)">-</em>
                <em class="btn btn-left" @click="modifyBpm(-1)">-</em>
                {{ bpm }}
                <em class="btn btn-right" @click="modifyBpm(1)">+</em>
                <em class="btn btn-right big" @click="modifyBpm(10)">+</em>
            </div>
            <div class="control_play">
                <van-icon
                    v-show="!started"
                    name="play-circle-o"
                    color="black"
                    size="150px"
                    @click="play"
                />
                <van-icon
                    v-show="started"
                    name="pause-circle-o"
                    color="black"
                    size="150px"
                    @click="pause"
                />
            </div>
            <div style="text-align: center; margin: 50px">
                <van-button type="info" @click="open" size="large" round plain
                    >节拍选择</van-button
                >
            </div>

            <div class="rhythm">
                <van-popup v-model="showPop">
                    <Rhythm :changeRhymePattern="changeRhymePattern"></Rhythm>
                </van-popup>
            </div>
        </div>
    </div>
</template>

<script>
import Rhythm from "@/components/Rhythm";
import Beat from "@/components/Beat";
import { reqGetUserInfo } from "@/api";
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
    name: "Metronome",
    data() {
        return {
            bpm: 60,
            show: false,
            started: false,
            isRhythmShow: false,
            rhymePattern: "1",
            initHeight: 0,
            controlHeight: 0,
            showPop: false,
        };
    },
    mounted() {
        this.init();
        this.getUserInfo();
    },
    beforeDestroy() {
        this.pause();
    },
    components: {
        Rhythm,
        Beat,
    },
    methods: {
        modifyBpm(bpm) {
            if (this.bpm + bpm > 0 && this.bpm + bpm <= 400) {
                this.bpm += bpm;
            }
        },
        play() {
            this.started = true;
            this.$refs.Beat.start();
        },
        pause() {
            this.started = false;
            this.$refs.Beat.stop();
        },
        changeRhymePattern(rhymePattern) {
            this.rhymePattern = rhymePattern;
        },
        open() {
            this.showPop = true;
        },
        init() {
            this.initHeight = window.innerHeight - 50 + "px";
            let monitorHeight = this.$refs.monitor.clientHeight;
            console.log(monitorHeight);
            this.controlHeight = window.innerHeight - 50 - monitorHeight + "px";
        },
        async getUserInfo() {
            const res = await reqGetUserInfo();
            console.log(res);
            if (res.data.code !== "0") {
                Toast.fail("身份信息过期，请重新登录！");
                setTimeout(() => {
                    window.location.href =
                        "http://kaoyan.since88.cn/wechat/authorize?returnUrl=jasmine";
                }, 1000);
            }
        },
    },
};
</script>

<style scoped>
#metronome {
    background-color: #fff;
}
.monitor {
    height: 250px;
}
.control-panel {
    position: relative;
    background-color: rgb(243, 241, 241);
    border-bottom: 2px solid black;
    padding: 10px;
}
.control_bpm {
    text-align: center;
    font-size: 32px;
    height: 50px;
    line-height: 50px;
    color: black;
}
.control_bpm .btn {
    display: inline-block;
    width: 25px;
    height: 25px;
    border: 1px solid black;
    border-radius: 50%;
    color: black;
    font-size: 25px;
    text-align: center;
    line-height: 25px;
}
.control_bpm .big {
    width: 32px;
    height: 32px;
    font-size: 32px;
    line-height: 32px;
}
.control_bpm .btn-left {
    margin-right: 5px;
}
.control_bpm .btn-right {
    margin-left: 5px;
}
.control_play {
    text-align: center;
    padding-top: 50px;
}
.rhythm {
    position: absolute;
    top: 50px;
    width: 100%;
    z-index: 999;
    overflow: scroll;
    scrollbar-width: none;
}
</style>