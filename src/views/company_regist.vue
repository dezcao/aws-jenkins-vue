<template>
<section>
    <b-row class="mb-1">
        <b-col>
            <h6><strong>3.기업관리 > {{company_id ? company_name+ ' 수정' : '사업자 등록'}}</strong></h6>
            <b-button class="mt-2" href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
                <b-icon-arrow-left></b-icon-arrow-left> 이전으로
            </b-button>
        </b-col>
    </b-row>
    
    
    <b-row class="mt-3">
        <b-col>
            <b-card no-body>
                <b-tabs content-class="mt-3" card>
                    <b-tab title="국문" active>
                        <b-row>
                            <b-col>
                                <b-form-group label="사업자등록번호">
                                    <b-input-group>
                                        <b-form-input size="sm" v-model="form.number" @change="ditectNumberChange" :state="validation.valid1" :disabled="!isNew"></b-form-input>
                                        <b-input-group-append>
                                            <b-button variant="info" size="sm" @click="searchCompany">중복 체크</b-button>
                                        </b-input-group-append>
                                    </b-input-group>
                                    <b-form-invalid-feedback :state="validation.valid1">{{valid1_text}}</b-form-invalid-feedback>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                 <b-form-group label="업체명">
                                    <b-form-input size="sm" v-model="form.name" :state="validation.valid2"></b-form-input>
                                    <b-form-invalid-feedback :state="validation.valid2">업체명을 입력하세요.</b-form-invalid-feedback>
                                 </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                 <b-form-group label="행사 참가구분" v-slot="{ ariaDescribedby2 }">
                                    <b-form-radio-group
                                        v-model="event_type"
                                        :options="event_type_ops"
                                        :aria-describedby="ariaDescribedby2"
                                    ></b-form-radio-group>
                                 </b-form-group>
                            </b-col>
                            <b-col>
                                 <b-form-group label="참가구분" v-slot="{ ariaDescribedby }">
                                    <b-form-radio-group
                                        v-model="attend_type"
                                        :options="attend_type_ops"
                                        :aria-describedby="ariaDescribedby"
                                    ></b-form-radio-group>
                                 </b-form-group>
                            </b-col>
                        </b-row>
                        <hr>
                        <b-row>
                            <b-col>
                                <b-row class="p-1">
                                    <b-col sm="4"><label style="font-size: 10pt;">대표자</label></b-col>
                                    <b-col sm="8">
                                        <b-form-input size="sm" v-model="form.representation_name" :state="validation.valid3"></b-form-input>
                                        <b-form-invalid-feedback :state="validation.valid3">대표자 성함을 입력하세요.</b-form-invalid-feedback>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col>
                                <b-row class="p-1">
                                    <b-col sm="4"><label style="font-size: 10pt;">직원수</label></b-col>
                                    <b-col sm="8">
                                        <b-form-select v-model="form.employees_count" :options="employees_count_options" size="sm"></b-form-select>
                                        <!-- <b-form-input size="sm" v-model="form.employees_count"></b-form-input> -->
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-row class="p-1">
                                    <b-col sm="4"><label style="font-size: 10pt;">대표번호</label></b-col>
                                    <b-col sm="8">
                                        <b-form-input size="sm" v-model="form.representation_phone" :state="validation.valid4"></b-form-input>
                                        <b-form-invalid-feedback :state="validation.valid4">대표번호를 입력하세요.</b-form-invalid-feedback>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col>
                                <b-row class="p-1">
                                    <b-col sm="4"><label style="font-size: 10pt;">국가</label></b-col>
                                    <b-col sm="8">
                                        <!-- <b-form-input size="sm" v-model="form.country"></b-form-input> -->
                                        <b-form-select v-model="form.country" :options="nation_options" size="sm"></b-form-select>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-row class="p-1">
                                    <b-col sm="4"><label style="font-size: 10pt;">홈페이지</label></b-col>
                                    <b-col sm="8">
                                        <b-form-input size="sm" v-model="form.homepage"></b-form-input>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col>
                                <b-row class="p-1">
                                    <b-col sm="4"><label style="font-size: 10pt;">업태</label></b-col>
                                    <b-col sm="8">
                                        <b-form-input size="sm" v-model="form.condition" :state="validation.valid5"></b-form-input>
                                        <b-form-invalid-feedback :state="validation.valid5">업태를 입력하세요.</b-form-invalid-feedback>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-row class="p-1">
                                    <b-col sm="4"><label style="font-size: 10pt;">업종</label></b-col>
                                    <b-col sm="8">
                                        <b-form-input size="sm" v-model="form.sectors" :state="validation.valid6"></b-form-input>
                                        <b-form-invalid-feedback :state="validation.valid6">업종을 입력하세요.</b-form-invalid-feedback>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col>
                                <b-row class="p-1">
                                    <b-col sm="4"><label style="font-size: 10pt;">매출액</label></b-col>
                                    <b-col sm="8">
                                        <b-form-select v-model="form.take" :options="take_options" size="sm"></b-form-select>
                                        <!-- <b-form-input size="sm" v-model="form.take"></b-form-input> -->
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-row class="p-1">
                                    <b-col sm="4"><label style="font-size: 10pt;">출품 품목</label></b-col>
                                    <b-col sm="8">
                                        <b-form-input size="sm" v-model="form.product_type"></b-form-input>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col>
                                <b-row class="p-1">
                                    <b-col sm="4"><label style="font-size: 10pt;">이메일</label></b-col>
                                    <b-col sm="8">
                                        <b-form-input size="sm" v-model="form.email" :state="validation.valid7" type="email"></b-form-input>
                                        <b-form-invalid-feedback :state="validation.valid7">이메일을 입력하세요.</b-form-invalid-feedback>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-row class="p-1">
                                    <b-col sm="4"><label style="font-size: 10pt;">쇼핑몰/배송비(원)</label></b-col>
                                    <b-col sm="8">
                                        <b-form-input size="sm" type="number" v-model="form.delivery_price"></b-form-input>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col>
                                <b-row class="p-1">
                                </b-row>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-row class="p-1">
                                    <b-col sm="4"><label style="font-size: 10pt;">지역</label></b-col>
                                    <b-col sm="8">
                                            <b-form-select v-model="form.local_type" :options="local_type_options" size="sm"></b-form-select>
                                    </b-col>
                                </b-row>
                                <b-row class="p-1">
                                    <b-col sm="4"><label style="font-size: 10pt;">주소</label></b-col>
                                    <b-col sm="8">
                                            <b-form-textarea
                                                v-model="form.address"
                                                placeholder="address..."
                                                rows="3"
                                                max-rows="6"
                                                class="mt-1"
                                                :state="validation.valid8"
                                            ></b-form-textarea>
                                            <b-form-invalid-feedback :state="validation.valid8">주소를 입력하세요.</b-form-invalid-feedback>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col>
                                <b-row class="p-1">
                                    <b-col sm="4"><label style="font-size: 10pt;">업체개요</label></b-col>
                                    <b-col sm="8">
                                            <b-form-textarea
                                                v-model="form.introduce"
                                                placeholder="introduce..."
                                                rows="3"
                                                max-rows="6"
                                            ></b-form-textarea>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </b-tab>
                    <b-tab title="영문">
                        <b-row>
                            <b-col>
                                <b-form-group label="사업자등록번호">
                                    <b-input-group>
                                        <b-form-input size="sm" v-model="form.number" @change="ditectNumberChange" :state="validation.valid1" :disabled="!isNew"></b-form-input>
                                        <b-input-group-append>
                                            <b-button variant="info" size="sm" @click="searchCompany">중복 체크</b-button>
                                        </b-input-group-append>
                                    </b-input-group>
                                    <b-form-invalid-feedback :state="validation.valid1">{{valid1_text}}</b-form-invalid-feedback>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                 <b-form-group label="업체명">
                                    <b-form-input size="sm" v-model="form.name_en" :state="validation.valid2_en"></b-form-input>
                                    <b-form-invalid-feedback :state="validation.valid2_en">업체명을 입력하세요.</b-form-invalid-feedback>
                                 </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                 <b-form-group label="행사 참가구분" v-slot="{ ariaDescribedby2 }">
                                    <b-form-radio-group
                                        v-model="event_type"
                                        :options="event_type_ops"
                                        :aria-describedby="ariaDescribedby2"
                                    ></b-form-radio-group>
                                 </b-form-group>
                            </b-col>
                            <b-col>
                                 <b-form-group label="참가구분" v-slot="{ ariaDescribedby }">
                                    <b-form-radio-group
                                        v-model="attend_type"
                                        :options="attend_type_ops"
                                        :aria-describedby="ariaDescribedby"
                                    ></b-form-radio-group>
                                 </b-form-group>
                            </b-col>
                        </b-row>
                        <hr>
                        <b-row>
                            <b-col>
                                <b-row class="p-1">
                                    <b-col sm="4"><label style="font-size: 10pt;">대표자</label></b-col>
                                    <b-col sm="8">
                                        <b-form-input size="sm" v-model="form.representation_name_en" :state="validation.valid3_en"></b-form-input>
                                        <b-form-invalid-feedback :state="validation.valid3_en">대표자 성함을 입력하세요.</b-form-invalid-feedback>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col>
                                <b-row class="p-1">
                                    <b-col sm="4"><label style="font-size: 10pt;">직원수</label></b-col>
                                    <b-col sm="8">
                                        <b-form-select v-model="form.employees_count" :options="employees_count_options" size="sm"></b-form-select>
                                        <!-- <b-form-input size="sm" v-model="form.employees_count"></b-form-input> -->
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-row class="p-1">
                                    <b-col sm="4"><label style="font-size: 10pt;">대표번호</label></b-col>
                                    <b-col sm="8">
                                        <b-form-input size="sm" v-model="form.representation_phone" :state="validation.valid4"></b-form-input>
                                        <b-form-invalid-feedback :state="validation.valid4">대표번호를 입력하세요.</b-form-invalid-feedback>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col>
                                <b-row class="p-1">
                                    <b-col sm="4"><label style="font-size: 10pt;">국가</label></b-col>
                                    <b-col sm="8">
                                        <!-- <b-form-input size="sm" v-model="form.country"></b-form-input> -->
                                        <b-form-select v-model="form.country" :options="nation_options" size="sm"></b-form-select>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-row class="p-1">
                                    <b-col sm="4"><label style="font-size: 10pt;">홈페이지</label></b-col>
                                    <b-col sm="8">
                                        <b-form-input size="sm" v-model="form.homepage"></b-form-input>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col>
                                <b-row class="p-1">
                                    <b-col sm="4"><label style="font-size: 10pt;">업태</label></b-col>
                                    <b-col sm="8">
                                        <b-form-input size="sm" v-model="form.condition" :state="validation.valid5"></b-form-input>
                                        <b-form-invalid-feedback :state="validation.valid5">업태를 입력하세요.</b-form-invalid-feedback>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-row class="p-1">
                                    <b-col sm="4"><label style="font-size: 10pt;">업종</label></b-col>
                                    <b-col sm="8">
                                        <b-form-input size="sm" v-model="form.sectors" :state="validation.valid6"></b-form-input>
                                        <b-form-invalid-feedback :state="validation.valid6">업종을 입력하세요.</b-form-invalid-feedback>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col>
                                <b-row class="p-1">
                                    <b-col sm="4"><label style="font-size: 10pt;">매출액</label></b-col>
                                    <b-col sm="8">
                                        <b-form-select v-model="form.take" :options="take_options" size="sm"></b-form-select>
                                        <!-- <b-form-input size="sm" v-model="form.take"></b-form-input> -->
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-row class="p-1">
                                    <b-col sm="4"><label style="font-size: 10pt;">출품 품목</label></b-col>
                                    <b-col sm="8">
                                        <b-form-input size="sm" v-model="form.product_type"></b-form-input>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col>
                                <b-row class="p-1">
                                    <b-col sm="4"><label style="font-size: 10pt;">이메일</label></b-col>
                                    <b-col sm="8">
                                        <b-form-input size="sm" v-model="form.email" :state="validation.valid7" type="email"></b-form-input>
                                        <b-form-invalid-feedback :state="validation.valid7">이메일을 입력하세요.</b-form-invalid-feedback>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-row class="p-1">
                                    <b-col sm="4"><label style="font-size: 10pt;">쇼핑몰/배송비(원)</label></b-col>
                                    <b-col sm="8">
                                        <b-form-input size="sm" type="number" v-model="form.delivery_price"></b-form-input>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col>
                                <b-row class="p-1">
                                </b-row>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-row class="p-1">
                                    <b-col sm="4"><label style="font-size: 10pt;">지역</label></b-col>
                                    <b-col sm="8">
                                            <b-form-select v-model="form.local_type" :options="local_type_options" size="sm"></b-form-select>
                                    </b-col>
                                </b-row>
                                <b-row class="p-1">
                                    <b-col sm="4"><label style="font-size: 10pt;">주소</label></b-col>
                                    <b-col sm="8">
                                            <b-form-textarea
                                                v-model="form.address_en"
                                                rows="3"
                                                max-rows="6"
                                                class="mt-1"
                                                :state="validation.valid8_en"
                                            ></b-form-textarea>
                                            <b-form-invalid-feedback :state="validation.valid8_en">주소를 입력하세요.</b-form-invalid-feedback>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col>
                                <b-row class="p-1">
                                    <b-col sm="4"><label style="font-size: 10pt;">업체개요</label></b-col>
                                    <b-col sm="8">
                                            <b-form-textarea
                                                v-model="form.introduce_en"
                                                rows="3"
                                                max-rows="6"
                                            ></b-form-textarea>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </b-tab>
                </b-tabs>
            </b-card>

            <b-row>
                <b-col>
                    <b-row class="p-1">
                        <b-col sm="4"><label style="font-size: 10pt;">사업자 등록 사본</label></b-col>
                        <b-col sm="8">
                            <b-form-file v-model="form.business_registration" :placeholder="file_src" size="sm" class="w-50 mr-sm-2"></b-form-file>
                            <b-button @click="form.business_registration = null; file_src='No file'; file_del=true;" size="sm" variant="danger">파일 삭제</b-button>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col>
                    <b-row class="p-1">
                        <b-col sm="4"><label style="font-size: 10pt;">기업 로고</label></b-col>
                        <b-col sm="8">
                            <b-form-file v-model="form.logo" :placeholder="logo_src" size="sm" class="w-50 mr-sm-2"></b-form-file>
                            <b-button @click="form.logo = null; logo_src='No file'; logo_del=true;" size="sm" variant="danger">파일 삭제</b-button>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>

        </b-col>
    </b-row>
    <b-row class="mt-3">
        <b-col>
            <b-button v-show="isNew" href="#" variant="primary" size="sm" @click="storeData">저장하기</b-button>
            <b-button v-show="!isNew" href="#" variant="info" size="sm" @click="updateData">수정하기</b-button>
            <b-button href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
                <b-icon-arrow-left></b-icon-arrow-left> 이전으로
            </b-button>
        </b-col>
    </b-row>
    
</section>
</template>

<script>
export default {
    name: 'company_regist',
    data: function () {
        return {
            api_url: ``,
            event_id: null,
            company_id: 0,
            company_name: '',

            selected: null,
			options: [
				{ value: null, text: '전체' },
				{ value: 'buyer', text: '바이어' },
				{ value: 'seller', text: '셀러' }
			],

            event_type: 0,
            event_type_ops: [
                { text: 'Exhibition', value: 0 },
                { text: 'Bizmatching', value: 1 },
                { text: 'Exhibition + Bizmatching', value: 2 }
            ],
            attend_type: 0,
            attend_type_ops: [
                { text: '바이어', value: 0 },
                { text: '셀러', value: 1 }
            ],

            file_src: '',
            file_del: false,
            logo_src: '',
            logo_del: false,
            
            form: {
                "event_id": this.$store.getters.event_id,
                "name": "",
                "name_en": "",
                "address": "",
                "address_en": "",
                "number": 0,
                "employees_count": 1,
                "attend_type": 0,
                "event_type": 0,
                "representation_name": "",
                "representation_name_en": "",
                "representation_phone": "",
                "introduce": "",
                "introduce_en": "",
                "email": "",
                "homepage": "",
                "created_at": "",
                "updated_at": "",
                "status": 0,
                "country": "대한민국",
                "condition": "",
                "sectors": "",
                "take": 1,
                "local_type": '서울',
                "logo": null,
                "logo_ai": null,
                "business_registration": null,
                "delivery_price": 0,
                "is_like": 0,
                "product_type": ""
            },

            isCheckedNumber: false, // 사업자번호 체크여부
            valid1_text: '중복되지 않는 사업자번호가 필요합니다.',
            isNew: true,

            // form.take
            nation_options: [],
			take_options: [],
			employees_count_options: [],
			local_type_options: []
            
        }
    },
    mounted: function () {
        this.$nextTick(async function () {
            this.api_url = this.$store.getters.api_url;
            this.event_id = this.$store.getters.event_id;
            this.company_id = this.$route.query.company_id;
            this.company_name = this.$route.query.company_name;
            this.getCompanyOptions();
            if (this.company_id) {
                this.isCheckedNumber = true;
                this.getData();
            }
            // http://14.63.172.119/api/v1/company/option
        })
    },
    computed: {
        validation: function () {
            
            let valid_result = this.isCheckedNumber
                && this.form.name
                && this.form.representation_name
                && this.form.representation_phone
                && this.form.condition
                && this.form.sectors
                && this.form.email
                && this.form.address
            console.log('this.form', valid_result ? true : false,  this.form);

            let valid_result_en = this.isCheckedNumber
                && this.form.name_en
                && this.form.representation_name_en
                && this.form.representation_phone
                && this.form.condition
                && this.form.sectors
                && this.form.email
                && this.form.address_en
            ;
            return {
                valid1: this.isCheckedNumber,
                valid2: this.form.name ? true : false,
                valid2_en: this.form.name_en ? true : false,
                valid3: this.form.representation_name ? true : false,
                valid3_en: this.form.representation_name_en ? true : false,
                valid4: this.form.representation_phone ? true : false,
                valid5: this.form.condition ? true : false,
                valid6: this.form.sectors ? true : false,
                valid7: this.form.email ? true : false,
                valid8: this.form.address ? true : false,
                valid8_en: this.form.address_en ? true : false,
                valid_result: valid_result ? true : false,
                valid_result_en: valid_result_en ? true : false
            }
        }
    },

    methods: {
        getCompanyOptions: async function () {
            let rs = await axios.get(`${this.api_url}/company/option`);
            
            this.nation_options = rs.data.result.nation_options;
            this.take_options = rs.data.result.take_options;
            this.employees_count_options = rs.data.result.employees_count_options;
            this.local_type_options = rs.data.result.local_type_options;
        },
        searchCompany: async function() {
            let com = String(this.form.number).replace(/-/g, '');
            let com_str = com.substr(0,3) + '-'  + com.substr(3,2) + '-'  + com.substr(5);
            // let com_str = parseInt(com.substr(0,3)) + '-'  + parseInt(com.substr(3,2)) + '-'  + parseInt(com.substr(5));
            this.form.number = com_str;
            if (com_str.match(/^\d{3}-\d{2}-\d{5}$/g)) {
                // console.log('yaho~~~', com_str);
                let url =  `${this.api_url}/company/search?event_id=${this.event_id}&number=${this.form.number}`;
                let rs = await axios.get(url);
                if (rs.data.code == 200) {
                    // 있으면 입력 못하게 해주기
                    this.isCheckedNumber = false;
                    this.valid1_text = '중복되지 않는 사업자번호가 필요합니다.';
                    // this.$showMsgBoxTwo(400, '', `${this.form.number} : 중복입니다.`);
                } else {

                    this.isCheckedNumber = true;
                    // this.$showMsgBoxTwo(200, '', `${this.form.number} : 등록 가능합니다.`);
                }
            } else {
                // 형식이 다름.
                this.isCheckedNumber = false;
                this.valid1_text = '사업자 번호형식이 다릅니다.'
            }
            
        },
        ditectNumberChange: function () {
            this.isCheckedNumber = false;
        },
        getData: async function () {
            let url = `${this.api_url}/company/${this.company_id}`;
            let res = await axios.get(url);
            let rs = res.data.result;
            this.logo_src = rs.logo;
            this.file_src = rs.business_registration;
            rs.logo = null;
            rs.business_registration = null;

            console.log(rs);
            this.form = {...rs};
            this.isNew = false;
        },
        storeData: async function () {
            if (!this.validation.valid_result && !this.validation.valid_result_en) {
                return;
            }

            let url =  `${this.api_url}/company`;
            let formData = new FormData();
            for (let key in this.form) {
                if (this.form[key] != "") {
                    formData.append(key, this.form[key]);
                }
            }

            console.log(this.form);

            !this.form.business_registration && this.file_del ? formData.append('business_registration_del', 'Y') : formData.append('business_registration', this.form.business_registration);
            !this.form.logo && this.logo_del ? formData.append('logo_del', 'Y') : formData.append('logo', this.form.logo);

            let rs = await axios.post(url, formData, {
                Headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            function callback () {
                this.$router.go(-1);
            }
            this.$showMsgBoxTwo(rs.status, '', '', callback.bind(this));
        }

        ,updateData: async function () {
            if (!this.validation.valid_result && !this.validation.valid_result_en) {
                return;
            }

            let url =  `${this.api_url}/company/${this.company_id}`;
            let formData = new FormData();
            for (let key in this.form) {
                if (this.form[key] != "") {
                    formData.append(key, this.form[key]);
                }
            }

            console.log(this.form);

            !this.form.business_registration && this.file_del ? formData.append('business_registration_del', 'Y') : formData.append('business_registration', this.form.business_registration);
            !this.form.logo && this.logo_del ? formData.append('logo_del', 'Y') : formData.append('logo', this.form.logo);

            let rs = await axios.post(url, formData, {
                Headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            function callback () {
                this.$router.go(-1);
            }
            this.$showMsgBoxTwo(rs.status, '', '', callback.bind(this));
        }
    }
}
</script>
