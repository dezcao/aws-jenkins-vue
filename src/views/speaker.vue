<template>
<section>
    <b-row class="mb-1">
        <b-col>
            <h6><strong>2.메뉴 및 컨텐츠 관리 >	연자소개2 > 컨텐츠 (관리)</strong></h6>
            <b-button href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
                <b-icon-arrow-left></b-icon-arrow-left> 이전으로
            </b-button>
            <b-button size="sm" variant="primary" @click="goForm"><b-icon-plus></b-icon-plus>추가하기</b-button>
        </b-col>
    </b-row>

    <b-table :fields="fields" :items="items" small bordered head-variant="light" class="mt-1">
        <template #cell(id)="row">
            <div class="text-center">{{row.item.id}}</div>
        </template>
        <template #cell(manageBtn)="row">
            <div class="text-center">
                <b-button size="sm" variant="outline-success" @click="goForm($event, row.item)">
                    <b-icon-pencil-square></b-icon-pencil-square>수정
                </b-button>
                <b-button size="sm" variant="outline-danger" @click="deleteData($event, row.item)">
                    <b-icon-trash2-fill></b-icon-trash2-fill>삭제
                </b-button>
            </div>
        </template>
    </b-table>
</section>
</template>

<script>
export default {
    name: "speaker",
    data: function () {
        return {
            event_id: 0,
            api_url: '',
            menu_id: null,
            
            fields: [{
                    key: 'id',
                    label: '아이디'
                },
                {
                    key: 'top_category',
                    label: '대분류'
                },
                {
                    key: 'sub_category',
                    label: '소분류'
                },
                {
                    key: 'title',
                    label: '제목'
                },
                {
                    key: 'manageBtn',
                    label: '관리계정'
                }
            ],
            items: []
        };
    },
    mounted: function () {
        this.$nextTick(async function () {
            this.menu_id = this.$route.query.menu_id;
            this.event_id = this.$store.getters.event_id;
            this.api_url = this.$store.getters.api_url;
            await this.getList();
        });
    },
    methods: {
        /**
         *  리스트
         **/
        getList: async function () {
            let url = `${this.api_url}/speaker?menu_id=${this.menu_id}`;
            let rs = await axios.get(url);
            console.log(rs);
            this.items = rs.data.result;
        },
        goForm: function (event, item) {
            if (item) {
                console.log('id? ', item);
                this.$router.push({ name: 'speaker_form', query: {menu_id: this.menu_id, id: item.id}});
            } else {
                this.$router.push({ name: 'speaker_form', query: {menu_id: this.menu_id}});
            }
        },
        deleteData: async function (event, item) {
            console.log(item);
            let url = `${this.api_url}/speaker/${item.id}`;
            
            try {
                if (confirm('삭제 하시겠습니까?')) {
                    let rs = await axios.delete(url);
                    this.$showMsgBoxTwo(rs.status);
                    this.getList();
                }
            } catch (error) {
                this.$showMsgBoxTwo(error.response.status, '', error.response.statusText);
            }
        }
    }
};
</script>
