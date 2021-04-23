<template>
    <div class="container">
        <div>
            <b-btn v-b-modal.modal1>Launch demo modal</b-btn>
            <b-modal id="modal1" title="Bootstrap-Vue">
                <b-btn v-b-modal.modal2>Launch another modal</b-btn>
            </b-modal>
            <b-modal id="modal2" title="Bootstrap-Vue">
                Vueception
            </b-modal>
        </div>
        <base-layout>
            <h1 slot="header">Here might be a page title. is same #header</h1>
            <div slot="default">
                <p>A paragraph for the main content.</p>
                <p>And another one.</p>
            </div>
            <p slot="footer">Here's some contact info</p>
            <!-- <template v-slot:header>
                <h1>Here might be a page title. is same #header</h1>
            </template>

            <template #default>
                <p>A paragraph for the main content.</p>
                <p>And another one.</p>
            </template>

            <template #footer>
                <p>Here's some contact info</p>
            </template> -->
        </base-layout>
    </div>
</template>
<script>

export default {
    // this is layout
    name: 'my-test',
    componets: {
        baseLayout: window.httpVueLoader(`./vue/my_layout.vue`),
    },
    data: function (params) {
        return {
            modal1: false,
            modal2: false,
        }
    },
    methods: {
        
    }
}
</script>