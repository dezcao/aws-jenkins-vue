<template>
<section>
    <b-row class="mb-1">
        <b-col>
            <h6><strong>2.메뉴 및 컨텐츠 관리 > 컨퍼런스관리 > 컨텐츠 (관리)</strong></h6>
            <b-button class="mt-2" href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
                <b-icon-arrow-left></b-icon-arrow-left> 이전으로
            </b-button>

        </b-col>
    </b-row>
    <b-card>
        <template #header>
            <h6><strong>메뉴수정</strong></h6>
        </template>
        <b-row>
            <b-col>
                <b-form-group label="메뉴명(국문)">
                    <b-form-input type="text" v-model="form.name"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="메뉴명(영문)">
                    <b-form-input type="text" v-model="form.name_en"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-group label="메뉴 순서">
                    <b-form-input type="number" v-model="form.order"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col></b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-group label="행사 일정 이미지 #1">
                    <b-card>
                        <b-card-text class="ino-180-70-wrap mb-1">
                            <div>
                                <b-img :src="form.photo_1||photo_1_prev" fluid></b-img>
                            </div>
                        </b-card-text>
                        <b-card-text class="mt-1">
                            <b-form-file v-model="form.file1" @change="onFileChange($event, 'photo_1', form)" style="max-width:70%;" class="mr-2" size="sm"></b-form-file>
                            <b-button @click="form.file1 = null; form.photo_1 = ''; form.photo_1_del = true;" size="sm" variant="danger">이미지 삭제</b-button>
                        </b-card-text>
                    </b-card>
                </b-form-group>
            </b-col>
            <b-col></b-col>
        </b-row>
        <b-button variant="primary" size="sm" class="inoBtn-150" @click="updateData(form, event_id, `${api_url}/menu/${menu_id}`)">저장</b-button>
    </b-card>
    <b-row>
        <b-col>
            <b-button class="mt-2" href="#" variant="primary" size="sm" @click="openModal($event)">
                <b-icon-plus></b-icon-plus> VM 추가
            </b-button>
            <b-table :fields="fields" :items="items" small responsive="sm" bordered head-variant="light" sticky-header class="mt-1">
                <template #cell(id)="row">
                    <div class="text-center">{{row.item.id}}</div>
                </template>
                <template #cell(order)="row">
                    <div class="text-center">{{row.item.order}}</div>
                </template>

                <template #cell(conference_date)="row">
                    <div class="text-center">{{ row.item.conference ? row.item.conference.date: '' }}</div>
                </template>
                <template #cell(is_top)="row">
                    <div class="text-center mt-1">
                        <b-form-group class="p-0 m-0">
                            <b-form-checkbox value="1" v-model="row.item.is_top" name="check-button" switch @change="updateIsTop($event, row.item)"></b-form-checkbox>
                        </b-form-group>
                    </div>
                </template>
                <template #cell(manageBtn)="row">
                    <div class="text-center">
                        <b-button size="sm" variant="outline-info" @click="openModal($event, row.item)">
                            <b-icon-credit-card2-front></b-icon-credit-card2-front>
                            수정
                        </b-button>
                        <b-button size="sm" variant="outline-danger" @click="deleteVM($event, row.item)">
                            <b-icon-trash2-fill></b-icon-trash2-fill>
                            삭제
                        </b-button>
                    </div>
                </template>
            </b-table>
        </b-col>
    </b-row>

    <b-modal v-model="modal1" hide-footer title="VM">
        <b-form-group label="대분류" class="mb-1">
            <b-form-select v-model="category_id" :options="category" size="sm"></b-form-select>
        </b-form-group>
        <b-form-group label="Main 컬러" class="mb-1">
            <b-form-input type="color" v-model="main_theme_color" size="sm">
            </b-form-input>
        </b-form-group>
        <b-form-group label="Sub 컬러" class="mb-1">
            <b-form-input type="color" v-model="sub_theme_color" size="sm">
                </b-form-input>
        </b-form-group>
        <b-form-group label="Main Text 컬러" class="mb-1">
            <b-form-input type="color" v-model="main_text_color" size="sm"></b-form-input>
        </b-form-group>
        <b-form-group label="Sub Text 컬러" class="mb-1">
            <b-form-input type="color" v-model="sub_text_color" size="sm"></b-form-input>
        </b-form-group>
        <!-- <b-form-group label="Sub Title" class="mb-1">
            <b-form-input type="text" v-model="sub_title" size="sm">
        </b-form-group> -->

        <div>
            <b-form-group label="VM" label-for="tags-component-select">
                <b-form-tags id="tags-component-select" v-model="tagValue" size="sm" add-on-change no-outer-focus>
                    <template v-slot="{ tags, addTag, disabled, removeTag }">

                        <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                            <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                <b-form-tag @remove="removeTag(tag), vm.push({id: conference_id, name: tag}), conference_id = ''" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                            </li>
                        </ul>
                        
                        <b-form-input v-model="search" id="tag-search-input" type="search" size="sm" autocomplete="off" list="input-list" ref="shobal" @update="onOptionClick({ search, addTag, removeTag })"></b-form-input>
                        <datalist id="input-list">
                            <option v-for="option in availableOptions" :key="option.id">{{ option.name }}</option>
                            <option v-if="availableOptions.length === 0">There are no tags available to select</option>
                        </datalist>

                    </template>
                </b-form-tags>
            </b-form-group>
        </div>

        <b-button v-show="!vm_id" variant="primary" size="sm" class="inoBtn-150" @click="storeVM">저장</b-button>
        <b-button v-show="vm_id" variant="success" size="sm" class="inoBtn-150" @click="updateVM">수정</b-button>
    </b-modal>

</section>
</template>

<script>
export default {
    name: "program",
    data: function () {
        return {
            event_id: 0,
            api_url: '',
            menu_id: null,
            modal1: false,
            form: {
                name: '',
                type: 15,
                name_en: '',
                order: 0,
                file1: null,
                photo_1: '',
                photo_1_del: false,
            },
            
            vm_id: '',
            category: [],
            category_id: 0,
            color: [],
            color_type_id: 0,
            main_theme_color: 0,
            sub_theme_color: 0,
            main_text_color: 0,
            sub_text_color: 0,
            // main_theme_color: 0,
            vm: [],
            conference_id: '',

            search: '', // 선택한 vm 키워드
            tagValue: [], // 선택된 vm 키워드 문자 집합
            order: 0,
            

            photo_1_prev: this.$store.getters.dummy_image_url(['180x70']),

            fields: [{
                    key: "order",
                    label: "순서",
                },
                {
                    key: "category.name",
                    label: "대분류",
                },
                {
                    key: "conference.name",
                    label: "VM 타이틀",
                },
                {
                    key: "conference_date",
                    label: "시작일",
                },
                {
                    key: "manageBtn",
                    label: "관리항목",
                }
            ],
            items: [],

        };
    },
    mounted: function () {
        this.$nextTick(async function () {
            this.menu_id = this.$route.query.menu_id;
            this.event_id = this.$store.getters.event_id;
            this.api_url = this.$store.getters.api_url;

            await this.getData();
            await this.getSelects();
            await this.getList();
        });
    },
    computed: {
        criteria() {
            return this.search.trim().toLowerCase()
        },
        availableOptions() {
            const criteria = this.criteria;
            const options = this.vm.filter(opt => this.tagValue.indexOf(opt.name) === -1);
            if (criteria) {
                return options.filter(opt => opt.name.toLowerCase().indexOf(criteria) > -1); // return new array
            }
            return options;
        },

    },
    methods: {
        /**
         *  상단 데이터
         **/
        getData: async function () { // 상단 데이터 가져오기
            let url = `${this.api_url}/menu/${this.menu_id}`;
            let data = (await axios.get(url)).data;
            this.form = data.result;
            console.log(this.form);
        },
        updateData: async function (form, event_id, url) { // 상단 데이터 수정저장
            let formData = new FormData();
            formData.append('event_id', event_id);

            formData.append('type', form.type);
            formData.append('name', form.name);
            formData.append('name_en', form.name_en);
            formData.append('order', form.order);
            !form.file1 && form.photo_1_del ? formData.append('photo_1_del', 'Y') : formData.append('photo_1', form.file1);

            try {

                let rs = await axios.post(url, formData, {
                    Headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(rs);

                this.$showMsgBoxTwo(rs.status);
                this.getData();

            } catch (error) {
                this.$showMsgBoxTwo(error.response.status, '', error.response.statusText);
            }

        },

        /**
         *  하단 리스트
         **/
        getList: async function () { // VM 설정 하단 리스트
            let url = `${this.api_url}/menu_conference?menu_id=${this.menu_id}`;
            let rs = await axios.get(url);
            console.log('----',rs);
            this.items = rs.data.result;
        },
        storeVM: async function () { // 하단 리스트아이템 저장하기
            if (!(this.category_id && this.conference_id)) {
                alert('값을 선택해 주세요 주세요.');
                return;
            }

            let url = `${this.api_url}/menu_conference`;
            let formData = new FormData();
                formData.append('menu_id', this.menu_id);
                formData.append('order', this.order);
                formData.append('category_id', this.category_id);
                formData.append('conference_id', this.conference_id);
                formData.append('main_theme_color', this.main_theme_color);
                formData.append('sub_theme_color', this.sub_theme_color);
                formData.append('main_text_color', this.main_text_color);
                formData.append('sub_text_color', this.sub_text_color);
                // formData.append('sub_title', this.sub_title);

            await this.sendPost(url, formData);
            await this.getList();
            await this.getSelects();
            this.modal1 = false;
        },
        updateVM: async function () { // 하단 리스트아이템 저장하기
            if (!(this.category_id && this.conference_id)) {
                alert('값을 선택해 주세요 주세요.');
                return;
            }

            let url = `${this.api_url}/menu_conference/${this.vm_id}`;
            let formData = new FormData();
                formData.append('order', this.order);
                formData.append('category_id', this.category_id);
                formData.append('conference_id', this.conference_id);
                formData.append('main_theme_color', this.main_theme_color);
                formData.append('sub_theme_color', this.sub_theme_color);
                formData.append('main_text_color', this.main_text_color);
                formData.append('sub_text_color', this.sub_text_color);
                // formData.append('sub_title', this.sub_title);

            await this.sendPost(url, formData);
            await this.getList();
            await this.getSelects();
            this.modal1 = false;
        },
        deleteVM: async function (event, item) { // 하단 리스트아이템 저장하기
            if (confirm('삭제 하시겠습니까?')) {
                let url = `${this.api_url}/menu_conference/${item.id}`;
                try {
                    let rs = await axios.delete(url);
                    await this.getList();
                    await this.getSelects();
                    this.$showMsgBoxTwo(rs.status, "delete");
                    this.modal1 = false;
                } catch (error) {
                    this.$showMsgBoxTwo(error.response.status, '', error.response.statusText);
                }
            }
        },
        sendPost: async function (url, formData) {
            try {
                let rs = await axios.post(url, formData, {
                    Headers: {
                        'Content-Type': 'application/json'
                    }
                });
                this.$showMsgBoxTwo(rs.status);
            } catch (error) {
                this.$showMsgBoxTwo(error.response.status, '', error.response.statusText);
            }
        },

        /**
         * 기타
         **/
        openModal: function (event, item) {
            if (item) {
                console.log('selected item', item);
                this.vm_id = item.id;
                this.category_id = item.category_id;
                // this.sub_title = item.sub_title;
                
                this.main_theme_color = item.main_theme_color;
                this.sub_theme_color = item.sub_theme_color;
                this.main_text_color = item.main_text_color;
                this.sub_text_color = item.sub_text_color;

                this.conference_id = item.conference_id;
                this.tagValue = [item.conference.name];
            } else {
                this.vm_id = '';
                this.category_id = '';
                // this.sub_title = '';
                this.main_theme_color = '';
                this.sub_theme_color = '';
                this.main_text_color = '';
                this.sub_text_color = '';
                this.conference_id = '';
                this.tagValue = [];
            }
            this.modal1 = true;
        },
        getSelects: async function () { // modal select options 초기화
            let url = `${this.api_url}/menu_conference/get_item_list?menu_id=${this.menu_id}`;
            let rs = await axios.get(url);
            this.category = this.array_reform(rs.data.result.category);
            this.color = this.array_reform(rs.data.result.color);
            this.vm = rs.data.result.conference;
            
            console.log('this.vm ', this.vm);
        },
        array_reform: function (arr) {
            if (!arr || !arr.length) {
                return;
            }
            arr.forEach(element => {
                element.value = element.id;
                element.text = element.name;
            });
            return arr;
        },
        onOptionClick({search, addTag, removeTag}) { // VM 목록에서 클릭시 태그 추가. 
            for (let option of this.vm) {
                if (option.name == search) {
                    removeTag(this.tagValue[0]); // 1건만 된다.
                    addTag(option.name); // string만 되는듯하다...
                    this.conference_id = option.id;
                    this.search = '';
                    this.$refs.shobal.localValue = '';
                }
            }
        }
    }
};
</script>
