<template>
    <div>
        <keep-alive include="Person">
            <router-view></router-view>
        </keep-alive>
        <van-tabbar fixed route>
            <van-tabbar-item replace to="/layout/metronome" icon="music-o"
                >节拍器</van-tabbar-item
            >
            <van-tabbar-item replace to="/layout/person" icon="friends-o"
                >我的</van-tabbar-item
            >
        </van-tabbar>
    </div>
</template>

<script>
export default {
    name: "Layout",
    data() {
        return {};
    },
};
</script>

<style></style>