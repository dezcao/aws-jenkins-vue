<template>
    <div>
        <b-card>
            <b-card-header>
                <slot name="card-title"></slot>
            </b-card-header>
            <b-card-text>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores harum fugiat dolorum voluptatibus quae nemo consectetur dolorem voluptate quasi hic enim assumenda optio dicta laudantium alias amet veritatis, beatae molestias?
            </b-card-text>
        </b-card>
        
    </div>
</template>
<script>
export default {
    name: 'my-slot',
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