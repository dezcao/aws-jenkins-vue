<template>
<section>
    <b-row class="mb-1">
        <b-col>
            <h6><strong>2.메뉴 및 컨텐츠 관리 >	Suervey 입력폼</strong></h6>
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
            <b-col>
                <b-form-group label="설문 On/Off">
                    <b-form-radio-group v-model="form.is_use_survey" :options="options" 
                        button-variant="outline-primary" size="sm" buttons></b-form-radio-group>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-button size="sm" @click="goServeyInfo('kor')" variant="outline-success"><b-icon icon="search"></b-icon>설문 확인</b-button>
                <b-button size="sm" @click="resetServey"  variant="outline-danger">
                    <b-icon-x-octagon></b-icon-x-octagon> 설문 확인 데이터 초기화</b-button>
            </b-col>
        </b-row>
        <b-row class="mt-1">
            <b-col>
                <b-card no-body>
					<b-tabs content-class="" card>
						<b-tab title="국문" active >
                            <b-form-group label="제목" class="mt-1">
                                <b-form-input type="text" v-model="form.name" size="sm"></b-form-input>
                            </b-form-group>
                            <b-form-group label="설문 제목">
                                <b-form-input type="text" v-model="form.poll_question.survey_overview" size="sm"></b-form-input>
                            </b-form-group>
                            <b-form-group label="설문 문항" class="survey-cardgroup">
                                <b-card class="mb-1" bg-variant="light" v-for="(item, index) in question" v-bind:key="index">
                                    <template #header>
                                        <a class="mb-0" href="#" @click="question.splice(index, 1)"><b-icon-x-square ></b-icon-x-square></a>
                                    </template>
                                    <b-form-group label="문항 제목">
                                        <b-form-input type="text" v-model="item.title" size="sm"></b-form-input>
                                    </b-form-group>
                                    <b-form-group label="문항 종류">
                                        <b-form-radio-group v-model="item.type" :options="question_options"></b-form-radio-group>
                                    </b-form-group>
                                    <b-form-group label="보기" v-if="item.type == 1">
                                        <b-input-group size="sm" class="mb-1"
                                            v-for="(choice, index) in item.case" v-bind:key="index">
                                            <b-form-input type="text" v-model="item.case[index]"></b-form-input>
                                            <b-input-group-append><b-button variant="danger" size="sm" @click="item.case.splice(index, 1)">x</b-button></b-input-group-append>
                                        </b-input-group>
                                        <b-button variant="success" size="sm" class="mt-1" @click="item.case.push('')">보기 추가하기</b-button>
                                    </b-form-group>
                                </b-card>
                            </b-form-group>
                            <b-button variant="primary" size="sm" @click="addArray(question, question_type1)">문항 추가하기</b-button>
						</b-tab>
						<b-tab title="영문">
                            <b-form-group label="제목">
                                <b-form-input type="text" v-model="form.name_en"></b-form-input>
                            </b-form-group>
                            <b-form-group label="설문 제목">
                                <b-form-input type="text" v-model="form.poll_question_en.survey_overview" size="sm"></b-form-input>
                            </b-form-group>
                            <b-form-group label="설문 문항" class="survey-cardgroup">
                                <b-card class="mb-1" bg-variant="light" v-for="(item, index) in question_en" v-bind:key="index">
                                    <template #header>
                                        <a class="mb-0" href="#" @click="question_en.splice(index, 1)"><b-icon-x-square ></b-icon-x-square></a>
                                    </template>
                                    <b-form-group label="문항 제목">
                                        <b-form-input type="text" v-model="item.title" size="sm"></b-form-input>
                                    </b-form-group>
                                    <b-form-group label="문항 종류">
                                        <b-form-radio-group v-model="item.type" :options="question_options"></b-form-radio-group>
                                    </b-form-group>
                                    <b-form-group label="보기" v-if="item.type == 1">
                                        <b-input-group size="sm" class="mb-1"
                                            v-for="(choice, index) in item.case" v-bind:key="index">
                                            <b-form-input type="text" v-model="item.case[index]"></b-form-input>
                                            <b-input-group-append><b-button variant="danger" size="sm" @click="item.case.splice(index, 1)">x</b-button></b-input-group-append>
                                        </b-input-group>
                                        <b-button variant="success" size="sm" class="mt-1" @click="item.case.push('')">보기 추가하기</b-button>
                                    </b-form-group>
                                </b-card>
                            </b-form-group>
                            <b-button variant="primary" size="sm" @click="addArray(question_en, question_type1)">문항 추가하기</b-button>
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
    name: "survey_form",
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
            options: [
                { text: 'ON', value: 1 },
                { text: 'OFF', value: 0}
            ],
            question_options: [
                { text: '객관식', value: 1},
                { text: '주관식', value: 2 }
            ],

            form : {
                name: '', // 제목
                name_en: '', // 제목
                is_use_survey: 0,
                is_use_survey_en: 0,
                poll_question: {},
                poll_question_en: {}
            },
            question: [],
            question_en: [],
            question_type1: { title: '', type: 1, case: [] },
            question_type2: { title: '', type: 2 }
        };
    },
    mounted: async function () {
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
        goServeyInfo: function () {
            if (!this.id) {
                return;
            }
            this.$router.push({ name: 'survey_result', query: {id: this.id}});
        },
        getData: async function () { // 데이터 가져오기
            if (!this.id) {
                return;
            }
            let url = `${this.api_url}/survey/${this.id}`;
            let rs = await axios.get(url);
            let data = rs.data.result;
            
            this.form.name = data.name;
            this.form.name_en = data.name_en;
            this.form.is_use_survey = data.is_use_survey;
            this.form.is_use_survey_en = data.is_use_survey_en;
            this.form.poll_question = JSON.parse(data.poll_question);
            this.form.poll_question_en = JSON.parse(data.poll_question_en);
            this.question = this.form.poll_question.question ? this.form.poll_question.question : [];
            this.question_en = this.form.poll_question_en.question ? this.form.poll_question_en.question : [];
            
            // 탑 셀렉트
            this.category.selected_top = data.top_category_id
            // 서브검색
            await this.getSubcategory();
            this.category.selected_sub = data.sub_category_id;
        },
        storeData: async function () { // 데이터 저장
            let url = `${this.api_url}/survey`;
            let formData = new FormData();
                formData.append('menu_id', this.menu_id);
                let category_id = this.category.selected_sub != 0 ? this.category.selected_sub : this.category.selected_top;
                formData.append('category_id', category_id);
                formData.append('name', this.form.name);
                formData.append('name_en', this.form.name_en);
                formData.append('is_use_survey', this.form.is_use_survey);

                this.form.poll_question.question = this.question;
                this.form.poll_question_en.question = this.question_en;
                formData.append('poll_question', JSON.stringify(this.form.poll_question));
                formData.append('poll_question_en', JSON.stringify(this.form.poll_question_en));
                

            await this.postSubmit(url, formData, 'application/json');
        },
        updateData: async function () { // 데이터 수정저장
            let url = `${this.api_url}/survey/${this.id}`;
            let formData = new FormData();
                let category_id = this.category.selected_sub != 0 ? this.category.selected_sub : this.category.selected_top;
                formData.append('category_id', category_id);
                formData.append('name', this.form.name);
                formData.append('name_en', this.form.name_en);
                formData.append('is_use_survey', this.form.is_use_survey);
                
                this.form.poll_question.question = this.question;
                this.form.poll_question_en.question = this.question_en;
                formData.append('poll_question', JSON.stringify(this.form.poll_question));
                formData.append('poll_question_en', JSON.stringify(this.form.poll_question_en));

                
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
        },
        addArray: function (array, new_item) {
            function cloneObject(obj) {
                var clone = {};
                for (var key in obj) {
                    if (Array.isArray(obj[key])) {
                        let new_arr = obj[key].slice();
                        clone[key] = new_arr;
                    } else if (typeof obj[key] == "object" && obj[key] != null) {
                        clone[key] = cloneObject(obj[key]);
                    } else {
                        clone[key] = obj[key];
                    }
                }
                return clone;
            }
            let clone = cloneObject(new_item);
            array.push(clone);
        },
        resetServey: async function () {
            if (confirm('유저가 설문에 응답한 데이터를 삭제하시겠습니까?')) {
                try {
                    let rs = await axios.get(`${this.api_url}/survey/reset_survey?survey_id=${this.id}`);
                    function callback () {
                        this.$router.go(-1);
                    }
                    this.$showMsgBoxTwo(rs.status, '', '', callback.bind(this));
                } catch (error) {
                    this.$showMsgBoxTwo(error.response.status, '', error.response.statusText);
                }
            }
        }
        
    }
};
</script>
<style scoped>
    .survey-cardgroup > div > div > div.card-header {
        padding: 0px 3px 0px 0px;
        text-align: right;
    }
</style>