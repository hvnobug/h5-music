<template>
    <div class="progress-bar" ref="progressBar" @click="progressClick">
        <div class="bar-inner">
            <!-- 背景 -->
            <div class="progress" ref="progress"></div>
            <!-- 小圆点 -->
            <div class="progress-btn-wrapper" ref="progressBtn"
                 @touchstart.prevent="progressTouchStart"
                 @touchmove.prevent="progressTouchMove"
                 @touchend="progressTouchEnd">
                <div class="progress-btn"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {prefixStyle} from '../common/dom'

    const progressBtnWidth = 16
    const transform = prefixStyle('transform')

    export default {
        props: {
            percent: {
                type: Number,
                default: 0
            }
        },
        created() {
            this.touch = {}  //创建一个touch对象
        },
        methods: {
            progressTouchStart(e) {
                //创建一个标志，意思它已经初始化完
                this.touch.initiated = true
                //手指的位置
                this.touch.startX = e.touches[0].pageX
                //当前滚动，滚动条的位置
                this.touch.left = this.$refs.progress.clientWidth
            },
            progressTouchMove(e) {
                //如果初始化完则什么都不做
                if (!this.touch.initiated) {
                    return
                }
                const deltaX = e.touches[0].pageX - this.touch.startX //计算差值
                //max 的0  意思不能小于0 、、、、min，不能超过整个滚动条的宽度
                const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
                this._offset(offsetWidth)
            },
            progressTouchEnd() {
                this.touch.initiated = false
                //滚动完后要给父组件派发一个事件
                this._triggerPercent()
            },
            //点击改变歌曲播放进度
            progressClick(e) {
                const rect = this.$refs.progressBar.getBoundingClientRect() //是一个获取距离的方法
                const offsetWidth = e.pageX - rect.left
                this._offset(offsetWidth)
                // 这里当我们点击 progressBtn 的时候，e.offsetX 获取不对
                // this._offset(e.offsetX)
                this._triggerPercent()
            },
            _triggerPercent() {
                const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
                const percent = this.$refs.progress.clientWidth / barWidth
                this.$emit('percentChange', percent)
            },
            //偏移方法
            _offset(offsetWidth) {
                this.$refs.progress.style.width = `${offsetWidth}px`  //获取进度条的位置，距离左右的距离
                this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`  //小球的偏移
            }
        },
        watch: {
            //它是不断改变的
            percent(newPercent) {
                //大于0 而且不是在拖动的状态下，拖动的时候不要改变
                if (newPercent >= 0 && !this.touch.initiated) {
                    const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth  //进度条的总宽度 内容-按钮的宽度
                    const offsetWidth = newPercent * barWidth //应该偏移的宽度
                    this._offset(offsetWidth)
                }
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../assets/style/variable"
    .progress-bar
        height: 30px
        .bar-inner
            position: relative
            top: 13px
            height: 4px
            background: rgba(0, 0, 0, 0.3)
            .progress
                position: absolute
                height: 100%
                background: $color-theme
            .progress-btn-wrapper
                position: absolute
                left: -8px
                top: -13px
                width: 30px
                height: 30px
                .progress-btn
                    position: relative
                    top: 7px
                    left: 7px
                    box-sizing: border-box
                    width: 16px
                    height: 16px
                    border: 3px solid $color-text
                    border-radius: 50%
                    background: $color-theme
</style>
