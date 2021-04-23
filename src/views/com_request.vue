<template>
<section>
<!-- 
    <b-row class="mb-1">
        <b-col>
            <h6><strong>3.기업관리 > 기업 신청 승인</strong></h6>
        </b-col>
    </b-row>
     -->
    <b-row>
        <b-col cols="8">
            <b-input-group size="sm" align-v="baseline">
                <b-form-select v-model="selected" :options="options" size="sm" style="max-width: 150px;" class="mr-2"></b-form-select>
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

    <b-row class="mt-1">
        <b-col>
            <b-table :fields="fields" :items="items" small bordered head-variant="light" class="mt-1" style="font-size: 9pt; vertical-align: center; line-height:33px;">
                <template #cell(id)="row">
                    <div class="text-center">{{row.item.id}}</div>
                </template>
                <template #cell(attend_type)="row">
                    <div class="text-center">{{row.item.attend_type == 0 ? '바이어' : '셀러'}}</div>
                </template>
                <template #cell(name)="row">
                    <div class="text-center" v-b-tooltip.hover :title="row.item.name ? row.item.name : row.item.name_en" style="white-space: nowrap; text-overflow:ellipsis; overflow: hidden; max-width:100px;">{{row.item.name ? row.item.name : row.item.name_en }}</div>
                </template>
                <template #cell(representation_name)="row">
                    <div class="text-center">{{row.item.representation_name ? row.item.representation_name : row.item.representation_name_en }}</div>
                </template>
                <template #cell(address)="row">
                    <div class="text-center" v-b-tooltip.hover :title="row.item.address" style="white-space: nowrap; text-overflow:ellipsis; overflow: hidden; max-width:230px;">{{row.item.address}}</div>
                </template>
                <template #cell(condition)="row">
                    <div class="text-center" v-b-tooltip.hover :title="row.item.condition" style="white-space: nowrap; text-overflow:ellipsis; overflow: hidden; max-width:50px;">{{row.item.condition}}</div>
                </template>
                <template #cell(sectors)="row">
                    <div class="text-center" v-b-tooltip.hover :title="row.item.sectors" style="white-space: nowrap; text-overflow:ellipsis; overflow: hidden; max-width:50px;">{{row.item.sectors}}</div>
                </template>
                <template #cell(event_type)="row">
                    <div class="text-center">{{row.item.event_type == 0 ? 'Exhibition' : row.item.event_type == 1 ? 'Bizmatching' : 'Exhibition + Bizmatching'}}</div>
                </template>
                <template #cell(created_at)="row">
                    <div class="text-center">
                        {{row.item.created_at.split(' ')[0]}}
                        </div>
                </template>
                <template #cell(manageBtn)="row">
                    <div class="text-center">
                        <b-button size="sm" variant="outline-info" @click="goRegisterForm(row.item, row.index, $event.target)">
                            <b-icon-zoom-in></b-icon-zoom-in> 정보 확인
                        </b-button>
                        <b-button size="sm" variant="outline-success" @click="requestAccept(row.item, row.index, $event.target)">
                            <b-icon-check2-square></b-icon-check2-square> 승인
                        </b-button>
                        <b-button size="sm" variant="outline-danger" @click="requestDelete(row.item, row.index, $event.target)">
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
    name: "comRequest",
    data: function () {
        return {
            event_id: 0,
            api_url: '',
            selected: null,
            options: [{
                    value: null,
                    text: '전체'
                },
                {
                    value: 'buyer',
                    text: '바이어'
                },
                {
                    value: 'seller',
                    text: '셀러'
                }
            ],
            fields: [{
                    key: 'id',
                    label: '번호'
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
                    key: 'address',
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
                    key: 'created_at',
                    label: '등록 요청일'
                },
                {
                    key: 'manageBtn',
                    label: '관리항목'
                },
            ],
            items: []

        };
    },
    mounted: function () {
        this.$nextTick(function () {
            this.api_url = this.$store.getters.api_url;
            this.event_id = this.$store.getters.event_id;
            this.getList();
        });
    },
    methods: {
        getList: async function () {
            let rs = await axios.get(`${this.api_url}/company?event_id=${this.event_id}&status=0`); // 미승인 리스트만 가져오기
            this.items = rs.data.result;
        },
        goRegisterForm: function (item) {
            this.$router.push({
                name: 'company_regist',
                query: {
                    company_id: item.id,
                    company_name: item.name
                }
            });
        },
        requestInfo(item, index, target) {
            console.log(item, index, target);
        },
        requestAccept: async function(item, index, target) {

            if (confirm('승인 하시겠습니까?')) {
                let url = `${this.api_url}/company/${item.id}`;
                let formData = new FormData();
                    formData.append('status', 1);

                try {
                    let rs = await axios.post(url, formData, {
                        Headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    this.getList();
                    this.$showMsgBoxTwo(rs.status, '', '승인이 완료되었습니다. <br> 기업 목록에서 확인하세요.');
                } catch (error) {
                    this.$showMsgBoxTwo(error.response.status, '', error.response.statusText);
                }
            }
            //
            console.log(item, index, target);
        },
        requestDelete: async function(item, index, target) {
            if (confirm("삭제 하시겠습니까?")) {
                let url = `${this.api_url}/company/${item.id}`;
                let rs = await axios.delete(url);
                this.getList();
                this.$showMsgBoxTwo(rs.status);
            }
            
        },
        excelDownload: function () {
            window.location.href = `${this.api_url}/company/excel?event_id=${this.event_id}&status=0`;

        }
    },
};
</script>
