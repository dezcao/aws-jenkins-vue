<template>
    <div>
      <b-row class="text-right">
        <b-col>
          <b-button size="sm" @click="excelDownload"> 엑셀 다운로드 </b-button>
        </b-col>
      </b-row>
      <b-table :fields="attend_fields" :items="attend_items" small bordered head-variant="light" class="mt-1 vm_modal4_table">
        <template #cell(id)="row">
          <div class="text-center">{{row.item.id}}</div>
        </template>
        <template #cell(name)="row">
          <div class="text-center">{{row.item.user.name}}</div>
        </template>
        <template #cell(time_login)="row">
          <div class="text-center">{{row.item.time_login}}</div>
        </template>
        <template #cell(time_logout)="row">
          <div class="text-center">{{row.item.time_logout}}</div>
        </template>
      </b-table>
    </div>
</template>

<script>
  export default {
    name: "vm_attendee_modal",
    props: ['params'],
    data: function () {
      return {
        event_id: 0,
        api_url: '',
        conference_item: this.params.conference_item,
        attend_items: [],
        attend_fields: [{
            key: "id",
            label: "아이디"
          },
          {
            key: "name",
            label: "이름"
          },
          {
            key: "time_login",
            label: "로그인 시간"
          },
          {
            key: "time_logout",
            label: "로그아웃 시간"
          },
        ]
      }
    },
    created: function () {
      this.event_id = this.$store.getters.event_id;
      this.api_url = this.$store.getters.api_url;
      this.getList();
    },
    methods: {
      getList: async function () {
        let rs = await axios.get(`${this.api_url}/conference_log?conference_id=${this.conference_item.id}`);
        this.attend_items = rs.data.result;
      },
      excelDownload: function () {
        window.location.href = `${this.api_url}/conference_log/excel?conference_id=${this.conference_item.id}`;
      }
    }
  };
</script>
