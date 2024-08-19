<template>
    <button class="button" :class="[size, cat]">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        size: {
            default:'medium'
        },
        cat: {
            default:'cprimary'
        }
    }
}
</script>

<style lang="less" scoped>
.button {
    text-align: center;
}
// button size
.large {
    min-width: 100px;
    height: 48px;
    border-radius: 24px;
    padding: 0 24px;
}
.medium {
    min-width: 80px;
    height: 36px;
    border-radius: 24px;
    padding: 0 20px;
}
// button category
.primary {
    background: @gray-0;
    color: @gray-9;
}
.secondary {
    background: @gray-9;
    color: @gray-0;
    border: 1px, solid, @gray-0;
}
.cprimary {
    background: @primary-color;
    color: @gray-9;
    font-weight: 600;
    border: 0;
}
.csecondary {
    background: @gray-9;
    color: @gray-0;
    border: 0;
}
</style>