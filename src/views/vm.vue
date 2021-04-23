<template>
  <section>
    <b-button href="#" variant="primary" size="sm" @click="openModal1">
      <b-icon-plus></b-icon-plus> VM 생성
    </b-button>
    
    <b-card no-body class="mt-3">
      <b-tabs v-model="tabIndex" small card>
        <b-tab title="Upcoming Events">
          <b-row class="mb-2">
            <b-col cols="9">
              <b-button href="#" :variant="selected_btn_index == 0 ? 'primary' : 'outline-primary'" size="sm"
                @click="searchDayList(0)">ALL</b-button>
              <span v-for="(item, index) in weeks" :key="index">
                <b-button href="#" :variant="selected_btn_index == (index+1) ? 'primary' : 'outline-primary'" size="sm"
                  class="mr-1" @click="searchDayList(index+1, item);">{{item.text}}
                </b-button>
              </span>
            </b-col>
            <b-col>
              <b-input-group size="sm" align-v="baseline">
                <b-form-input aria-placeholder="검색어를 입력하세요."></b-form-input>
                <b-input-group-append>
                  <b-button variant="info" size="sm">
                    <b-icon-search></b-icon-search>
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </b-col>
          </b-row>

          <!-- 반복할 리스트 -->
          <b-row class="mt-1" v-for="item in upcoming" :key="item.id">
            <b-col>
              <b-card no-body>
                <b-row>
                  <b-col cols="2" class="text-center vm_card_v_left">
                    <div>
                      <span class="vm_smaller">{{item.date.split(' ')[0]}}</span><br>
                      <span
                        class="vm_smaller">({{ week[(new Date(Date.parse(item.date.split(' ')[0]))).getDay()] }})</span><br>
                      <b-button variant="danger" pill size="sm">Broadcast START</b-button>
                    </div>
                  </b-col>
                  <b-col cols="8" class="vm_card_v_center">
                    <b-row style="min-height: 90px;">
                      <b-col cols="9">
                        <span class="vm_smaller">vm id : {{item.id}}</span>
                        <h5 class="text-primary">{{item.name}}</h5>
                        <br>
                        <span class="text-secondary">{{item.venue}}
                          {{item.date.substr(5,5).replace('-', '/')}}
                          {{item.date.split(' ')[1]}} ~ {{item.time}}m / GMT +09:00
                          SEOUL</span>
                      </b-col>
                      <b-col cols="3" class="p-1">
                        <p class="text-secondary vm_host">
                          <span>{{item.host}}</span>
                        </p>
                      </b-col>
                    </b-row>
                    <hr style="padding: 0; margin: 0">
                    <b-row class="mt-1">
                      <b-col>
                        <b-collapse :id="'toggle_'+item.id" style="width:100%;">
                          <b-row>
                            <b-col class="pr-1">
                              <b-card align="center" no-body class="p-2">
                                <p class="p-0 mb-1">
                                  <b-button size="sm" variant="primary" class="inoBtn-200" disabled>
                                    Operator</b-button>
                                </p>
                                <p class="p-0 mb-1">
                                  <b-button size="sm" disabled pill variant="outline-secondary">
                                    <b-icon-people></b-icon-people>
                                  </b-button>
                                  &nbsp;{{item.moderator_count}}명
                                </p>
                                <p class="p-0 mb-1">
                                  <b-button size="sm" @click="openModal4(item, 0)" pill variant="outline-primary">
                                    <b-icon-envelope></b-icon-envelope> Invitation
                                  </b-button>
                                </p>
                              </b-card>
                            </b-col>
                            <b-col class="pl-1">
                              <b-card align="center" no-body class="p-2">
                                <p class="p-0 mb-1">
                                  <b-button size="sm" variant="primary" class="inoBtn-200" disabled>
                                    Moderator/Presenter</b-button>
                                </p>
                                <p class="p-0 mb-1">
                                  <b-button size="sm" disabled pill variant="outline-secondary">
                                    <b-icon-people></b-icon-people>
                                  </b-button>
                                  &nbsp;{{item.presenter_count}}명
                                </p>
                                <p class="p-0 mb-1">
                                  <b-button size="sm" @click="openModal4(item, 1)" pill variant="outline-primary">
                                    <b-icon-envelope></b-icon-envelope> Invitation
                                  </b-button>
                                </p>
                              </b-card>
                            </b-col>
                            <b-col class="pl-1">
                              <b-card align="center" no-body class="p-2">
                                <p class="p-0 mb-1">
                                  <b-button size="sm" variant="primary" class="inoBtn-200" disabled>Attendee
                                  </b-button>
                                </p>
                                <p class="p-0 mb-1">
                                  <b-button size="sm" disabled pill variant="outline-secondary">
                                    <b-icon-people></b-icon-people>
                                  </b-button>
                                  &nbsp;{{item.attendee_count}}명
                                </p>
                                <p class="p-0 mb-1">
                                  <b-button size="sm" @click="openModal4(item, 2)" pill variant="outline-primary">
                                    <b-icon-envelope></b-icon-envelope> Invitation
                                  </b-button>
                                </p>
                              </b-card>
                            </b-col>
                          </b-row>
                          <b-row class="mt-3">
                            <b-col align="center">
                              <b-button size="sm" variant="outline-secondary" @click="goVmNotice(item)">
                                <b-icon-info-circle></b-icon-info-circle> 공지사항
                              </b-button>
                              <b-button size="sm" variant="outline-secondary" @click="openModal2(item)">
                                <b-icon-chat-dots></b-icon-chat-dots> Q&amp;A({{item.qna_count}})
                              </b-button>
                              <b-button size="sm" variant="outline-secondary" @click="openModal3(item, '참가자')">
                                <b-icon-people></b-icon-people> 참가자({{item.user_count}})
                              </b-button>
                            </b-col>
                          </b-row>
                          <hr>
                          <b-row>
                            <b-col align="center">
                              <p>
                                <b-button size="sm" pill variant="outline-primary">
                                  <b-icon-people></b-icon-people>
                                </b-button>
                                예상 참가자수 <strong class="text-primary">{{ item.event_size }}</strong> 명
                              </p>
                              <p class="mb-1">
                                <b-button size="sm" variant="danger" class="inoBtn-200">
                                  <b-icon-stop-circle></b-icon-stop-circle> BroadCast 멈추기
                                </b-button>
                              </p>
                              <p class="mb-1">
                                <b-button size="sm" variant="success" class="inoBtn-200"
                                  @click="openModal1($event, item)">
                                  <b-icon-files-alt></b-icon-files-alt> 수정
                                </b-button>
                              </p>
                            </b-col>
                          </b-row>
                        </b-collapse>
                      </b-col>
                    </b-row>

                    <b-row class="text-right mb-1">
                      <b-col>
                        <b-button v-b-toggle="'toggle_'+item.id" size="sm" variant="outline-primary"
                          @click="openId.includes(item.id) ? openId.splice(openId.indexOf(item.id), 1) : openId.push(item.id);">
                          <b-icon-chevron-down v-show="!openId.includes(item.id)"></b-icon-chevron-down>
                          <b-icon-chevron-up v-show="openId.includes(item.id)"></b-icon-chevron-up>
                        </b-button>
                        <b-button size="sm" variant="outline-danger" @click="deleteData(item)">
                          <b-icon-trash></b-icon-trash>
                        </b-button>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col cols="2" class="vm_card_v_right ino-180-180-wrap">
                    <div style="border: none; padding: 0px;">
                      <b-img :src="item.logo||logo_prev" fluid></b-img>
                    </div>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>

        <b-tab title="Past Events">
          <b-row class="mt-1" v-for="item in past" :key="item.id">
            <b-col>
              <b-card no-body>
                <b-row>
                  <b-col cols="2" class="text-center vm_card_v_left">
                    <div>
                      <span class="vm_smaller">{{item.date.split(' ')[0]}}</span><br>
                      <span
                        class="vm_smaller">({{ week[(new Date(Date.parse(item.date.split(' ')[0]))).getDay()] }})</span><br>
                      <b-button variant="danger" pill size="sm">Broadcast START</b-button>
                    </div>
                  </b-col>
                  <b-col cols="8" class="vm_card_v_center">
                    <b-row style="min-height: 90px;">
                      <b-col cols="9">
                        <span class="vm_smaller">vm id : {{item.id}}</span>
                        <h5 class="text-primary">{{item.name}}</h5>
                        <br>
                        <span class="text-secondary">{{item.venue}}
                          {{item.date.substr(5,5).replace('-', '/')}}
                          {{item.date.split(' ')[1]}} ~ {{item.time}}m / GMT +09:00
                          SEOUL</span>
                      </b-col>
                      <b-col cols="3" class="p-1">
                        <p class="text-secondary vm_host">
                          <span>{{item.host}}</span>
                        </p>
                      </b-col>
                    </b-row>
                    <hr style="padding: 0; margin: 0">
                    <b-row class="mt-1">
                      <b-col>
                        <b-collapse :id="'toggle_'+item.id" style="width:100%;">
                          <b-row>
                            <b-col class="pr-1">
                              <b-card align="center" no-body class="p-2">
                                <p class="p-0 mb-1">
                                  <b-button size="sm" variant="primary" class="inoBtn-200" disabled>
                                    Operator</b-button>
                                </p>
                                <p class="p-0 mb-1">
                                  <b-button size="sm" disabled pill variant="outline-secondary">
                                    <b-icon-people></b-icon-people>
                                  </b-button>
                                  &nbsp;{{item.moderator_count}}명
                                </p>
                                <p class="p-0 mb-1">
                                  <b-button size="sm" @click="openModal4(item, 0)" pill variant="outline-primary">
                                    <b-icon-envelope>
                                    </b-icon-envelope> Invitation
                                  </b-button>
                                </p>
                              </b-card>
                            </b-col>
                            <b-col class="pl-1">
                              <b-card align="center" no-body class="p-2">
                                <p class="p-0 mb-1">
                                  <b-button size="sm" variant="primary" class="inoBtn-200" disabled>
                                    Moderator/Presenter</b-button>
                                </p>
                                <p class="p-0 mb-1">
                                  <b-button size="sm" disabled pill variant="outline-secondary">
                                    <b-icon-people></b-icon-people>
                                  </b-button>
                                  &nbsp;{{item.presenter_count}}명
                                </p>
                                <p class="p-0 mb-1">
                                  <b-button size="sm" @click="openModal4(item, 1)" pill variant="outline-primary">
                                    <b-icon-envelope></b-icon-envelope> Invitation
                                  </b-button>
                                </p>
                              </b-card>
                            </b-col>
                            <b-col class="pl-1">
                              <b-card align="center" no-body class="p-2">
                                <p class="p-0 mb-1">
                                  <b-button size="sm" variant="primary" class="inoBtn-200" disabled>Attendee
                                  </b-button>
                                </p>
                                <p class="p-0 mb-1">
                                  <b-button size="sm" disabled pill variant="outline-secondary">
                                    <b-icon-people></b-icon-people>
                                  </b-button>
                                  &nbsp;{{item.attendee_count}}명
                                </p>
                                <p class="p-0 mb-1">
                                  <b-button size="sm" @click="openModal4(item, 2)" pill variant="outline-primary">
                                    <b-icon-envelope></b-icon-envelope> Invitation
                                  </b-button>
                                </p>
                              </b-card>
                            </b-col>
                          </b-row>
                          <b-row class="mt-3">
                            <b-col align="center">
                              <b-button size="sm" variant="outline-secondary" @click="goVmNotice(item)">
                                <b-icon-info-circle></b-icon-info-circle> 공지사항
                              </b-button>
                              <b-button size="sm" variant="outline-secondary" @click="openModal2(item, 'Q&A')">
                                <b-icon-chat-dots></b-icon-chat-dots> Q&amp;A({{item.qna_count}})
                              </b-button>
                              <b-button size="sm" variant="outline-secondary" @click="openModal3(item, '참가자')">
                                <b-icon-people></b-icon-people> 참가자({{item.user_count}})
                              </b-button>
                            </b-col>
                          </b-row>
                          <hr>
                          <b-row>
                            <b-col align="center">
                              <p>
                                <b-button size="sm" pill variant="outline-primary">
                                  <b-icon-people></b-icon-people>
                                </b-button>
                                예상 참가자수 <strong class="text-primary">{{ item.event_size }}</strong> 명
                              </p>
                              <p class="mb-1">
                                <b-button size="sm" variant="danger" class="inoBtn-200">
                                  <b-icon-stop-circle></b-icon-stop-circle> BroadCast 멈추기
                                </b-button>
                              </p>
                              <p class="mb-1">
                                <b-button size="sm" variant="success" class="inoBtn-200"
                                  @click="openModal1($event, item)">
                                  <b-icon-files-alt></b-icon-files-alt> 수정
                                </b-button>
                              </p>
                            </b-col>
                          </b-row>
                        </b-collapse>
                      </b-col>
                    </b-row>

                    <b-row class="text-right mb-1">
                      <b-col>
                        <b-button v-b-toggle="'toggle_'+item.id" size="sm" variant="outline-primary"
                          @click="openId.includes(item.id) ? openId.splice(openId.indexOf(item.id), 1) : openId.push(item.id);">
                          <b-icon-chevron-down v-show="!openId.includes(item.id)"></b-icon-chevron-down>
                          <b-icon-chevron-up v-show="openId.includes(item.id)"></b-icon-chevron-up>
                        </b-button>
                        <b-button size="sm" variant="outline-danger" @click="deleteData(item)">
                          <b-icon-trash></b-icon-trash>
                        </b-button>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col cols="2" class="vm_card_v_right ino-180-180-wrap">
                    <div style="border: none; padding: 0px;">
                      <b-img :src="item.logo||logo_prev" fluid></b-img>
                    </div>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-card>
    
    <!-- VM 생성 -->
    <b-modal v-model="modal1" hide-footer title="Event Information" body-bg-variant="light">
      <vm-form-modal :params="{conference_item}" @get-list="getList"></vm-form-modal>
    </b-modal>

    <!-- qna -->
    <b-modal v-model="modal2" hide-footer title="Q&A">
      <vm-qna-modal :params="{conference_item}"></vm-qna-modal>
    </b-modal>

    <!-- 참가자 -->
    <b-modal v-model="modal3" hide-footer title="참가자">
      <vm-attendee-modal :params="{conference_item}"></vm-attendee-modal>
    </b-modal>

    <!-- Invitation -->
    <b-modal v-model="modal4" hide-footer title="INVITATION" size="xl">
      <!-- 숫자가 안넘어가서 객체로 넘겼음. -->
      <vm-invitation-modal :params="{conference_item, invitaion_tabIndex}" @get-list="getList"></vm-invitation-modal>
    </b-modal>

  </section>
</template>

<script>
  export default {
    name: "vm",
    components: {
        'vm-form-modal': window.httpVueLoader(`./vue/vm_form_modal.vue`),
				'vm-qna-modal': window.httpVueLoader(`./vue/vm_qna_modal.vue`),
				'vm-attendee-modal': window.httpVueLoader(`./vue/vm_attendee_modal.vue`),
				'vm-invitation-modal': window.httpVueLoader(`./vue/vm_invitation_modal.vue`)
    },
    data: function () {
      return {
        event_id: 0,
        api_url: ``,
        upcoming: [],
        past: [],

        week: ["Sun", "Mon", "Tue", "Wen", "Thur", "Fri", "Sat"],
        weeks: [], // upcoming events 날짜 버튼
        selected_btn_index: 0, // 선택된 날짜버튼 인덱스

        tabIndex: 0, // 클릭 탭 인덱스 upcoming/past
        openId: [], // 펼치기 접기 아이템 아이디
        conference_item: null, // 선택된 컨퍼런스 아이템
        logo_prev: this.$store.getters.dummy_image_url(["480x60"]),
        
        modal1: false, // vm 생성 모달 열고닫기 여부
        modal2: false, // qna 버튼 모달 열고닫기 여부
        modal3: false, // 참가자 버튼 모달 열고닫기 여부
        modal4: false, // Invitation 버튼 모달 열고닫기 여부
        invitaion_tabIndex: 0, // 초대 모달의 선택번호 (Operator, Moderator/Presenter, Attendee)
      };
    },
    mounted: function () {
      this.$nextTick(async function () {
        this.event_id = this.$store.getters.event_id;
        this.api_url = this.$store.getters.api_url;
        this.setWeek(7);
        this.getList();
      });
    },
    methods: {
      /**
       * 기본
       */
      getList: async function (item) {
        let url = `${this.api_url}/conference?event_id=${this.event_id}`;
        if (item) {
          url = `${url}&date=${item.value}`;
        }
        let rs = await axios.get(url);
        this.upcoming = rs.data.result.upcoming;
        this.past = rs.data.result.past;
        this.modal1 = false;
      },
      searchDayList: async function (index, item) {
        this.selected_btn_index = index;
        this.getList(item);
      },
      
      /**
       * 기타
       */
      goVmNotice: function (item) {
        // 공지사항으로 가기
        this.$router.push({
          name: "conference_notice",
          query: {
            conference_id: item.id
          },
        });
      },
      setWeek: function (days) {
        // 상단 1주일치 날짜버튼 생성
        var date = new Date();
        let week = this.week;
        for (var i = 1; i < days + 1; i++) {
          var loadDate = new Date(Date.parse(date) + i * 1000 * 60 * 60 * 24); // ++1 일
          var month = 1 + loadDate.getMonth();
          month = month >= 10 ? month : "0" + month;
          var day = loadDate.getDate();
          day = day >= 10 ? day : "0" + day;

          this.weeks.push({
            text: `${month}.${day}.(${week[loadDate.getDay()]})`,
            value: `${loadDate.getFullYear()}-${month}-${day}`,
          });
        }
      },
      openModal1: function (event, item) {
        this.conference_item = item;
        this.modal1 = true;
      },
      openModal2: async function (item) {
        this.conference_item = item;
        this.modal2 = true;
      },
      openModal3: async function (item) {
        this.conference_item = item;
        this.modal3 = true;
      },
      openModal4: async function (item, invitaion_tabIndex) {
        this.conference_item = item;
        this.invitaion_tabIndex = invitaion_tabIndex;
        this.modal4 = true;
      },
      deleteData: async function (item) {
        if (confirm("삭제 하시겠습니까?")) {
          try {
            let rs = await axios.delete(`${this.api_url}/conference/${item.id}`);
            if (rs.data.code == 412) {
              this.$showMsgBoxTwo(rs.data.code, "", "컨퍼런스 메뉴에서 사용중인 VM 입니다.");
              return;
            }
            this.$showMsgBoxTwo(rs.status);
            this.getList();
          } catch (error) {
            this.$showMsgBoxTwo(error.response.status, "", error.response.statusText);
          }
        }
      },
    },
  };
</script>