<template>
<section>
    <b-row class="mb-1">
        <b-col>
            <h6><strong>2.메뉴 및 컨텐츠 관리 >	Map 입력폼</strong></h6>
            <b-button class="mt-2" href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
                <b-icon-arrow-left></b-icon-arrow-left> 이전으로
            </b-button>
        </b-col>
    </b-row>
    <b-card>
        <template #header>
            <h6><strong>입력</strong></h6>
        </template>
        <b-row>
            <b-col>
                <b-form>
                    <b-form-group label="대분류 :">
                        <b-form-select v-model="category.selected_top" :options="category.topcategory" size="sm" @change="getSubcategory"></b-form-select>
                    </b-form-group>
                </b-form>
            </b-col>
            <b-col>
                <b-form>
                    <b-form-group label="소분류 :">
                        <b-form-select v-model="category.selected_sub" :options="category.subcategory" size="sm"></b-form-select>
                    </b-form-group>
                </b-form>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card no-body>
					<b-tabs content-class="" card>
						<b-tab title="국문" active @>
                            <b-form-group label="제목">
                                <b-form-input type="text" v-model="title"></b-form-input>
                            </b-form-group>
                            <b-form-group label="내용">
                                <b-card-text>
                                    <quill-editor ref="quillEditor" class="editor" :options="editorOption" v-model="contents" />
                                    <div class="content ql-editor" v-html="contents"></div>
                                </b-card-text>
                            </b-form-group>
						</b-tab>
						<b-tab title="영문">
                            <b-form-group label="제목">
                                <b-form-input type="text" v-model="title_en"></b-form-input>
                            </b-form-group>
                            <b-form-group label="내용">
                                <b-card-text>
                                    <quill-editor ref="quillEditor" class="editor" :options="editorOption" v-model="contents_en" />
                                    <div class="content ql-editor" v-html="contents_en"></div>
                                </b-card-text>
                            </b-form-group>
						</b-tab>
					</b-tabs>
				</b-card>
            </b-col>
        </b-row>
        <b-button v-show="!id" variant="primary" size="sm" class="inoBtn-150 mt-2" @click="storeData">저장</b-button>
        <b-button v-show="id" variant="success" size="sm" class="inoBtn-150 mt-2" @click="updateData">수정</b-button>
    </b-card>
</section>
</template>

<script>
export default {
    name: "map_form",
    data: function () {
        return {
            event_id: 0,
            api_url: '',
            id: 0,
            menu_id: 0,

            category: {
                topcategory: [],
                top_id_key_store: {}, // for the menu search
                selected_top: '',
                subcategory: [],
                sub_id_key_store: {},
                selected_sub: ''
            },

            
            title: '',
            title_en: '',
            contents: null,
			contents_en: null,

            editorOption: {
				placeholder: '게시물을 작성해주세요.',
                theme: "snow",
            },
           
        };
    },
    mounted: function () {
        this.$nextTick(async function () {
            this.id = this.$route.query.id;
            this.menu_id = this.$route.query.menu_id;
            this.event_id = this.$store.getters.event_id;
            this.api_url = this.$store.getters.api_url;
            
            await this.getTopCategory();
            await this.getData();
        });
    },
    methods: {
        getData: async function () { // 데이터 가져오기
            if (!this.id) {
                return;
            }
            let url = `${this.api_url}/map/${this.id}`;
            let rs = await axios.get(url);
            console.log(rs);
            let data = rs.data.result;
            this.id = data.id;
            this.title = data.title;
            this.title_en = data.title_en;
            this.contents = data.contents;
			this.contents_en = data.contents_en;

            // 탑 셀렉트
            this.category.selected_top = data.top_category_id
            // 서브검색
            await this.getSubcategory();
            this.category.selected_sub = data.sub_category_id;
        },
        storeData: async function () { // 데이터 저장
            let url = `${this.api_url}/map`;
            let formData = new FormData();
                formData.append('menu_id', this.menu_id);
                
                formData.append('title', this.title);
                formData.append('title_en', this.title_en);
                formData.append('contents', this.contents);
                formData.append('contents_en', this.contents_en);
                let category_id = this.category.selected_sub != 0 ? this.category.selected_sub : this.category.selected_top;
                formData.append('category_id', category_id);
                
            await this.postSubmit(url, formData, 'application/json');
        },
        updateData: async function () { // 데이터 수정저장
            let url = `${this.api_url}/map/${this.id}`;
            let formData = new FormData();
                
                formData.append('title', this.title);
                formData.append('title_en', this.title_en);
                formData.append('contents', this.contents);
                formData.append('contents_en', this.contents_en);

                let category_id = this.category.selected_sub != 0 ? this.category.selected_sub : this.category.selected_top;
                formData.append('category_id', category_id);
            await this.postSubmit(url, formData, 'application/json');
        },


        /**
         * 기타
         **/
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

            this.category.top_id_key_store = top;
            this.category.topcategory = temArr;
            await this.getSubcategory();
        },
        getSubcategory: async function () {
            // movie 형식으로 menu_id에 등록된 대분류의 소분류
            this.category.selected_sub = '';
            let url = `${this.api_url}/menucategory/subcategory?menu_id=${this.menu_id}&category_id=${this.category.selected_top}`;
            let response = await axios.get(url);
            let temArr = response.data.result;
            let sub = {};
            temArr.forEach(element => {
                element.text = element.name;
                element.value = element.id;
                sub[element.id] = element; // 메뉴 작성에 찾기 좋은 형태로 빼둠.
            });

            this.category.sub_id_key_store = sub;
            this.category.subcategory = temArr;
        },
        postSubmit: async function (url, formData, content_type) {
            try {
                let rs = await axios.post(url, formData, {
                    Headers: {
                        'Content-Type': content_type
                    }
                });

                function callback () {
                    this.$router.go(-1);
                }
                this.$showMsgBoxTwo(rs.status, '', '', callback.bind(this));
                

            } catch (error) {
                this.$showMsgBoxTwo(error.response.status, '', error.response.statusText);
            }
        }
    }
};
</script>
