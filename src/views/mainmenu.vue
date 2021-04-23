<template>
<section>
    <b-row class="mt-1">
        <b-col>
            <b-button href="#" variant="primary" size="sm" @click="mainMenuAdd = !mainMenuAdd">
                <b-icon-plus></b-icon-plus>메뉴추가
            </b-button>
            <b-button href="#" variant="info" size="sm" @click="colorChange = !colorChange">
                <b-icon-brush></b-icon-brush>색상변경
            </b-button>
        </b-col>
    </b-row>
    
    <!-- 팝업 -->
    <b-modal v-model="mainMenuAdd" hide-footer ref="mainMenuAdd-modal" size="lg" title="메뉴추가">
        <b-form inline>
            <label class="mr-sm-2">메뉴명 (국문)</label>
            <b-form-input size="sm" v-model="menuAddParams.name" class="mr-3"></b-form-input>
            <label class="mr-sm-2">메뉴명 (영문)</label>
            <b-form-input size="sm" v-model="menuAddParams.name_en"></b-form-input>
        </b-form>
        <b-table :items="menuItems" :fields="menuFields" bordered head-variant="light" small class="mt-1">
            <template #cell(type)="data">
                    <div class="text-center">
                        {{data.item.type}}
                    </div>
            </template>
            <template #cell(name)="data">
                    <b-button size="sm" class="mr-2" block variant="outline-info" @click="selectType(data.item, data.index, $event.target)">{{ data.item.name }}</b-button>
            </template>
            <template #cell(style)="data">
                    <div class="text-center">
                        {{data.item.style}}
                    </div>
            </template>
            <template #cell(overview_type)="data">
                <b-form-select v-if="data.item.overview_type" v-model="selected" :options="data.item.overview_type" @change="onlySelector" size="sm"></b-form-select>
            </template>
        </b-table>

        <b-row>
            <b-col>
                <div class="form-group">
                    <b-form-group label="게시글 정렬 순서">
                        <b-form-radio v-model="menuAddParams.orderby" name="orderby" value="0">1-24 오름차순</b-form-radio>
                        <b-form-radio v-model="menuAddParams.orderby" name="orderby" value="1">24-1 내림차순</b-form-radio>
                    </b-form-group>
                </div>
                <div class="form-group">
                    <label>Outlink 주소 국문</label>
                    <input type="text" v-model="menuAddParams.link" class="form-control" placeholder="국문">
                </div>
            </b-col>
            <b-col>
                <div class="form-group">
                    <label>순서</label>
                    <input type="number" v-model="menuAddParams.order" class="form-control" placeholder="숫자">
                </div>
                <div class="form-group">
                    <label>Outlink 주소 영문</label>
                    <input type="text" v-model="menuAddParams.link_en" class="form-control" placeholder="영문">
                </div>
            </b-col>
        </b-row>

        <b-button class="mt-2 inoBtn-150" size="sm" variant="primary" @click="save">저장</b-button>
        <b-button class="mt-2 inoBtn-150" size="sm" variant="danger" @click="hideModal('mainMenuAdd-modal')">취소</b-button>
    </b-modal>

    <b-modal v-model="colorChange" hide-footer ref="colorChange-modal" title="색상변경">
        <b-card title="메인메뉴 색상">
            <b-card-text>
                <b-row>
                    <b-col sm="4"><label style="font-size: 10pt;">메뉴배경색</label></b-col>
                    <b-col sm="8">
                        <b-form-input type="color" v-model="colors.menu_back_color" size="sm" @change="btnPreviewChange('menuBtnPreview', 'background-color', $event)">
                        </b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="4"><label style="font-size: 10pt;">메뉴글자색</label></b-col>
                    <b-col sm="8">
                        <b-form-input type="color" v-model="colors.menu_text_color" size="sm" @change="btnPreviewChange('menuBtnPreview', 'color', $event)">
                            </b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="4"><label style="font-size: 10pt;">메뉴활성화 배경색</label></b-col>
                    <b-col sm="8">
                        <b-form-input type="color" v-model="colors.menu_back_color_on" size="sm" @change="btnPreviewChange('menuBtnHoverPreview', 'background-color', $event)">
                            </b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="4"><label style="font-size: 10pt;">메뉴활성화 글자색</label></b-col>
                    <b-col sm="8">
                        <b-form-input type="color" v-model="colors.menu_text_color_on" size="sm" @change="btnPreviewChange('menuBtnHoverPreview', 'color', $event)">
                            </b-form-input>
                    </b-col>
                </b-row>
            </b-card-text>
            <b-card-text>
                <b-row>
                    <b-col>
                        <b-button class="mt-2" variant="outline-primary" size="sm" v-show="!hover" @mouseenter="hover = !hover;" v-bind:style="menuBtnPreview">보기</b-button>
                        <b-button class="mt-2" variant="outline-primary" size="sm" v-show="hover" @mouseleave="hover = !hover;" v-bind:style="menuBtnHoverPreview">보기</b-button>
                    </b-col>
                </b-row>
            </b-card-text>
        </b-card>

        <b-card title="서브메뉴 색상" class="mt-1">
            <b-card-text>
                <b-row>
                    <b-col sm="4"><label style="font-size: 10pt;">메뉴배경색</label></b-col>
                    <b-col sm="8">
                        <b-form-input type="color" v-model="colors.submenu_back_color" size="sm" @change="btnPreviewChange('subMenuBtnPreview', 'background-color', $event)">
                            </b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="4"><label style="font-size: 10pt;">메뉴글자색</label></b-col>
                    <b-col sm="8">
                        <b-form-input type="color" v-model="colors.submenu_text_color" size="sm" @change="btnPreviewChange('subMenuBtnPreview', 'color', $event)">
                            </b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="4"><label style="font-size: 10pt;">메뉴활성화 배경색</label></b-col>
                    <b-col sm="8">
                        <b-form-input type="color" v-model="colors.submenu_back_color_on" size="sm" @change="btnPreviewChange('subMenuBtnHoverPreview', 'background-color', $event)">
                            </b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="4"><label style="font-size: 10pt;">메뉴활성화 글자색</label></b-col>
                    <b-col sm="8">
                        <b-form-input type="color" v-model="colors.submenu_text_color_on" size="sm" @change="btnPreviewChange('subMenuBtnHoverPreview', 'color', $event)">
                            </b-form-input>
                    </b-col>
                </b-row>
            </b-card-text>
            <b-card-text>
                <b-row>
                    <b-col>
                        <b-button class="mt-2" variant="outline-primary" size="sm" v-show="!hover2" @mouseenter="hover2 = !hover2;" v-bind:style="subMenuBtnPreview">보기</b-button>
                        <b-button class="mt-2" variant="outline-primary" size="sm" v-show="hover2" @mouseleave="hover2 = !hover2;" v-bind:style="subMenuBtnHoverPreview">보기</b-button>
                    </b-col>
                </b-row>
            </b-card-text>

        </b-card>

        <b-button class="mt-2 inoBtn-150" size="sm" variant="primary" @click="saveColor">저장</b-button>
        <b-button class="mt-2 inoBtn-150" size="sm" variant="danger" @click="hideModal('colorChange-modal')">취소</b-button>
    </b-modal>

    <!-- 테이블 -->
    <b-row class="mt-1">
        <b-col>
            <b-table :fields="fields" :items="items" bordered head-variant="light" small>
                <template #cell(id)="row">
                    <div class="text-center">{{row.item.id}}</div>
                </template>
                <template #cell(type)="data">
                    {{ menuType[data.item.type].name }}
                </template>
                <template #cell(order)="row">
                    <div class="text-center">{{row.item.order}}</div>
                </template>

                <!-- 카테고리 : 하드코딩... 없애고 싶다 -->
                <template #cell(category)="data">
                    <div class="text-center">
                        <b-button size="sm" v-if="![0, 1, 12].includes(data.item.type)" variant="outline-primary" @click="manageCategory(data.item, data.index, $event.target)">
                            <b-icon-award></b-icon-award> 관리
                        </b-button>
                    </div>
                </template>

                <template #cell(is_visible)="row">
                    <div class="text-center">
                        <b-button size="sm" variant="outline-success" v-show="row.item.is_visible == 1" @click="menuShowHide(row.item, 0)"><b-icon-eye></b-icon-eye></b-button>
                        <b-button size="sm" variant="outline-secondary" v-show="row.item.is_visible == 0" @click="menuShowHide(row.item, 1)"><b-icon-eye-slash></b-icon-eye-slash></b-button>
                    </div>
                </template>
                
                <!-- 컨텐츠 -->
                <template #cell(contents)="row">
                    <div class="text-center">
                        <b-button size="sm" v-if="![12, 15].includes(row.item.type)" variant="outline-info" @click="manageContents(row.item, row.index, $event.target)">
                            <b-icon-book></b-icon-book> 관리
                        </b-button>
                    </div>
                </template>

                <!-- 관리항목 -->
                <template #cell(manageBtn)="row">
                    <div class="text-center">
                        <b-button size="sm" variant="outline-success" @click="updateMenu(row.item, row.index, $event.target)">
                            <b-icon-pencil-square></b-icon-pencil-square> 수정
                        </b-button>
                        <b-button size="sm" variant="outline-danger" @click="deleteMenu(row.item, row.index, $event.target)">
                            <b-icon-trash2-fill></b-icon-trash2-fill> 삭제
                        </b-button>
                    </div>
                </template>
            </b-table>
        </b-col>
    </b-row>

</section>
</template>

<script>
export default {
    name: 'mainMenu',
    components: {
        // 'c_overview': window.httpVueLoader(`./c_overview.vue`),

    },
    data: function () {
        return {
            event_id: null,
            hover: false,
            hover2: false,
            selected: 0,
            mainMenuAdd: false,
            colorChange: false,
            menuFields: [{
                    key: 'type',
                    label: 'Type'
                },
                {
                    key: 'name',
                    label: '메뉴명 (메뉴타입)'
                },
                {
                    key: 'style',
                    label: '구분'
                },
                {
                    key: 'overview_type',
                    label: '타입'
                }
            ],
            menuItems: [],
            menuType: {
                0: {
                    type: 0,
                    name: 'Home',
                    style: '개요형',
                    vue_name: 'overview'
                },
                1: {
                    type: 1,
                    name: '박람회소개',
                    style: '혼합형',
                    overview_type: [{
                            value: 0,
                            text: 'Type-A',
                            vue_name: 'exhibition_a'
                        },
                        {
                            value: 1,
                            text: 'Type-B',
                            vue_name: 'exhibition_b'
                        }
                    ]
                },
                2: {
                    type: 2,
                    name: '행사개요',
                    style: '개요형', // 사용가능한 카테고리만 써
                    vue_name: 'information'
                },
                3: {
                    type: 3,
                    name: '오프닝세션',
                    style: '개요형', // 사용가능한 카테고리 예외
                    vue_name: 'movie'
                },
                4: {
                    type: 4,
                    name: 'Introduction',
                    style: '개요형', // 사용가능한 카테고리만 써
                    vue_name: 'introduction'
                },
                5: {
                    type: 5,
                    name: '프로그램',
                    style: '게시글형',
                    vue_name: 'program'
                },
                6: {
                    type: 6,
                    name: '연자소개',
                    style: '게시글형',
                    vue_name: 'keynote'
                },
                7: {
                    type: 7,
                    name: '연자소개2',
                    style: '게시글형',
                    vue_name: 'speaker'
                },
                8: {
                    type: 8,
                    name: 'Map',
                    style: '개요형',
                    vue_name: 'map_list'
                },
                9: {
                    type: 9,
                    name: 'SNS',
                    style: '게시글형',
                    vue_name: 'sns_list'
                },
                10: {
                    type: 10,
                    name: '공지 및 이벤트',
                    style: '게시글형',
                    vue_name: 'notice'
                },
                11: {
                    type: 11,
                    name: 'Survey',
                    style: '게시글형',
                    vue_name: 'survey_list'
                },
                12: {
                    type: 12,
                    name: 'Outlink'
                },
                13: {
                    type: 13,
                    name: '온라인전시관',
                    style: '게시글형',
                    vue_name: 'exhibition'
                },
                14: {
                    type: 14,
                    name: '컨퍼런스',
                    vue_name: 'conference'
                },
                15: {
                    type: 15,
                    name: '1:1 비즈매칭'
                },
                16: {
                    type: 16,
                    name: 'Shopping',
                    style: '개요형', // 사용가능한 카테고리 예외
                    vue_name: 'shop_product'
                }
            },

            fields: [{
                    key: 'id',
                    label: 'menu_id',
                    sortable: true
                },
                {
                    key: 'type',
                    label: '메뉴타입'
                },
                {
                    key: 'name',
                    label: '메뉴명(국문)'
                },
                {
                    key: 'name_en',
                    label: '메뉴명(영문)'
                },
                {
                    key: 'order',
                    label: '순서',
                    sortable: true
                },
                {
                    key: 'is_visible',
                    label: '노출여부'
                },
                {
                    key: 'category',
                    label: '카테고리'
                },
                {
                    key: 'contents',
                    label: '컨텐츠'
                },
                {
                    key: 'manageBtn',
                    label: '관리항목'
                },
            ],
            items: [],

            menuAddParams: {
                name: null,
                name_en: null,
                type: null,
                overview_type: null,
                order: null,
                orderby: 0,
                link: null,
                link_en: null,
            },

            ex_target: null,

            colors: {
                "menu_back_color": '#4d67c7',
                "menu_text_color": '#ffffff',
                "menu_back_color_on": '#d874d4',
                "menu_text_color_on": '#ffffff',
                "submenu_back_color": "#4d67c7",
                "submenu_text_color": "#ffffff",
                "submenu_back_color_on": "#d874d4",
                "submenu_text_color_on": "#ffffff",
            },
            menuBtnPreview: {
                'background-color': '#4d67c7',
                color: '#ffffff'
            },
            menuBtnHoverPreview: {
                'background-color': '#d874d4',
                color: '#ffffff'
            },
            subMenuBtnPreview: {
                'background-color': '#4d67c7',
                color: '#ffffff'
            },
            subMenuBtnHoverPreview: {
                'background-color': '#d874d4',
                color: '#ffffff'
            },

            api_url: ''

        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.event_id = this.$store.getters.event_id;
            this.api_url = this.$store.getters.api_url;
            // console.log('event_id... mainmenu ', this.$store.getters.event_id);
            this.loadData();
            this.menuItems = Object.values(this.menuType);
            
        })
    },
    methods: {
        btnPreviewChange(target, property, value) {
            // console.log(target, property, value);
            this[target][property] = value;
        },

        hideModal(id) {
            this.$refs[id].hide()
        },
        selectType(item, index, target) {
            // console.log(item, index, target, target.className);
            if (this.ex_target) {
                this.ex_target.className = this.ex_target.className.replace('btn-info', 'btn-outline-info');
            }
            this.ex_target = target;
            if (target.className.includes('btn-outline-info')) {
                target.className = target.className.replace('btn-outline-info', 'btn-info');
                this.menuAddParams.type = item.type;
                if (!item.overview_type) {
                    this.menuAddParams.overview_type = null;
                }

            } else {
                target.className = target.className.replace('btn-info', 'btn-outline-info');
            }

        },
        save: async function () {
            let url = `${this.api_url}/menu`;
            var formData = new FormData();
            formData.append("event_id", this.$store.getters.event_id);
            formData.append("name", this.menuAddParams.name);
            formData.append("name_en", this.menuAddParams.name_en);
            formData.append("type", this.menuAddParams.type);
            formData.append("overview_type", this.menuAddParams.overview_type);
            formData.append("orderby", this.menuAddParams.orderby ? 1 : 0);
            formData.append("order", this.menuAddParams.order);
            formData.append("link", this.menuAddParams.link);
            formData.append("link_en", this.menuAddParams.link_en);

            // console.log(this.menuAddParams);
            let rs = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(rs);
            this.$showMsgBoxTwo(rs.status);
            this.loadData();
            this.mainMenuAdd = false;
        },
        saveColor: async function () {
            let url = `${this.api_url}/event/${this.$store.getters.event_id}`;
            var formData = new FormData();
            console.log(this.colors);
            formData.append("menu_back_color", this.colors.menu_back_color);
            formData.append("menu_text_color", this.colors.menu_text_color);
            formData.append("menu_back_color_on", this.colors.menu_back_color_on);
            formData.append("menu_text_color_on", this.colors.menu_text_color_on);
            formData.append("submenu_back_color", this.colors.submenu_back_color);
            formData.append("submenu_text_color", this.colors.submenu_text_color);
            formData.append("submenu_back_color_on", this.colors.submenu_back_color_on);
            formData.append("submenu_text_color_on", this.colors.submenu_text_color_on);

            let rs = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // console.log(rs);
            this.$showMsgBoxTwo(rs.status);
            this.loadData();
            this.colorChange = false;
        },
        async loadData() {
            try {
                let url = `${this.api_url}/menu?event_id=${this.$store.getters.event_id}`;
                let res = await axios.get(url);
                this.items = res.data.result.menu;
                // console.log(res.data.result.menu);

                let res2 = await axios.get(`${this.api_url}/event/main_page?event_id=${this.$store.getters.event_id}`);
                let data2 = res2.data.result;
                
                // normal
                this.colors.menu_back_color = data2.menu_back_color;
                this.colors.menu_text_color = data2.menu_text_color;
                this.menuBtnPreview['background-color'] = data2.menu_back_color;
                this.menuBtnPreview.color = data2.menu_text_color;

                // hover
                this.colors.menu_back_color_on = data2.menu_back_color_on;
                this.colors.menu_text_color_on = data2.menu_text_color_on;
                this.menuBtnHoverPreview['background-color'] = data2.menu_back_color_on;
                this.menuBtnHoverPreview.color = data2.menu_text_color_on;

                this.colors.submenu_back_color = data2.submenu_back_color;
                this.colors.submenu_text_color = data2.submenu_text_color;
                this.subMenuBtnPreview['background-color'] = data2.submenu_back_color;
                this.subMenuBtnPreview.color = data2.submenu_text_color;

                this.colors.submenu_back_color_on = data2.submenu_back_color_on;
                this.colors.submenu_text_color_on = data2.submenu_text_color_on;
                this.subMenuBtnHoverPreview['background-color'] = data2.submenu_back_color_on;
                this.subMenuBtnHoverPreview.color = data2.submenu_text_color_on;
                
            } catch (error) {
                console.error(error);
            }
        },
        manageCategory(item, index, target) {
            // console.log(item, index, target);
            this.$router.push({
                name: 'category',
                query: {
                    menu_id: item.id
                },
                params: {
                    ...item
                }
            });
        },
        manageContents(item, index, target) {
            // 살려줘... : 클릭 아이템(메뉴)의 타입을 체크하는데, 만약 overview_type이 존재하면, 오버뷰타입 이름이 라우터 이름
            // 없으면 menuType의 타입번호가 키에 해당하는 아이템의 vue_name이 바로 라우터 이름
            let router_name = this.menuType[item.type].overview_type ?
                this.menuType[item.type].overview_type[item.overview_type].vue_name : this.menuType[item.type].vue_name;
            // console.log(' type - ', item.type, ': overview_type - ', item.overview_type, ' = ', router_name);
            if (router_name) {
                this.$router.push({
                    name: router_name,
                    query: { menu_id: item.id },
                    params: { ...item }
                }); // only find name. not path
            }

        },
        updateMenu(item, index, target) {
            this.$router.push({ name: 'com_info', query: { id: item.id } });
        },
        deleteMenu: async function(item, index, target) {
            // console.log(item, index, target);
            if (confirm('삭제 하시겠습니까?')) {
                let rs = await axios.delete(`${this.api_url}/menu/${item.id}`);
                this.$showMsgBoxTwo(rs.status);
                this.loadData();
            }
        },
        onlySelector(e) {
            this.menuAddParams.overview_type = e;
        },
        menuShowHide: async function (item, is_visible) {
            try {
                let url = `${this.api_url}/menu/${item.id}`;
                let formData = new FormData();
                    formData.append('is_visible', is_visible);
                let rs = await axios.post(url, formData, {
                    Headers: {
                        'Content-Type': 'application/json'
                    }
                });
                this.$showMsgBoxTwo(rs.status);
                this.loadData();
            } catch (error) {
                this.$showMsgBoxTwo(error.response.status, '', error.response.statusText);
            }
        }
    }
}
</script>
