import common from "@/common";

export default new class {
    // constructor() {
    //     let runtime = document.getElementsByName('x-profile')[0].content
    //     if (!runtime || runtime === 'X-PROFILE') {
    //         runtime = 'stable'
    //     }
    //     this.vals = process.env.ENV[runtime]
    //     if (!this.vals) {
    //         console.error('illegal profile: %s', runtime)
    //     }
    // }
    //
    // get hotelId() {
    //     return common.getParameter('hotelId') || sessionStorage.getItem('hotelId')
    // }
    //
    // get token() {
    //     return common.getParameter('token') || sessionStorage.getItem('token')
    // }

    get locale() {
        return common.getParameter('locale') || sessionStorage.getItem('locale')
    }

    // get account() {
    //     return this.vals.VUE_APP_ACCOUNT
    // }
    get account() {
        return "http://127.0.0.1:8080"
    }

    // get vueconfig() {
    //     return {
    //         productionTip: this.vals.NODE_ENV === 'production',
    //         devtools: this.vals.NODE_ENV !== 'production'
    //     }
    // }
}