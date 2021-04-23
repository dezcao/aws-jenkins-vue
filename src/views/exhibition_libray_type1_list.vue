<template>
<section>
    <b-row class="mb-1">
        <b-col>
            <h6><strong>2.메뉴 및 컨텐츠 관리 > 컨텐츠 (관리) > {{company_name}} 전시관</strong></h6>
            <b-button class="mt-2" href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
                <b-icon-arrow-left></b-icon-arrow-left> 이전으로
            </b-button>
        </b-col>
    </b-row>
    <b-row class="mt-3">
        <b-col>
        <span>전시자료 </span>
        <b-button href="#" variant="primary" size="sm" @click="emptyModalOpen">
            <b-icon-plus></b-icon-plus>추가
        </b-button>

        <b-table :fields="introduction_fields" :items="introduction" small bordered head-variant="light" class="mt-1">
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
            <template #cell(library_type)="row">
                <div class="text-center">
                    {{row.item.library_type == 1 ? 'YouTube' : row.item.library_type == 2 ? '영상' : '사진'}}
                </div>
            </template>
            <template #cell(manageBtn)="row">
                <div class="text-center">
                    <b-button size="sm" variant="outline-success" @click="containModalOpen(row.item, $event, row.index)">
                        <b-icon-pencil-square></b-icon-pencil-square>수정
                    </b-button>
                    <b-button size="sm" variant="outline-danger" @click="deleteItemFn(row.item, $event, row.index)">
                        <b-icon-trash2-fill></b-icon-trash2-fill>삭제
                    </b-button>
                </div>
            </template>
        </b-table>

        <b-modal v-model="introduction_modal" hide-footer title="기업소개자료" size="xl">
            <b-row>
                <b-col>
                    <b-form-group label="순서" label-for="input-sm1" label-cols="4" label-cols-lg="2" label-size="sm">
                        <b-form-input id="input-sm1" v-model="selected_item.order" size="sm" type="number"></b-form-input>
                    </b-form-group>
                    <b-form-group label="타이틀" label-for="input-sm2" label-cols="4" label-cols-lg="2" label-size="sm">
                        <b-form-input id="input-sm2" v-model="selected_item.title" size="sm"></b-form-input>
                    </b-form-group>
                    <b-form-group label="타입" label-cols="4" label-cols-lg="2" label-size="sm">
                        <b-form-select v-model="selected_item.library_type" :options="library_type_options" size="sm"></b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>

                    <b-row class="p-1" v-show="selected_item.library_type == 0">
                        <b-col>
                            <div>
                                <b-row>
                                    <b-col>
                                        <b-card-group deck>
                                            <b-card no-body style="padding:0 max-width:182px;">
                                            <!-- <b-card no-body style="padding:0 max-width:182px;"> -->
                                                <b-card-text class="ino-180-180-wrap mb-1">
                                                    <div>
                                                        <b-img :src="photo_1_prev||photo_prev_default" fluid></b-img>
                                                    </div>
                                                </b-card-text>
                                                <b-form inline>
                                                    <b-form-file v-model="selected_item.photo_1" placeholder="" @change="onFileChange($event, 'photo_1_prev')" size="sm" style="max-width:80%">
                                                    </b-form-file>
                                                    <b-button @click="selected_item.photo_1 = null; photo_1_prev=null; selected_item.photo_1_del = true;" size="sm" variant="danger">
                                                        <b-icon-trash></b-icon-trash>
                                                    </b-button>
                                                </b-form>
                                                <b-form-textarea v-model="selected_item.photo_1_message" rows="3" max-rows="6" class="mt-1"></b-form-textarea>
                                            </b-card>
                                            <b-card no-body style="padding:0 max-width:182px;">
                                                <b-card-text class="ino-180-180-wrap mb-1">
                                                    <div>
                                                        <b-img :src="photo_2_prev||photo_prev_default" fluid></b-img>
                                                    </div>
                                                </b-card-text>
                                                <b-form inline>
                                                    <b-form-file v-model="selected_item.photo_2" placeholder="" @change="onFileChange($event, 'photo_2_prev')" size="sm" style="max-width:80%">
                                                    </b-form-file>
                                                    <b-button @click="selected_item.photo_2 = null; photo_2_prev=null; selected_item.photo_2_del = true;" size="sm" variant="danger">
                                                        <b-icon-trash></b-icon-trash>
                                                    </b-button>
                                                </b-form>
                                                <b-form-textarea v-model="selected_item.photo_2_message" rows="3" max-rows="6" class="mt-1"></b-form-textarea>
                                            </b-card>
                                            <b-card no-body style="padding:0 max-width:182px;">
                                                <b-card-text class="ino-180-180-wrap mb-1">
                                                    <div>
                                                        <b-img :src="photo_3_prev||photo_prev_default" fluid></b-img>
                                                    </div>
                                                </b-card-text>
                                                <b-form inline>
                                                    <b-form-file v-model="selected_item.photo_3" placeholder="" @change="onFileChange($event, 'photo_3_prev')" size="sm" style="max-width:80%">
                                                    </b-form-file>
                                                    <b-button @click="selected_item.photo_3 = null; photo_3_prev=null; selected_item.photo_3_del = true;" size="sm" variant="danger">
                                                        <b-icon-trash></b-icon-trash>
                                                    </b-button>
                                                </b-form>
                                                <b-form-textarea v-model="selected_item.photo_3_message" rows="3" max-rows="6" class="mt-1"></b-form-textarea>
                                            </b-card>
                                            <b-card no-body style="padding:0 max-width:182px;">
                                                <b-card-text class="ino-180-180-wrap mb-1">
                                                    <div>
                                                        <b-img :src="photo_4_prev||photo_prev_default" fluid></b-img>
                                                    </div>
                                                </b-card-text>
                                                <b-form inline>
                                                    <b-form-file v-model="selected_item.photo_4" placeholder="" @change="onFileChange($event, 'photo_4_prev')" size="sm" style="max-width:80%">
                                                    </b-form-file>
                                                    <b-button @click="selected_item.photo_4 = null; photo_4_prev=null; selected_item.photo_4_del = true;" size="sm" variant="danger">
                                                        <b-icon-trash></b-icon-trash>
                                                    </b-button>
                                                </b-form>
                                                <b-form-textarea v-model="selected_item.photo_4_message" rows="3" max-rows="6" class="mt-1"></b-form-textarea>
                                            </b-card>
                                            <b-card no-body style="padding:0 max-width:182px;">
                                                <b-card-text class="ino-180-180-wrap mb-1">
                                                    <div>
                                                        <b-img :src="photo_5_prev||photo_prev_default" fluid></b-img>
                                                    </div>
                                                </b-card-text>
                                                <b-form inline>
                                                    <b-form-file v-model="selected_item.photo_5" placeholder="" @change="onFileChange($event, 'photo_5_prev')" size="sm" style="max-width:80%">
                                                    </b-form-file>
                                                    <b-button @click="selected_item.photo_5 = null; photo_5_prev=null; selected_item.photo_5_del = true;" size="sm" variant="danger">
                                                        <b-icon-trash></b-icon-trash>
                                                    </b-button>
                                                </b-form>
                                                <b-form-textarea v-model="selected_item.photo_5_message" rows="3" max-rows="6" class="mt-1"></b-form-textarea>
                                            </b-card>
                                        </b-card-group>
                                    </b-col>
                                </b-row>
                                <b-row class="mt-1">
                                    <b-col>
                                        <b-card-group deck>

                                            <b-card no-body style="padding:0 max-width:182px;">
                                                <b-card-text class="ino-180-180-wrap mb-1">
                                                    <div>
                                                        <b-img :src="photo_6_prev||photo_prev_default" fluid></b-img>
                                                    </div>
                                                </b-card-text>
                                                <b-form inline>
                                                    <b-form-file v-model="selected_item.photo_6" placeholder="" @change="onFileChange($event, 'photo_6_prev')" size="sm" style="max-width:80%">
                                                    </b-form-file>
                                                    <b-button @click="selected_item.photo_6 = null; photo_6_prev=null; selected_item.photo_6_del = true;" size="sm" variant="danger">
                                                        <b-icon-trash></b-icon-trash>
                                                    </b-button>
                                                </b-form>
                                                <b-form-textarea v-model="selected_item.photo_6_message" rows="3" max-rows="6" class="mt-1"></b-form-textarea>
                                            </b-card>
                                            <b-card no-body style="padding:0 max-width:182px;">
                                                <b-card-text class="ino-180-180-wrap mb-1">
                                                    <div>
                                                        <b-img :src="photo_7_prev||photo_prev_default" fluid></b-img>
                                                    </div>
                                                </b-card-text>
                                                <b-form inline>
                                                    <b-form-file v-model="selected_item.photo_7" placeholder="" @change="onFileChange($event, 'photo_7_prev')" size="sm" style="max-width:80%">
                                                    </b-form-file>
                                                    <b-button @click="selected_item.photo_7 = null; photo_7_prev=null; selected_item.photo_7_del = true;" size="sm" variant="danger">
                                                        <b-icon-trash></b-icon-trash>
                                                    </b-button>
                                                </b-form>
                                                <b-form-textarea v-model="selected_item.photo_7_message" rows="3" max-rows="6" class="mt-1"></b-form-textarea>
                                            </b-card>
                                            <b-card no-body style="padding:0 max-width:182px;">
                                                <b-card-text class="ino-180-180-wrap mb-1">
                                                    <div>
                                                        <b-img :src="photo_8_prev||photo_prev_default" fluid></b-img>
                                                    </div>
                                                </b-card-text>
                                                <b-form inline>
                                                    <b-form-file v-model="selected_item.photo_8" placeholder="" @change="onFileChange($event, 'photo_8_prev')" size="sm" style="max-width:80%">
                                                    </b-form-file>
                                                    <b-button @click="selected_item.photo_8 = null; photo_8_prev=null; selected_item.photo_8_del = true;" size="sm" variant="danger">
                                                        <b-icon-trash></b-icon-trash>
                                                    </b-button>
                                                </b-form>
                                                <b-form-textarea v-model="selected_item.photo_8_message" rows="3" max-rows="6" class="mt-1"></b-form-textarea>
                                            </b-card>
                                            <b-card no-body style="padding:0 max-width:182px;">
                                                <b-card-text class="ino-180-180-wrap mb-1">
                                                    <div>
                                                        <b-img :src="photo_9_prev||photo_prev_default" fluid></b-img>
                                                    </div>
                                                </b-card-text>
                                                <b-form inline>
                                                    <b-form-file v-model="selected_item.photo_9" placeholder="" @change="onFileChange($event, 'photo_9_prev')" size="sm" style="max-width:80%">
                                                    </b-form-file>
                                                    <b-button @click="selected_item.photo_9 = null; photo_9_prev=null; selected_item.photo_9_del = true;" size="sm" variant="danger">
                                                        <b-icon-trash></b-icon-trash>
                                                    </b-button>
                                                </b-form>
                                                <b-form-textarea v-model="selected_item.photo_9_message" rows="3" max-rows="6" class="mt-1"></b-form-textarea>
                                            </b-card>
                                            <b-card no-body style="padding:0 max-width:182px;">
                                                <b-card-text class="ino-180-180-wrap mb-1">
                                                    <div>
                                                        <b-img :src="photo_10_prev||photo_prev_default" fluid></b-img>
                                                    </div>
                                                </b-card-text>
                                                <b-form inline>
                                                    <b-form-file v-model="selected_item.photo_10" placeholder="" @change="onFileChange($event, 'photo_10_prev')" size="sm" style="max-width:80%">
                                                    </b-form-file>
                                                    <b-button @click="selected_item.photo_10 = null; photo_10_prev=null; selected_item.photo_10_del = true;" size="sm" variant="danger">
                                                        <b-icon-trash></b-icon-trash>
                                                    </b-button>
                                                </b-form>
                                                <b-form-textarea v-model="selected_item.photo_10_message" rows="3" max-rows="6" class="mt-1"></b-form-textarea>
                                            </b-card>
                                           
                                        </b-card-group>
                                    </b-col>
                                </b-row>
                            </div>
                        </b-col>
                    </b-row>
                    <!-- ..l. -->
                    <!-- ..l. -->
                    <!-- ..l. -->
                    <!-- ..l. -->
                    <!-- ..l. -->

                    <b-row class="p-1" v-show="selected_item.library_type != 0">
                        <b-col cols="7">
                            <span>썸네일 이미지</span>
                            <b-card align="center">
                                <b-card-text class="ino-180-180-wrap">
                                    <div>
                                        <b-img :src="thumb_prev||thumb_prev_default" fluid></b-img>
                                    </div>
                                </b-card-text>
                            </b-card>
                        </b-col>
                        <b-col>
                            <b-form-file v-model="selected_item.image_prev" ref="file-input" @change="onFileChange($event, 'thumb_prev')" class="mb-2" size="sm">
                            </b-form-file>
                            <b-button @click="selected_item.image_prev = null; thumb_prev = null; selected_item.image_prev_del = true;" size="sm" variant="danger">이미지 삭제</b-button>
                        </b-col>
                    </b-row>
                    <b-row class="p-1" v-show="selected_item.library_type == 1">
                        <b-col sm="4"><label style="font-size: 10pt;" placeholder="반드시 http:// 를 입력해주세요.">링크(Youtube)</label></b-col>
                        <b-col sm="8">
                            <b-form-input type="text" size="sm" v-model="selected_item.link"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="p-1" v-show="selected_item.library_type == 2">
                        <b-col sm="4"><label style="font-size: 10pt;">영상 파일</label></b-col>
                        <b-col sm="8">
                            <b-form-file v-model="selected_item.file" class="mb-2" size="sm"
                                :placeholder="movie_file_src"
                            >
                            </b-form-file>
                            <b-button @click="selected_item.file = null; selected_item.movie_file_del = true; movie_file_src='';" size="sm" variant="danger">영상 삭제</b-button>
                        </b-col>
                    </b-row>
<!-- 
                    <b-row class="p-1">
                        <b-col sm="4"><label style="font-size: 10pt;">링크 메시지</label></b-col>
                        <b-col sm="8">
                            <b-form-textarea v-model="selected_item.link_message" rows="3" max-rows="6" class="mt-1"></b-form-textarea>
                        </b-col>
                    </b-row>
                     -->
                </b-col>
            </b-row>

            <b-row class="mt-3">
                <b-col>
                    <b-button size="sm" variant="primary" @click="addItemFn" v-show="isNew" class="inoBtn-150">완료</b-button>
                    <b-button size="sm" variant="success" @click="updateItemFn" v-show="!isNew" class="inoBtn-150">수정</b-button>
                    <b-button size="sm" variant="danger" @click="introduction_modal = false;" class="inoBtn-150">취소</b-button>
                </b-col>
            </b-row>
        </b-modal>
            
        </b-col>
    </b-row>
</section>
</template>

<script>
export default {
    name: 'exhibition_libray_type1_list',
    components: {
        // 'introduction-image': window.httpVueLoader(`./popup/introduction_image.vue`),

    },
    data: function () {
        return {
            api_url: ``,
            event_id: null,
            menu_id: null,
            exhibition_id: null,
            
            company_id: null,
            company_name: null,
            library_type_options: [{
                    value: 0,
                    text: '이미지'
                },
                {
                    value: 1,
                    text: 'YouTube'
                },
                {
                    value: 2,
                    text: 'Video'
                }
            ],
            
            introduction_fields: [{
                    key: 'id',
                    label: '아이디'
                },
                {
                    key: 'order',
                    label: '순서'
                },
                {
                    key: 'library_type',
                    label: 'Type'
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
                    key: "manageBtn",
                    label: "관리항목",
                }
            ],
            introduction: [],
            introduction_modal: false,
            selected_item: {
                library_type: 0,
                photo_1: null,
                photo_2: null,
                photo_3: null,
                photo_4: null,
                photo_5: null,
                photo_6: null,
                photo_7: null,
                photo_8: null,
                photo_9: null,
                photo_10: null,
                photo_1_message: '',
                photo_2_message: '',
                photo_3_message: '',
                photo_4_message: '',
                photo_5_message: '',
                photo_6_message: '',
                photo_7_message: '',
                photo_8_message: '',
                photo_9_message: '',
                photo_10_message: '',
                photo_1_del: false,
                photo_2_del: false,
                photo_3_del: false,
                photo_4_del: false,
                photo_5_del: false,
                photo_6_del: false,
                photo_7_del: false,
                photo_8_del: false,
                photo_9_del: false,
                photo_10_del: false,

            },

            photo_1_prev: '',
            photo_2_prev: '',
            photo_3_prev: '',
            photo_4_prev: '',
            photo_5_prev: '',
            photo_6_prev: '',
            photo_7_prev: '',
            photo_8_prev: '',
            photo_9_prev: '',
            photo_10_prev: '',
            photo_prev_default: this.$store.getters.dummy_image_url(['180x180']),
            thumb_prev: '',
            thumb_prev_default: this.$store.getters.dummy_image_url(['180x180']),
            movie_file_src: '',
            isNew: true
        }
    },
    mounted: function () {
        this.$nextTick(async function () {
            this.api_url = this.$store.getters.api_url;
            this.event_id = this.$store.getters.event_id;
            this.menu_id = this.$route.query.menu_id;
            this.company_id = this.$route.query.company_id;
            this.exhibition_id = this.$route.query.exhibition_id;
            this.company_name = this.$route.query.company_name;
            this.getList();
        })
    },

    methods: {
        getList: async function () {
            let response = await axios.get(`${this.api_url}/e_library?exhibition_id=${this.exhibition_id}&type=1`);
            let rs = response.data.result;
            console.log('exhibition library type 1 data ', response);
            this.introduction = rs;
        },
        emptyModalOpen: function () {
            this.selected_item = {
                "exhibition_id": this.exhibition_id,
                "type": 1,
                "library_type": 0,
                "lang_type": 0,
                "title": "",
                "order": 0,
                "link": "",
                "image_prev": null,
                "file": null,
                "link_message": "",

                photo_1: null,
                photo_2: null,
                photo_3: null,
                photo_4: null,
                photo_5: null,
                photo_6: null,
                photo_7: null,
                photo_8: null,
                photo_9: null,
                photo_10: null,
                
                photo_1_del: false,
                photo_2_del: false,
                photo_3_del: false,
                photo_4_del: false,
                photo_5_del: false,
                photo_6_del: false,
                photo_7_del: false,
                photo_8_del: false,
                photo_9_del: false,
                photo_10_del: false,
            }
            this.thumb_prev = '';
            this.movie_file_src = '';
            this.isNew = true;
            this.photo_1_prev = null;
            this.photo_2_prev = null;
            this.photo_3_prev = null;
            this.photo_4_prev = null;
            this.photo_5_prev = null;
            this.photo_6_prev = null;
            this.photo_7_prev = null;
            this.photo_8_prev = null;
            this.photo_9_prev = null;
            this.photo_10_prev = null;

            this.selected_item.photo_1_message = '';
            this.selected_item.photo_2_message = '';
            this.selected_item.photo_3_message = '';
            this.selected_item.photo_4_message = '';
            this.selected_item.photo_5_message = '';
            this.selected_item.photo_6_message = '';
            this.selected_item.photo_7_message = '';
            this.selected_item.photo_8_message = '';
            this.selected_item.photo_9_message = '';
            this.selected_item.photo_10_message = '';

            this.introduction_modal = true;
        },
        containModalOpen: function (item) {
            this.thumb_prev = item.image_prev;
            this.movie_file_src = item.file;
            this.selected_item = {
                "exhibition_id": this.exhibition_id,
                "id": item.id,
                "type": 1,
                "library_type": item.library_type,
                "lang_type": item.lang_type,
                "title": item.title,
                "order": item.order,
                "link": item.link,
                "image_prev": null,
                "file": null,
                "link_message": item.link_message,
                "image_prev_del": false,
                "movie_file_del": false
            };
            this.photo_1_prev = item.photo_1;
            this.photo_2_prev = item.photo_2;
            this.photo_3_prev = item.photo_3;
            this.photo_4_prev = item.photo_4;
            this.photo_5_prev = item.photo_5;
            this.photo_6_prev = item.photo_6;
            this.photo_7_prev = item.photo_7;
            this.photo_8_prev = item.photo_8;
            this.photo_9_prev = item.photo_9;
            this.photo_10_prev = item.photo_10;

            this.selected_item.photo_1_message = item.message_1
            this.selected_item.photo_2_message = item.message_2
            this.selected_item.photo_3_message = item.message_3
            this.selected_item.photo_4_message = item.message_4
            this.selected_item.photo_5_message = item.message_5
            this.selected_item.photo_6_message = item.message_6
            this.selected_item.photo_7_message = item.message_7
            this.selected_item.photo_8_message = item.message_8
            this.selected_item.photo_9_message = item.message_9
            this.selected_item.photo_10_message = item.message_10

            this.selected_item.photo_1_del = false;
            this.selected_item.photo_2_del = false;
            this.selected_item.photo_3_del = false;
            this.selected_item.photo_4_del = false;
            this.selected_item.photo_5_del = false;
            this.selected_item.photo_6_del = false;
            this.selected_item.photo_7_del = false;
            this.selected_item.photo_8_del = false;
            this.selected_item.photo_9_del = false;
            this.selected_item.photo_10_del = false;
            
            this.isNew = false;
            this.introduction_modal = true;
        },
        introductionDeleteFn: function (item) {

        },
        addItemFn: async function () {
            console.log(this.selected_item);
            let item = this.selected_item;
            let url = `${this.api_url}/e_library`;
            let formData = new FormData();
            formData.append('exhibition_id', item.exhibition_id);
            formData.append('title', item.title); // 전시자료 1
            formData.append('type', item.type); // 전시자료 1
            formData.append('library_type', item.library_type); // photo, youtube, file
            formData.append('link_message', item.link_message);

            switch (item.library_type) {
                case 1:
                    formData.append('link', item.link);
                    break;
                case 2:
                    formData.append('file', item.file); // 영상 파일 (file2)
                    break;
                default:
                    !item.photo_1 && item.photo_1_del ? formData.append('photo_1_del', 'Y') : formData.append('photo_1', item.photo_1);
                    !item.photo_2 && item.photo_2_del ? formData.append('photo_2_del', 'Y') : formData.append('photo_2', item.photo_2);
                    !item.photo_3 && item.photo_3_del ? formData.append('photo_3_del', 'Y') : formData.append('photo_3', item.photo_3);
                    !item.photo_4 && item.photo_4_del ? formData.append('photo_4_del', 'Y') : formData.append('photo_4', item.photo_4);
                    !item.photo_5 && item.photo_5_del ? formData.append('photo_5_del', 'Y') : formData.append('photo_5', item.photo_5);
                    !item.photo_6 && item.photo_6_del ? formData.append('photo_6_del', 'Y') : formData.append('photo_6', item.photo_6);
                    !item.photo_7 && item.photo_7_del ? formData.append('photo_7_del', 'Y') : formData.append('photo_7', item.photo_7);
                    !item.photo_8 && item.photo_8_del ? formData.append('photo_8_del', 'Y') : formData.append('photo_8', item.photo_8);
                    !item.photo_9 && item.photo_9_del ? formData.append('photo_9_del', 'Y') : formData.append('photo_9', item.photo_9);
                    !item.photo_10 && item.photo_10_del ? formData.append('photo_10_del', 'Y') : formData.append('photo_10', item.photo_10);

                    formData.append('photo_1_message', item.photo_1_message);
                    formData.append('photo_2_message', item.photo_2_message);
                    formData.append('photo_3_message', item.photo_3_message);
                    formData.append('photo_4_message', item.photo_4_message);
                    formData.append('photo_5_message', item.photo_5_message);
                    formData.append('photo_6_message', item.photo_6_message);
                    formData.append('photo_7_message', item.photo_7_message);
                    formData.append('photo_8_message', item.photo_8_message);
                    formData.append('photo_9_message', item.photo_9_message);
                    formData.append('photo_10_message', item.photo_10_message);

                    break;
            }
            if (item.image_prev) {
                formData.append('image_prev', item.image_prev); // 이미지 파일
            }

            let rs = await axios.post(url, formData, {
                Headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            this.getList();
            this.introduction_modal = false;
            this.$showMsgBoxTwo(rs.status);
            return rs;
        },
        deleteItemFn: async function (item) {
            if (confirm("삭제 하시겠습니까?")) {
                let rs = await axios.delete(`${this.api_url}/e_library/${item.id}`);
                this.getList();
                this.$showMsgBoxTwo(rs.status);
            }
        },
        updateItemFn: async function () {
            console.log(this.selected_item);
            let item = this.selected_item;
            let url = `${this.api_url}/e_library/${item.id}`;
            console.log(url);
            let formData = new FormData();
                formData.append('title', item.title);
                formData.append('order', item.order); // 전시자료 1
                formData.append('type', item.type); // 전시자료 1
                formData.append('library_type', item.library_type); // photo, youtube, file
                formData.append('link_message', item.link_message);

            switch (item.library_type) {
                case 0:
                    // !item.image_prev && item.image_prev_del ? formData.append('image_prev_del', 'Y') : formData.append('image_prev', item.image_prev); // 이미지 파일
                    !item.photo_1 && item.photo_1_del ? formData.append('photo_1_del', 'Y') : formData.append('photo_1', item.photo_1);
                    !item.photo_2 && item.photo_2_del ? formData.append('photo_2_del', 'Y') : formData.append('photo_2', item.photo_2);
                    !item.photo_3 && item.photo_3_del ? formData.append('photo_3_del', 'Y') : formData.append('photo_3', item.photo_3);
                    !item.photo_4 && item.photo_4_del ? formData.append('photo_4_del', 'Y') : formData.append('photo_4', item.photo_4);
                    !item.photo_5 && item.photo_5_del ? formData.append('photo_5_del', 'Y') : formData.append('photo_5', item.photo_5);
                    !item.photo_6 && item.photo_6_del ? formData.append('photo_6_del', 'Y') : formData.append('photo_6', item.photo_6);
                    !item.photo_7 && item.photo_7_del ? formData.append('photo_7_del', 'Y') : formData.append('photo_7', item.photo_7);
                    !item.photo_8 && item.photo_8_del ? formData.append('photo_8_del', 'Y') : formData.append('photo_8', item.photo_8);
                    !item.photo_9 && item.photo_9_del ? formData.append('photo_9_del', 'Y') : formData.append('photo_9', item.photo_9);
                    !item.photo_10 && item.photo_10_del ? formData.append('photo_10_del', 'Y') : formData.append('photo_10', item.photo_10);

                    formData.append('photo_1_message', item.photo_1_message);
                    formData.append('photo_2_message', item.photo_2_message);
                    formData.append('photo_3_message', item.photo_3_message);
                    formData.append('photo_4_message', item.photo_4_message);
                    formData.append('photo_5_message', item.photo_5_message);
                    formData.append('photo_6_message', item.photo_6_message);
                    formData.append('photo_7_message', item.photo_7_message);
                    formData.append('photo_8_message', item.photo_8_message);
                    formData.append('photo_9_message', item.photo_9_message);
                    formData.append('photo_10_message', item.photo_10_message);

                    break;
                case 1:
                    !item.image_prev && item.image_prev_del ? formData.append('image_prev_del', 'Y') : formData.append('image_prev', item.image_prev); // 유튜브 썸네일 파일
                    formData.append('link', item.link);
                    break;
                default:
                    // 2 영상파일
                    !item.image_prev && item.image_prev_del ? formData.append('image_prev_del', 'Y') : formData.append('image_prev', item.image_prev); // 영상 썸네일 파일 (file1)
                    !item.file && item.movie_file_del ? formData.append('file_del', 'Y') : formData.append('file', item.file); // 영상 파일 (file2)
                    // file -- 영상파일인 경우 library_type = 2
                    break;
            }

            await axios.post(url, formData, {
                Headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                this.getList();
                this.introduction_modal = false;
                this.$showMsgBoxTwo(res.status);
            })
            .catch(error => {
                this.getList();
                this.$showMsgBoxTwo(error.response.status, '', error.response.statusText);
                
            });

        },
        imagePrev: function (e, key) {

            const file = e.target.files[0];
            let file_url = URL.createObjectURL(file);
            this.selected_item[key].url = file_url;
            this[key + "_prev"] = file_url;
            // item.photo_1.url = file_url;
            // this.photo_1_prev = file_url; // 개별컴포넌트에 변경되는 url 받아줄 변수가 있어야함.
            console.log('imagePrev')

        },

        
        
    }
}
</script>
