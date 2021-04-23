<template>
<section>
    <b-row class="mb-1">
        <b-col>
            <b-button class="mt-2" href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
                <b-icon-arrow-left></b-icon-arrow-left> 이전으로
            </b-button>
            <b-button class="mt-2" href="#" variant="primary" size="sm" @click="goInsert">
                <b-icon-plus></b-icon-plus>영상 컨텐츠 추가
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
                <template #cell(order)="row">
                    <div class="text-center">
                        {{row.item.order}}
                    </div>
                </template>
                <template #cell(manageBtn)="row">
                    <div class="text-center">
                        <b-button size="sm" variant="outline-success" @click="goUpdate(row.item, $event)">
                            <b-icon-pencil-square></b-icon-pencil-square> 수정
                        </b-button>
                        <b-button size="sm" variant="outline-danger" @click="goDelete(row.item.id)">
                            <b-icon-trash2-fill></b-icon-trash2-fill> 삭제
                        </b-button>
                    </div>
                </template>
            </b-table>
        </b-col>
    </b-row>

    <!-- 모달 -->
    <b-modal v-model="modal1" hide-footer ref="modal1" :title="modal1_title">
        <b-row class="p-1">
            <b-col>
                <b-form>
                    <b-form-group label="대분류:">
                        <b-form-select v-model="selected_top" :options="topcategory" size="sm" @change="getSubcategory"></b-form-select>
                    </b-form-group>
                </b-form>
            </b-col>
            <b-col>
                <b-form>
                    <b-form-group label="소분류:">
                        <b-form-select v-model="selected_sub" :options="subcategory" size="sm"></b-form-select>
                    </b-form-group>
                </b-form>
            </b-col>
        </b-row>
        <b-row class="p-1">
            <b-col sm="4"><label style="font-size: 10pt;">순서</label></b-col>
            <b-col sm="8">
                <b-form-input type="number" size="sm" v-model="form.order"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="p-1">
            <b-col sm="4"><label style="font-size: 10pt;">타이틀</label></b-col>
            <b-col sm="8">
                <b-form-input type="text" size="sm" v-model="form.name"></b-form-input>
            </b-col>
        </b-row>

        <b-row class="p-1">
            <b-col>
                <b-card no-body>
                    <b-tabs card>
                        <b-tab title="국문" active>
                            <b-row class="p-1">
                                <b-col>
                                    <b-card sub-title="배너이미지(800px*450px)">
                                        <b-card-text align="center" class="ino-800-450-wrap">
                                            <div>
                                                <b-img :src="photoPreview||photoPreview_default" fluid></b-img>
                                            </div>
                                        </b-card-text>

                                        <b-form-file v-model="form.photo_1" @change="onFileChange($event, 'photoPreview')" class="mt-1 mb-1" size="sm">
                                        </b-form-file>
                                        <b-button @click="form.photo_1 = null; photoPreview = photoPreview_default;" size="sm" variant="danger">이미지 삭제</b-button>
                                    </b-card>
                                </b-col>
                            </b-row>
                            <b-row class="p-1">
                                <b-col sm="4"><label style="font-size: 10pt;">영상 링크(Youtube)</label></b-col>
                                <b-col sm="8">
                                    <b-form-input type="text" size="sm" v-model="form.link"></b-form-input>
                                </b-col>
                            </b-row>
                            <b-row class="p-1">
                                <b-col>
                                    <b-form-file v-model="form.file" class="mb-2" size="sm">
                                    </b-form-file>
                                    <b-button @click="form.file = null;" size="sm" variant="danger">영상 삭제</b-button>
                                </b-col>
                            </b-row>
                        </b-tab>
                        <b-tab title="영문">

                            <b-row class="p-1">
                                <b-col>
                                    <b-card sub-title="배너이미지(800px*450px)">
                                        <b-card-text align="center" class="ino-800-450-wrap">
                                            <div>
                                                <b-img :src="photoPreview_en||photoPreview_default" fluid></b-img>
                                            </div>
                                        </b-card-text>
                                        <b-form-file v-model="form.photo_1_en" @change="onFileChange($event, 'photoPreview_en')" class="mt-1 mb-1" size="sm">
                                        </b-form-file>
                                        <b-button @click="form.photo_1_en = null; photoPreview_en = photoPreview_default;" size="sm" variant="danger">이미지 삭제</b-button>
                                    </b-card>
                                </b-col>
                            </b-row>
                            <b-row class="p-1">
                                <b-col sm="4"><label style="font-size: 10pt;">영상 링크(Youtube)</label></b-col>
                                <b-col sm="8">
                                    <b-form-input type="text" size="sm" v-model="form.link_en">
                                    </b-form-input>
                                </b-col>
                            </b-row>
                            <b-row class="p-1">
                                <b-col>
                                    <b-form-file v-model="form.file_en" class="mb-2" size="sm">
                                    </b-form-file>
                                    <b-button @click="form.file_en = null;" size="sm" variant="danger">영상 삭제</b-button>
                                </b-col>
                            </b-row>

                        </b-tab>
                    </b-tabs>
                </b-card>
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col>
                <b-button variant="primary" @click="storeData" size="sm" class="inoBtn-150">저장</b-button>
                <b-button variant="danger" @click="$refs['modal1'].hide()" size="sm" class="inoBtn-150">취소</b-button>
            </b-col>
        </b-row>

    </b-modal>
</section>
</template>

<script>
export default {
    name: "movie",
    data: function () {
        return {
            event_id: null,
            menu_id: null,
            fields: [{
                    key: "id",
                    label: "번호",
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
                    key: "sub_category",
                    label: "소분류",
                },
                {
                    key: "name",
                    label: "타이틀",
                },
                {
                    key: "manageBtn",
                    label: "관리항목",
                },
            ],
            items: [],
            url: `${this.api_url}/movie`,
            modal1: false,
            modal1_title: "컨텐츠 추가",
            form: {
                category_id: "",
                order: "",
                name: "",
                photo_1: null,
                photo_1_en: null,
                link: "",
                link_en: "",
                file: null,
                file_en: null,
            },
            photoPreview: ``,
            photoPreview_en: ``,
            photoPreview_default: this.$store.getters.dummy_image_url(['800x450']),

            isNew: false,
            selectedItem: null,

            // 대소분류
            topcategory: [],
            top_id_key_store: {}, // for the menu search
            selected_top: '',

            subcategory: [],
            sub_id_key_store: {},
            selected_sub: '',
            api_url: ''
        };
    },
    mounted: function () {
        this.$nextTick(function () {
            this.event_id = this.$store.getters.event_id;
            this.api_url = this.$store.getters.api_url;
            this.menu_id = this.$route.query.menu_id;
            this.getTopCategory();
            this.getList();
        });
    },
    methods: {
        getList: async function () {
            let url = `${this.api_url}/movie?menu_id=${this.menu_id}`;
            let data = (await axios.get(url)).data;
            this.items = data.result;
        },
        onFileChange(e, url) {
            const file = e.target.files[0];
            this[url] = URL.createObjectURL(file);
        },
        goInsert: async function () {
            // 입력동작 사전 세팅
            // 컨텐츠 추가 -> menu_id의 대분류 -> 대분류의 소분류 -> 제목, 이미지, 내용 저장한다.
            this.form = {
                category_id: "",
                order: "",
                name: "",
                photo_1: null,
                photo_1_en: null,
                link: "",
                link_en: "",
                file: null,
                file_en: null,
            }
			this.modal1_title = "영상 추가";
			this.photoPreview = this.photoPreview_default;
            this.photoPreview_en = this.photoPreview_default;

			this.isNew = true;
            this.selectedItem = null;
            this.selected_sub = null;
            this.selected_top = null;
            this.subcategory = [];

            this.modal1 = true;
        },
        goUpdate: async function (item, e) {
            // 수정 동작 사전 세팅
            // http://14.63.172.119/api/v1/movie/1
            this.isNew = false;
            this.selectedItem = item;
            this.photoPreview = item.photo_1;
            this.photoPreview_en = item.photo_1_en;

            this.form.order = item.order;
            this.form.name = item.name;
            // await this.getTopCategory();
            this.selected_top = item.top_category_id;
            await this.getSubcategory();
            this.selected_sub = item.sub_category_id;

			this.modal1_title = "컨텐츠 수정";
            this.modal1 = true;
        },
        storeData: async function () {
            // 모달 저장 클릭시 작업
			let url = this.isNew ? `${this.api_url}/movie` : `${this.api_url}/movie/${this.selectedItem.id}`;
			let formData = new FormData();
				formData.append('order', this.form.order);
				formData.append('name', this.form.name);
				formData.append('file', this.form.file);
				formData.append('file_en', this.form.file_en);
				formData.append('photo_1', this.form.photo_1);
				formData.append('photo_1_en', this.form.photo_1_en);
				formData.append('link', this.form.link);
				formData.append('link_en', this.form.link_en);
                

                // top만있으면 top, sub 있으면 sub만
                if (this.selected_sub) {
                    formData.append('category_id', this.selected_sub);
                } else {
                    formData.append('category_id', this.selected_top);
                }

			if (this.isNew) {
				formData.append('menu_id', this.menu_id);
				// formData.append('category_id', this.form.category_id); // 필수
			} 

            let rs = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

			this.getList();
			this.modal1 = false;
        },
        goDelete: async function (id) {
            if (confirm("삭제 하시겠습니까?")) {
                await axios.delete(`${this.api_url}/movie/${id}`);
                this.getList();
            }
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
    },
};
</script>
