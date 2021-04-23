<template>
<section>
    
    <b-row class="mb-1">
        <b-col>
            <b-button class="mt-2" href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
                <b-icon-arrow-left></b-icon-arrow-left> 이전으로
            </b-button>
            <b-button class="mt-2" href="#" variant="primary" size="sm" @click="openModal">
                <b-icon-plus></b-icon-plus>컨텐츠 추가
            </b-button>
        </b-col>
    </b-row>
    <b-row>
        <b-col>
            <b-table :fields="fields" :items="items" small responsive="sm" bordered head-variant="light" sticky-header>
                <template #cell(id)="row">
                    <div class="text-center">
                        {{row.item.id}}
                    </div>
                </template>
                <template #cell(is_top)="row">
                    <div class="text-center">
                        <b-form-radio-group v-model="row.item.is_top" :options="options" 
                            @change="changeIsTop(row.item)"
                            button-variant="outline-primary" size="sm" buttons></b-form-radio-group>
                    </div>
                </template>
                <template #cell(name)="row">
                    <div class="text-center">
                        {{row.item.admin.name}}
                    </div>
                </template>
                <template #cell(manageBtn)="row">
                    <div class="text-center">
                        <b-button size="sm" variant="outline-success" @click="openModal($event, row.item)"><b-icon-pencil-square></b-icon-pencil-square> 수정</b-button>
                        <b-button size="sm" variant="outline-danger" @click="goDelete(row.item.id)"><b-icon-trash2-fill></b-icon-trash2-fill> 삭제</b-button>
                    </div>
                </template>
            </b-table>
        </b-col>
    </b-row>

     <b-modal v-model="modal" hide-footer title="Notice">
        <b-card card>
            <b-row>
                <b-col>
                    <b-form-group label="내용">
                        <b-form-textarea v-model="selected_item.contents"></b-form-textarea>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group label="상단고정">
                        <b-form-radio-group v-model="selected_item.is_top" :options="options" 
                            button-variant="outline-primary" size="sm" buttons></b-form-radio-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row class="mb-1 text-center">
                <b-col>
                    <b-button size="sm" variant="primary" class="inoBtn-150" @click="storeData">저장</b-button>
                </b-col>
            </b-row>
        </b-card>
    </b-modal>
</section>
</template>

<script>
export default {
    name: 'conference_notice',
    data: function () {
        return {
            api_url: null,
            conference_id: null,
            fields: [{
                    key: "id",
                    label: "번호",
                },
                {
                    key: "contents",
                    label: "내용",
                },
                {
                    key: "is_top",
                    label: "상단고정",
                },
                {
                    key: "name",
                    label: "작성자",
                },
                {
                    key: "updated_at",
                    label: "작성일",
                },
                {
                    key: "manageBtn",
                    label: "관리항목",
                },
            ],
            items: [],
            options: [{
                    text: 'ON',
                    value: 1
                },
                {
                    text: 'OFF',
                    value: 0
                }
            ],
            modal: false,
            selected_item: Object
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.conference_id = this.$route.query.conference_id;
            this.api_url = this.$store.getters.api_url;
            this.getList();
        })
    },
    methods: {
        getList: async function () {
            let url = `${this.api_url}/conference_notice?conference_id=${this.conference_id}`;
            let rs = await axios.get(url);
            console.log(rs);
            this.items = rs.data.result;
        },
        openModal: function (event, item) {
            this.selected_item = item ? item : {is_top: 0};
            this.modal = true;
        },
        storeData: async function () {
            let url = `${this.api_url}/conference_notice`;
            if (this.selected_item.id) {
                url = `${this.api_url}/conference_notice/${this.selected_item.id}`;
            }
            let formData = new FormData();
                formData.append('conference_id', this.conference_id);
                formData.append('contents', this.selected_item.contents);
                formData.append('is_top', this.selected_item.is_top);
                let rs = await axios.post(url, formData, {
                    Headers: {
                        'Content-Type': 'application/json'
                    }
                });
            this.$showMsgBoxTwo(rs.status);
            this.getList();
            this.modal = false;
        },
        changeIsTop: async function (item) {
            let url = `${this.api_url}/conference_notice/${item.id}`;
            if (confirm('변경하시겠습니까?')) {
                let formData = new FormData();
                    formData.append('is_top', item.is_top);
                    let rs = await axios.post(url, formData, {
                        Headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                this.$showMsgBoxTwo(rs.status);
                this.getList();
            }
        },
        goDelete: async function (id) {
            if (confirm("삭제 하시겠습니까?")) {
                let url = `${this.api_url}/conference_notice/${id}`;
                let rs = await axios.delete(url);
                this.$showMsgBoxTwo(rs.status);
                this.getList();
            }
        }
    }
}
</script>
