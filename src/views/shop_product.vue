<template>
<section>
    <b-row>
        <b-col>
            <h6><strong>2.메뉴 및 컨텐츠 관리 > 쇼핑 (컨텐츠) > 상품 목록</strong></h6>
        </b-col>
    </b-row>
    <b-row class="mt-3">
        <b-col>
            <b-button  href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
                <b-icon-arrow-left></b-icon-arrow-left> 이전으로
            </b-button>
            <b-button size="sm" variant="primary">상품 관리</b-button>
            <b-button size="sm" variant="outline-primary" @click="goShopOrderList">판매 내역 관리</b-button>
        </b-col>
    </b-row>
    <b-row class="mt-3">
        <b-col>
            <b-row>
                <b-col cols="8">
                    <b-button size="sm" variant="primary" @click="goShopRegist"><b-icon-plus></b-icon-plus>상품 추가하기</b-button>
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
                <template #cell(price)="row">
                    <div class="text-right">{{ row.item.price.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")}}</div>
                </template>
                <template #cell(discount)="row">
                    <div class="text-center" v-show="row.item.sale_price < row.item.price">{{Math.floor((row.item.price-row.item.sale_price)/row.item.price*100)}} %</div>
                </template>
                <template #cell(sale_price)="row">
                    <div class="text-right">
                        {{ row.item.sale_price.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")}}
                    </div>
                </template>
                <template #cell(is_visible)="row">
                    <div class="text-center">
                        <b-button size="sm" variant="outline-success" disabled  v-show="row.item.is_visible == 1"><b-icon-eye></b-icon-eye></b-button>
                        <b-button size="sm" variant="outline-secondary" disabled  v-show="row.item.is_visible == 0"><b-icon-eye-slash></b-icon-eye-slash></b-button>
                    </div>
                </template>
                
                <template #cell(manageBtn)="row">
                    <b-button size="sm" variant="outline-success" @click="goShopRegist($event, row.item)">
                        <b-icon-pencil-square></b-icon-pencil-square>수정
                    </b-button>
                    <b-button size="sm" variant="outline-danger" @click="deleteItemFn(row.item, $event, row.index)">
                        <b-icon-trash2-fill></b-icon-trash2-fill>삭제
                    </b-button>
                </template>
            </b-table>
        </b-col>
    </b-row>
</section>
</template>

<script>
export default {
    name: 'shop_product',
    data: function () {
        return {
            api_url: ``,
            event_id: null,
            menu_id: null,

            company_id: null,
            company_name: null,

            selected: null,
			options: [
				{ value: null, text: '전체' },
				{ value: 'buyer', text: '바이어' },
				{ value: 'seller', text: '셀러' }
			],
            
            fields: [{
                    key: 'id',
                    label: '아이디'
                },
                {
                    key: 'category_name',
                    label: '카테고리'
                },
                {
                    key: 'name',
                    label: '업체명'
                },

                {
                    key: 'title',
                    label: '상품명'
                },
                {
                    key: 'price',
                    label: '원가'
                },
                {
                    key: 'discount', //calc
                    label: '할인율'
                },
                {
                    key: 'sale_price',
                    label: '판매가'
                },
                {
                    key: 'is_visible',
                    label: '게시상태'
                },
                {
                    key: "manageBtn",
                    label: "관리",
                }
            ],
            items: [],
            question_modal: false,
            selected_item: Object,
            thumb_prev: '',
            thumb_prev_default: this.$store.getters.dummy_image_url(['180x180']),
            movie_file_src: '',
            isNew: true
        }
    },
    mounted: function () {
        this.$nextTick(async function () {
            this.api_url = this.$store.getters.api_url;
            this.event_id = this.$store.getters.event_id;
            this.menu_id = this.$route.query.menu_id;
            this.getList();
        })
    },

    methods: {
        getList: async function () {
            console.log('this event_id : ', this.event_id);
            let response = await axios.get(`${this.api_url}/product?menu_id=${this.menu_id}`);
            let rs = response.data.result;
            console.log(rs);
            this.items = rs;
        },
        goAdminList: function (item) {
            this.$router.push({ name: 'admin_list', query: {company_id: item.id, company_name: item.name}});
        },
        goRegisterForm: function (item) {
            this.$router.push({ name: 'company_regist', query: {company_id: item.id, company_name: item.name}});
        },
        deleteItemFn: async function (item) {
            if (confirm(`${item.id, item.name} 삭제 하시겠습니까?`)) {
                
                let rs = await axios.delete(`${this.api_url}/product/${item.id}`);
                this.getList();
                this.$showMsgBoxTwo(rs.status);
            }
        },
        goShopRegist: function (event, item) {
            if (item) {
                this.$router.push({ name: 'shop_regist', query: {menu_id : this.menu_id, product_id: item.id}});
            } else {
                this.$router.push({ name: 'shop_regist', query: {menu_id : this.menu_id}});
            }
        },
        goShopOrderList: function () {
            this.$router.push({ name: 'shop_order', query: {menu_id : this.menu_id}});
        }
    }
}
</script>
