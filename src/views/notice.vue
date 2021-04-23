<template>
<section>
    
    <b-row class="mb-1">
        <b-col>
            <b-button class="mt-2" href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
                <b-icon-arrow-left></b-icon-arrow-left> 이전으로
            </b-button>
            <b-button class="mt-2" href="#" variant="primary" size="sm" @click="goForm">
                <b-icon-plus></b-icon-plus>컨텐츠 추가
            </b-button>
        </b-col>
    </b-row>
    <b-row>
        <b-col>
            <b-table :fields="fields" :items="items" small responsive="sm" bordered head-variant="light">
                <template #cell(index)="row">
                    <div class="text-center">
                        {{items.length - row.index}}
                    </div>
                </template>
                <template #cell(id)="row">
                    <div class="text-center">
                        {{row.item.id}}
                    </div>
                </template>
                <template #cell(manageBtn)="row">
                    <div class="text-center">
                        <b-button size="sm" variant="outline-success" @click="goForm(row.item, $event)"><b-icon-pencil-square></b-icon-pencil-square> 수정</b-button>
                        <b-button size="sm" variant="outline-danger" @click="goDelete(row.item.id)"><b-icon-trash2-fill></b-icon-trash2-fill> 삭제</b-button>
                    </div>
                </template>
            </b-table>
        </b-col>
    </b-row>
</section>
</template>

<script>
export default {
    name: 'notice',
    data: function () {
        return {
            menu_id: null,
            fields: [
                {
                    key: "index",
                    label: "No",
                    sortable: true
                },
                {
                    key: "id",
                    label: "아이디",
                    sortable: true
                },
                {
                    key: "top_category",
                    label: "대분류",
                    sortable: true
                },
                {
                    key: "sub_category",
                    label: "소분류",
                },
                {
                    key: "title",
                    label: "타이틀",
                },
                {
                    key: "manageBtn",
                    label: "관리항목",
                },
            ],
            items: [],
            api_url: ''
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.menu_id = this.$route.query.menu_id;
            this.api_url = this.$store.getters.api_url;
            this.getList();
        })
    },
    methods: {
        getList: async function () {
            let url = `${this.api_url}/notice?menu_id=${this.menu_id}`;
            let data = (await axios.get(url)).data;
            this.items = data.result;
            console.log('-----------------------------');
            console.log(data);
            console.log('-----------------------------');
        },
        goForm: function (item, event) {
            
			this.$router.push({
				name: 'notice_form',
				query: { menu_id: this.menu_id, id: item.id }
			});
        },
        goDelete: async function (id) {
            if (confirm("삭제 하시겠습니까?")) {
                await axios.delete(`${this.api_url}/notice/${id}`);
                this.getList();
            }
        }
    }
}
</script>
