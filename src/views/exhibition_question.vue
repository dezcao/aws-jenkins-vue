<template>
<section>
    <b-row class="mb-1">
        <b-col>
            <h6><strong>2.메뉴 및 컨텐츠 관리 > 컨텐츠 (관리) > {{company_name}} 문의 내역</strong></h6>
            <b-button class="mt-2" href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
                <b-icon-arrow-left></b-icon-arrow-left> 이전으로
            </b-button>
        </b-col>
    </b-row>
    <b-row class="mt-3">
        <b-col>
        <span>문의내역 </span>
        <b-button href="#" variant="primary" size="sm" @click="excelDownload" class="ml-1">
            <b-icon-download></b-icon-download> 엑셀 다운로드
        </b-button>

        <b-table :fields="fields" :items="items" small bordered head-variant="light" class="mt-1">
             <template #cell(index)="data">
                 <div class="text-center">
                    {{ data.index + 1 }}
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
            <template #cell(contents)="row">
                <div class="text-center">
                    {{row.item.contents}}
                    <!-- <b-button size="sm" variant="outline-info" @click="containModalOpen(row.item, $event, row.index)">
                        <b-icon-pencil-square></b-icon-pencil-square> 내용 확인
                    </b-button> -->
                </div>
            </template>
            <template #cell(manageBtn)="row">
                <div class="text-center">
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
                    <b-button size="sm" variant="info" @click="question_modal = !question_modal" class="inoBtn-150">확인</b-button>
                    
                </b-col>
            </b-row>
        </b-modal>
            
        </b-col>
    </b-row>
</section>
</template>

<script>
export default {
    name: 'exhibition_question',
    data: function () {
        return {
            api_url: ``,
            event_id: null,
            menu_id: null,
            company_id: null,
            company_name: null,
            exhibition_id: 0,
            
            fields: [{
                    key: 'index',
                    label: 'NO'
                },
                {
                    key: 'name',
                    label: '이름/이메일'
                },
                {
                    key: 'phone',
                    label: '연락처'
                },
                {
                    key: 'title',
                    label: '제목'
                },
                {
                    key: 'contents',
                    label: '문의내용'
                },
                {
                    key: "manageBtn",
                    label: "관리항목",
                }
            ],
            items: [],
            question_modal: false,
            selected_item: Object,
            thumb_prev: '',
            thumb_prev_default: `https://via.placeholder.com/180x180`,
            movie_file_src: '',
            isNew: true
        }
    },
    mounted: function () {
        this.$nextTick(async function () {
            this.api_url = this.$store.getters.api_url;
            this.event_id = this.$store.getters.event_id;
            this.menu_id = this.$route.query.menu_id;
            this.company_id = this.$route.query.company_id;
            this.company_name = this.$route.query.company_name;
            this.exhibition_id = this.$route.query.exhibition_id;
            this.getList();
        })
    },

    methods: {
        getList: async function () {
            let response = await axios.get(`${this.api_url}/question?exhibition_id=${this.exhibition_id}`);
            let rs = response.data.result;
            console.log('exhibition library type 1 data ', response);
            this.items = rs;
        },
        containModalOpen: function (item) {
            this.selected_item = item;
            this.question_modal = true;
        },
        deleteItemFn: async function (item) {
            if (confirm("삭제 하시겠습니까?")) {
                let rs = await axios.delete(`${this.api_url}/question/${item.id}`);
                this.getList();
                this.$showMsgBoxTwo(rs.status);
            }
        },
        excelDownload: function () {
            console.log(this.items);
            function s2ab(s) { 
                var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
                var view = new Uint8Array(buf);  //create uint8array as viewer
                for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
                return buf;    
            }
            var excelHandler = {
                    getExcelFileName : function(){
                        return 'json-test.xlsx';
                    },
                    getSheetName : function(){
                        return 'Json Test Sheet';
                    }
            }
            function exportExcel(jsonArray){ 
                // step 1. workbook 생성
                var wb = XLSX.utils.book_new();

                // step 2. 시트 만들기 
                var newWorksheet = XLSX.utils.json_to_sheet(jsonArray);
                
                // step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.  
                XLSX.utils.book_append_sheet(wb, newWorksheet, excelHandler.getSheetName());

                // step 4. 엑셀 파일 만들기 
                var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});

                // step 5. 엑셀 파일 내보내기 
                saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), `${Date.now()}.xlsx`);
            }
            console.log("Got you!");
            exportExcel(this.items);

        }
        
    }
}
</script>
