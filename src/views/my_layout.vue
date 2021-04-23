<template>
    <div class="container">
        <slot name="header"></slot>
        <slot></slot>
        <slot name="footer"></slot>
        <!-- <header></header>
        <main></main>
        <footer></footer> -->
    </div>
</template>
<script>
export default {
    name: 'my-layout',
    data: function (params) {
        return {
            aka: 'aaa'
        }
    },
    methods: {
        test: function (params) {
            console.log(111);
        }
    }
}
</script>