<template>
<section>
    <b-row class="mb-1">
        <b-col>
            <h6><strong>2.메뉴 및 컨텐츠 관리 > 쇼핑 (컨텐츠) > 상품 등록</strong></h6>
            <b-button class="mt-2" href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
                <b-icon-arrow-left></b-icon-arrow-left> 이전으로
            </b-button>
        </b-col>
    </b-row>
    
    
    <b-row class="mt-3">
        <b-col>
            <b-card>
                <b-row>
                     <b-col>
                        <!-- select -->
                        <b-form-group label="카테고리">
                            <b-form-select v-model="form.category_id" :options="top_category_options" :state="validation.valid1" size="sm"></b-form-select>
                            <b-form-invalid-feedback :state="validation.valid1">카테고리를 선택하세요.</b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="기업">
                            <b-form-select v-model="form.company_id" :options="company_list" size="sm"  :disabled="!isNew" :state="validation.valid2"></b-form-select>
                            <b-form-invalid-feedback :state="validation.valid2">기업을 선택하세요.</b-form-invalid-feedback>
                        </b-form-group>

                        <!-- radio -->
                        <b-form-group label="게시상태">
                            <div class="form-group">
                                <b-form-checkbox v-model="form.is_visible" name="check-button" switch>
                                    <strong>{{ form.is_visible ? "ON" : "OFF"}}</strong>
                                </b-form-checkbox>
                            </div>
                        </b-form-group>
                        <b-form-group label="특가 노출">
                            <b-form-checkbox v-model="form.is_sale" name="check-button" switch>
                                <strong>{{ form.is_sale ? "ON" : "OFF"}}</strong>
                            </b-form-checkbox>
                        </b-form-group>

                        <b-form-group label="상품명">
                            <b-form-input size="sm" v-model="form.title" :state="validation.valid3"></b-form-input>
                            <b-form-invalid-feedback :state="validation.valid3">상품명을 입력하세요.</b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="상품가격">
                            <b-form-input size="sm" v-model="form.price" type="number" :state="validation.valid4"></b-form-input>
                            <b-form-invalid-feedback :state="validation.valid4">상품가격을 입력하세요.</b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="판매가격 (할인된 가격)">
                            <b-form-input size="sm" v-model="form.sale_price" type="number" :state="validation.valid5"></b-form-input>
                            <b-form-invalid-feedback :state="validation.valid5">상품가격보다 할인된 가격을 입력하세요.</b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="담당자 연락처">
                            <b-form-input size="sm" v-model="form.phone" :state="validation.valid6"></b-form-input>
                            <b-form-invalid-feedback :state="validation.valid6">담당자 연락처를 입력하세요.</b-form-invalid-feedback>
                        </b-form-group>
                     </b-col>
                     <b-col>
                         <b-row>
                             <b-col>
                                 <b-form-group label="상품 이미지">
                                    <b-card>
                                        <b-card-body align="center">
                                            <b-card-text align="center" style="width:180px; height:180px;">
                                                <div style="display:inline-block; width:100%; height: 100%; padding: 5px; border:1px solid silver; border-radius: 3px;">
                                                    <b-img 
                                                        style="height:100%; width:100%; object-fit:contain;"
                                                        :src="product_image_prev||product_image_default" fluid></b-img>
                                                </div>
                                            </b-card-text>
                                        </b-card-body>
                                        <b-card-footer>
                                            <b-form-file v-model="form.product_image" @change="onFileChange($event, 'product_image_prev')" size="sm" class="w-50 mr-sm-2"></b-form-file>
                                            <b-button @click="form.product_image = null; product_image_prev = null; product_image_del = true;" size="sm" variant="danger">이미지 삭제</b-button>
                                        </b-card-footer>
                                    </b-card>
                                </b-form-group>
                             </b-col>
                         </b-row>
                         <b-row>
                             <b-col>
                                <b-form-group label="상품 상세 페이지 이미지">
                                    <b-card>
                                        <b-card-body align="center">
                                            <b-card-text align="center" style="width:180px; height:180px;">
                                                <div style="display:inline-block; width:100%; height: 100%; padding: 5px; border:1px solid silver; border-radius: 3px;">
                                                    <b-img 
                                                        style="height:100%; width:100%; object-fit:contain;"
                                                        :src="detail_image_prev||detail_image_default" fluid></b-img>
                                                </div>
                                            </b-card-text>
                                        </b-card-body>
                                        <b-card-footer>
                                            <b-form-file v-model="form.detail_image" @change="onFileChange($event, 'detail_image_prev')" size="sm" class="w-50 mr-sm-2"></b-form-file>
                                            <b-button @click="form.detail_image = null; detail_image_prev = null; detail_image_del = true;" size="sm" variant="danger">이미지 삭제</b-button>
                                        </b-card-footer>
                                    </b-card>
                                </b-form-group>
                             </b-col>
                         </b-row>
                     </b-col>
                </b-row>
            </b-card>

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
    name: 'shop_regist',
    data: function () {
        return {
            api_url: ``,
            event_id: null,
            menu_id: 0,
            product_id: 0,
            isNew: true,

            form: {
                company_id: 0,
                category_id: 0,
                is_visible: false,
			    is_sale: false,
                title: '',
                price: 0,
                sale_price: 0,
                phone: '',
                product_image: null,
                detail_image: null
            },

            product_image_prev: '',
            product_image_del: false,
            product_image_default: this.$store.getters.dummy_image_url(['180x180']),

            detail_image_prev: '',
            detail_image_del: false,
            detail_image_default: this.$store.getters.dummy_image_url(['180x180']),


            top_category_options: [],
            company_list: [{
                value:0, text:'inowing'
            }],

            
        }
    },
    mounted: function () {
        this.$nextTick(async function () {
            this.api_url = this.$store.getters.api_url;
            this.event_id = this.$store.getters.event_id;
            this.menu_id = this.$route.query.menu_id;
            this.product_id = this.$route.query.product_id;
            await this.getTopCategory();
            await this.getCompanyList();
            if (this.product_id) {
                await this.getProduct();
            }
        })
    },
    computed: {
        validation: function () {

            let valid_result = this.form.category_id && this.form.company_id && this.form.title && this.form.price && this.form.sale_price && this.form.phone

            && parseInt(this.form.price) > parseInt(this.form.sale_price);
            
            return {
                valid1: this.form.category_id ? true : false,
                valid2: this.form.company_id ? true : false,
                valid3: this.form.title ? true : false,
                valid4: this.form.price ? true : false,
                valid5: this.form.sale_price && parseInt(this.form.price) > parseInt(this.form.sale_price) ? true : false,
                valid6: this.form.phone ? true : false,
                valid_result: valid_result
            }
        }
    },

    methods: {
        getTopCategory: async function () {
            let url = `${this.api_url}/menucategory/topcategory?menu_id=${this.menu_id}`;

            let response = await axios.get(url);
            let temArr = response.data.result;
            let caArr = [];
            temArr.forEach(item => {
                caArr.push({value: item.id, text: item.name});
            });

            this.top_category_options = caArr;
        },
        getCompanyList: async function() {
            let url =  `${this.api_url}/company?event_id=${this.event_id}`;
            let rs = await axios.get(url);
            let arr = [];
            rs.data.result.forEach(item => {
                arr.push({value: item.id, text: item.name});
            });
            this.company_list = arr;
        },
        getProduct: async function() {
            let url = `${this.api_url}/product/${this.product_id}`;
            let rs = await axios.get(url);
            let data = rs.data.result;
            this.product_image_prev = data.product_image;
            this.detail_image_prev = data.detail_image;
            data.product_image = null;
            data.detail_image = null;
            this.product_image_del = false;
            this.detail_image_del = false;
            this.isNew = false;
            this.form = {...data};
            this.form.is_visible = data.is_visible ? true : false;
            this.form.is_sale = data.is_sale ? true : false;

        },

        storeData: async function () {
            if (!this.validation.valid_result) {
                return;
            }

            let url =  `${this.api_url}/product`;
            let formData = new FormData();
                formData.append('menu_id', this.menu_id);
            for (let key in this.form) {
                if (this.form[key] != "" && this.form[key] != null) {
                    formData.append(key, this.form[key]);
                }
            }
                formData.append('is_visible', this.form.is_visible ? 1 : 0);
                formData.append('is_sale', this.form.is_sale ? 1 : 0);
            

            let rs = await axios.post(url, formData, {
                Headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            function callback () {
                this.$router.go(-1);
            }
            this.$showMsgBoxTwo(rs.status, '', '', callback.bind(this));
        },
        updateData: async function () {
            let url =  `${this.api_url}/product/${this.product_id}`;
            let formData = new FormData();
            !this.form.product_image && this.product_image_del ? formData.append('product_image_del', 'Y') : formData.append('product_image', this.form.product_image);
            !this.form.detail_image && this.detail_image_del ? formData.append('detail_image_del', 'Y') : formData.append('detail_image', this.form.detail_image);

            formData.append("category_id", this.form.category_id);
            formData.append('is_visible', this.form.is_visible ? 1 : 0);
            formData.append('is_sale', this.form.is_sale ? 1 : 0);
            formData.append("title", this.form.title);
            formData.append("price", this.form.price);
            formData.append("sale_price", this.form.sale_price);
            formData.append("phone", this.form.phone);

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
