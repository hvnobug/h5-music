<template>
    <div class="detail-header">
        <div class="title">
            <img class="back" @click="back" src="../assets/image/return.png"/>
            <span class="text van-ellipsis">{{title||''}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DetailHeader",
        props: ['backUrl', 'title'],
        methods: {
            back() {
                if (window.history.length <= 1) {
                    this.$router.push({path: this.backUrl || '/'})
                    return false
                } else {
                    this.$router.back()
                }
            },
        }
    }
</script>
