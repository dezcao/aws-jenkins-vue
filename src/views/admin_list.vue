<template>
<section>
    <b-row>
        <b-col>
            <h6><strong>3.기업관리 > 기업목록 > 관리자 목록</strong></h6>
            
        </b-col>
    </b-row>
    <b-row class="mt-1">
        <b-col>
        <b-row>
            <b-col cols="8">
                <b-button href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
                    <b-icon-arrow-left></b-icon-arrow-left> 이전으로
                </b-button>

                <b-button size="sm" variant="primary" @click="openModal"><b-icon-plus></b-icon-plus> 계정 추가하기</b-button>
            </b-col>
            <b-col cols="4">
				<b-input-group size="sm" align-v="baseline">
					<b-form-input aria-placeholder="검색어를 입력하세요."></b-form-input>
					<b-input-group-append>
						<b-button variant="info" size="sm">검색하기</b-button>
					</b-input-group-append>
				</b-input-group>
			</b-col>
        </b-row>
        

        <b-table :fields="fields" :items="items" small bordered head-variant="light" class="mt-1">
            <template #cell(id)="row">
                <div class="text-center">{{row.item.id}}</div>
            </template>
            <template #cell(manageBtn)="row">
                <div class="text-center">
                    <b-button size="sm" variant="outline-success" @click="openModal($event, row.item)">
                        <b-icon-pencil-square></b-icon-pencil-square>수정
                    </b-button>
                    <b-button size="sm" variant="outline-danger" @click="deleteItemFn(row.item, $event, row.index)">
                        <b-icon-trash2-fill></b-icon-trash2-fill>삭제
                    </b-button>
                </div>
            </template>
        </b-table>

        <b-modal v-model="question_modal" hide-footer title="관리자 정보">
            <b-row>
                <b-col>
                    <b-card no-body class="p-3" :border-variant="isNew ? 'primary' : 'success'">
                        <b-form-group label="이메일">
                            <b-form-input type="email" size="sm" v-model="form.email"></b-form-input>
                        </b-form-group>
                        <b-form-group label="비밀번호">
                            <b-form-input type="password" size="sm" v-model="password" :state="validation"></b-form-input>
                        </b-form-group>
                        <b-form-group label="비밀번호 확인">
                            <b-form-input type="password" size="sm" v-model="password_confirm" :state="validation"></b-form-input>
                            <b-form-invalid-feedback :state="validation">
                                Password를 확인해주세요.
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="이름 국문">
                            <b-form-input size="sm" v-model="form.name"></b-form-input>
                        </b-form-group>
                        <b-form-group label="이름 영문">
                            <b-form-input size="sm" v-model="form.name_en"></b-form-input>
                        </b-form-group>
                        <b-form-group label="휴태폰 번호">
                            <b-form-input size="sm" v-model="form.phone"></b-form-input>
                        </b-form-group>
                    </b-card>
                </b-col>
            </b-row>
            <b-row class="mt-1">
                <b-col>
                    <b-button size="sm" variant="primary" v-show="isNew" @click="storeUser" class="inoBtn-150">확인</b-button>
                    <b-button size="sm" variant="success" v-show="!isNew" @click="updateUser" class="inoBtn-150">수정</b-button>
                </b-col>
            </b-row>
        </b-modal>
            
        </b-col>
    </b-row>
</section>
</template>

<script>
export default {
    name: 'admin_list',
    data: function () {
        return {
            api_url: ``,
            event_id: null,
            menu_id: null,
            company_id: null,
            company_name: null,
            question_modal: false,
            fields: [{
                    key: 'id',
                    label: '아이디'
                },
                {
                    key: 'name',
                    label: '기업명'
                },
                {
                    key: 'email',
                    label: "계정"
                },
                {
                    key: 'manageBtn',
                    label: '관리계정'
                }
            ],
            items: [
                {
                    id: 1,
                    name: '이노윙',
                    name_en: 'inowing',
                    email: '이메일@이메일',
                    phone: '111-222-333',
                },
                {
                    id: 2,
                    name: '이노윙2',
                    name_en: 'inowing2',
                    email: '이메일2@이메일',
                    phone: '111-222-3343',
                },
                {
                    id: 3,
                    name: '이노윙3',
                    name_en: 'inowing3',
                    email: '이메일3@이메일',
                    phone: '111-222-3335',
                },
            ],
            form: {
                name: '',
                name_en: '',
                email: '',
                phone: ''
            },
            reset_form: {
                name: '',
                name_en: '',
                email: '',
                phone: ''
            },
            password: '',
            password_confirm: '',
            isNew: true
        }
    },
    mounted: function () {
        this.$nextTick(async function () {
            this.api_url = this.$store.getters.api_url;
            this.event_id = this.$store.getters.event_id;
            this.company_id = this.$route.query.company_id;
            this.company_name = this.$route.query.company_name;
            this.getList();
        })
    },
    computed: {
      validation() {

        let valid = 
            this.password
            && (this.password_confirm == this.password)

            ? true : false;
        console.log(valid);
        return valid;
      }
    },
    methods: {
        getList: async function () {
            // http://14.63.172.119/api/v1/user/info
            // http://14.63.172.119/api/v1/user/in_company?company_id=1
            let response = await axios.get(`${this.api_url}/user/in_company?company_id=${this.company_id}`);
            console.log(this.event_id);
            let rs = response.data.result;
            console.log('company list data ', response);
            this.items = rs;
        },
        openModal: function (event, item) {
            if (item) {
                this.isNew = false;
                this.form = item;
            } else {
                this.isNew = true;
                this.form = { ...this.reset_form };
            }
            this.password = '';
            this.password_confirm = '';
            this.question_modal = true;
            // http://14.63.172.119/api/v1/user/info
            // let response = await axios.get(`${this.api_url}/user?event_id=${this.event_id}`);
            // console.log(this.event_id);
            // let rs = response.data.result;
            // console.log('company list data ', response);
            // this.items = rs;
        },
        deleteItemFn: async function (item) {
            if (confirm("삭제 하시겠습니까?")) {
                let rs = await axios.delete(`${this.api_url}/user/${item.id}`);
                this.getList();
                this.$showMsgBoxTwo(rs.status);
            }
        },
        storeUser: async function () {
            if (!this.validation) {
                console.log("no...");
                return;
            }
            console.log(this.form.name_en);
            
            let url = `${this.api_url}/register`;
            let formData = new FormData();
                formData.append('event_id', this.event_id);
                formData.append('company_id', this.company_id);
                formData.append('email', this.form.email);
                formData.append('password', this.password);
                formData.append('name', this.form.name);
                formData.append('name_en', this.form.name_en);
                formData.append('phone', this.form.phone);
            let rs = await axios.post(url, formData, {
                Headers: {
                    'Content-Type': 'application/json'
                }
            }).catch(error => {
                this.$showMsgBoxTwo(error.response.status, '', error.response.statusText);
            });
            console.log(rs);
            if (rs.data.code == 200) {
                this.$showMsgBoxTwo(rs.status);
            } else {
                this.$showMsgBoxTwo(rs.data.code, '', rs.data.result);
            }
            
            this.getList();
            this.question_modal = false;
            

        },
        updateUser: async function () {
            console.log(this.form);

            if (!this.validation) {
                return;
            }

            let url = `${this.api_url}/user/${this.form.id}`; // user_id
            let formData = new FormData();
                formData.append('event_id', this.event_id);
                formData.append('company_id', this.company_id);
                formData.append('email', this.form.email);
                formData.append('password', this.password);
                formData.append('name', this.form.name);
                formData.append('name_en', this.form.name_en);
                formData.append('phone', this.form.phone);
            let rs = await axios.post(url, formData, {
                Headers: {
                    'Content-Type': 'application/json'
                }
            }).catch(error => {
                this.$showMsgBoxTwo(error.response.status, '', error.response.statusText);
            });
            console.log(rs);
            if (rs.data.code == 200) {
                this.$showMsgBoxTwo(rs.status);
            } else {
                this.$showMsgBoxTwo(rs.data.code, '', rs.data.result);
            }
            
            this.getList();
            this.question_modal = false;

        },
        
        
        
    }
}
</script>
