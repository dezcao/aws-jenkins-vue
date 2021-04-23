<template>
<section>
    <b-row>
        <b-col cols="8">
            <b-button size="sm" variant="primary" @click="openModal1($event)">
                <b-icon-plus></b-icon-plus>사용자 추가하기
            </b-button>
        </b-col>
        <b-col cols="4">
            <b-input-group size="sm" align-v="baseline" class="text-right">
                <b-form-input aria-placeholder="검색어를 입력하세요."></b-form-input>
                <b-input-group-append>
                    <b-button variant="info" size="sm">검색하기</b-button>
                </b-input-group-append>
            </b-input-group>
        </b-col>
    </b-row>

    <b-row class="mt-1">
        <b-col>
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="일반회원" active>
                        <b-card>
                            <b-table :fields="fields" :items="level50_items" small bordered head-variant="light" class="mt-1">
                                <template #cell(id)="row">
                                    <div class="text-center">
                                        {{row.item.id}}
                                    </div>
                                </template>
                                <template #cell(name)="row">
                                    <div class="text-center">
                                        {{row.item.name}}
                                    </div>
                                </template>
                                <template #cell(phone)="row">
                                    <div class="text-center">
                                        {{row.item.phone}}
                                    </div>
                                </template>
                                <template #cell(created_at)="row">
                                    <div class="text-center">
                                        {{row.item.created_at}}
                                    </div>
                                </template>
                                <template #cell(manageBtn)="row">
                                    <div class="text-center">
                                        <b-button size="sm" variant="outline-success" @click="openModal1($event, row.item)">
                                            <b-icon-pencil-square></b-icon-pencil-square> 수정
                                        </b-button>
                                        <b-button size="sm" variant="outline-danger" @click="userDelete(row.item, row.index, $event.target)">
                                            <b-icon-trash2-fill></b-icon-trash2-fill> 삭제
                                        </b-button>
                                    </div>
                                </template>
                            </b-table>
                        </b-card>
                    </b-tab>
                    <b-tab title="기업회원">
                        <b-card>
                            <b-table :fields="company_fields" :items="level40_items" small bordered head-variant="light" class="mt-1">
                                <template #cell(id)="row">
                                    <div class="text-center">
                                        {{row.item.id}}
                                    </div>
                                </template>
                                <template #cell(name)="row">
                                    <div class="text-center">
                                        {{row.item.name}}
                                    </div>
                                </template>
                                <template #cell(phone)="row">
                                    <div class="text-center">
                                        {{row.item.phone}}
                                    </div>
                                </template>
                                <template #cell(company_name)="row">
                                    <div class="text-center">
                                        {{row.item.company ? row.item.company.name : ''}}
                                    </div>
                                </template>
                                <template #cell(company_number)="row">
                                    <div class="text-center">
                                        {{row.item.company ? row.item.company.number : ''}}
                                    </div>
                                </template>
                                <template #cell(company_attend_type)="row">
                                    <div class="text-center" v-if="row.item.company">
                                        {{row.item.company.attend_type == 0 ? 'buyer' : 'seller'}}
                                    </div>
                                </template>
                                <template #cell(created_at)="row">
                                    <div class="text-center">
                                        {{row.item.created_at}}
                                    </div>
                                </template>
                                <template #cell(manageBtn)="row">
                                    <div class="text-center">
                                        <b-button size="sm" variant="outline-success" @click="openModal1($event, row.item)">
                                            <b-icon-pencil-square></b-icon-pencil-square> 수정
                                        </b-button>
                                        <b-button size="sm" variant="outline-danger" @click="userDelete(row.item, row.index, $event.target)">
                                            <b-icon-trash2-fill></b-icon-trash2-fill> 삭제
                                        </b-button>
                                    </div>
                                </template>
                            </b-table>
                        </b-card>
                    </b-tab>
                </b-tabs>

            </b-card>
        </b-col>
    </b-row>

    <b-modal v-model="modal1" hide-footer :title="isNew ? '사용자 추가': '사용자 수정'">
        <b-row class="p-1">
            <b-col sm="4"><label style="font-size: 10pt;">이름 / 이메일</label></b-col>
            <b-col sm="8">
                <b-input-group>
                    <b-form-input size="sm" v-model="form.email" :state="isUniquiId" v-show="isNew"></b-form-input>
                    <b-form-input size="sm" v-model="form.email" v-show="!isNew" disabled></b-form-input>
                    <b-input-group-append>
                        <b-button variant="info" size="sm" @click="userIdCheck">중복 체크</b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
        <b-row class="p-1">
            <b-col sm="4"></b-col>
            <b-col sm="8">
                <b-input-group>
                    <b-input-group-append>
                        <b-form-invalid-feedback :state="isUniquiId">중복을 체크해주세요.</b-form-invalid-feedback>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
        <b-row class="p-1">
            <b-col sm="4"><label style="font-size: 10pt;">비밀번호</label></b-col>
            <b-col sm="8">
                <b-input-group>
                    <b-form-input size="sm" v-model="form.password" :state="isSamePassword"></b-form-input>
                </b-input-group>
            </b-col>
        </b-row>
        <b-row class="p-1">
            <b-col sm="4"><label style="font-size: 10pt;">비밀번호 확인</label></b-col>
            <b-col sm="8">
                <b-input-group>
                    <b-form-input size="sm" v-model="password_confirm" :state="isSamePassword"></b-form-input>
                    <b-form-invalid-feedback :state="isSamePassword">Password를 확인해주세요.</b-form-invalid-feedback>
                </b-input-group>
            </b-col>
        </b-row>
        <b-row class="p-1">
            <b-col sm="4"><label style="font-size: 10pt;">휴대폰번호</label></b-col>
            <b-col sm="8">
                <b-input-group>
                    <b-form-input size="sm" v-model="form.phone"></b-form-input>
                </b-input-group>
            </b-col>
        </b-row>
        <b-row class="p-1">
            <b-col sm="4"><label style="font-size: 10pt;">이름 (국문)</label></b-col>
            <b-col sm="8">
                <b-input-group>
                    <b-form-input size="sm" v-model="form.name"></b-form-input>
                </b-input-group>
            </b-col>
        </b-row>
        <b-row class="p-1">
            <b-col sm="4"><label style="font-size: 10pt;">이름 (영문)</label></b-col>
            <b-col sm="8">
                <b-input-group>
                    <b-form-input size="sm" v-model="form.name_en"></b-form-input>
                </b-input-group>
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <b-button v-show="isNew" href="#" variant="primary" size="sm" @click="storeData" class="inoBtn-150">저장하기</b-button>
                <b-button v-show="!isNew" href="#" variant="info" size="sm" @click="updateData" class="inoBtn-150">수정하기</b-button>
                <b-button href="#" variant="danger" size="sm" @click="modal1 = !modal1" class="inoBtn-150">취소</b-button>
            </b-col>
        </b-row>

    </b-modal>
</section>
</template>

<script>
export default {
    name: "userList",
    data: function () {
        return {
            modal1: false,

            form: {
                email: '',
                password: '',
                phone: '',
                name: '',
                name_en: ''
            },
            password_confirm: '',
            isUniquiId: false,
            isNew: true,
            fields: [{
                    key: 'id',
                    label: '번호'
                },
                {
                    key: 'name',
                    label: '사용자명'
                },
                {
                    key: 'email',
                    label: '아이디'
                },
                {
                    key: 'phone',
                    label: '휴대폰번호'
                },
                {
                    key: 'created_at',
                    label: '생성일'
                },
                {
                    key: 'manageBtn',
                    label: '관리항목'
                },
            ],
            company_fields: [{
                    key: 'id',
                    label: '번호'
                },
                {
                    key: 'name',
                    label: '사용자명'
                },
                {
                    key: 'email',
                    label: '아이디'
                },
                {
                    key: 'phone',
                    label: '휴대폰번호'
                },
                {
                    key: 'company_name',
                    label: '기업명'
                },
                {
                    key: 'company_number',
                    label: '사업자번호'
                },
                {
                    key: 'company_attend_type', // 0 - buyer, 1 - seller
                    label: '타입'
                },
                {
                    key: 'created_at',
                    label: '생성일'
                },
                {
                    key: 'manageBtn',
                    label: '관리항목'
                },
            ],
            items: [],
            level40_items: [], // 기업회원
            level50_items: [], // 일반회원
            api_url: '',
            event_id: 0

        };
    },
    mounted: function () {
        this.$nextTick(async function () {
            this.api_url = this.$store.getters.api_url;
            this.event_id = this.$store.getters.event_id;
            this.getList();
        })
    },
    computed: {
        isSamePassword: function () {
            let valid = true;
            if (this.isNew) {
                valid = this.form.password == this.password_confirm;
            } else {
                if (this.form.password) {
                    valid = this.form.password == this.password_confirm;
                }
            }
            return valid;
        },
        validation: function () {
            let valid = this.form.password
            let valid1 = this.form.password == this.password_confirm;
            let valid2 = this.isUniquiId;
            return valid && valid1 && valid2;
        },

    },

    methods: {
        getList: async function () {
            let rs = await axios.get(`${this.api_url}/user/in_event?event_id=${this.event_id}`);
            this.items = rs.data.result;
            // console.log(this.items);
            // admin_level
            let level40_items = [];
            let level50_items = [];

            this.items.forEach(el => {
                el.admin_level == 40 ? level40_items.push(el) : level50_items.push(el);
            });

            this.level40_items = level40_items;
            this.level50_items = level50_items;


        },
        userUpdate(item, index, target) {
            console.log(item, index, target);
        },
        userDelete: async function (item, index, target) {
            if (confirm("삭제 하시겠습니까?")) {
                let rs = await axios.delete(`${this.api_url}/user/${item.id}`);
                this.$showMsgBoxTwo(rs.status);
                this.getList();
            }
        },
        storeData: async function () {
            console.log(this.validation, this.form);
            if (!this.validation) return;
            if (!this.password) {
                this.password_confirm = 'password를 입력하고 확인하세요.';
                return;
            }

            let url = `${this.api_url}/register`;
            let formData = new FormData();
            formData.append('event_id', this.event_id);
            formData.append('email', this.form.email);
            formData.append('password', this.form.password);
            formData.append('name', this.form.name);
            formData.append('name_en', this.form.name_en);
            formData.append('phone', this.form.phone);
            let rs = await axios.post(url, formData, {
                Headers: {
                    'Content-Type': 'application/json'
                }
            });
            this.$showMsgBoxTwo(rs.status);
            this.getList();
            this.modal1 = false;
        },
        openModal1: async function (event, item) {
            this.form = {
                ...item
            }
            this.isNew = item ? false : true;
            if (this.isNew) {
                this.isUniquiId = false;
            } else {
                this.isUniquiId = true;
            }
            this.password_confirm = '';

            this.modal1 = true;
        },
        updateData: async function () {
            // http://127.0.0.1:8000/api/v1/user/9?name=test40_test&name_en=test40_test_en
            console.log(this.form);
            if (!this.isSamePassword) return;

            let url = `${this.api_url}/user/${this.form.id}`;
            let formData = new FormData();
            if (this.password) {
                formData.append('password', this.form.password);
            }
            formData.append('name', this.form.name);
            formData.append('name_en', this.form.name_en);
            formData.append('phone', this.form.phone);
            let rs = await axios.post(url, formData, {
                Headers: {
                    'Content-Type': 'application/json'
                }
            });
            this.$showMsgBoxTwo(rs.status);
            this.getList();
            this.modal1 = false;
        },
        userIdCheck: async function () {
            // http://14.63.172.119/api/v1/auth/check_email?event_id=105&email=test
            let url = `${this.api_url}/auth/check_email?event_id=${this.event_id}&email=${this.form.email}`;
            let response = await axios.get(url);
            if (response.data.code == 200) {
                // 사용가능
                this.isUniquiId = true;
            } else {
                this.isUniquiId = false;
            }
        }
    },
};
</script>
