<template>
<section>
    <b-row class="mb-1">
        <b-col>
            <h6><strong>2.메뉴 및 컨텐츠 관리 >	Program > 상세 </strong></h6>
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
                            <b-form-group label="Time">
                                <b-form-input type="text" v-model="time"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Title">
                                <b-form-input type="text" v-model="title"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Venue">
                                <b-form-input type="text" v-model="venue"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Link">
                                <b-form-input type="text" v-model="link"></b-form-input>
                            </b-form-group>
							<b-card-text>
                                <b-form-textarea  v-model="contents">

                                </b-form-textarea>
								<!-- <quill-editor ref="quillEditor" class="editor" :options="editorOption" v-model="contents" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)" />
								<br>
								<div class="content ql-editor" v-html="contents"></div> -->
							</b-card-text>
						</b-tab>
						<b-tab title="영문">
                            <b-form-group label="Time">
                                <b-form-input type="text" v-model="time_en"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Title">
                                <b-form-input type="text" v-model="title_en"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Venue">
                                <b-form-input type="text" v-model="venue_en"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Link">
                                <b-form-input type="text" v-model="link_en"></b-form-input>
                            </b-form-group>
							<b-card-text>
                                <b-form-textarea  v-model="contents_en">

                                </b-form-textarea>
								<!-- <quill-editor ref="quillEditor" class="editor" :options="editorOption" v-model="contents_en" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)" />
								<br>
								<div class="content ql-editor" v-html="contents_en"></div> -->
							</b-card-text>
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
    name: "program_form",
    data: function () {
        return {
            event_id: 0,
            api_url: '',
            menu_id: null,
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


            id: '',
            time: '',
            venue: '',
            link: '',
            time_en: '',
            venue_en: '',
            link_en: '',

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
            let url = `${this.api_url}/program/${this.id}`;
            let rs = await axios.get(url);
            console.log(rs);
            let data = rs.data.result;
            this.id = data.id;
            this.title = data.title;
            this.time = data.time;
            this.time_en = data.time_en;
            this.title = data.title;
            this.venue = data.venue;
            this.venue_en = data.venue_en;
            this.link = data.link;
            this.link_en = data.link_en;

            this.title = data.title;
            this.title_en = data.title_en;
            this.contents = data.contents;
			this.contents_en = data.contents_en;

            
            // 탑 셀렉트
            this.category.selected_top = data.top_category_id
            // 서브검색
            await this.getSubcategory();
            console.log(this.category.subcategory);
            console.log(data.sub_category_id, ' == 115');
            this.category.selected_sub = data.sub_category_id;
            console.log(this.category.selected_sub, data.sub_category_id);
        },
        storeData: async function () { // 데이터 저장
            let url = `${this.api_url}/program`;
            let formData = new FormData();
                formData.append('menu_id', this.menu_id);
                
                formData.append('time', this.time);
                formData.append('time_en', this.time_en);
                formData.append('venue', this.venue);
                formData.append('venue_en', this.venue_en);

                if (this.link && !this.link.includes('http')) {
                    this.link = `http://${this.link}`;
                }
                if (this.link_en && !this.link_en.includes('http')) {
                    this.link_en = `http://${this.link_en}`;
                }
                formData.append('link', this.link);
                formData.append('link_en', this.link_en);
                
                formData.append('title', this.title);
                formData.append('title_en', this.title_en);
                formData.append('contents', this.contents);
                formData.append('contents_en', this.contents_en);

                let category_id = this.category.selected_sub != 0 ? this.category.selected_sub : this.category.selected_top;
                formData.append('category_id', category_id);
                
            try {

                let rs = await axios.post(url, formData, {
                    Headers: {
                        'Content-Type': 'application/json'
                    }
                });

                function callback () {
                    this.$router.go(-1);
                }
                this.$showMsgBoxTwo(rs.status, '', '', callback.bind(this));

            } catch (error) {
                this.$showMsgBoxTwo(error.response.status, '', error.response.statusText);
            }

        },
        updateData: async function () { // 데이터 수정저장
            let url = `${this.api_url}/program/${this.id}`;
            let formData = new FormData();

                formData.append('time', this.time);
                formData.append('time_en', this.time_en);
                formData.append('venue', this.venue);
                formData.append('venue_en', this.venue_en);

                if (this.link && !this.link.includes('http')) {
                    this.link = `http://${this.link}`;
                }
                if (this.link_en && !this.link_en.includes('http')) {
                    this.link_en = `http://${this.link_en}`;
                }
                formData.append('link', this.link);
                formData.append('link_en', this.link_en);

                formData.append('title', this.title);
                formData.append('title_en', this.title_en);
                formData.append('contents', this.contents);
                formData.append('contents_en', this.contents_en);

                let category_id = this.category.selected_sub != 0 ? this.category.selected_sub : this.category.selected_top;
                formData.append('category_id', category_id);
                
            try {

                let rs = await axios.post(url, formData, {
                    Headers: {
                        'Content-Type': 'application/json'
                    }
                });

                function callback () {
                    this.$router.go(-1);
                }
                this.$showMsgBoxTwo(rs.status, '', '', callback.bind(this));
                

            } catch (error) {
                this.$showMsgBoxTwo(error.response.status, '', error.response.statusText);
            }

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
        onEditorBlur(quill) {
            // console.log("editor blur!", quill);
        },
        onEditorFocus(quill) {
            // console.log("editor focus!", quill);
        },
        onEditorReady(quill) {
            // console.log("editor ready!", quill);
        }
    }
};
</script>
