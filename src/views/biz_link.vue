<template>
<section>
    <b-row class="mb-1">
        <b-col>
            <h6><strong>6.Bizmatching &#62; 바로가기</strong></h6>
        </b-col>
    </b-row>
    
</section>
</template>

<script>
export default {
    name: 'biz_link',
    data: function () {
        return {
            api_url: ``,
            event_id: null,
           
        }
    },
    mounted: function () {
        this.$nextTick(async function () {
            this.api_url = this.$store.getters.api_url;
            this.event_id = this.$store.getters.event_id;
            
        })
    },

    methods: {
        
    }
}
</script>
