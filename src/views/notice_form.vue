<template>
<section>
    <b-row>
        <b-col>
            <b-button class="mt-2" href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
                <b-icon-arrow-left></b-icon-arrow-left> 이전으로
            </b-button>
        </b-col>
    </b-row>
    <b-row class="mt-1">
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
    <b-row>
        <b-col>
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="국문" active>
                        <b-row class="mb-3">
                            <b-col>
                                <span>제목:</span>
                                <b-form-input v-model="title" placeholder="제목을 입력하세요." size="sm" block class="mb-3"></b-form-input>
                                <span>서브 타이틀:</span>
                                <b-form-input v-model="subtitle" placeholder="제목을 입력하세요." size="sm" block></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row class="mb-3">
                            <b-col>
                                <span>첨부파일: 여러개파일을 업로드 하고자할 경우  zip  파일로 묶어서 올려주세요. 최대 (20MB)</span>
                                  <b-input-group v-show="file_1_url" prepend="file" class="mt-3">
                                        <b-form-input disabled :value="file_1_name"></b-form-input>
                                        <b-input-group-append>
                                            <b-button variant="outline-success" @click="fileDownload(file_1_url)">Download</b-button>
                                            <b-button variant="danger" @click="file_1_url = ''; file_1_del = true;">Delete</b-button>
                                        </b-input-group-append>
                                    </b-input-group>
                                <b-form-file v-show="!file_1_url" v-model="file_1" size="sm"></b-form-file>
                            </b-col>
                        </b-row>
                        <b-row class="mb-3">
                            <b-col>
                                <span>내용</span>
                                <quill-editor ref="quillEditor" class="editor" :options="editorOption" v-model="editor_content" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)" />
                                <br>
                                <div class="content ql-editor" v-html="editor_content"></div>
                            </b-col>
                        </b-row>
                    </b-tab>
                    <b-tab title="영문">
                        <b-row class="mb-3">
                            <b-col>

                                <span>제목:</span>
                                <b-form-input v-model="title_en" placeholder="제목을 입력하세요." size="sm" block class="mb-3"></b-form-input>
                                <span>서브 타이틀:</span>
                                <b-form-input v-model="subtitle_en" placeholder="제목을 입력하세요." size="sm" block></b-form-input>

                            </b-col>
                        </b-row>
                        <b-row class="mb-3">
                            <b-col>
                                <span>첨부파일: 여러개파일을 업로드 하고자할 경우  zip  파일로 묶어서 올려주세요. 최대 (20MB)</span>
                                  <b-input-group v-show="file_1_en_url" prepend="file" class="mt-3">
                                        <b-form-input disabled :value="file_1_en_name"></b-form-input>
                                        <b-input-group-append>
                                            <b-button variant="outline-success" @click="fileDownload(file_1_en_url)">Download</b-button>
                                            <b-button variant="danger" @click="file_1_en_url = ''; file_1_en_del = true;">Delete</b-button>
                                        </b-input-group-append>
                                    </b-input-group>
                                <b-form-file v-show="!file_1_en_url" v-model="file_1_en" size="sm"></b-form-file>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <span>내용</span>
                                <quill-editor ref="quillEditor" class="editor" :options="editorOption" v-model="editor_content_en" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)" />
                                <br>
                                <div class="content ql-editor" v-html="editor_content_en"></div>
                            </b-col>
                        </b-row>
                    </b-tab>
                </b-tabs>
            </b-card>

        </b-col>
    </b-row>
    <b-row class="mt-3">
        <b-col>
            <b-button href="#" variant="primary" size="sm" @click="storeData">저장하기</b-button>
        </b-col>
    </b-row>

</section>
</template>

<script>
export default {
    name: 'notice_form',
    data: function () {
        return {
            menu_id: null,
            api_url: '',
            url: `${this.api_url}/movie`,
            form: {
                category_id: null
            },
            topcategory: [],
            top_id_key_store: {}, // for the menu search
            selected_top: '',
            subcategory: [],
            sub_id_key_store: {},
            selected_sub: '',
            is_visible_title: true, // 제목 보이거나 안보이기
            title: '',
            title_en: '',
            subtitle: '',
            subtitle_en: '',
            // 퀼 에디터 옵션
            editor_content: `<h1>Some initial content</h1>`,
            editor_content_en: `<h1>Some initial content</h1>`,
            editorOption: {
                theme: "snow",
            },
            preview_1: 'https://picsum.photos/400/400/?image=20',
            preview_basic: `https://picsum.photos/400/400/?image=20`,

            file_1: null,
            file_1_url: '',
            file_1_name: '',
            file_1_del: false,

            file_1_en: null,
            file_1_en_url: '',
            file_1_en_name: '',
            file_1_en_del: false
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.menu_id = this.$route.query.menu_id;
            this.api_url = this.$store.getters.api_url;
            console.log(this.menu_id);
            this.getTopCategory();
            this.getNotice();
        })
    },
    methods: {
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
        getNotice: async function () {
            let url = `${this.api_url}/notice/${this.$route.query.id}`;
            let response = await axios.get(url);
            let rs = response.data.result;
            console.log('get notice ', rs);
            this.title = rs.title;
            this.title_en = rs.title_en;
            this.subtitle = rs.subtitle;
            this.subtitle_en = rs.subtitle_en;
            this.editor_content = rs.contents;
            this.editor_content_en = rs.contents_en;

            this.file_1_url = rs.file_1.url;
            this.file_1_en_url = rs.file_1_en.url;
            this.file_1_name = rs.file_1.name;
            this.file_1_en_name = rs.file_1_en.name;
            
            // 탑검색 -- 주신값1
            this.selected_top = rs.top_category_id
            this.selected_sub = rs.sub_category_id;
            // 서브검색 -- 주신값2
            this.getSubcategory();
            // if (this.selected_top) {
            // }
        },
        storeData: async function () {
            let url = `${this.api_url}/notice`;

            if (this.$route.query.id) {
                url = `${this.api_url}/notice/${this.$route.query.id}`;
            }
            let formData = new FormData();
            console.log('this.$route.query.menu_id ', this.$route.query.menu_id);
            formData.append('menu_id', this.$route.query.menu_id);
            
            // top만있으면 top, sub 있으면 sub만
            if (this.selected_sub) {
                formData.append('category_id', this.selected_sub);
            } else {
                formData.append('category_id', this.selected_top);
            }

            formData.append('title', this.title);
            formData.append('title_en', this.title_en);
            formData.append('subtitle', this.subtitle);
            formData.append('subtitle_en', this.subtitle_en);
            formData.append('contents', this.editor_content);
            formData.append('contents_en', this.editor_content_en);

            !this.file_1 && this.file_1_del ? formData.append('file_1_del', 'Y') : formData.append('file_1', this.file_1);
            !this.file_1_en && this.file_1_en_del ? formData.append('file_1_en_del', 'Y') : formData.append('file_1_en', this.file_1_en);

            let rs = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart-form/data",
                }
            });
            console.log(this.api_url, rs);

			this.getTopCategory();
            function callback () {
                this.$router.go(-1);
            }
            this.$showMsgBoxTwo(rs.status, '', '', callback.bind(this));
			
        },
        fileDownload(url) {
            var link = document.createElement("a");
            link.setAttribute('download', '');
            link.href = url;
            document.body.appendChild(link);
            link.click();
            link.remove();
        },
        onFileChange(e, url) {
            const file = e.target.files[0];
            this[url] = URL.createObjectURL(file);
        },
        content1Delete: function (item, index) {
            this.contents1_arr.splice(index, 1);
        },
        onEditorBlur(quill) {
            console.log("editor blur!", quill);
        },
        onEditorFocus(quill) {
            console.log("editor focus!", quill);
        },
        onEditorReady(quill) {
            // console.log("editor ready!", quill);
        }, 

    }
}
</script>
