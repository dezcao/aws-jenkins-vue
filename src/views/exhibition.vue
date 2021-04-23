<template>
<section>
    <b-row class="mb-1">
        <b-col>
            <h6><strong>2.메뉴 및 컨텐츠 관리 > 온라인전시관 > 컨텐츠 (관리)</strong></h6>
            <b-button class="mt-2" href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
                <b-icon-arrow-left></b-icon-arrow-left> 이전으로
            </b-button>
            <b-button class="mt-2" href="#" variant="primary" size="sm" :to="'/mainmenu/contents/exhibition/form?menu_id='+menu_id">
                <b-icon-plus></b-icon-plus>리스트 추가
            </b-button>

            <b-button class="mt-2" href="#" variant="outline-primary" size="sm" @click="updateIsVisible(1, menu_id)">
                <b-icon-eye></b-icon-eye> 모두 노출
            </b-button>
            <b-button class="mt-2" href="#" variant="outline-secondary" size="sm" @click="updateIsVisible(0, menu_id)">
                <b-icon-eye-slash></b-icon-eye-slash> 모두 비노출
            </b-button>
        </b-col>
    </b-row>
    <b-row>
        <b-col>

            
            <b-table :fields="fields" :items="items" small responsive="sm" bordered head-variant="light" sticky-header>
                <template #cell(id)="row">
                    <div class="text-center">{{row.item.id}}</div>
                </template>
                <template #cell(order)="row">
                    <div class="text-center">{{row.item.order}}</div>
                </template>
                <template #cell(like_count)="row">
                    <div class="text-center">{{row.item.like_count}}</div>
                </template>
                <template #cell(is_top)="row">
                    <div class="text-center mt-1">
                        <b-form-group class="p-0 m-0">
                            <b-form-checkbox value="1" v-model="row.item.is_top" name="check-button" switch @change="updateIsTop($event, row.item)"></b-form-checkbox>
                        </b-form-group>
                    </div>
                </template>
                <template #cell(manageBtn)="row">
                    <div class="text-center">
                        <b-button size="sm" variant="outline-info" @click="updateFn(row.item, $event)">
                            <b-icon-credit-card2-front></b-icon-credit-card2-front>
                            부스 개요 수정</b-button>
                        <b-button size="sm" variant="outline-primary" @click="updateFn(row.item, $event, 1)">
                            <b-icon-film></b-icon-film>
                            전시관</b-button>
                        <b-button size="sm" variant="outline-secondary" @click="goQuestion(row.item, $event)">
                            <b-icon-patch-question-fill></b-icon-patch-question-fill>
                            문의내역</b-button>
                        <b-button size="sm" variant="outline-danger" @click="deleteFn(row.item, $event)">
                            <b-icon-trash2-fill></b-icon-trash2-fill>
                            삭제</b-button>
                    </div>
                </template>
            </b-table>
        </b-col>
    </b-row>

</section>
</template>

<script>
export default {
    name: "exhibition",
    components: {
        // 'exhibition_libray_type1_list': window.httpVueLoader(`./exhibition_libray_type1_list.vue`),
    },
    data: function () {
        return {
            event_id: 0,
            menu_id: null,
            api_url: '',
            fields: [{
                    key: "id",
                    label: "번호",
                    class: 'text-center' 
                },
                {
                    key: "order",
                    label: "순서",
                },
                {
                    key: "top_category",
                    label: "대분류",
                },
                {
                    key: "company.name",
                    label: "업체명",
                },
                {
                    key: "like_count",
                    label: "좋아요 수",
                },
                {
                    key: "is_top",
                    label: "기업노출",
                },
                {
                    key: "manageBtn",
                    label: "관리항목",
                },
            ],
            items: [],
            
            
        };
    },
    mounted: function () {
        this.$nextTick(function () {
            this.menu_id = this.$route.query.menu_id;
            this.event_id = this.$store.getters.event_id;
            this.api_url = this.$store.getters.api_url;
            this.getTopCategory();
            this.getList();
        });
    },
    methods: {
        getList: async function () {
            let url = `${this.api_url}/exhibition?menu_id=${this.menu_id}`;
            let data = (await axios.get(url)).data;
            this.items = data.result;
            console.log(data);
        },
        getTopCategory: async function () {
            // movie 형식으로 menu_id에 등록된 대분류
            let url = `${this.api_url}/menucategory/topcategory?menu_id=${this.menu_id}`;
            
            let response = await axios.get(url);
            let temArr = response.data.result;
            let top = {};
            temArr.forEach(element => {
                element.text = element.name;
                element.value = element.id;
                top[element.id] = element; // 메뉴 작성에 찾기 좋은 형태로 빼둠.
            });

            this.top_id_key_store = top;
            this.topcategory = temArr;
        },
        getSubcategory: async function () {
            // movie 형식으로 menu_id에 등록된 대분류의 소분류
            let url = `${this.api_url}/menucategory/subcategory?menu_id=${this.menu_id}&category_id=${this.selected_top}`;
            let response = await axios.get(url);
            let temArr = response.data.result;
            let sub = {};
            temArr.forEach(element => {
                element.text = element.name;
                element.value = element.id;
                sub[element.id] = element; // 메뉴 작성에 찾기 좋은 형태로 빼둠.
            });

            this.sub_id_key_store = sub;
            this.subcategory = temArr;
        },
        updateFn: async function (item, event, library_type) {
            console.log(item);
            
            if (library_type == 1) {
                this.$router.push({ name: 'exhibition_libray_type1_list', query: {menu_id: this.menu_id, company_id: item.company_id, company_name: item.company.name, exhibition_id:item.id }});
            } else {
                this.$router.push({ name: 'exhibition_form', query: {menu_id: this.menu_id, id: item.id, exhibition_id:item.id}});
            }
        },
        goQuestion: async function (item, event) {
            this.$router.push({ name: 'exhibition_question', query: {menu_id: this.menu_id, company_id: item.company_id, company_name: item.company.name, exhibition_id: item.id}});
        },
        deleteFn: async function (item, event) {
            let rs = await axios.delete(`${this.api_url}/exhibition/${item.id}`);
            this.$showMsgBoxTwo(rs.status, 'delete');
            this.getList();
        },
        updateIsTop: async function (event, item) {
            if (confirm(`${item.company.name} 노출을 변경 하시겠습니까?`)) {
                let url = `${this.api_url}/exhibition/${item.id}`;
                let formData = new FormData();
                    formData.append('menu_id', this.menu_id);
                    formData.append('is_top', event ? 1 : 0);
                let rs = await axios.post(url, formData, {
                    Headers: {
                        'Content-Type': 'application/json'
                    }
                });
                this.getList();
                this.$showMsgBoxTwo(rs.status);
            }
        },
        updateIsVisible: async function (is_visible, menu_id) {
            if (confirm(`모든 기업의 노출상태를 변경 하시겠습니까?`)) {
                let url = `${this.api_url}/exhibition/batch_set_visible/`;
                let formData = new FormData();
                    formData.append('menu_id', menu_id);
                    formData.append('is_visible', is_visible);
                let rs = await axios.post(url, formData, {
                    Headers: {
                        'Content-Type': 'application/json'
                    }
                });
                this.getList();
                this.$showMsgBoxTwo(rs.status);
            }
        }
    },
};
</script>
