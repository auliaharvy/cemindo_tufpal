import $axios from '../api.js'

const state = () => ({
    pallettransfersends: [], //STATE UNTUK MENAMPUNG DATA CUSTOMERS
    
    //STATE INI UNTUK FORM ADD DAN EDIT NANTINYA
    pallettransfersend: {
        tp_number: '',
        pallet_transfer_status: '',
        sender: '',
        departure_pool: '',
        destination_pool: '',
        transporter: "",
        driver: "",
        vehicle: "", 
        good_pallet: "",
        tbr_pallet: "",
        note: "",
        created_at: "",
        updated_at: "",
    },
    page: 1
})

const mutations = {
    //MUTATIONS UNTUK ASSIGN DATA CUSTOMER KE DALAM STATE CUSTOMER
    ASSIGN_DATA(state, payload) {
        state.pallettransfersends = payload
    },
    //MENGUBAH STATE PAGE
    SET_PAGE(state, payload) {
        state.page = payload
    },
    //MENGUBAH STATE CUSTOMER
    ASSIGN_FORM(state, payload) {
        state.pallettransfersend = payload
    },
    //RESET STATE CUSTOMER
    CLEAR_FORM(state) {
        state.pallettransfersend = {
            tp_number: '',
            pallet_transfer_status: '',
            sender: '',
            departure_pool: '',
            destination_pool: '',
            transporter: "",
            driver: "",
            vehicle: "", 
            good_pallet: "",
            tbr_pallet: "",
            note: "",
            created_at: "",
            updated_at: "",
        }
    }
}

const actions = {
    getTransferPalletSend({ commit, state }, payload) {
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //REQUEST DATA CUSTOMER  DENGAN MENGIRIMKAN PARAMETER PAGE YG SEDANG AKTIF DAN VALUE PENCARIAN
            $axios.get(`/pallettransfersend?page=${state.page}&q=${search}`)
            .then((response) => {
                commit('ASSIGN_DATA', response.data) //JIKA DATA DITERIMA, SIMPAN DATA KEDALMA MUTATIONS
                resolve(response.data)
            })
        })
    },
    
  
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}