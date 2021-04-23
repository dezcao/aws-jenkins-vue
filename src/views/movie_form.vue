<template>
<section>
    <b-row>
        <b-col>
            <h6><strong>movie 상세정보 입력</strong></h6>
        </b-col>
    </b-row>
    <b-row>
        <b-col>
            <b-form>
                <b-form-group label="대분류:">
                    <b-form-select v-model="selected_top" :options="topcategory" size="sm"></b-form-select>
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
    <b-row class="mb-1">
        <b-col>
            <b-card no-body class="overflow-hidden" style="max-width: 540px;">
                <b-row no-gutters>
                    <b-col md="6">
                        <b-card-img :src="preview_1" alt="Image" class="rounded-0"></b-card-img>
                    </b-col>
                    <b-col md="6">
                        <b-card-body title="이미지 #1">
                            <b-card-text>
                                <b-form-file v-model="form.photo_1" @change="onFileChange($event, 'preview_1')" size="sm" class="mb-1">
                                </b-form-file>
                                <b-button @click="form.photo_1 = null; preview_1 = preview_basic;" size="sm" block>이미지 삭제</b-button>
                            </b-card-text>
                        </b-card-body>
                    </b-col>
                </b-row>
            </b-card>
        </b-col>
        <b-col>
            <b-row>
                <b-col>
                    <span>제목 표시/미표시 설정:</span>
                    <b-form-checkbox v-model="is_visible_title" switch size="lg" class="mb-3"></b-form-checkbox>
                    <span>제목:</span>
                    <b-form-input v-model="text" placeholder="제목을 입력하세요." size="sm" block></b-form-input>
                </b-col>
            </b-row>

        </b-col>
    </b-row>
    <b-row>
        <b-col>
            <span>내용</span>
            <quill-editor ref="quillEditor" class="editor" :options="editorOption" v-model="editor_content" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)" />
            <br>
            <div class="content ql-editor" v-html="editor_content"></div>
        </b-col>
    </b-row>

</section>
</template>

<script>
export default {
    name: 'movie_form',
    data: function () {
        return {
            event_id: null,
            menu_id: null,
            api_url: '',
            url: `${this.api_url}/movie`,
            form: {
                category_id: null
            },
            topcategory: [],
            selected_top: '',
            subcategory: [],
            selected_sub: '',
            is_visible_title: true, // 제목 보이거나 안보이기
            text: '',
            // 퀼 에디터 옵션
            editor_content: `<h1>Some initial content</h1>`,
            editorOption: {
                theme: "snow",
            },
            preview_1: 'https://picsum.photos/400/400/?image=20',
            preview_basic: `https://picsum.photos/400/400/?image=20`
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.event_id = this.$store.getters.event_id;
            this.api_url = this.$store.getters.api_url;
            this.menu_id = this.$route.query.menu_id;
            this.getTopCategory();
        })
    },
    methods: {
        getTopCategory: async function () {
            // movie 형식으로 menu_id에 등록된 대분류
            let url = `${this.api_url}/menucategory/topcategory?menu_id=${this.menu_id}`;
            let response = await axios.get(url);
            this.topcategory = response.data.result;
        },
        getSubcategory: async function () {
            // movie 형식으로 menu_id에 등록된 대분류의 소분류
            let url = `${this.api_url}/menucategory/subcategory?menu_id=${this.menu_id}&category_id=${this.top_selected.id}`;
            let response = await axios.get(url);
            this.subcategory = response.data.result;
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
            console.log("editor ready!", quill);
        },

    }
}
</script>
