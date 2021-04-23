<template>
<section>
    <b-row class="mb-1">
        <b-col>
            <h6><strong>카테고리관리</strong></h6>
            <b-button class="mt-2" href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
                <b-icon-arrow-left></b-icon-arrow-left> 이전으로
            </b-button>
        </b-col>
    </b-row>
    <b-row>
        <b-col>
            <b-card title="대분류">
                <b-form-group label="세로형메뉴" v-slot="{ ariaDescribedby }">
                    <b-form-radio-group v-model="top_selected" :options="topcategory" :aria-describedby="ariaDescribedby" name="radio-btn-stacked" buttons stacked @change="fn"
                     button-variant="outline-danger"  style="width:100%;"
                    ></b-form-radio-group>
                </b-form-group>
                <!-- .siblings().removeClass('active'); -->
                <!-- 
                <b-card-text size="sm">
                    <ul v-for="(item, index) in topcategory" v-bind:key="item.id">
                        <li>
                            <span @mouseover="hoverFn(true, $event)" @mouseleave="hoverFn(false, $event)" @click="fn(item, index, $event)">{{item.name}}</span>
                        </li>
                    </ul>
                </b-card-text>
                 -->
                <b-row>
                    <b-col>
                        <b-button href="#" variant="danger" size="sm" block @click="deleteCategory(0)">메뉴삭제</b-button>
                    </b-col>
                    <b-col>
                        <b-button href="#" variant="primary" size="sm" block @click="storeCategory(0)">메뉴추가</b-button>
                    </b-col>
                </b-row>
            </b-card>
        </b-col>
        <b-col>
            <b-card title="소분류">
                <b-form-group label="세로형메뉴" v-slot="{ ariaDescribedby2 }">
                    <b-form-radio-group v-model="sub_selected" :options="subcategory" :aria-describedby="ariaDescribedby2" name="radio-btn-stacked" buttons stacked @change="subFn"
                            button-variant="outline-success" style="width:100%;"
                    ></b-form-radio-group>
                </b-form-group>
                <!-- 
                <b-card-text size="sm">
                    <ul v-for="(item, index) in subcategory" v-bind:key="item.id">
                        <li> <span @mouseover="hoverFn(true, $event)" @mouseleave="hoverFn(false, $event)" @click="subFn(item, index, $event)">{{item.name}}</span></li>
                    </ul>
                </b-card-text>
                 -->
                <b-row>
                    <b-col>
                        <b-button href="#" variant="danger" size="sm" block @click="deleteCategory">메뉴삭제</b-button>
                    </b-col>
                    <b-col>
                        <b-button href="#" variant="primary" size="sm" block @click="storeCategory">메뉴추가</b-button>
                    </b-col>
                </b-row>
            </b-card>
        </b-col>
        <b-col>
            <b-card title="메뉴 작성하기">
                <b-form-group label="국문 메뉴명:">
                    <b-form-input v-model="form.name" type="text"></b-form-input>
                </b-form-group>
                <b-form-group label="영문 메뉴명:">
                    <b-form-input v-model="form.name_en" type="text"></b-form-input>
                </b-form-group>
                <b-button href="#" variant="success" size="sm" block @click="updateCategory">적용</b-button>
                <b-form-group label="순서:" class="mt-3">
                    <b-row>
                        <b-col>
                            <b-button href="#" variant="info" size="sm" block @click="increaseMenu">
                                <b-icon-caret-up></b-icon-caret-up>
                            </b-button>
                        </b-col>
                        <b-col>

                            <b-button href="#" variant="info" size="sm" block @click="decreaseMenu">
                                <b-icon-caret-down></b-icon-caret-down>
                            </b-button>
                        </b-col>

                    </b-row>
                </b-form-group>
            </b-card>
        </b-col>
    </b-row>
    <br>

</section>
</template>

<script>
export default {
    name: 'category',
    data: function () {
        return {
            event_id: null,
            api_url: null,
            hover: false,
            form: {
                menu_id: null,
                name: null,
                name_en: null
            },
            topcategory: [], // options
            top_id_key_store: {}, // for the menu search

            subcategory: [],
            sub_id_key_store: {},

            top_selected: '', // option model
            sub_selected: '', // option model

        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.event_id = this.$store.getters.event_id;
            this.api_url = this.$store.getters.api_url;
            this.form.menu_id = this.$route.query.menu_id;
            this.getTopCategory();
        })
    },
    methods: {
        getTopCategory: async function () {
            let url = `${this.api_url}/menucategory/topcategory?menu_id=${this.form.menu_id}`;
            let response = await axios.get(url);
            this.topcategory = response.data.result;
            let top = {};
            this.topcategory.forEach(element => {
                element.text = element.name;
                element.value = element.id;
                top[element.id] = element; // 메뉴 작성에 찾기 좋은 형태로 빼둠.
            });

            this.top_id_key_store = top;
        },
        getSubcategory: async function () {

            let url = `${this.api_url}/menucategory/subcategory?menu_id=${this.form.menu_id}&category_id=${this.top_selected}`;
            let response = await axios.get(url);
            
            if (response.data.code == 410) {
                this.subcategory = [];
                return;
            }
            this.subcategory = response.data.result;

            let sub = {};
            this.subcategory.forEach(element => {
                element.text = element.name;
                element.value = element.id;
                sub[element.id] = element; // 메뉴 작성에 찾기 좋은 형태로 빼둠.
            });
            this.sub_id_key_store = sub;
        },
        boldmote: function (id, type) {
            
            if (type == 'top') {
                this.form = {...this.top_id_key_store[id]};
            } else {
                this.form = {...this.sub_id_key_store[id]};
            }
        },
        fn: async function (id) {
            // 대분류 클릭 이벤트 핸들러
            this.sub_selected = '';

            // 메뉴명 표출하기
            this.boldmote(id, 'top');

            // 소분류 가져오기
            this.getSubcategory();
        },
        subFn: async function (id) {
            // 소분류 클릭 이벤트 핸들러
            
            // 메뉴명 표출하기
            this.boldmote(id, 'sub');
        },
        hoverFn(isHovered, e) {
            if (isHovered) {
                e.target.style.color = 'red';
            } else {
                e.target.style.color = 'black';
            }
        },
        updateCategory: async function () {
            let url = `${this.api_url}/menucategory/${this.form.id}`;
            var formData = new FormData();
            formData.append("menu_id", this.form.menu_id);
            formData.append("top_category_id", this.form.top_category_id);
            formData.append("name", this.form.name);
            formData.append("name_en", this.form.name_en);
            let rs = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            this.getTopCategory();
            this.getSubcategory(); // ??
        },
        deleteCategory: async function (type) {
            if (confirm('삭제하시겠습니까?')) {

                let url = null;
                if (type == 0) {
                    url = `${this.api_url}/menucategory/${this.top_selected}`
                } else {
                    url = `${this.api_url}/menucategory/${this.sub_selected}`
                }
                let rs = await axios.delete(url);

                this.getTopCategory();
                this.getSubcategory();
            }

        },
        storeCategory: async function (type) {
            let url = `${this.api_url}/menucategory`;
            var formData = new FormData();
            if (type === 0) {
                // new top category
                formData.append("menu_id", this.form.menu_id);
                formData.append("top_category_id", 0);
                formData.append("name", '임시 생성 메뉴');
                formData.append("name_en", 'temporal menu');

            } else {
                // new sub within top category 
                formData.append("menu_id", this.form.menu_id);
                formData.append("top_category_id", this.top_selected);
                formData.append("name", '임시 생성 메뉴');
                formData.append("name_en", 'temporal menu');

            }
            let rs = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            this.getTopCategory();
            this.getSubcategory();
            
        },
        increaseMenu: async function (direction) {
            let url = null;
            if (this.sub_selected) {
                url = `${this.api_url}/menucategory/${this.sub_selected}/orderincrease`;
            } else {
                url = `${this.api_url}/menucategory/${this.top_selected}/orderincrease`;
            }
            let rs = await axios.get(url);
            this.getTopCategory();
            this.getSubcategory();
        },
        decreaseMenu: async function () {
            let url = null;
            if (this.sub_selected) {
                url = `${this.api_url}/menucategory/${this.sub_selected}/orderdecrease`;
            } else {
                url = `${this.api_url}/menucategory/${this.top_selected}/orderdecrease`;
            }
            let rs = await axios.get(url);
            this.getTopCategory();
            this.getSubcategory();
        }
    }
}
</script>
