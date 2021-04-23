<template>
<section>
    <b-row v-show="id == 11" class="mb-3">
        <b-col>
            <b-button variant="dark" size="sm" @click="PCPreview = !PCPreview">PC버전 보기</b-button>
            <b-modal v-model="PCPreview" hide-footer ref="pc-modal" size="xl">
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" src="http://jejueatsuda.com/admin/preivew/exhibition.html" allowfullscreen></iframe>
                </div>
                <b-button class="mt-3" variant="outline-danger" block @click="$refs['pc-modal'].hide()">Close Me</b-button>
            </b-modal>

            <b-button variant="dark" @click="MobilePreview = !MobilePreview" size="sm">Mobile버전 보기</b-button>
            <b-modal v-model="MobilePreview" hide-footer ref="mobile-modal" class="modal-dialog modal-30size" role="document">
                <div class="embed-responsive embed-responsive-16by9 modal-content modal-30size" style="min-height:600px;">
                    <iframe class="embed-responsive-item" src="http://jejueatsuda.com/admin/preivew/exhibition.html" allowfullscreen></iframe>
                </div>
                <b-button class="mt-3" variant="outline-danger" block @click="$refs['mobile-modal'].hide()">Close Me</b-button>
            </b-modal>
        </b-col>
    </b-row>
    <b-card>
        <b-row>
            <b-col>
                <b-form-group label="메뉴명(국문)">
                    <b-form-input size="sm" v-model="form.name"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="메뉴명(영문)">
                    <b-form-input size="sm" v-model="form.name_en"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-group label="메뉴순서">
                    <b-form-input size="sm" type="number" v-model="form.order"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="게시글 정렬 순서" v-show="form.type != 15">
                    <b-form-radio v-model="form.orderby" name="orderby" value="0">1-24 오름차순</b-form-radio>
                    <b-form-radio v-model="form.orderby" name="orderby" value="1">24-1 내림차순</b-form-radio>
                </b-form-group>
            </b-col>
        </b-row>
    </b-card>
    
    <b-card class="mt-1">
        <template #header> {{form.name}} </template>
        <b-card-text>
            <b-row v-show="13 == form.type" class="mt-1">
                <b-col>
                    <form size="sm">
                        <div class="form-group">
                            <b-form-checkbox v-model="exhibition_search_selling" name="check-button" switch>
                                <strong>매출액 : {{ exhibition_search_selling ? "보이기" : "안보이기"}}</strong>
                            </b-form-checkbox>
                        </div>
                    </form>
                    <form size="sm">
                        <div class="form-group">
                            <b-form-checkbox v-model="exhibition_search_location" name="check-button" switch>
                                <strong>위치 : {{ exhibition_search_location ? "보이기" : "안보이기"}}</strong>
                            </b-form-checkbox>
                        </div>
                    </form>
                    <form size="sm">
                        <div class="form-group">
                            <b-form-checkbox v-model="exhibition_search_type" name="check-button" switch>
                                <strong>회사규모 : {{ exhibition_search_type ? "보이기" : "안보이기"}}</strong>
                            </b-form-checkbox>
                        </div>
                    </form>
                </b-col>
                <b-col>
                    <form size="sm">
                        <div class="form-group">
                            <b-form-checkbox v-model="is_visible_search_option" name="check-button" switch>
                                <strong>검색바 : {{ is_visible_search_option ? "보이기" : "안보이기"}}</strong>
                            </b-form-checkbox>
                        </div>
                    </form>

                    <form size="sm">
                        <div class="form-group">
                            <b-form-checkbox v-model="is_visible_category" name="check-button" switch>
                                <strong>카테고리 선택 : {{ is_visible_category ? "보이기" : "안보이기" }}</strong>
                            </b-form-checkbox>
                        </div>
                    </form>
                </b-col>
            </b-row>
            <b-row v-show="16 == form.type">
                <b-col>
                    <b-row>
                        <b-col cols="10">
                            <h6>하단 링크 추가</h6>
                        </b-col>
                        <b-col>
                            <b-button variant="outline-primary" block size="sm" @click="openModal1($event, true)">
                                <b-icon-plus></b-icon-plus>컨텐츠 추가
                            </b-button>
                        </b-col>
                    </b-row>
                    <b-row class="mt-1">
                        <b-col>
                            <b-table :fields="fields" :items="link_items" bordered head-variant="light" small>
                                <template #cell(id)="row">
                                    <div class="text-center">{{row.item.id}}</div>
                                </template>
                                <template #cell(order)="row">
                                    <div class="text-center">{{row.item.order}}</div>
                                </template>
                                <template #cell(lang_type)="row">
                                    <div class="text-center">{{lang_type_options[row.item.lang_type].text}}</div>
                                </template>
                                <!-- 관리항목 -->
                                <template #cell(manageBtn)="row">
                                    <b-button size="sm" variant="outline-success" @click="isNew=false; openModal1($event, false, row.item)">수정</b-button>
                                    <b-button size="sm" variant="outline-danger" @click="deleteShoppingLink(row.item, row.index, $event.target)">삭제</b-button>
                                </template>
                            </b-table>

                        </b-col>
                    </b-row>
                    <b-row class="mt-3">
                        <b-col cols="10">
                            <h6>하단 이미지 추가</h6>
                        </b-col>
                        <b-col>
                            <b-button variant="outline-primary" block size="sm" @click="openModal2($event, true)">
                                <b-icon-plus></b-icon-plus>컨텐츠 추가
                            </b-button>
                        </b-col>
                    </b-row>
                    <b-row class="mt-1">
                        <b-col>
                            <b-table :fields="fields2" :items="banner_items" bordered head-variant="light" small>
                                <template #cell(id)="row">
                                    <div class="text-center">{{row.item.id}}</div>
                                </template>
                                <template #cell(order)="row">
                                    <div class="text-center">{{row.item.order}}</div>
                                </template>
                                
                                <!-- 관리항목 -->
                                <template #cell(manageBtn)="row">
                                    <b-button size="sm" variant="outline-success" @click="isNew=false; openModal2($event, false, row.item)">수정</b-button>
                                    <b-button size="sm" variant="outline-danger" @click="deleteShoppingBanner(row.item, row.index, $event.target)">삭제</b-button>
                                </template>
                            </b-table>

                        </b-col>
                    </b-row>
                </b-col>
            </b-row>

            <b-row v-show="form.type == 12">
                <b-col>
                    <b-card>
                        <b-card-text class="ino-1200-700-wrap" style="margin:0;">
                            <div>
                                <b-img :src="photo_1_prev||photo_1_prev_default2" fluid></b-img>
                            </div>
                        </b-card-text>
                        <b-form-file v-model="photo_1" @change="onFileChange($event, 'photo_1_prev')" size="sm" class="mr-1 mt-1"
                                    style="width:250px;">
                        </b-form-file>
                        <b-button @click="photo_1 = null; photo_1_prev = null; photo_1_del = true;" size="sm" variant="danger">이미지 삭제</b-button>
                        
                        <b-form-group label="Outlink (국문)" class="mt-2" placeholder="http://를 반드시 입력해 주세요.">
                            <b-form-input type="text" v-model="link" size="sm" class="mt-1"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Outlink (영문)" placeholder="http://를 반드시 입력해 주세요.">
                            <b-form-input type="text" v-model="link_en" size="sm" class="mt-1"></b-form-input>
                        </b-form-group>
                        
                    </b-card>
                </b-col>
                <b-col></b-col>
            </b-row>

            <b-row v-show="form.type == 15">
                <b-col>
                    <b-card>
                        <b-card-text class="ino-180-180-wrap" style="margin:0;">
                            <div>
                                <b-img :src="photo_1_prev||photo_1_prev_default" fluid></b-img>
                            </div>
                        </b-card-text>

                        <b-form-file v-model="photo_1" @change="onFileChange($event, 'photo_1_prev')" size="sm" class="mr-1 mt-1"
                                    style="width:250px;">
                        </b-form-file>
                        <b-button @click="photo_1 = null; photo_1_prev = null; photo_1_del = true;" size="sm" variant="danger">이미지 삭제</b-button>
                    </b-card>
                </b-col>
                <b-col></b-col>
            </b-row>
        </b-card-text>
    </b-card>
    
    <b-row class="mt-3">
        <b-col>
            <b-button href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
                <b-icon-arrow-left></b-icon-arrow-left> 이전으로
            </b-button>
            <b-button href="#" variant="primary" size="sm" @click="updateMenu">
                <b-icon-file-earmark></b-icon-file-earmark>저장하기</b-button>
        </b-col>
    </b-row>
    

    <!-- 모달 -->
    <b-modal v-model="modal1" hide-footer title="링크 추가">
        
        <b-row>
            <b-col>
                <b-form-group label="순서">
                    <b-form-input size="sm" v-model="shopping_form.order" type="number"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-group label="타이틀">
                    <b-form-input size="sm" v-model="shopping_form.title"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-group label="타입">
                    <b-form-select v-model="shopping_form.type" :options="type_options" size="sm"></b-form-select>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-group label="노출">
                    <b-form-select v-model="shopping_form.lang_type" :options="lang_type_options" size="sm"></b-form-select>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row v-show="shopping_form.type == 0">
            <b-col>
                <b-form-group label="링크">
                    <b-form-input size="sm" v-model="shopping_form.link"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>

        <b-row v-show="shopping_form.type == 1">
            <b-col>
                <span>내용</span>
                <quill-editor ref="quillEditor" class="editor" :options="editorOption" v-model="shopping_form.contents" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)" />
                <br>
                <div class="content ql-editor" v-html="shopping_form.contents"></div>
            </b-col>
        </b-row>
        
        <b-row class="mt-1">
            <b-col>
                <b-button variant="outline-primary" @click="storeShoppingLink" size="sm" v-show="isNew">Save</b-button>
                <b-button variant="outline-success" @click="updateShoppingLink" size="sm" v-show="!isNew">Update</b-button>
                <b-button variant="outline-danger" @click="modal1 = false" size="sm">Close</b-button>
            </b-col>
        </b-row>
    </b-modal>

    <b-modal v-model="modal2" hide-footer title="이미지 추가">
        <b-row>
            <b-col>
                <b-form-group label="순서">
                    <b-form-input size="sm" v-model="shopping_banner_form.order" type="number"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-group label="타이틀">
                    <b-form-input size="sm" v-model="shopping_banner_form.title"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-group label="노출">
                    <b-form-select v-model="shopping_banner_form.lang_type" :options="lang_type_options" size="sm"></b-form-select>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="7">
                <b-card align="center">
                    <b-img :src="photo_1_prev||photo_1_prev_default" fluid style="max-width:250px;"></b-img>
                </b-card>
            </b-col>
            <b-col>
                <b-form-file v-model="photo_1" ref="file-input" @change="onFileChange($event, 'photo_1_prev')" class="mb-2" size="sm">
                </b-form-file>
                <b-button @click="photo_1 = null; photo_1_prev = null; photo_1_del = true;" size="sm">이미지 삭제</b-button>
            </b-col>
        </b-row>
        
        <b-row class="mt-1">
            <b-col>
                <b-button variant="outline-primary" @click="storeShoppingBanner" size="sm" v-show="isNew">Save</b-button>
                <b-button variant="outline-success" @click="updateShoppingBanner" size="sm" v-show="!isNew">Update</b-button>
                <b-button variant="outline-danger" @click="modal2 = false" size="sm">Close</b-button>
            </b-col>
        </b-row>
    </b-modal>


</section>
</template>

<script>
export default {
    name: "comInfo",
    data: function () {
        return {
            api_url: null,
            event_id: null,
            PCPreview: false,
            MobilePreview: false,

            modal1: false,
            modal2: false,

            id: null,
            form: {
                id: null,
                name: null,
                name_en: null,
                order: 0, // 메뉴 순서
                orderby: 0, // 게시글 정렬 순서 - 오름차순 :0, 내림차순 : 1
            },
            is_visible_search_option: true,
            is_visible_category: true,
            exhibition_search_location: true,
            exhibition_search_selling: true,
            exhibition_search_type: true, // 회사규모

            fields: [{
                    key: 'id',
                    label: '번호',
                    sortable: true
                },
                {
                    key: 'order',
                    label: '순서',
                    sortable: true
                },
                {
                    key: 'lang_type',
                    label: '노출구분'
                },
                {
                    key: 'title',
                    label: '타이틀'
                },
                {
                    key: 'link',
                    label: '링크'
                },
                {
                    key: 'manageBtn',
                    label: '관리'
                }
            ],
            fields2: [{
                    key: 'id',
                    label: '번호'
                },
                {
                    key: 'order',
                    label: '순서'
                },
                {
                    key: 'show',
                    label: '노출'
                },
                {
                    key: 'title',
                    label: '타이틀'
                },
                {
                    key: 'manageBtn',
                    label: '관리'
                }
            ],
            link_items: [],
            banner_items: [],

            isNew: true,

            shopping_form: {
                order:0,
                type: 0,
                lang_type: 0,
                contents: ''
            },
            type_options: [
                { value: 0, text: '링크' },
                { value: 1, text: 'HTML' },
            ],
            lang_type_options: [
                // 0- 국문, 1 - 영문
                { value: 0, text: '국문' },
                { value: 1, text: '영문' },
                { value: 2, text: '국문 및 영문' }
            ],
            editorOption: {
                theme: "snow",
            },


            shopping_banner_form: {
                order: 0,
                title: '',
                lang_type: 0
            },
            photo_1: null,
            photo_1_prev: '',
            photo_1_prev_default: this.$store.getters.dummy_image_url(['180x180']),
            photo_1_prev_default2: this.$store.getters.dummy_image_url(['1200x700']),
            photo_1_del: false,
            link: '', // outlink
            link_en: '', // outlink

        };
    },
    mounted: function () {
        this.$nextTick(function () {
            this.api_url = this.$store.getters.api_url;
            this.event_id = this.$store.getters.event_id;
            this.id = this.$route.query.id;
            this.getMenu();
            this.getMenuLink();
            this.getMenuBanner();
        });
    },
    methods: {
        getMenu: async function () {
            let url = `${this.api_url}/menu/${this.id}`;
            let rs = await axios.get(url);
            let menu = rs.data.result;

            this.is_visible_category = menu.is_visible_category ? true : false;
            this.is_visible_search_option = menu.is_visible_search_option ? true : false;
            this.exhibition_search_location = menu.exhibition_search_location ? true : false;
            this.exhibition_search_selling = menu.exhibition_search_selling ? true : false;
            this.exhibition_search_type = menu.exhibition_search_type ? true : false;


            this.photo_1_prev = menu.photo_1;
            this.photo_1_del = false;
            this.photo_1 = null;
            menu.photo_1 = null;
            this.link = menu.link;
            this.link_en = menu.link_en;

            this.form = {
                ...menu
            };
        },
        getMenuLink: async function () {
            let url = `${this.api_url}/menu_link?menu_id=${this.id}`;
            let rs = await axios.get(url);
            this.link_items = rs.data.result;
        },
        getMenuBanner: async function () {
            let url = `${this.api_url}/menu_banner?menu_id=${this.id}`;
            let rs = await axios.get(url);
            this.banner_items = rs.data.result;
        },
        updateMenu: async function () {
            let url = `${this.api_url}/menu/${this.id}`;
            var formData = new FormData();
            formData.append('name', this.form.name);
            formData.append('name_en', this.form.name_en);
            formData.append('order', this.form.order);
            formData.append('orderby', this.form.orderby);

            if (13 == this.form.type) {
                formData.append('is_visible_category', this.is_visible_category ? 1 : 0);
                formData.append('is_visible_search_option', this.is_visible_search_option ? 1 : 0);
                formData.append('exhibition_search_location', this.exhibition_search_location ? 1 : 0);
                formData.append('exhibition_search_selling', this.exhibition_search_selling ? 1 : 0);
                formData.append('exhibition_search_type', this.exhibition_search_type ? 1 : 0);
            }

            if (12 == this.form.type) { // outlink
                if (!this.link.includes('http') && this.link) {
                    this.link = `http://${this.link}`;
                }
                if (!this.link_en.includes('http') && this.link_en) {
                    this.link_en = `http://${this.link_en}`;
                }
                formData.append('link', this.link);
                formData.append('link_en', this.link_en);
                !this.photo_1 && this.photo_1_del ? formData.append('photo_1_del', 'Y') : formData.append('photo_1', this.photo_1);
            }

            if (15 == this.form.type) {
                !this.photo_1 && this.photo_1_del ? formData.append('photo_1_del', 'Y') : formData.append('photo_1', this.photo_1);
            }

            let rs = await axios.post(url, formData, {
                headers: {
                    'Content-Type': this.form.type == 15 ? 'multipart/form-data' : 'application/json'
                }
            });
            this.getMenu();
            
            function callback () {
                this.$router.go(-1);
            }
            this.$showMsgBoxTwo(rs.status, '', '', callback.bind(this));
        },

        openModal1: async function (event, isNew, item) {
            this.isNew = isNew;
            if (isNew) {
                this.shopping_form = {
                    order:0,
                    type: 0,
                    lang_type: 0,
                    contents: ''
                };
            } else {
                this.shopping_form = {...item};
            }
            this.modal1 = true;
        },
        storeShoppingLink: async function () {
            let url = `${this.api_url}/menu_link`;
            let formData = new FormData();
                formData.append('menu_id', this.id);
                formData.append('order', this.shopping_form.order);
                formData.append('title', this.shopping_form.title);
                formData.append('lang_type', this.shopping_form.lang_type);

                formData.append('type', this.shopping_form.type);
            if (this.shopping_form.type == 0) {
                formData.append('link', this.shopping_form.link);
            } else {
                formData.append('contents', this.shopping_form.contents);
            }

            let rs = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            this.getMenuLink();
            this.$showMsgBoxTwo(rs.status);
            this.modal1 = false;

        },
        updateShoppingLink: async function () {
            let url = `${this.api_url}/menu_link/${this.shopping_form.id}`;
            let formData = new FormData();
                formData.append('order', this.shopping_form.order);
                formData.append('title', this.shopping_form.title);
                formData.append('lang_type', this.shopping_form.lang_type);

                formData.append('type', this.shopping_form.type);
            if (this.shopping_form.type == 0) {
                formData.append('link', this.shopping_form.link);
                formData.append('contents', '');
            } else {
                formData.append('link', '');
                formData.append('contents', this.shopping_form.contents);
            }

            let rs = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            this.getMenuLink();
            this.$showMsgBoxTwo(rs.status);
            this.modal1 = false;

        },
        deleteShoppingLink: async function(item) {
            if (confirm("삭제 하시겠습니까?")) {
                let url = `${this.api_url}/menu_link/${item.id}`;
                let rs = await axios.delete(url);
                this.getMenuLink();
                this.$showMsgBoxTwo(rs.status, "delete");
                this.modal1 = false;
            }
        },
        openModal2: async function (event, isNew, item) {
            this.isNew = isNew;
            if (isNew) {
                this.shopping_banner_form = {
                    order: 0,
                    title: '',
                    lang_type: 0
                };
                this.photo_1 = null;
                this.photo_1_prev = '';
                this.photo_1_del = false;
            } else {
                this.photo_1 = null;
                this.photo_1_prev = item.photo_1;
                this.photo_1_del = false;
                this.shopping_banner_form = {...item};
            }
            this.modal2 = true;
        },
        storeShoppingBanner: async function () {
            let url = `${this.api_url}/menu_banner`;
            let formData = new FormData();
                formData.append('menu_id', this.id);
                formData.append('order', this.shopping_banner_form.order);
                formData.append('title', this.shopping_banner_form.title);
                formData.append('lang_type', this.shopping_banner_form.lang_type);
                if (this.photo_1) {
                    formData.append('photo_1', this.photo_1);
                }

            let rs = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            this.getMenuBanner();
            this.$showMsgBoxTwo(rs.status);
            this.modal2 = false;

        },
        updateShoppingBanner: async function () {
            let url = `${this.api_url}/menu_banner/${this.shopping_banner_form.id}`;
            let formData = new FormData();
                formData.append('menu_id', this.id);
                formData.append('order', this.shopping_banner_form.order);
                formData.append('title', this.shopping_banner_form.title);
                formData.append('lang_type', this.shopping_banner_form.lang_type);
            
            !this.photo_1 && this.photo_1_del ? formData.append('photo_1_del', 'Y') : formData.append('photo_1', this.photo_1);

            let rs = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            this.getMenuBanner();
            this.$showMsgBoxTwo(rs.status);
            this.modal2 = false;

        },
        deleteShoppingBanner: async function(item) {
            if (confirm("삭제 하시겠습니까?")) {
                let url = `${this.api_url}/menu_banner/${item.id}`;
                let rs = await axios.delete(url);
                this.getMenuBanner();
                this.$showMsgBoxTwo(rs.status, "delete");
                this.modal2 = false;
            }
        },
        
        deletePhoto: async function (item, index, target) {
            if (confirm('삭제하시겠습니까?')) {
                await axios.delete(`http://jejueatsuda.com/api/v1/overview/${item.id}`);
                this.getList();
            }
        },
        onEditorBlur(quill) {
            
        },
        onEditorFocus(quill) {
            
        },
        onEditorReady(quill) {
            
        },
    }
};
</script>
