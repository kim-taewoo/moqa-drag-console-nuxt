<template>
    <v-container>
        <v-layout wrap justify-center>
            <v-flex xs12 sm8 lg6>
                <v-card>
                    <v-container class="main-card">
                        <v-layout align-center>
                            <v-flex>
                                <h3 class="display-3"><span class="moqa">MOQA</span>를 이용해주셔서 감사합니다!</h3>

                                <div class="mt-3 subheading grey--text">MOQA 팀은 더 나은 서비스를 제공하기 위해 최선을 다하겠습니다.</div>

                            </v-flex>
                        </v-layout>
                    </v-container>

                    <v-divider></v-divider>

                    <v-list two-line>
                    <v-list-tile  id="plusfriend-addfriend-button">
                        <div class="text-xs-center" @click="addPlusFriend()">
                            <v-chip>
                                <v-avatar>
                                <img src="@/assets/kakao_logo.png" alt="trevor">
                                </v-avatar>
                                플러스친구
                            </v-chip>
                        </div>
                        <div class="text-xs-center" @click="plusFriendChat()">
                            <v-chip>
                                <v-avatar>
                                <img src="@/assets/kakao_logo.png" alt="trevor">
                                </v-avatar>
                                채팅
                            </v-chip>
                        </div>
                        
                    </v-list-tile>
                    <v-divider></v-divider>
                    <v-list-tile>
                        <v-list-tile-action>
                        <v-icon color="indigo">phone</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                        <v-list-tile-title>(02) 558-4218</v-list-tile-title>
                        <v-list-tile-sub-title>전화</v-list-tile-sub-title>
                        </v-list-tile-content>

                    </v-list-tile>


                    <v-divider inset></v-divider>

                    <v-list-tile>
                        <v-list-tile-action>
                        <v-icon color="indigo">mail</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                        <v-list-tile-title>contact@in-datalab.com</v-list-tile-title>
                        <v-list-tile-sub-title>이메일</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-divider inset></v-divider>

                    <v-list-tile>
                        <v-list-tile-action>
                        <v-icon color="indigo">location_on</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                        <v-list-tile-title>서울특별시 서초구 강남대로 311, 한화드림플러스 12F</v-list-tile-title>
                        <v-list-tile-sub-title>주소</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-action>
                        </v-list-tile-action>

                        <v-list-tile-content>
                        <v-list-tile-title>311 Gangnam-daero, Seocho 2-dong, Seocho-gu, Seoul</v-list-tile-title>
                        <v-list-tile-sub-title>address</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Support',

    methods: {
        addPlusFriend () {
            Kakao.PlusFriend.addFriend({
                plusFriendId: '_zhrzC' // 플러스친구 홈 URL에 명시된 id로 설정합니다.
            });
        },
        plusFriendChat() {
            Kakao.PlusFriend.chat({
                plusFriendId: '_xcLqmC' // 플러스친구 홈 URL에 명시된 id로 설정합니다.
            });
        }        
    }
}
</script>

<style>
    .moqa {
        color: #39BBA2;
    }
    .v-chip .v-chip__content {
        height: 33px;
        background: #eee;
        font-size: 1.3rem;
    }
    .v-chip .v-avatar {
        height: 33px!important;
        width: 33px!important;
    }
</style>


