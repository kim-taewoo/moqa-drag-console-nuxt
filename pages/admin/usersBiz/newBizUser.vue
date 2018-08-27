<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
        <h3>기업회원 추가</h3>
        <v-divider></v-divider>
      </v-flex>
    </v-layout>
    <v-layout wrap class="mt-3">
      <v-flex xs12>
        <v-card>
          <v-container grid-list-sm>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="기업회원 ID"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="비밀번호"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="이름"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="기업코드" hint="기업코드 4자리를 입력. Ex/A004"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="담당자 이메일"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="휴대전화" hint="-없이 입력. Ex/01000000000"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-subheader style="height:30px;" class="pa-0">회원권한</v-subheader>
                <v-layout wrap>
                  <v-flex xs3>
                    <v-checkbox hide-details label="회원목록"></v-checkbox>
                  </v-flex>
                  <v-flex xs3>
                    <v-checkbox hide-details label="회원그룹"></v-checkbox>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs3>
                    <v-checkbox hide-details label="설문목록"></v-checkbox>
                  </v-flex>
                  <v-flex xs3>
                    <v-checkbox hide-details label="신고설문"></v-checkbox>
                  </v-flex>
                  <v-flex xs3>
                    <v-checkbox hide-details label="설문심사"></v-checkbox>
                  </v-flex>
                  <v-flex xs3>
                    <v-checkbox hide-details label="설문추가"></v-checkbox>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 class="text-xs-center">
                <v-divider></v-divider>
                <v-btn>기업회원생성</v-btn>
                <v-btn nuxt to="/admin/usersBiz">취소</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style>
.v-input--checkbox {
  margin-top: 0px;
}
</style>
