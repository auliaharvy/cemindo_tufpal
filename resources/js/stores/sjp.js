import $axios from '../api.js'

const state = () => ({
    loading: false,
    sjps: [], //STATE UNTUK MENAMPUNG DATA CUSTOMERS
    
    //STATE INI UNTUK FORM ADD DAN EDIT NANTINYA
    sjp: {
        destination_pool: '',
        departure_pool: '',
        vehicle: '',
        driver: '',
        transporter: '',
        sjp_number: '',
        no_do: '',
        product_name: 'Portland Composite Cement',
        tonnage: '',
        product_quantity: '',
        status: '',
        departure_time: '', 
        eta: '',
        pallet_quantity: '',    
    },
    page: 1
})

const mutations = {
    isLoading (state) {
        state.loading = true
      },
      doneLoading (state) {
        state.loading = false
      },
    //MUTATIONS UNTUK ASSIGN DATA CUSTOMER KE DALAM STATE CUSTOMER
    ASSIGN_DATA(state, payload) {
        state.sjps = payload
    },
    //MENGUBAH STATE PAGE
    SET_PAGE(state, payload) {
        state.page = payload
    },
    //MENGUBAH STATE CUSTOMER
    ASSIGN_FORM(state, payload) {
        state.sjp = payload
    },
    //RESET STATE CUSTOMER
    CLEAR_FORM(state) {
        state.sjp = {
            sjp_id: '',
            driver_id:'',
            vehicle_id:'',
            destination_pool: '',
            departure_pool: '',
            vehicle: '',
            driver: '',
            transporter: '',
            sjp_number: '',
            no_do: '',
            product_name: '',
            tonnage: '',
            product_quantity: '',
            status: '',
            departure_time: '',
            eta: '',
            pallet_quantity: '',
        }
    }
}

const actions = {
    getSjp({ commit, state }, payload) {
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA CUSTOMER  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            $axios.get(`/sjp?page=${state.page}&q=${search}`)
            .then((response) => {
                commit('ASSIGN_DATA', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                resolve(response.data)
            })
        })
    },
    submitSjp({ dispatch, commit, state }) {
        commit('isLoading')
        return new Promise((resolve, reject) => {
            //MENGIRIMKAN REQUEST KE BACKEND DENGAN DATA YANG DIDAPATKAN DARI STATE CUSTOMER
            $axios.post(`/sjp`, state.sjp)
            .then((response) => {
                //APABILA BERHASIL MAKA LOAD DATA CUSTOMER UNTUK MENGAMBIL DATA TERBARU
                dispatch('getSjp').then(() => {
                    resolve(response.data)
                })
            })
            .catch((error) => {
                alert(error.message)
                //JIKA TERJADI ERROR VALIDASI, ASSIGN ERROR TERSEBUT KE DALAM STATE ERRORS
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }
            }).finally(() => {
                commit('doneLoading')
            })
        })
      },
      editSjp({ commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.get(`/sjp/${payload}/edit`) //KIRIM PERMINTAAN KE SERVER UNTUK MENGAMBIL SINGLE DATA CUSTOMER BERDASARKAN PAYLOAD (ID)
            .then((response) => {
                commit('ASSIGN_FORM', response.data.data) //ASSIGN DATA TERSEBUT KE DALAM STATE CUSTOMER
                resolve(response.data)
            })  
        })
    },
    updateSjp({ state, commit }, payload) {
        commit('isLoading')
        return new Promise((resolve, reject) => {
            $axios.post(`/sjp/adjust`, state.sjp) //KIRIM PERMINTAAN KE SERVER UNTUK MENGUPDATE DATA BERDASARKAN PAYLOAD (ID) DAN DATA YANG AKAN DI UPDATE DI AMBIL DARI STATE CUSTOMER
            .then((response) => {
                commit('CLEAR_FORM') //BERSIHKAN FORM
                resolve(response.data)
            })
            .catch((error) => {
                alert("Input Error!")
                //JIKA TERJADI ERROR VALIDASI, ASSIGN ERROR TERSEBUT KE DALAM STATE ERRORS
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }
            }).finally(() => {
                commit('doneLoading')
            })
        })
    },
    updateSjpchangedest({ state, commit }, payload) {
        commit('isLoading')
        return new Promise((resolve, reject) => {
            $axios.post(`/sjp/changedestination`, state.sjp) //KIRIM PERMINTAAN KE SERVER UNTUK MENGUPDATE DATA BERDASARKAN PAYLOAD (ID) DAN DATA YANG AKAN DI UPDATE DI AMBIL DARI STATE CUSTOMER
            .then((response) => {
                commit('CLEAR_FORM') //BERSIHKAN FORM
                resolve(response.data)
            })
            .catch((error) => {
                alert("Input Error!")
                //JIKA TERJADI ERROR VALIDASI, ASSIGN ERROR TERSEBUT KE DALAM STATE ERRORS
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }
            }).finally(() => {
                commit('doneLoading')
            })
        })
    },
    removeSjp({ dispatch }, payload) {
        return new Promise((resolve, reject) => {
            $axios.delete(`/sjp/${payload}`) //KIRIM REQUEST KE SERVER BERDASARKAN PAYLOAD (ID)
            .then((response) => {
                dispatch('getSjp').then(() => resolve()) //AMBIL DATA CUSTOMER TERBARU
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}