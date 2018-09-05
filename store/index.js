import Vuex from 'vuex';
import Cookie from 'js-cookie';

const createStore = () => {
  return new Vuex.Store({
    state: {
      token: null
    },
    mutations: {
      setToken (state, token) {
        state.token = token
      },
      clearToken (state) {
        state.token = null
      },
      
    },
    actions: {
      authenticateUser(vuexContext,authData) {
        if ( authData.isAdmin == false) {
          // 기업 고객 로그인일 경우 실행될 함수. 
          return this.$axios.$post('https://~~', {
            userId: this.userId,
            password: this.userPassword
          }).then(data => {
            console.log(data)
            // 로그인 성공으로 받은 토큰을 넣는 함수. idToken 은 임의의 변수
            vuexContext.commit('setToken', data.idToken)
          }).catch(err => {
            console.log(err)
          })
        } else {
          // 관리자 로그인일 경우 실행될 함수
          // return this.$axios.$post('https://~~', {
          //   userId: this.userId,
          //   password: this.userPassword
          // }).then(data => {
          //   console.log(data)
          //   // 로그인 성공으로 받은 토큰을 넣는 함수. idToken 은 임의의 변수. 만일 쿠키로 등록해야 한다면 아래 처럼 쿠키를 넣는다.
          //   vuexContext.commit('setToken', data.idToken)
          //   localStorage.setItem('token', data.idToken)
          //   localStorage.setItem('tokenExpiration', new Date().getTime() + Number.parseInt(data.expiresIn) * 1000)
          //   Cookie.set('jwt', data.idToken)
          //   Cookie.set('expirationDate', new Date().getTime() + Number.parseInt(data.expiresIn) * 1000)
          //   // vuexContext.dispatch('setLogoutTimer', data.expiresIn * 1000)
          // }).catch(err => {
          //   console.log(err)
          // })

          //test
          vuexContext.commit('setToken', '0C77D2C5BF51757474910F21384AF61E')
          Cookie.set('JSESSIONID', '0C77D2C5BF51757474910F21384AF61E')
        }
      },
      // setLogoutTimer(vuexContext, duration) {
      //   setTimeout(() => {
      //     vuexContext.commit('clearToken')
      //   }, duration)
      // },
      initAuth (vuexContext,req) {
        let token;
        let expirationDate;
        if (req) {
          if(!req.headers.cookie){
            return
          }
          const jwtCookie = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('jwt='))
          if(!jwtCookie) {
            return
          }
          token = jwtCookie.split('=')[1]
          expirationDate = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('expirationDate='))
            .split('=')[1]
        } else {
          token = localStorage.getItem('token')
          tokenExpiration = localStorage.getItem('tokenExpiration')
        }
          
          if (new Date().getTime() > +tokenExpiration || !token ) {
            console.log('no token or invalid token')
            vuexContext.dispatch('logout')
            return
          } 
          // vuexContext.dispatch('setLogoutTimer', +tokenExpiration - new Date().getTime())
        vuexContext.commit('setToken', token)
      },
      logout (vuexContext) {
        vuexContext.commit('clearToken')
        Cookie.remove('jwt')
        Cookie.remove('expirationDate')
        localStorage.removeItem('token')
        localStorage.removeItem('tokenExpiration')
      }
    },
    getters: {
      isAuthenticated(state) {
        return state.token != null
      }
    }
  })
}

export default createStore