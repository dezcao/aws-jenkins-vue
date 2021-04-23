<template>
<section>
    <b-row class="mb-1">
        <b-col>
            <h6><strong>exhibition_b</strong></h6>
        </b-col>
    </b-row>

    <b-row class="mb-3">
        <b-col>
            <b-card title="관리하기" no-body>
                <b-card-text>
                    <b-tabs card justified>
                        <b-tab title="국문" active>
                            <b-card class="mb-3">
                                <b-row>
                                    <b-col>
                                        <b-card sub-title="바로가기 이미지 #1" :img-src="file1_preview||photoPreview_default" img-alt="Image" img-top tag="article" style="max-width: 415px;" class="mb-3">
                                            <b-form-file v-model="file1" @change="onFileChange($event, 'file1_preview')" class="mb-2" size="sm">
                                            </b-form-file>
                                            <b-form inline class="mb-2">
                                                <b-button @click="file1 = null; file1_preview = photoPreview_default;" size="sm" class="mr-2">이미지 삭제</b-button>
                                                <b-form-checkbox v-model="is_visible_photo_1" name="check-button" switch>
                                                    <strong>이미지 #1 (show: {{ is_visible_photo_1 }})</strong>
                                                </b-form-checkbox>
                                            </b-form>
                                            <b-form-group label="바로가기 링크 #1:" class="">
                                                <b-form-input v-model="form.type_b_link" type="text" placeholder="image link..."></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                    </b-col>
                                </b-row>
                            </b-card>

                            <!-- editor -->
                            <!-- editor -->
                            <!-- editor -->
                            <!-- editor -->
                            <h6>내용</h6>
                            <quill-editor ref="quillEditor" class="editor" :options="editorOption" v-model="editor_content" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)" />
                            <br>
                            <div class="content ql-editor" v-html="editor_content"></div>
                        </b-tab>
                        <b-tab title="영문">
                            <b-card class="mb-3">
                                <b-row>
                                    <b-col>
                                        <b-card sub-title="바로가기 이미지 #1" :img-src="file1_en_preview||photoPreview_default" img-alt="Image" img-top tag="article" style="max-width: 415px;" class="mb-3">
                                            <b-form-file v-model="file1_en" @change="onFileChange($event, 'file1_en_preview')" class="mb-2" size="sm">
                                            </b-form-file>
                                            <b-form inline class="mb-2">
                                                <b-button @click="file1_en = null; file1_en_preview = photoPreview_default;" size="sm" class="mr-2">이미지 삭제</b-button>
                                                <b-form-checkbox v-model="is_visible_photo_1" name="check-button" switch>
                                                    <strong>이미지 #1 (show: {{ is_visible_photo_1 }})</strong>
                                                </b-form-checkbox>
                                            </b-form>
                                            <b-form-group label="바로가기 링크 #1:" class="">
                                                <b-form-input v-model="form.type_b_link_en" type="text" placeholder="image link..."></b-form-input>
                                            </b-form-group>
                                        </b-card>
                                    </b-col>
                                </b-row>
                            </b-card>

                            <!-- editor -->
                            <!-- editor -->
                            <!-- editor -->
                            <!-- editor -->
                            <h6>내용</h6>
                            <quill-editor ref="quillEditor" class="editor" :options="editorOption" v-model="editor_content_en" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)" />
                            <br>
                            <div class="content ql-editor" v-html="editor_content_en"></div>
                        </b-tab>
                    </b-tabs>
                </b-card-text>
                <b-card-text align="center" class="pb-3">
                    <b-button href="#" variant="dark" size="sm" @click="getList">취소</b-button>
                    <b-button href="#" variant="dark" size="sm" @click="save">완료</b-button>
                </b-card-text>
            </b-card>
        </b-col>
    </b-row>

    <b-row class="mb-1">
        <b-col cols="6">
            <strong>카테고리 #2 컨텐츠</strong>
        </b-col>
        <b-col cols="6" align="rigtht">
            <b-button variant="outline-primary" block size="sm" @click="newModalAction('카테고리 #2 컨텐츠 추가')">
                <b-icon-plus></b-icon-plus>이미지 추가
            </b-button>
        </b-col>
    </b-row>
    <b-row class="mb-3">
        <b-col>
            <b-table small :fields="photoFields" :items="exibition_b.link_arr" responsive="sm" bordered head-variant="light" sticky-header>
                <template #cell(manageBtn)="row">
                    <b-button size="sm" variant="outline-success" @click="updateContent(row.item, row.index, $event.target,'카테고리 #2 컨텐츠 수정')">수정</b-button>
                    <b-button size="sm" variant="outline-danger" @click="deleteContent(row.item, row.index, $event.target)">삭제</b-button>
                </template>
            </b-table>
        </b-col>
    </b-row>

    <!-- 카테고리 #2 컨텐츠 팝업 -->
    <b-modal v-model="modal1" hide-footer ref="modal1" :title="content_modal_title">
        <b-row class="p-1">
            <b-col sm="4"><label style="font-size: 10pt;">순서</label></b-col>
            <b-col sm="8">
                <b-form-input type="text" size="sm" v-model="photoParams.order"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="p-1">
            <b-col sm="4"><label style="font-size: 10pt;">배너명</label></b-col>
            <b-col sm="8">
                <b-form-input type="text" size="sm" v-model="photoParams.name"></b-form-input>
            </b-col>
        </b-row>

        <b-row class="p-1">
            <b-col>
                <b-tabs content-class="mt-3" justified>
                    <b-tab title="국문" active>
                        <b-row class="p-1">
                            <b-col sm="4"><label style="font-size: 10pt;">이동할 웹주소</label></b-col>
                            <b-col sm="8">
                                <b-form-input type="text" size="sm" v-model="photoParams.link"></b-form-input>
                            </b-col>
                        </b-row>

                        <b-row class="p-1">
                            <b-col>
                                <b-card sub-title="배너이미지(1000px*300px)" :img-src="photoPreview||photoPreview_default" img-alt="Image" img-top tag="article" style="max-width: 415px;" class="mb-3">
                                    <b-form-file v-model="photoParams.photo_1" @change="onFileChange($event, 'photoPreview')" class="mb-2" size="sm">
                                    </b-form-file>
                                    <b-button @click="photoParams.photo_1 = null; photoPreview = photoPreview_default;" size="sm">이미지 삭제</b-button>
                                </b-card>
                            </b-col>
                        </b-row>
                    </b-tab>
                    <b-tab title="영문">

                        <b-row class="p-1">
                            <b-col sm="4"><label style="font-size: 10pt;">이동할 웹주소</label></b-col>
                            <b-col sm="8">
                                <b-form-input type="text" size="sm" v-model="photoParams.link_en"></b-form-input>
                            </b-col>
                        </b-row>

                        <b-row class="p-1">
                            <b-col>
                                <b-card sub-title="배너이미지(1000px*300px)" :img-src="photoPreview_en||photoPreview_default" img-alt="Image" img-top tag="article" style="max-width: 415px;" class="mb-3">
                                    <b-form-file v-model="photoParams.photo_1_en" @change="onFileChange($event, 'photoPreview_en')" class="mb-2" size="sm">
                                    </b-form-file>
                                    <b-button @click="photoParams.photo_1_en = null; photoPreview_en = photoPreview_default;" size="sm">이미지 삭제</b-button>
                                </b-card>
                            </b-col>
                        </b-row>
                    </b-tab>
                </b-tabs>
            </b-col>
        </b-row>
        <b-button class="mt-2" variant="outline-danger" @click="$refs['modal1'].hide()" size="sm">Close</b-button>
        <b-button class="mt-2" variant="outline-primary" @click="insertContent" size="sm">Save</b-button>
    </b-modal>

</section>
</template>

<script>
// import { VueEditor } from "vue2-editor";

export default {
    name: "exhibition_b",
    data: function () {
        return {
            event_id: null,
            menu_id: null,
            api_url: '',

            exibition_b: {}, // getList 전체 결과값
            overview_id: null,
            overview_type: 2,

            // 본문 이미지 + 링크 + 컨텐츠 정보용
            form: {
                type_b_image: null,
                type_b_image_en: null,
                type_b_link: null,
                type_b_link_en: null,
                contents: null,
                contents_en: null
            },
            file1: null, // 바로가기 파일
            file1_en: null,
            file1_preview: null, // 바로가기 이미지 미리보기
            file1_en_preview: null,
            is_visible_photo_1: true, // 바로가기 이미지 보기 안보기

            // 모달관련
            modal1: false,
            content_modal_title: null,
            // exhibition type B 모달 파라미터들
            photoParams: {
                order: 0,
                name: null,
                link: null,
                link_en: null,
                photo_1: null,
                photo_1_en: null,
            },
            photoParams_reset: {
                order: 0,
                name: null,
                link: null,
                link_en: null,
                photo_1: null,
                photo_1_en: null,
            },
            photoPreview: null, // 이미지 추가 모달 이미지 파일 업로드용 미리보기
            photoPreview_en: null,
            photoPreview_default: "https://via.placeholder.com/1000x300",

            // 카테고리 2 컨텐츠 테이블헤더
            photoFields: [{
                    key: "id",
                    label: "번호",
                },
                {
                    key: "order",
                    label: "순서",
                },
                {
                    key: "name",
                    label: "타이틀",
                },
                {
                    key: "manageBtn",
                    label: "관리",
                },
            ],

            // 퀼 에디터 옵션
            editor_content: `<h1>Some initial content</h1>`,
            editor_content_en: `<h1>Some initial content</h1>`,
            editorOption: {
                theme: "snow",
            },

            isNewModal: true, // 입력 모달인지 수정 모달인지 판별용
            updateItem: {} // 업데이트 요청하는 테이블 상의 한 객체
        };
    },
    mounted: function () {
        this.$nextTick(function () {
            this.event_id = this.$store.getters.event_id;
            this.menu_id = this.$route.query.menu_id;
            this.api_url = this.$store.getters.api_url;
            this.getList();
        });
    },
    computed: {
        editor() {
            return this.$refs.quillEditor.quill;
        },
    },
    methods: {
        getList: async function () {
            let url = `${this.api_url}/e_overview?menu_id=${this.menu_id}`;
            let rs = (await axios.get(url)).data.result;
            this.exibition_b = rs[0];
            console.log(rs);
            this.overview_id = this.exibition_b.id;
            this.editor_content = this.exibition_b.contents;
            this.editor_content_en = this.exibition_b.contents_en;
            this.form.type_b_link = this.exibition_b.type_b_link;
            this.form.type_b_link_en = this.exibition_b.type_b_link_en;

            this.file1_preview = this.exibition_b.type_b_image;
            this.file1_en_preview = this.exibition_b.type_b_image_en;
            
        },

        onFileChange(e, url) {
            const file = e.target.files[0];
            this[url] = URL.createObjectURL(file);
        },
        save: async function () {
            // 상단 내용 저장
            let url = `${this.api_url}/e_overview`;
            var formData = new FormData();
						formData.append('menu_id', this.menu_id); // 필수
						// formData.append('overview_id', this.overview_id); // 필수
						// formData.append('overview_type', this.overview_type);

            formData.append("type_b_image", this.file1);
            formData.append("type_b_image_en", this.file1_en);
            formData.append("type_b_link", this.form.type_b_link);
            formData.append("type_b_link_en", this.form.type_b_link_en);
            formData.append("contents", this.editor_content);
            formData.append("contents_en", this.editor_content_en);

            let rs = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log(rs);
            this.getList();
        },
        insertContent: async function () {
            // 모달 데이터 저장
            let url = null;
						var formData = new FormData();
            if (this.isNewModal) {
                url = `${this.api_url}/overviewcontents`;
								formData.append('overview_id', this.overview_id); // 필수
								formData.append('overview_type', this.overview_type);
            } else {
                // 수정요청 url
                url = `${this.api_url}/overviewcontents/${this.updateItem.id}`;
            }
            
            for (let key in this.photoParams) {
                formData.append(key, this.photoParams[key]);
            }
						// formData.append('menu_id', this.menu_id);
						
            let rs = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("--->", rs);
            this.getList();
            this.modal1 = false;
        },
        newModalAction(title) {
            this.photoParams = {
                ...this.photoParams_reset,
            };
            this.content_modal_title = title;
            this.photoPreview = null;
            this.photoPreview_en = null;
            this.isNewModal = true; // 입력이면 API 주소와 보내는 변수이름이 다르다.
            this.modal1 = !this.modal1;
        },
        updateContent: async function (item, index, target, title) {
            this.photoParams = {
                ...this.photoParams_reset
            };
            this.photoPreview = item.photo_1;
            this.photoPreview_en = item.photo_1_en;
            this.photoParams = {
                ...item
            };
            this.photoParams.photo_1 = null; // 파일이 아니라 문자열 경로라서 에러나지 않게 다시 삭제.
            this.photoParams.photo_1_en = null;
            this.content_modal_title = title;

            this.isNewModal = false; // false = 수정이면 API 주소와 보내는 변수이름이 다르다.
            this.updateItem = item;
            this.modal1 = true;
        },
        deleteContent: async function (item, index, target) {
            if (confirm('삭제 하시겠습니까?')) {
                let url = `${this.api_url}/overviewcontents/${item.id}`;
                let rs = await axios.delete(url);
								console.log('deleted --> ', rs);
								this.getList();
            }
        },
        
        onEditorBlur(quill) {
            // console.log("editor blur!", quill);
        },
        onEditorFocus(quill) {
            // console.log("editor focus!", quill);
        },
        onEditorReady(quill) {
            // console.log("editor ready!", quill);
        },
    },
};
</script>
