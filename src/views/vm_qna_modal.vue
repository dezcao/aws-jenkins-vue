<template>
  <div>
    <b-row class="text-right">
      <b-col>
        <b-button size="sm" @click="excelDownload"> 엑셀 다운로드 </b-button>
      </b-col>
    </b-row>
    <b-table :fields="qna_fields" :items="qna_items" small bordered head-variant="light" class="mt-1 vm_modal4_table">
      <template #cell(id)="row">
        <div class="text-center">{{row.item.id}}</div>
      </template>
      <template #cell(name)="row">
        <div class="text-center">{{row.item.user.name}}</div>
      </template>
      <template #cell(created_at)="row">
        <div class="text-center">{{row.item.created_at}}</div>
      </template>
      <template #cell(manageBtn)="row">
        <div class="text-center">
          <b-button size="sm" variant="outline-danger" @click="deleteQnA(row.item, $event, row.index)">
            <b-icon-trash2-fill></b-icon-trash2-fill>삭제
          </b-button>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
  export default {
    name: "vm_qna_modal",
    props: ['params'],
    data: function () {
      return {
        event_id: 0,
        api_url: '',
        conference_item: this.params.conference_item,
        qna_items: [],
        qna_fields: [{
            key: "id",
            label: "아이디"
          },
          {
            key: "contents",
            label: "내용"
          },
          {
            key: "name",
            label: "작성자"
          },
          {
            key: "created_at",
            label: "작성일"
          },
          {
            key: "manageBtn",
            label: "관리"
          },
        ]
      };
    },
    created: function () {
      this.event_id = this.$store.getters.event_id;
      this.api_url = this.$store.getters.api_url;
      this.getList();
    },
    methods: {
      getList: async function () {
        let rs = await axios.get(`${this.api_url}/conference_qna?conference_id=${this.conference_item.id}`);
        this.qna_items = rs.data.result;
      },
      excelDownload: function () {
        window.location.href = `${this.api_url}/conference_qna/excel?conference_id=${this.conference_item.id}`;
      },
      deleteQnA: async function (item) {
        let url = `${this.api_url}/conference_qna/${item.id}`;
        if (confirm("삭제 하시겠습니까?")) {
          let rs = await axios.delete(url);
          this.$showMsgBoxTwo(rs.status);
          this.getList();
        }
      }
    }
  };
</script>
