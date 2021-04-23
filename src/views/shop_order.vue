<template>
<section>
    <b-row>
        <b-col>
            <h6><strong>2.메뉴 및 컨텐츠 관리 > 쇼핑 (컨텐츠) > 판매 내역 관리</strong></h6>
        </b-col>
    </b-row>
    <b-row class="mt-3">
        <b-col>
            <b-button href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
                <b-icon-arrow-left></b-icon-arrow-left> 이전으로
            </b-button>
            <b-button size="sm" variant="outline-primary" @click="goShopProductList">상품 관리</b-button>
            <b-button size="sm" variant="primary">판매 내역 관리</b-button>
        </b-col>
    </b-row>
    <b-row class="mt-3">
        <b-col>
            <b-card>
                <b-row>
                    <b-col>
                        <b-form-group label="기간 조회">
                            <b-form inline>
                                <b-form-datepicker
                                    v-model="start_date"
                                    locale="kr"
                                    size="sm"
                                    class="mr-1"
                                ></b-form-datepicker>
                                ~
                                <b-form-group class="ml-1">
                                    <b-form-datepicker
                                        v-model="end_date"
                                        locale="kr"
                                        size="sm"
                                    ></b-form-datepicker>
                                </b-form-group>
                            </b-form>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group label="상풍명,구매자">
                            <b-form-input size="sm" v-model="search_key"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col></b-col>
                </b-row>
                <b-row>
                    <b-col cols="3">
                        <b-button variant="info" size="sm" @click="getList">검색하기</b-button>
                    </b-col>
                    <b-col cols="6"></b-col>
                    <b-col cols="3" class="text-right">
                        <b-button href="#" variant="primary" size="sm" @click="excelDownload">
                            <b-icon-download></b-icon-download>엑셀 다운로드
                        </b-button>
                    </b-col>
                </b-row>
            </b-card>

            <b-table :fields="fields" :items="items" small bordered head-variant="light" class="mt-1">
                <template #cell(id)="row">
                    <div class="text-center">{{row.item.id}}</div>
                </template>
                <template #cell(created_at)="row">
                    <div class="text-center">{{row.item.created_at}}</div>
                </template>
                <template #cell(grade)="row">
                    <div class="text-center">{{row.item.grade}}</div>
                </template>
                <template #cell(count)="row">
                    <div class="text-center">{{row.item.count}}</div>
                </template>
                <template #cell(name)="row">
                    <div class="text-center">{{row.item.name}}</div>
                </template>
                <template #cell(total_price)="row">
                    <div class="text-right">
                        {{ row.item.total_price.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")}}
                    </div>
                </template>

                <template #cell(deliveryBtn)="row">
                    <div class="text-center">
                        <b-button size="sm" variant="outline-info" @click="getDeliveryInfo($event, row.item)">
                            <b-icon-card-text></b-icon-card-text>조회
                        </b-button>
                    </div>
                </template>
                <template #cell(status)="row">
                    <div :class="`text-center ${row.item.status ? 'text-danger' : 'text-info'}`" >{{row.item.status ? '취소' : '완료'}}</div>
                </template>

                
                <template #cell(manageBtn)="row">
                    <b-button size="sm" variant="outline-danger" @click="openModal2($event, row.item)"
                        v-show="row.item.status == 0">
                        <b-icon-trash2-fill></b-icon-trash2-fill>취소
                    </b-button>
                </template>
            </b-table>
        </b-col>
    </b-row>


    <b-modal v-model="modal1" hide-footer title="배송 정보">
        <b-card>
            <b-row>
                <b-col>
                    <strong>주문자 정보</strong>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-row class="p-1">
                        <b-col sm="4"><label style="font-size: 10pt;">이름</label></b-col>
                        <b-col sm="8">
                            <b-form-input :value="user.name" disabled size="sm"></b-form-input>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-row class="p-1">
                        <b-col sm="4"><label style="font-size: 10pt;">연락처</label></b-col>
                        <b-col sm="8">
                            <b-form-input :value="user.phone" disabled size="sm"></b-form-input>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-card>
        <b-card class="mt-3">

            <b-row>
                <b-col>
                    <strong>배송지 정보</strong>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-row class="p-1">
                        <b-col sm="4"><label style="font-size: 10pt;">이름</label></b-col>
                        <b-col sm="8">
                            <b-form-input :value="delivery.recipient" disabled size="sm"></b-form-input>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-row class="p-1">
                        <b-col sm="4"><label style="font-size: 10pt;">우편번호</label></b-col>
                        <b-col sm="8">
                            <b-form-input :value="delivery.recipient_zip" disabled size="sm"></b-form-input>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-row class="p-1">
                        <b-col sm="4"><label style="font-size: 10pt;">주소</label></b-col>
                        <b-col sm="8">
                            <b-form-input :value="delivery.recipient_address" disabled size="sm"></b-form-input>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-row class="p-1">
                        <b-col sm="4"><label style="font-size: 10pt;">상세주소</label></b-col>
                        <b-col sm="8">
                            <b-form-input :value="delivery.recipient_address_detail" disabled size="sm"></b-form-input>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-row class="p-1">
                        <b-col sm="4"><label style="font-size: 10pt;">연락처</label></b-col>
                        <b-col sm="8">
                            <b-form-input :value="delivery.recipient_phone" disabled size="sm"></b-form-input>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-row class="p-1">
                        <b-col sm="4"><label style="font-size: 10pt;">배송 요청사항</label></b-col>
                        <b-col sm="8">
                            <b-form-input :value="delivery.recipient_request" disabled size="sm"></b-form-input>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-card>
        <b-row class="mt-1">
            <b-col>
                <b-button variant="outline-danger" @click="modal1 = false" size="sm">Close</b-button>
            </b-col>
        </b-row>
    </b-modal>


    <b-modal v-model="modal2" hide-footer title="결제 내역 취소">
        <b-card>
            <b-card-body>
                <p>취소된 결제 내역은 복구가 불가능합니다.</p>
                <p>취소시 유의해 주세요.</p>
                <b-card-text>
                    <h6>상품명: {{cancel_item.title}}</h6>
                </b-card-text>
            </b-card-body>
            <b-card-footer>
                <b-button variant="outline-primary" @click="modal2 = false" size="sm">팝업 닫기</b-button>
                <b-button variant="outline-danger" @click="cancelOrder" size="sm">취소하기</b-button>
            </b-card-footer>
        </b-card>
    </b-modal>
</section>
</template>

<script>
export default {
    name: 'shop_order',
    data: function () {
        return {
            api_url: ``,
            event_id: null,
            menu_id: null,

            user: {
                // 주문자 정보
                name: "",
                phone: ""
            },

            delivery: {
            // 배송지 정보
                "recipient": "",
                "recipient_zip": "",
                "recipient_address": "",
                "recipient_address_detail": "",
                "recipient_phone": "",
                "recipient_request": ""
            },

            modal1: false,
            modal2: false,

            cancel_item: {},


            company_id: null,
            company_name: null,

            start_date: '',
            end_date: '',
            search_key: '',


            selected: null,
			options: [
				{ value: null, text: '전체' },
				{ value: 'buyer', text: '바이어' },
				{ value: 'seller', text: '셀러' }
			],
             
            
            fields: [{
                    key: 'id',
                    label: 'No.'
                },
                {
                    key: 'created_at',
                    label: '구매일자'
                },
                {
                    key: 'grade',
                    label: '회원구분'
                },

                {
                    key: 'title',
                    label: '상품명'
                },
                {
                    key: 'count',
                    label: '구매수량'
                },
                {
                    key: 'name',
                    label: '구매자'
                },
                {
                    key: 'total_price',
                    label: '구매금액'
                },
                {
                    key: 'deliveryBtn',
                    label: '배송정보'
                },
                {
                    key: 'status',
                    label: '결제상태' //  0 완료 / 1취소
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
            console.log('this event_id : %s, menu_id : %s', this.event_id, this.menu_id);
            let url = `${this.api_url}/order?menu_id=${this.menu_id}`;
            console.log(url);
            if (this.search_key) {
                url += `&search_key=${this.search_key}`;
            }
            if (this.start_date) {
                url += `&start_date=${this.start_date}`;
            }
            if (this.end_date) {
                url += `&end_date=${this.end_date}`;
            }

            console.log(this.start_date);

            let response = await axios.get(url)
                                .catch(error=> {
                                    this.$showMsgBoxTwo(error.response.status, '', error.response.statusText);
                                });

            
            let rs = response.data.result;
            this.items = rs;
        },
        openModal2: function (event, item) {
            console.log(item);
            this.cancel_item = item;
            this.modal2 = true;
        },
        cancelOrder: async function () {
            let rs = await axios.post(`${this.api_url}/order/${this.cancel_item.id}/cancel`);
            if (rs.data.code == 200) {
                this.$showMsgBoxTwo(rs.status);
            } else {
                this.$showMsgBoxTwo(rs.data.code, '', rs.data.result);
            }
            this.getList();
            this.modal2 = false;
        },
        goShopProductList: function () {
            this.$router.push({ name: 'shop_product', query: {menu_id : this.menu_id}});
        },
        getDeliveryInfo: function (event, item) {
            this.user = item.user;
            this.delivery = {
                "recipient": item.recipient,
                "recipient_zip": item.recipient_zip,
                "recipient_address": item.recipient_address,
                "recipient_address_detail": item.recipient_address_detail,
                "recipient_phone": item.recipient_phone,
                "recipient_request": item.recipient_request
            }
            this.modal1 = true;
        },
        excelDownload: async function () {
            let url = `${this.api_url}/order/excel?menu_id=${this.menu_id}`;

            if (this.search_key) {
                url += `&search_key=${this.search_key}`;
            }
            if (this.start_date) {
                url += `&start_date=${this.start_date}`;
            }
            if (this.end_date) {
                url += `&end_date=${this.end_date}`;
            }

            window.location.href = url;
        }
    }
}
</script>
