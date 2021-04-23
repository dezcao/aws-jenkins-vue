<template>
<section>
<!--     
    <b-row class="mb-1">
        <b-col>
            <h6><strong>3.기업관리 > 기업목록</strong></h6>
        </b-col>
    </b-row> -->

    <b-row class="mt-1">
        <b-col>
        <b-row>
            
            <b-col cols="8">
				<b-input-group size="sm" align-v="baseline">
                    <b-form-select v-model="selected" :options="options" size="sm" style="max-width: 150px;" class="mr-2"></b-form-select>
                    <b-link to="/company/regist">
                        <b-button size="sm" variant="primary"><b-icon-plus></b-icon-plus>기업추가하기</b-button>
                    </b-link>
					<b-form-input aria-placeholder="검색어를 입력하세요." style="max-width: 300px;" class="ml-2"></b-form-input>
					<b-input-group-append>
						<b-button variant="info" size="sm">검색하기</b-button>
					</b-input-group-append>
				</b-input-group>
            </b-col>
            <b-col cols="4" class="text-right">
                <b-button href="#" variant="primary" size="sm" @click="excelDownload">
                    <b-icon-download></b-icon-download> 엑셀 다운로드
                </b-button>
			</b-col>
        </b-row>
        

        <b-table :fields="fields" :items="items" small bordered head-variant="light" class="mt-1" style="font-size: 9pt; vertical-align: center; line-height:33px;">
            <template #cell(id)="row">
                <div class="text-center">{{row.item.id}}</div>
            </template>
            <template #cell(attend_type)="row">
                <div class="text-center">{{row.item.attend_type == 0 ? '바이어' : '셀러'}}</div>
            </template>
            <template #cell(name)="row">
                <div class="text-center">{{row.item.name ? row.item.name : row.item.name_en}}</div>
            </template>
            <template #cell(representation_name)="row">
                <div class="text-center">{{row.item.representation_name ? row.item.representation_name : row.item.representation_name_en}}</div>
            </template>
            <template #cell(address)="row">
                <div class="text-center">{{row.item.address}}</div>
            </template>
            <template #cell(condition)="row">
                <div class="text-center">{{row.item.condition}}</div>
            </template>
            <template #cell(sectors)="row">
                <div class="text-center">{{row.item.sectors}}</div>
            </template>
            <template #cell(event_type)="row">
                <div class="text-center">{{row.item.event_type == 0 ? 'Exhibition' : row.item.event_type == 1 ? 'Bizmatching' : 'Exhibition + Bizmatching'}}</div>
            </template>
            <template #cell(created_at)="row">
                <div class="text-center">
                    {{row.item.created_at.split(' ')[0]}}
                    </div>
            </template>
            <template #cell(user_count)="row">
                <div class="text-center">
                    <b-button size="sm" variant="outline-info" @click="goAdminList(row.item, $event, row.index)">
                        <b-icon-person></b-icon-person>{{row.item.user_count}}
                    </b-button>
                </div>
            </template>
            <template #cell(manageBtn)="row">
                <div class="text-center">
                    <b-button size="sm" variant="outline-success" @click="goRegisterForm(row.item, $event, row.index)">
                        <b-icon-pencil-square></b-icon-pencil-square> 수정
                    </b-button>
                    <b-button size="sm" variant="outline-danger" @click="deleteItemFn(row.item, $event, row.index)">
                        <b-icon-trash2-fill></b-icon-trash2-fill> 삭제
                    </b-button>
                </div>
            </template>
        </b-table>

        <b-modal v-model="question_modal" hide-footer title="문의내역">
            <b-row class="p-1">
                <b-col sm="4"><label style="font-size: 10pt;">이름 / 이메일</label></b-col>
                <b-col sm="8">
                        <span>{{selected_item.name}} / {{selected_item.phone}}</span>
                </b-col>
            </b-row>
            <b-row class="p-1">
                <b-col sm="4"><label style="font-size: 10pt;">제목</label></b-col>
                <b-col sm="8">
                    <b-card>
                        {{selected_item.title}}
                    </b-card>
                    
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-card>
                        {{selected_item.contents}}
                    </b-card>
                    
                </b-col>
            </b-row>
            <b-row class="mt-3">
                <b-col>
                    <b-button size="sm" variant="outline-primary" @click="question_modal = !question_modal">확인</b-button>
                    
                </b-col>
            </b-row>
        </b-modal>
            
        </b-col>
    </b-row>
</section>
</template>

<script>
export default {
    name: 'company_list',
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
                    key: 'attend_type',
                    label: '기업구분'
                },
                {
                    key: 'name',
                    label: '기업명'
                },
                {
                    key: 'representation_name',
                    label: '대표자'
                },
                {
                    key: 'email',
                    label: 'e-mail'
                },
                {
                    key: 'representation_phone',
                    label: '대표번호'
                },
                {
                    key: 'local_type',
                    label: '지역'
                },
                {
                    key: 'homepage',
                    label: '홈페이지'
                },
                {
                    key: 'condition',
                    label: '업태'
                },
                {
                    key: 'sectors',
                    label: '업종'
                },
                {
                    key: 'event_type',
                    label: '행사 참여구분'
                },
                {
                    key: 'created_at',
                    label: '생성일'
                },
                {
                    key: 'user_count',
                    label: '관리계정'
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
            this.getList();
        })
    },

    methods: {
        getList: async function () {
            let response = await axios.get(`${this.api_url}/company?event_id=${this.event_id}`);
            console.log(this.event_id);
            let rs = response.data.result;
            console.log('company list data ', response);
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
                
                let rs = await axios.delete(`${this.api_url}/company/${item.id}`);
                this.getList();
                this.$showMsgBoxTwo(rs.status);
            }
        },
        excelDownload: function () {

            window.location.href = `${this.api_url}/company/excel?event_id=${this.event_id}&status=1`;
            
        }
    }
}
</script>
