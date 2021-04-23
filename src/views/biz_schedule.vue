<template>
<section>
<!--     
    <b-row>
        <b-col>
            <h6><strong>6.Bizmatching > 일정관리</strong></h6>
        </b-col>
    </b-row> -->

    <b-row class="mt-1">
        <b-col>
            <b-input-group size="sm" align-v="baseline">
                <b-button size="sm" variant="primary" @click="openModal1">
                    <b-icon-plus></b-icon-plus>일정 추가
                </b-button>
            </b-input-group>
        </b-col>
    </b-row>

    <b-row class="mt-1">
        <b-col>
            <b-table :fields="fields" :items="items" small bordered head-variant="light">
                <template #cell(id)="row">
                    <div class="text-center">{{row.item.id}}</div>
                </template>
                <template #cell(date)="row">
                    <div class="text-center">{{row.item.date}}</div>
                </template>
                <template #cell(start_time)="row">
                    <div class="text-center">{{row.item.start_time}}</div>
                </template>
                <template #cell(end_time)="row">
                    <div class="text-center">{{row.item.end_time}}</div>
                </template>
                <template #cell(interval)="row">
                    <div class="text-center">{{row.item.interval}}</div>
                </template>
                <template #cell(manageBtn)="row">
                    <div class="text-center">
                        <b-button size="sm" variant="outline-info" @click="openModal2($event, row.item, row.index)">
                            <b-icon-mic-mute></b-icon-mic-mute> 휴계관리
                        </b-button>
                        <b-button size="sm" variant="outline-success" @click="openModal1($event, row.item)">
                            <b-icon-pencil-square></b-icon-pencil-square> 수정
                        </b-button>
                        <b-button size="sm" variant="outline-danger" @click="deleteData($event, row.item)">
                            <b-icon-trash2-fill></b-icon-trash2-fill> 삭제
                        </b-button>
                    </div>
                </template>
            </b-table>
        </b-col>
    </b-row>
    
    <b-modal v-model="modal1" hide-footer title="일정관리">
        <b-card no-body class="p-2" :border-variant="modal1_border">
            <b-form-group 
                label="일정" label-for="input-form1"
                label-cols-sm="4" label-cols-lg="3" content-cols-sm content-cols-lg="9">
                    <b-input-group>
                        <b-form-input
                            v-model="form.date"
                            type="text" size="sm" disabled
                        ></b-form-input>
                        <b-input-group-append>
                            <b-form-datepicker
                            button-only
                            right
                            locale="kr"
                            size="sm"
                            v-model="form.date"
                            
                            ></b-form-datepicker>
                        </b-input-group-append>
                    </b-input-group>
            </b-form-group>
            <b-form-group 
                label="시작시간"
                label-cols-sm="4" label-cols-lg="3" content-cols-sm content-cols-lg="9">
                <b-input-group>
                    <b-form-input
                        v-model="form.start_time"
                        type="text"
                        placeholder="HH:mm"
                        size="sm"
                    ></b-form-input>
                    <b-input-group-append>
                        <b-form-timepicker v-model="form.start_time" size="sm" locale="kr" button-only></b-form-timepicker>
                    </b-input-group-append>
                </b-input-group>
            </b-form-group>
            <b-form-group 
                label="종료시간"
                label-cols-sm="4" label-cols-lg="3" content-cols-sm content-cols-lg="9">
                <b-input-group>
                    <b-form-input
                        v-model="form.end_time"
                        type="text"
                        placeholder="HH:mm"
                        size="sm"
                    ></b-form-input>
                    <b-input-group-append>
                        <b-form-timepicker v-model="form.end_time" size="sm" locale="kr" button-only></b-form-timepicker>
                    </b-input-group-append>
                </b-input-group>
            </b-form-group>
            <b-form-group 
                label="시간간격(분)" label-for="input-form4"
                label-cols-sm="4" label-cols-lg="3" content-cols-sm content-cols-lg="9">
                <b-form-input v-model="form.interval" type="number" id="input-form4" size="sm"></b-form-input>
            </b-form-group>
        </b-card>

        <b-button v-show="!form.id" class="mt-2 inoBtn-150" variant="primary" @click="storeData" size="sm">저장</b-button>
        <b-button v-show="form.id" class="mt-2 inoBtn-150" variant="info" @click="updateData" size="sm">수정</b-button>
    </b-modal>

    <b-modal v-model="modal2" hide-footer title="휴계관리" size="lg">
        <b-table :fields="restFields" :items="restList" small bordered head-variant="light" class="mt-1">
            <template #cell(start)="row">
                <div class="text-center">{{row.item.start}}</div>
            </template>
            <template #cell(end)="row">
                <div class="text-center">{{row.item.end}}</div>
            </template>
            <template #cell(status)="row">
                <div class="text-center">
                    <b-button v-show="row.item.status == 1" style="width:100px;" size="sm" @click="statusChang($event, row.item)">
                        <b-icon-mic></b-icon-mic>비활성
                    </b-button>
                    <b-button v-show="row.item.status == 0" style="width:100px;" size="sm" variant="primary" @click="statusChang($event, row.item)">
                        <b-icon-mic-mute></b-icon-mic-mute>활성
                    </b-button>
                </div>
            </template>
            <template #cell(memo)="row">
                <b-input-group>
                    <b-form-input v-model="row.item.memo" size="sm"></b-form-input>
                    <b-input-group-append>
                        <b-button variant="info" size="sm" @click="saveMemo($event, row.item)">저장</b-button>
                    </b-input-group-append>
                </b-input-group>

                
            </template>
        </b-table>
    </b-modal>
</section>
</template>

<script>
export default {
    name: 'biz_site',
    data: function () {
        return {
            api_url: ``,
            event_id: null,
            modal1: false,
            modal2: false,
            modal1_border: 'primary',
            selected_item_index: 0,
            fields: [{
                    key: 'id',
                    label: '아이디'
                },
                {
                    key: 'date',
                    label: '일정'
                },
                {
                    key: 'start_time',
                    label: '시작시간'
                },
                {
                    key: 'end_time',
                    label: '종료시간'
                },
                {
                    key: 'interval',
                    label: '시분 간격(분)'
                },
                {
                    key: "manageBtn",
                    label: "관리",
                }
            ],
            items: [],

            restFields: [
                {
                    key: 'start',
                    label: '시작시간'
                },
                {
                    key: 'end',
                    label: '종료시간'
                },
                {
                    key: "status",
                    label: "현재상태",
                },
                {
                    key: "memo",
                    label: "메모",
                }
            ],
            
            restList : [],

            form : {
                id: 0,
                date: '',
                start_time: '',
                end_time: '',
                interval: 30
            },
            date: '',
            start_time: '',
            end_time: '',
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
         onContext(ctx) {
            console.log(ctx);
            this.form.plan = ctx.selectedYMD;
            
        },
        getList: async function () {
            let response = await axios.get(`${this.api_url}/schedule?event_id=${this.event_id}`);
            this.items = response.data.result;
            console.log(this.items);
        },
        getRestList: async function () {
            // let response = await axios.get(`${this.api_url}/schedule?event_id=${this.event_id}`);
            // let rs = response.data.result;
            // this.restList = rs;
        },
        openModal1: function (event, item) {
            console.log(event, item);
            if (item) {
                this.modal1_border='success';
                console.log(item, '수정모달');
                this.form = {...item};
                // this.start_time = item.start_time;
                // this.end_time = item.end_time;
                // this.date = item.date;
            } else {
                console.log('no item. 신규 생성모달');
                this.modal1_border='primary';
                this.form = {
                    id: 0,
                    plan: '',
                    start_date: '',
                    end_date: '',
                    interval: 30
                }
                // this.start_time = '';
                // this.end_time = '';
                // this.date = '';
            }
            this.modal1 = true;
        },
        openModal2: async function (event, item, index) {
            // 휴계관리
            this.restList = item.details;
            this.selected_item_index = index;
            this.modal2 = true;
        },
        storeData: async function () {
            let url = `${this.api_url}/schedule`;
            let formData = new FormData();
                formData.append('event_id', this.event_id);
                formData.append('date', this.form.date);
                // 01:00:00
                formData.append('start_time', this.form.start_time.substr(0, 5));
                formData.append('end_time', this.form.end_time.substr(0, 5));
                formData.append('interval', this.form.interval);
            let rs = await axios.post(url, formData, {
                Headers: {
                    'Content-Type': 'application/json'
                }
            });

            this.getList();
            this.$showMsgBoxTwo(rs.status);
            this.modal1 = false;
            return rs.staus;
        },
        
        updateData: async function () {
            console.log(this.form);
            // api 태우고
            // todo
            // 
            

            let url = `${this.api_url}/schedule/${this.form.id}`;
            let formData = new FormData();
                formData.append('date', this.form.date);
                formData.append('start_time', this.form.start_time.substr(0, 5));
                formData.append('end_time', this.form.end_time.substr(0, 5));
                formData.append('interval', this.form.interval);
            try {
                let rs = await axios.post(url, formData, {
                    Headers: {
                        'Content-Type': 'application/json'
                    }
                })
                
                if (rs.data.code == 412) {
                    this.$showMsgBoxTwo(rs.data.code, '', '변경 하시려는 일정에 비즈니스 매칭이 신청되어 있어 변경이 불가합니다.');
                } else {
                    this.$showMsgBoxTwo(rs.status);
                }
                this.modal1 = false;
                this.getList();

            } catch (error) {
                this.$showMsgBoxTwo(error.response.status, '', error.response.statusText);
            }
            
            
            // 변경 하시려는 일정에 비즈니스 매칭이 신청되어 있어 변경이 불가합니다.
        },
        deleteData: async function (event, item) {
            console.log(item);

            let msg = item.is_use ? `해당 일정에 비즈니스매칭이 신청되어있습니다. 삭제 하시겠습니까?` 
                : `삭제 하시겠습니까?`;

            if (confirm(msg)) {
                try {
                    let rs = await axios.delete(`${this.api_url}/schedule/${item.id}`);
                    this.getList();
                    this.$showMsgBoxTwo(rs.status);
                } catch (error) {
                    this.$showMsgBoxTwo(error.response.status, '', error.response.statusText);
                }
            }
            
        },
        statusChang: async function (event, item) {
            console.log(item);
            let url = `${this.api_url}/schedule/detail/${item.id}`;
            let formData = new FormData();
                formData.append('status', item.status == 0 ? 1 : 0);

            try {
                let rs = await axios.post(url, formData, {
                    Headers: {
                        'Content-Type': 'application/json'
                    }
                });
                await this.getList();
                this.restList = this.items[this.selected_item_index].details;
                console.log('rs.data.code : ', rs.data.code);
                if (rs.data.code == 412) {
                    this.$showMsgBoxTwo(rs.data.code, '', '변경 하시려는 일정에 비즈니스 매칭이 신청되어 있어 변경이 불가합니다.');
                } else {
                    this.$showMsgBoxTwo(rs.status);
                }
                
            } catch (error) {
                this.$showMsgBoxTwo(error.response.status, '', error.response.statusText);
            }
            
        },
        saveMemo: async function (event, item) {
            let url = `${this.api_url}/schedule/detail/${item.id}`;
            let formData = new FormData();
                formData.append('memo', item.memo);

            try {
                let rs = await axios.post(url, formData, {
                    Headers: {
                        'Content-Type': 'application/json'
                    }
                });
                await this.getList();
                this.restList = this.items[this.selected_item_index].details;
                this.$showMsgBoxTwo(rs.status);
                
            } catch (error) {
                this.$showMsgBoxTwo(error.response.status, '', error.response.statusText);
            }
        },
    }
}
</script>
