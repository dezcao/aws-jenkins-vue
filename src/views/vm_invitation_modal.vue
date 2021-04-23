<template>
    <b-card no-body>
      <b-tabs v-model="invitaion_tabIndex" small card>
        <b-tab title="Moderator/Presenter">
          발표자를 이메일로 초대합니다.
          <b-row>
            <b-col cols="3">
              <b-img class="ml-4" src="./static/images/img_url.png" alt=""></b-img>
            </b-col>
            <b-col cols="9">
              <p class="m-0">Join URL</p>
              <p class="m-0 text-primary">
                <span>{{conference_item ? conference_item.link : ''}}</span>
                <input type="hidden" ref="email2" :value="conference_item ? conference_item.link : ''">
                <b-button size="sm" variant="outline-info" @click.stop.prevent="exeCopy($event, 'email2')">
                  <b-icon-clipboard-plus></b-icon-clipboard-plus>
                </b-button>
              </p>
            </b-col>
          </b-row>
          <b-row class="p-1" style="height: 42px;">
            <b-col cols="auto" class="mr-auto">
              <b-button v-show="invitaion_tabIndex != 1" variant="outline-success" @click="openOverlayModal" size="sm">
                신규 계정 생성</b-button>
              <b-button href="#" variant="outline-success" size="sm" @click="excelUpload">
                <b-icon-upload></b-icon-upload> 엑셀 업로드
              </b-button>

              <b-button href="#" variant="outline-info" size="sm" @click="excelDownload">
                <b-icon-download></b-icon-download> 엑셀 템플릿 다운로드
              </b-button>
              <b-button size="sm" variant="primary" @click="sendEmail">
                <b-icon-envelope></b-icon-envelope> 초대메일 전송
              </b-button>
            </b-col>
            <b-col cols="auto">
              <div align="right">
                <b-pagination v-model="operator_pagination.current_page" :total-rows="operator_pagination.total_count"
                  :per-page="operator_pagination.limit" size="sm" @change="paginationFn($event, 'Operate')">
                </b-pagination>
              </div>
            </b-col>
          </b-row>
          <b-row class="p-1">
            <b-col>
              <b-table :fields="moderator_fields" :items="moderator_items" selectable select-mode="multi"
                @row-selected="onModeratorSelected" ref="ModeraterSelectableTable" small bordered head-variant="light">

                <template #head(selected)="scope">
                  <div class="text-center">
                    <b-form-checkbox v-model="moderator_all" :indeterminate="moderator_indeterminate"
                      @change="toggleAllModerator($event)"> {{ scope.label }}
                    </b-form-checkbox>
                  </div>
                </template>

                <template #cell(selected)="row">
                  <template v-if="row.rowSelected">
                    <div class="text-center">
                      <b-form-checkbox v-model="row.rowSelected"
                        @change="checked(row.index, row.rowSelected, 'ModeraterSelectableTable')">
                        {{row.index}}</b-form-checkbox>
                    </div>
                  </template>
                  <template v-else>
                    <div class="text-center">
                      <b-form-checkbox v-model="row.rowSelected"
                        @change="checked(row.index, row.rowSelected, 'ModeraterSelectableTable')">
                        {{row.index}}</b-form-checkbox>
                    </div>
                  </template>
                </template>
              </b-table>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Attendee">
          참석자를 이메일로 초대합니다.
          <b-row>
            <b-col cols="3">
              <b-img class="ml-4" src="./static/images/img_url.png" alt=""></b-img>
            </b-col>
            <b-col cols="9">
              <p class="m-0">Join URL</p>
              <p class="m-0 text-primary">
                <span>{{conference_item ? conference_item.link : ''}}</span>
                <input type="hidden" ref="email3" :value="conference_item ? conference_item.link : ''">
                <b-button size="sm" variant="outline-info" @click.stop.prevent="exeCopy($event, 'email3')">
                  <b-icon-clipboard-plus></b-icon-clipboard-plus>
                </b-button>
              </p>
            </b-col>
          </b-row>
          <b-row class="p-1" style="height: 42px;">
            <b-col cols="auto" class="mr-auto">
              <b-button v-show="invitaion_tabIndex != 1" variant="outline-success" @click="openOverlayModal" size="sm">
                신규 계정 생성</b-button>
              <b-button href="#" variant="outline-success" size="sm" @click="excelUpload">
                <b-icon-upload></b-icon-upload> 엑셀 업로드
              </b-button>

              <b-button href="#" variant="outline-info" size="sm" @click="excelDownload">
                <b-icon-download></b-icon-download> 엑셀 템플릿 다운로드
              </b-button>
              <b-button size="sm" variant="primary" @click="sendEmail">
                <b-icon-envelope></b-icon-envelope> 초대메일 전송
              </b-button>
            </b-col>
            <b-col cols="auto">
              <div align="right">
                <b-pagination v-model="operator_pagination.current_page" :total-rows="operator_pagination.total_count"
                  :per-page="operator_pagination.limit" size="sm" @change="paginationFn($event, 'Operate')">
                </b-pagination>
              </div>
            </b-col>
          </b-row>
          <b-row class="p-1">
            <b-col>
              <b-table :fields="attendee_fields" :items="attendee_items" selectable select-mode="multi"
                @row-selected="onAttendeeSelected" ref="AttendeeSelectableTable" small bordered head-variant="light">

                <template #head(selected)="scope">
                  <div class="text-center">
                    <b-form-checkbox v-model="attendee_all" :indeterminate="attendee_indeterminate"
                      @change="toggleAllAttendee($event)"> {{ scope.label }}</b-form-checkbox>
                  </div>
                </template>

                <template #cell(selected)="row">
                  <template v-if="row.rowSelected">
                    <div class="text-center">
                      <b-form-checkbox v-model="row.rowSelected"
                        @change="checked(row.index, row.rowSelected, 'AttendeeSelectableTable')">
                        {{row.index}}</b-form-checkbox>
                    </div>
                  </template>
                  <template v-else>
                    <div class="text-center">
                      <b-form-checkbox v-model="row.rowSelected"
                        @change="checked(row.index, row.rowSelected, 'AttendeeSelectableTable')">
                        {{row.index}}</b-form-checkbox>
                    </div>
                  </template>
                </template>
              </b-table>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Operator">
          좌장을 이메일로 초대합니다.
          <b-row>
            <b-col cols="3">
              <b-img class="ml-4" src="./static/images/img_url.png" alt=""></b-img>
            </b-col>
            <b-col cols="9">
              <p class="m-0">Join URL</p>
              <p class="m-0 text-primary">
                <span>{{conference_item ? conference_item.link : ''}}</span>
                <input type="hidden" ref="email1" :value="conference_item ? conference_item.link : ''">
                <b-button size="sm" variant="outline-info" @click.stop.prevent="exeCopy($event, 'email1')">
                  <b-icon-clipboard-plus></b-icon-clipboard-plus>
                </b-button>
              </p>
            </b-col>
          </b-row>
          <b-row class="p-1" style="height: 42px;">
            <b-col cols="auto" class="mr-auto">
              <b-button v-show="invitaion_tabIndex != 1" variant="outline-success" @click="openOverlayModal" size="sm">
                신규 계정 생성</b-button>
              <b-button href="#" variant="outline-success" size="sm" @click="excelUpload">
                <b-icon-upload></b-icon-upload> 엑셀 업로드
              </b-button>

              <b-button href="#" variant="outline-info" size="sm" @click="excelDownload">
                <b-icon-download></b-icon-download> 엑셀 템플릿 다운로드
              </b-button>
              <b-button size="sm" variant="primary" @click="sendEmail">
                <b-icon-envelope></b-icon-envelope> 초대메일 전송
              </b-button>
            </b-col>
            <b-col cols="auto">
              <div align="right">
                <b-pagination v-model="operator_pagination.current_page" :total-rows="operator_pagination.total_count"
                  :per-page="operator_pagination.limit" size="sm" @change="paginationFn($event, 'Operate')">
                </b-pagination>
              </div>
            </b-col>
          </b-row>
          <b-row class="p-1">
            <b-col>
              <b-table :fields="operator_fields" :items="operator_items" selectable select-mode="multi"
                @row-selected="onRowSelected" ref="selectableTable" small bordered head-variant="light">

                <template #head(selected)="scope">
                  <div class="text-center">
                    <b-form-checkbox v-model="operator_all" :indeterminate="operator_indeterminate"
                      @change="toggleAll($event)">
                      {{ scope.label }}</b-form-checkbox>
                  </div>
                </template>

                <template #cell(selected)="row">
                  <template v-if="row.rowSelected">
                    <div class="text-center">
                      <b-form-checkbox v-model="row.rowSelected"
                        @change="checked(row.index, row.rowSelected, 'selectableTable')">
                        {{row.index}}</b-form-checkbox>
                    </div>
                  </template>
                  <template v-else>
                    <div class="text-center">
                      <b-form-checkbox v-model="row.rowSelected"
                        @change="checked(row.index, row.rowSelected, 'selectableTable')">
                        {{row.index}}</b-form-checkbox>
                    </div>
                  </template>
                </template>
              </b-table>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>

      <b-modal v-model="overlayModal" title="신규 계정 생성" hide-footer>
        <b-form-group label-cols-sm="4" label-cols-lg="4" content-cols-sm content-cols-lg="8" label="이름">
          <b-form-input size="sm" v-model="userForm.name" :state="user_validation.valid1"></b-form-input>
        </b-form-group>
        <b-form-group label-cols-sm="4" label-cols-lg="4" content-cols-sm content-cols-lg="8" label="이메일">
          <b-form-input size="sm" v-model="userForm.email" :state="user_validation.valid2"></b-form-input>
        </b-form-group>
        <b-form-group label-cols-sm="4" label-cols-lg="4" content-cols-sm content-cols-lg="8" label="비밀번호">
          <b-form-input size="sm" type="password" v-model="userForm.password" :state="user_validation.valid3">
          </b-form-input>
        </b-form-group>
        <b-form-group label-cols-sm="4" label-cols-lg="4" content-cols-sm content-cols-lg="8" label="비밀번호 확인">
          <b-form-input size="sm" type="password" v-model="password_confirm" :state="user_validation.valid3">
          </b-form-input>
        </b-form-group>
        <b-button size="sm" class="inoBtn-150" variant="success" @click="storeUser">생성</b-button>
      </b-modal>
    </b-card>
  
</template>

<script>
  export default {
    name: "vm_invitation_modal",
    props: ['params'],
    data: function () {
      return {
        event_id: 0,
        api_url: '',
        invitaion_tabIndex: this.params.invitaion_tabIndex,
        conference_item: this.params.conference_item,

        // 신규유저 추가할 경우.
        overlayModal: false,
        userForm: {},
        password_confirm: "",

        operator_items: [{
            id: 1,
            name: "hello name",
            email: "hello@inowing.com",
            part: "개발팀",
            grade: "과장",
            created_at: "2020-04-16",
            invited_at: "2020-04-16",
            passcode: "zepd1235",
          },
          {
            id: 2,
            name: "hello name",
            email: "hello@inowing.com",
            part: "개발팀",
            grade: "과장",
            created_at: "2020-04-16",
            invited_at: "2020-04-16",
            passcode: "zepd1235",
          },
          {
            id: 3,
            name: "hello name",
            email: "hello@inowing.com",
            part: "개발팀",
            grade: "과장",
            created_at: "2020-04-16",
            invited_at: "2020-04-16",
            passcode: "zepd1235",
          },
          {
            id: 4,
            name: "hello name",
            email: "hello@inowing.com",
            part: "개발팀",
            grade: "과장",
            created_at: "2020-04-16",
            invited_at: "2020-04-16",
            passcode: "zepd1235",
          },
          {
            id: 5,
            name: "hello name",
            email: "hello@inowing.com",
            part: "개발팀",
            grade: "과장",
            created_at: "2020-04-16",
            invited_at: "2020-04-16",
            passcode: "zepd1235",
          },
          {
            id: 6,
            name: "hello name",
            email: "hello@inowing.com",
            part: "개발팀",
            grade: "과장",
            created_at: "2020-04-16",
            invited_at: "2020-04-16",
            passcode: "zepd1235",
          },
        ],
        operator_fields: [{
            key: "selected",
            label: "No"
          },
          {
            key: "name",
            label: "이름"
          },
          {
            key: "email",
            label: "이메일"
          },
          {
            key: "part",
            label: "소속"
          },
          {
            key: "grade",
            label: "직책"
          },
          {
            key: "created_at",
            label: "생성시간"
          },
          {
            key: "invited_at",
            label: "초대시간"
          },
          {
            key: "passcode",
            label: "passcode"
          },
        ],
        operator_pagination: {
          total_count: 6,
          count_pages: 1,
          current_page: 1,
          limit: 100,
        },
        operator_allSelected: [],
        operator_all: false,
        operator_indeterminate: false,

        /** moderator,presenter */
        moderator_items: [{
            id: 1,
            name: "hello name",
            email: "hello@inowing.com",
            part: "개발팀",
            grade: "과장",
            created_at: "2020-04-16",
            invited_at: "2020-04-16",
            passcode: "zepd1235",
          },
          {
            id: 2,
            name: "hello name",
            email: "hello@inowing.com",
            part: "개발팀",
            grade: "과장",
            created_at: "2020-04-16",
            invited_at: "2020-04-16",
            passcode: "zepd1235",
          },
        ],
        moderator_fields: [{
            key: "selected",
            label: "No"
          },
          {
            key: "name",
            label: "이름"
          },
          {
            key: "email",
            label: "이메일"
          },
          {
            key: "part",
            label: "소속"
          },
          {
            key: "grade",
            label: "직책"
          },
          {
            key: "created_at",
            label: "생성시간"
          },
          {
            key: "invited_at",
            label: "초대시간"
          },
          {
            key: "passcode",
            label: "passcode"
          },
        ],
        moderator_pagination: {
          total_count: 6,
          count_pages: 1,
          current_page: 1,
          limit: 100,
        },
        moderator_allSelected: [],
        moderator_all: false,
        moderator_indeterminate: false,
        /** moderator,presenter */

        /** attendee */
        attendee_items: [{
            id: 1,
            name: "hello name",
            email: "hello@inowing.com",
            part: "개발팀",
            grade: "과장",
            created_at: "2020-04-16",
            invited_at: "2020-04-16",
            passcode: "zepd1235",
          },
          {
            id: 2,
            name: "hello name",
            email: "hello@inowing.com",
            part: "개발팀",
            grade: "과장",
            created_at: "2020-04-16",
            invited_at: "2020-04-16",
            passcode: "zepd1235",
          },
          {
            id: 3,
            name: "hello name",
            email: "hello@inowing.com",
            part: "개발팀",
            grade: "과장",
            created_at: "2020-04-16",
            invited_at: "2020-04-16",
            passcode: "zepd1235",
          },
        ],
        attendee_fields: [{
            key: "selected",
            label: "No"
          },
          {
            key: "name",
            label: "이름"
          },
          {
            key: "email",
            label: "이메일"
          },
          {
            key: "part",
            label: "소속"
          },
          {
            key: "grade",
            label: "직책"
          },
          {
            key: "created_at",
            label: "생성시간"
          },
          {
            key: "invited_at",
            label: "초대시간"
          },
          {
            key: "passcode",
            label: "passcode"
          },
        ],
        attendee_pagination: {
          total_count: 6,
          count_pages: 1,
          current_page: 1,
          limit: 100,
        },
        attendee_allSelected: [],
        attendee_all: false,
        attendee_indeterminate: false,
        /** attendee */

      };
    },
    watch: {
      operator_allSelected(newValue, oldValue) {
        // Handle changes in individual flavour checkboxes
        console.log(newValue, oldValue);
        if (newValue.length === 0) {
          this.operator_indeterminate = false;
          this.operator_all = false;
        } else if (newValue.length === this.operator_items.length) {
          this.operator_indeterminate = false;
          this.operator_all = true;
        } else {
          this.operator_indeterminate = true;
          this.operator_all = false;
        }
      },
      moderator_allSelected(newValue, oldValue) {
        // Handle changes in individual flavour checkboxes
        console.log(newValue, oldValue);
        if (newValue.length === 0) {
          this.moderator_indeterminate = false;
          this.moderator_all = false;
        } else if (newValue.length === this.moderator_items.length) {
          this.moderator_indeterminate = false;
          this.moderator_all = true;
        } else {
          this.moderator_indeterminate = true;
          this.moderator_all = false;
        }
      },
      attendee_allSelected(newValue, oldValue) {
        if (newValue.length === 0) {
          this.attendee_indeterminate = false;
          this.attendee_all = false;
        } else if (newValue.length === this.attendee_items.length) {
          this.attendee_indeterminate = false;
          this.attendee_all = true;
        } else {
          this.attendee_indeterminate = true;
          this.attendee_all = false;
        }
      },
    },
    mounted: function () {
      this.$nextTick(async function () {
        this.event_id = this.$store.getters.event_id;
        this.api_url = this.$store.getters.api_url;
      });
    },
    computed: {
      user_validation: function (params) {
        let valid1 = this.userForm.name ? true : false;
        let valid2 = this.userForm.email ? true : false;
        let valid3 =
          this.userForm.password &&
          this.userForm.password == this.password_confirm ?
          true :
          false;
        let valid_result = valid1 && valid2 && valid3;
        return {
          valid1,
          valid2,
          valid3,
          valid_result
        };
      }
    },
    methods: {
      exeCopy: function (event, ref_id) {
        // 이메일 주소 복사
        let testingCodeToCopy = this.$refs[ref_id];
        testingCodeToCopy.setAttribute("type", "text");
        testingCodeToCopy.select();
        try {
          var successful = document.execCommand("copy");
          if (successful) {
            this.$toast("Good", "email address copied", "success");
          } else {
            this.$toast("Ooops", "unable to copy", "danger");
          }
        } catch (err) {
          this.$toast("Ooops", "unable to copy", "danger");
        }
        testingCodeToCopy.setAttribute("type", "hidden");
        window.getSelection().removeAllRanges();
      },
      openOverlayModal: function () {
        this.userForm = {};
        this.password_confirm = "";
        this.overlayModal = true;
      },
      storeUser: async function () {
        if (!this.user_validation.valid_result) {
          alert("폼을 입력해 주세요.");
          return;
        }
        try {
          let url = `${this.api_url}/register`;
          let formData = new FormData();
          formData.append("event_id", this.event_id);
          formData.append("name", this.userForm.name);
          formData.append("email", this.userForm.email);
          formData.append("password", this.userForm.password);
          let rs = await axios.post(url, formData, {
            Headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(rs);
          // this.tagValue.push(this.userForm.email);
          this.$showMsgBoxTwo(rs.status);
          rs = await axios.get(
            `${this.api_url}/user/in_event?event_id=${this.event_id}`
          );
          console.log(rs);
          // this.vm = rs.data.result;
          this.overlayModal = false;
        } catch (error) {
          this.$showMsgBoxTwo(error.response.status,"",error.response.statusText);
        }
      },
      excelUpload: function () {
        console.log('upload');
      },
      excelDownload: function () {
        let url = this.modal2_type == "Q&A" ? `${this.api_url}/conference_qna/excel?conference_id=${this.conference_item.id}` : `${this.api_url}/conference_log/excel?conference_id=${this.conference_item.id}`;
        window.location.href = url;
      },
      sendEmail: async function () {
        console.log('sendEmailsendEmailsendEmail');
        try {
          let user_type = this.invitaion_tabIndex;
          let url = `${this.api_url}/conference_invitation`;
          let formData = new FormData();
            formData.append("conference_id", this.conference_item.id);
            formData.append("user_type", user_type);
            // todo. 선택된 탭의 체크된 리스트를 보내야 한다.
            console.log('wowed', this.attendee_allSelected);
          for (var i = 0; i < this.attendee_allSelected.length; i++) {
            formData.append("user[]", 'test@test.com');
          }
          
          let rs = await axios.post(url, formData, {
            Headers: {
              "Content-Type": "application/json"
            }
          });
          console.log(rs);
          this.$showMsgBoxTwo(rs.status);
          this.modal3 = false;
        } catch (error) {
          this.$showMsgBoxTwo(error.response.status, "", error.response.statusText);
        }

        this.$emit('get-list'); // 이름이 같으면 동작 안된다.
      },
      paginationFn: async function (requestPage, type) {
        // await getOperationList()
        console.log("requestPage ", requestPage, type);
      },
      onRowSelected(items) {
        this.operator_allSelected = items;
      },
      onModeratorSelected(items) {
        this.moderator_allSelected = items;
      },
      onAttendeeSelected(items) {
        this.attendee_allSelected = items;
      },
      selectAllRows(target) {
        this.$refs[target].selectAllRows();
      },
      clearSelected(target) {
        this.$refs[target].clearSelected();
      },
      checked(index, checked, selectableTable) {
        let tableRef = this.$refs[selectableTable];
        checked === true ? tableRef.selectRow(index) : tableRef.unselectRow(index);
      },
      toggleAll(checked) {
        this.operator_all = checked;
        checked ? this.selectAllRows("selectableTable") : this.clearSelected("selectableTable");
      },
      toggleAllModerator(checked) {
        this.moderator_all = checked;
        checked ? this.selectAllRows("ModeraterSelectableTable") : this.clearSelected("ModeraterSelectableTable");
      },
      toggleAllAttendee(checked) {
        this.attendee_all = checked;
        checked ? this.selectAllRows("AttendeeSelectableTable") : this.clearSelected("AttendeeSelectableTable");
      }
    }
  };
</script>
